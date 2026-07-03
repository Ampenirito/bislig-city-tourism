import express from "express";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Robust content generation with model fallbacks + per-call timeout
async function generateContentWithFallback(options: {
  contents: any;
  config?: any;
}) {
  // Try fastest model first, fall back to more capable ones
  const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-pro"];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      console.log(`[Gemini] Trying model: ${model}`);

      // 50 s hard timeout per attempt — stays well within Vercel's 60 s limit
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 50_000);

      const response = await Promise.race([
        ai.models.generateContent({
          model,
          contents: options.contents,
          config: options.config,
        }),
        new Promise<never>((_, reject) =>
          controller.signal.addEventListener("abort", () =>
            reject(new Error(`Model ${model} timed out after 50s`))
          )
        ),
      ]);

      clearTimeout(timer);
      console.log(`[Gemini] Success with model: ${model}`);
      return response as Awaited<ReturnType<typeof ai.models.generateContent>>;
    } catch (err: any) {
      console.error(`[Gemini] Model ${model} failed:`, err.message || err);
      lastError = err;
      // Short pause before trying the next model
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  throw lastError || new Error("All AI servers are temporarily busy. Please try again.");
}

// Keep-alive / health check endpoints
app.get("/api/ping", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    gemini: !!process.env.GEMINI_API_KEY,
    mapsKey: !!process.env.GOOGLE_MAPS_PLATFORM_KEY,
  });
});

// Real-time Weather Proxy for Bislig City (Lat: 8.2104, Lng: 126.3614)
app.get("/api/weather", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=8.2104&longitude=126.3614&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FSingapore"
    );
    if (!response.ok) {
      throw new Error(`Open-Meteo API returned status ${response.status}`);
    }
    const data = await response.json();
    const current = data.current;

    const wmoCodes: { [key: number]: string } = {
      0: "Sunny & Clear",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast Sky",
      45: "Foggy Weather",
      48: "Dense Rime Fog",
      51: "Light Drizzle",
      53: "Moderate Drizzle",
      55: "Dense Drizzle",
      61: "Slight Rain",
      63: "Moderate Rain",
      65: "Heavy Tropical Rain",
      71: "Slight Snowfall",
      73: "Moderate Snowfall",
      75: "Heavy Snowfall",
      77: "Snow Grains",
      80: "Slight Showers",
      81: "Moderate Showers",
      95: "Thunderstorms",
      96: "Thunderstorms with Hail",
      99: "Severe Thunderstorms"
    };

    const conditionText = wmoCodes[current.weather_code] || "Warm & Sunny";

    res.json({
      temperature: Math.round(current.temperature_2m),
      apparentTemperature: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      isDay: current.is_day === 1,
      windSpeed: current.wind_speed_10m,
      precipitation: current.precipitation,
      condition: conditionText,
      weatherCode: current.weather_code,
      location: "Bislig City"
    });
  } catch (error: any) {
    console.error("Weather proxy failed, using default tropical parameters:", error.message || error);
    res.json({
      temperature: 29,
      apparentTemperature: 33,
      humidity: 80,
      isDay: true,
      windSpeed: 8.4,
      precipitation: 0,
      condition: "Sunny & Clear",
      weatherCode: 0,
      location: "Bislig City"
    });
  }
});

// AI Trip Planner Endpoint
app.post("/api/ai/plan-trip", async (req, res) => {
  try {
    const { days, interest, budget, groupSize } = req.body;

    if (!days || !interest || !budget) {
      return res.status(400).json({ error: "Missing required preferences: days, interest, budget." });
    }

    const durationDays = Math.min(Math.max(parseInt(days) || 1, 1), 7);

    const systemInstruction = `
You are an expert travel coordinator and digital concierge for the Department of Tourism of Bislig City, Surigao del Sur, Philippines.
Your task is to generate a highly customized, realistic, and inspiring travel itinerary for Bislig City and surrounding attractions (like the nearby Hinatuan Enchanted River) based on user choices.

Key Tourist Attractions in Bislig City and Hinatuan to incorporate accurately:
1. Tinuy-an Falls: The 'Niagara of the Philippines', a majestic 95-meter wide, 3-tiered waterfall in Brgy. Borboanan, Bislig City. Best visited in the morning for rainbows.
2. Hinatuan Enchanted River: World-famous, deep, crystal-clear deep blue saltwater spring river located in nearby Hinatuan. Standard feeding time is at 12:00 PM.
3. Ocean View Park: Scenic hill overlooking Bislig Bay, with a high staircase, restaurant, and panoramic views of the paper mill and coast.
4. Hagonoy Island: A small, pristine island of white sand and coconut trees in Bislig Bay. Perfect for island hopping, swimming, and fresh seafood.
5. Sian Falls: A serene, multi-tiered waterfall ideal for a peaceful nature retreat.
6. Hinayagan Cave: In Brgy. San Jose, featuring a spectacular dome skylight that lets sunbeams illuminate a clear underground pool.
7. Lake 77: Peaceful freshwater lake nestled in the forest of Brgy. Sibaroy, perfect for kayaking and quiet moments.
8. Forester's Park: Serene canopy walkways, tall trees, and local flora/fauna.
9. Chocolate Beach: Scenic shoreline with dark chocolate-colored sand, extremely relaxing.
10. Kamayo Heritage Park: Cultural showcase of Kamayo tribal houses, local craft shops, and history.

Key Restaurants & Cafes in Bislig:
- Food in a Box: Trendy, modern dining hub serving delicious local platters and seafood.
- Brew Side Cafe: Excellent coffee, pastries, and chill atmosphere.
- Fabella Coffee: Gourmet local and international brews with beautiful modern interior.

Key Resorts & Accommodations in Bislig & Hinatuan:
- Harip Beach Resort: Beautiful coastal beachfront cottages.
- Hinatuan Cold Spring: Refreshing natural spring resort.
- Kawa-Kawa: Unique hot stone baths and jungle-themed accommodation.
- Paper Country Inn: Well-known business hotel in Bislig City center.
- Sarnimian Villa & Resort: High-end resort with pools and comfortable villas.

Draft a complete JSON response according to the requested schema. Generate exactly \${durationDays} days of detailed activities. Include realistic, localized details (times, durations, dining places, and travel advice). Make sure the itinerary focuses on the user's primary interest: '\${interest}', with a '\${budget}' budget for a group of '\${groupSize}'.
`;

    const prompt = `Please design a highly engaging, detailed, and visually stunning \${durationDays}-day travel itinerary for a \${groupSize} trip to Bislig City, focusing on \${interest} with a \${budget} budget. Add travel tips and an approximate budget breakdown.`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["itineraryName", "days", "travelTips", "budgetBreakdown"],
          properties: {
            itineraryName: {
              type: Type.STRING,
              description: "A creative, catchy name for this personalized itinerary.",
            },
            days: {
              type: Type.ARRAY,
              description: "An array of days matching the requested duration.",
              items: {
                type: Type.OBJECT,
                required: ["dayNumber", "theme", "activities"],
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  theme: { type: Type.STRING, description: "Main theme/focus of this day (e.g., 'Chasing Waterfalls & Coffee Culture')." },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      required: ["time", "activityName", "locationName", "description", "estimatedCost"],
                      properties: {
                        time: { type: Type.STRING, description: "Time of day (e.g., '08:00 AM')" },
                        activityName: { type: Type.STRING, description: "What the visitor is doing." },
                        locationName: { type: Type.STRING, description: "The specific tourist attraction, restaurant, or resort." },
                        description: { type: Type.STRING, description: "Engaging and descriptive guide advice for this activity." },
                        estimatedCost: { type: Type.STRING, description: "Approximate cost in PHP per person." },
                      },
                    },
                  },
                },
              },
            },
            travelTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 high-value travel tips tailored to this interest, budget, and season.",
            },
            budgetBreakdown: {
              type: Type.OBJECT,
              required: ["accommodation", "food", "toursAndEntranceFees", "transportation", "totalEstimated"],
              properties: {
                accommodation: { type: Type.STRING, description: "Estimated total accommodation cost in PHP." },
                food: { type: Type.STRING, description: "Estimated food and cafe cost in PHP." },
                toursAndEntranceFees: { type: Type.STRING, description: "Entrance fees and local guide fees in PHP." },
                transportation: { type: Type.STRING, description: "Local van, habal-habal, or tricycle hire in PHP." },
                totalEstimated: { type: Type.STRING, description: "Grand total estimate in PHP." },
              },
            },
          },
        },
      },
    });

    const resultText = response.text || "{}";
    const itinerary = JSON.parse(resultText);
    res.json(itinerary);
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate your personalized itinerary. Please try again." });
  }
});

// AI Chatbot Concierge Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid or missing messages array." });
    }

    const contents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text || "" }]
    }));

    const systemInstruction = `
You are Kamayo AI, the official, intelligent digital ambassador and virtual concierge for Bislig City Tourism, Surigao del Sur, Philippines.
Your mission is to welcome travelers, answer questions with pristine accuracy, and help them plan their perfect eco-adventure in Bislig and surrounding areas.

Verify your answers against this official Bislig Tourism Database:

[ATTRACTIONS]
1. Tinuy-an Falls: The "Niagara of the Philippines", 3-tiered majestic waterfall, 95m wide, 55m high. Location: Brgy. Borboanan, 18km (35 mins) from city proper. Best Time: 9:00 AM - 11:00 AM (for natural morning rainbows). Fee: ₱50.00. Opening Hours: 6:00 AM - 5:00 PM daily. Rafting/Hydro-massage: Yes, bamboo raft (balsa) rides.
2. Hinatuan Enchanted River: World-famous, mystical saltwater spring river of deep blue sapphire/turquoise hues. Location: Neighboring Hinatuan, 24km (40 mins) from Bislig. Key Event: Daily Fish Feeding Ritual at 12:00 PM (accompanied by Hinatuan Hymn). Fee: ₱100.00 (Adults), ₱30.00 (Children). Hours: 7:00 AM - 5:00 PM. Note: Swimming prohibited in the main deep blue pool, but permitted 100m downriver. Life vests mandatory.
3. Ocean View Park: Scenic hill peak offering panoramic 360° views of Bislig Bay, coastal islands, and the historic townscape. Climb 100+ steps. Has an elegant restaurant serving local Kamayo cuisine. Location: 3km (10 mins) from proper. Fee: Free entry (restaurant charges separately). Hours: 5:00 AM - 9:00 PM.
4. Hagonoy Island: Uninhabited white sandbar and coconut palms in Bislig Bay. High-quality marine life, snorkeling, fresh seafood. Location: 4.5km offshore (25 min outrigger bangka boat ride). Boat Rental: ₱1,500 - ₱2,000 from Baywalk pier. Fee: ₱20.00 island entrance. Hours: Daylight only. Carry your own trash back.
5. Hinayagan Cave: Limestone cave with spectacular ceiling skylight letting sunbeams pierce through at 11:00 AM - 1:00 PM, illuminating a green underground pool. Stalactites & stalagmites. Location: Brgy. San Jose, 12km (20 mins). Fee: ₱30.00 (includes safety helmet and local guide). Hours: 8:00 AM - 4:00 PM.
6. Lake 77: Tranquil mirror-like eco-lake bordered by lush forest canopy. Kayaking (₱100/hr) and peaceful floating bamboo cottages. Location: Brgy. Sibaroy, 15km (25 mins). Fee: ₱30.00. Hours: 7:00 AM - 5:00 PM.

[DINING & CAFES]
- Food in a Box: Seafood, garlic-butter mud crabs, squid sisig, tuna sashimi. Price: ₱250 - ₱600/person. Hours: 10 AM - 10 PM.
- Brew Side Cafe: Specialty cold brews, artisan pastries, tablea lava cake. Price: ₱120 - ₱250/person. Hours: 8 AM - 11 PM.
- Fabella Coffee: Premium single-origin Mindanao Apo Arabica, Kamayo cassava bibingka. Price: ₱150 - ₱300/person. Hours: 7 AM - 10 PM.

[ACCOMMODATIONS]
- Harip Beach Resort: Coastal eco-luxury beachfront cottages, surfing, swings. Price: ₱2,500 - ₱6,000/night.
- Hinatuan Cold Spring Resort: Freshwater spring resort, overnight cabins. Price: ₱1,200 - ₱3,500/night.
- Kawa-Kawa Jungle Bath & Lodge: Rainforest lodge with traditional hot stone kawa baths. Price: ₱1,800 - ₱4,000/night.
- Paper Country Inn: Well-known central business hotel in Bislig proper.

[EVENTS & FESTIVALS]
- Karawasan Festival (Sept 17 - 18): Cultural dance representing the Kamayo tribe's appreciation of crab abundance (Karawasan means crabs).
- City Charter Day (Sept 18): Trade fairs, Miss Bislig, concerts.
- Tinuy-an Eco Trail Marathon (May 24): Rain forest run finishing at the falls.

[PRACTICAL TRAVEL ADVICE]
- How to get there: Fly to Davao or Butuan. Take an air-con passenger bus (Bachelor Express) or van to Bislig City (Mangagoy Terminal). It takes 4-5 hours from Butuan, 5-6 hours from Davao.
- Language: Local language is Kamayo, but English and Tagalog/Cebuano are widely spoken.
- Best months to visit: March to October (dry season).

PERSONALITY & TONE:
- Be incredibly warm, helpful, polite, and enthusiastic. Use hospitable local phrases like "Ayu-ayu!" (Take care!) or "Kamayo greetings!"
- Always structure your responses beautifully using clear headings, bullet points, and clean Markdown formatting.
- If a user asks about attractions, hotels, or events, give them precise, real details (such as fees, locations, and insider travel tips).
- Keep responses engaging, rich, and highly tailored. If the user asks something outside Bislig's tourism, politely guide them back to their journey in Bislig.
`;

    const response = await generateContentWithFallback({
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, but I am having trouble connecting. How else may I assist you with your Bislig adventure?";
    res.json({ reply });
  } catch (error: any) {
    console.error("AI Chatbot API error:", error);
    res.status(500).json({ error: "Failed to communicate with AI Concierge. Please try again." });
  }
});

export default app;
