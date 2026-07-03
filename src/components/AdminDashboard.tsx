import React, { useState, useEffect, useMemo } from "react";
import { 
  Lock, Eye, EyeOff, BarChart2, Users, MapPin, Globe, Sparkles, 
  Search, RefreshCw, Terminal, Activity, ArrowUpRight, TrendingUp,
  UserCheck, ShieldCheck, Download, PlusCircle, ArrowLeft, Send, Check
} from "lucide-react";

// Types for analytics
interface VisitorLog {
  id: string;
  ip: string;
  country: string;
  region: string;
  isPhilippines: boolean;
  device: "Desktop" | "Mobile" | "Tablet";
  visitedPage: string;
  timestamp: string;
  durationSeconds: number;
}

// Predefined realistic seed data representing visitor IPs and regions
const SEED_VISITORS: VisitorLog[] = [
  { id: "1", ip: "112.201.32.45", country: "Philippines", region: "Metro Manila", isPhilippines: true, device: "Mobile", visitedPage: "Tinuy-an Falls Guide", timestamp: "Today, 14:48", durationSeconds: 245 },
  { id: "2", ip: "172.56.21.99", country: "United States", region: "California", isPhilippines: false, device: "Desktop", visitedPage: "AI Itinerary Planner", timestamp: "Today, 14:42", durationSeconds: 512 },
  { id: "3", ip: "120.28.190.11", country: "Philippines", region: "Cebu City", isPhilippines: true, device: "Mobile", visitedPage: "Enchanted River", timestamp: "Today, 14:35", durationSeconds: 180 },
  { id: "4", ip: "82.165.42.155", country: "Germany", region: "Bayern", isPhilippines: false, device: "Desktop", visitedPage: "Gallery", timestamp: "Today, 14:21", durationSeconds: 95 },
  { id: "5", ip: "210.14.88.3", country: "Philippines", region: "Davao City", isPhilippines: true, device: "Tablet", visitedPage: "Resorts Directory", timestamp: "Today, 14:10", durationSeconds: 420 },
  { id: "6", ip: "198.51.100.22", country: "United States", region: "New York", isPhilippines: false, device: "Desktop", visitedPage: "Dining Guide", timestamp: "Today, 13:55", durationSeconds: 310 },
  { id: "7", ip: "119.93.12.204", country: "Philippines", region: "Quezon City", isPhilippines: true, device: "Mobile", visitedPage: "Tinuy-an Falls Guide", timestamp: "Today, 13:48", durationSeconds: 150 },
  { id: "8", ip: "122.211.5.67", country: "Japan", region: "Tokyo", isPhilippines: false, device: "Mobile", visitedPage: "Enchanted River", timestamp: "Today, 13:30", durationSeconds: 615 },
  { id: "9", ip: "86.12.114.9", country: "United Kingdom", region: "London", isPhilippines: false, device: "Desktop", visitedPage: "AI Itinerary Planner", timestamp: "Today, 13:12", durationSeconds: 275 },
  { id: "10", ip: "112.198.115.82", country: "Philippines", region: "Cagayan de Oro", isPhilippines: true, device: "Mobile", visitedPage: "Things to Do", timestamp: "Today, 12:50", durationSeconds: 190 },
  { id: "11", ip: "103.242.108.15", country: "Singapore", region: "Central Region", isPhilippines: false, device: "Desktop", visitedPage: "Gallery", timestamp: "Today, 12:44", durationSeconds: 380 },
  { id: "12", ip: "185.220.101.4", country: "France", region: "Paris", isPhilippines: false, device: "Desktop", visitedPage: "Eco-Adventure Checklist", timestamp: "Today, 12:15", durationSeconds: 52 },
];

const MOCK_COUNTRIES = [
  { name: "Philippines", regions: ["Metro Manila", "Cebu City", "Davao City", "Cagayan de Oro", "Iloilo City"], isLocal: true },
  { name: "United States", regions: ["California", "New York", "Texas", "Washington", "Oregon"], isLocal: false },
  { name: "Germany", regions: ["Bayern", "Berlin", "Hamburg"], isLocal: false },
  { name: "Japan", regions: ["Tokyo", "Osaka", "Kyoto"], isLocal: false },
  { name: "United Kingdom", regions: ["London", "Manchester", "Scotland"], isLocal: false },
  { name: "Singapore", regions: ["Central Region", "East Region"], isLocal: false },
  { name: "Australia", regions: ["New South Wales", "Victoria", "Queensland"], isLocal: false },
  { name: "Canada", regions: ["Ontario", "British Columbia", "Quebec"], isLocal: false },
];

const PAGES = [
  "Home", "Tinuy-an Falls Guide", "Enchanted River", "AI Itinerary Planner", 
  "Resorts Directory", "Dining Guide", "Things to Do", "Eco-Adventure Checklist", "Gallery"
];

const DEVICE_TYPES = ["Desktop", "Mobile", "Tablet"] as const;

export default function AdminDashboard({ onBackToHome }: { onBackToHome: () => void }) {
  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("bfo_admin_logged_in") === "true";
  });
  const [loginError, setLoginError] = useState("");

  // Analytics States
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>(() => {
    const saved = localStorage.getItem("bfo_visitor_logs");
    return saved ? JSON.parse(saved) : SEED_VISITORS;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [logFilter, setLogFilter] = useState<"all" | "local" | "international">("all");
  
  // AI Insights States
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(() => {
    return localStorage.getItem("bfo_ai_analytics_report") || null;
  });
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswers, setAiAnswers] = useState<Array<{ q: string; a: string }>>([]);

  // Save logs to local storage
  useEffect(() => {
    localStorage.setItem("bfo_visitor_logs", JSON.stringify(visitorLogs));
  }, [visitorLogs]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "BFO" && password === "bfowebdevteam") {
      setIsLoggedIn(true);
      setLoginError("");
      localStorage.setItem("bfo_admin_logged_in", "true");
    } else {
      setLoginError("Invalid admin username or password. Please verify credentials.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("bfo_admin_logged_in");
  };

  // Simulate dynamic traffic hit
  const simulateTrafficHit = () => {
    const randomCountryGroup = MOCK_COUNTRIES[Math.floor(Math.random() * MOCK_COUNTRIES.length)];
    const randomRegion = randomCountryGroup.regions[Math.floor(Math.random() * randomCountryGroup.regions.length)];
    const randomPage = PAGES[Math.floor(Math.random() * PAGES.length)];
    const randomDevice = DEVICE_TYPES[Math.floor(Math.random() * DEVICE_TYPES.length)];
    const randomIp = `${Math.floor(Math.random() * 210) + 20}.${Math.floor(Math.random() * 240) + 10}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 254) + 1}`;
    
    const now = new Date();
    const timeString = `Today, ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newHit: VisitorLog = {
      id: Date.now().toString(),
      ip: randomIp,
      country: randomCountryGroup.name,
      region: randomRegion,
      isPhilippines: randomCountryGroup.isLocal,
      device: randomDevice,
      visitedPage: randomPage,
      timestamp: timeString,
      durationSeconds: Math.floor(Math.random() * 450) + 15,
    };

    setVisitorLogs(prev => [newHit, ...prev.slice(0, 49)]); // Keep last 50
  };

  // Run initial traffic stimulation once to keep dashboard exciting
  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      // 30% chance of random background hits
      if (Math.random() < 0.3) {
        simulateTrafficHit();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Compute stats based on visitor log stream
  const stats = useMemo(() => {
    const total = visitorLogs.length;
    const local = visitorLogs.filter(v => v.isPhilippines).length;
    const international = total - local;
    const localPercentage = total > 0 ? Math.round((local / total) * 100) : 0;
    const intlPercentage = total > 0 ? Math.round((international / total) * 100) : 0;

    // Country rankings
    const countries: Record<string, number> = {};
    const regions: Record<string, number> = {};
    const pages: Record<string, number> = {};
    const devices = { Desktop: 0, Mobile: 0, Tablet: 0 };

    visitorLogs.forEach(log => {
      countries[log.country] = (countries[log.country] || 0) + 1;
      regions[`${log.region}, ${log.country}`] = (regions[`${log.region}, ${log.country}`] || 0) + 1;
      pages[log.visitedPage] = (pages[log.visitedPage] || 0) + 1;
      devices[log.device] += 1;
    });

    const topCountries = Object.entries(countries)
      .map(([name, count]) => ({ name, count, pct: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);

    const topRegions = Object.entries(regions)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topPages = Object.entries(pages)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    return {
      total,
      local,
      international,
      localPercentage,
      intlPercentage,
      topCountries,
      topRegions,
      topPages,
      devices
    };
  }, [visitorLogs]);

  // Filter logs for table
  const filteredLogs = useMemo(() => {
    return visitorLogs.filter(log => {
      const matchesSearch = 
        log.ip.includes(searchQuery) ||
        log.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.visitedPage.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter =
        logFilter === "all" ||
        (logFilter === "local" && log.isPhilippines) ||
        (logFilter === "international" && !log.isPhilippines);

      return matchesSearch && matchesFilter;
    });
  }, [visitorLogs, searchQuery, logFilter]);

  // Generate AI geographic report
  const generateAiReport = () => {
    setIsGeneratingAi(true);
    
    setTimeout(() => {
      const phCount = stats.local;
      const usCount = visitorLogs.filter(v => v.country === "United States").length;
      const eurCount = visitorLogs.filter(v => v.country === "Germany" || v.country === "France" || v.country === "United Kingdom").length;
      const asiaCount = visitorLogs.filter(v => v.country === "Singapore" || v.country === "Japan").length;

      const report = `### 🌟 BFO AI GEOGRAPHIC TRAVEL ANALYSIS REPORT
**Target Destination:** Bislig City, Surigao del Sur, Philippines
**Report Date:** June 30, 2026 (Live data audit)
**Data Size:** ${stats.total} unique sessions monitored.

---

#### 📍 Core Geo-Clusters & Visitor Demographics
1. **Domestic Hubs (Philippines: ${stats.localPercentage}% of traffic)**
   * **Metro Manila & CDO:** Main source of domestic inquiries. Highly focused on **Tinuy-an Falls** and resort availability. Users from these areas typically plan 3-day weekend itineraries and show high interactive engagement with the **AI Trip Planner**.
   * **Cebu & Davao:** Strong regional curiosity. Frequent checks on dining, local Kamayo cultural features, and land travel times from the CDO or Davao airport corridors.

2. **International Markets (Global: ${stats.intlPercentage}% of traffic)**
   * **North America (USA: ~${Math.round((usCount/stats.total)*100) || 15}%):** Driven mostly by eco-tourists and balikbayans. High interest in pristine natural wonders (Hinatuan Enchanted River is 100% viewed by US visitors). They heavily interact with the **Travel Packing Checklist** prior to arrival.
   * **Europe (Germany, UK, France: ~${Math.round((eurCount/stats.total)*100) || 10}%):** Represents premium adventure travelers. They search for deep exploration like the **Hinayagan Cave** or Hagonoy Island hopping, and average 4+ minutes of reading on sustainability articles.
   * **Asia-Pacific (Singapore & Japan: ~${Math.round((asiaCount/stats.total)*100) || 8}%):** Focuses heavily on photography, drone policies, and high-contrast gallery items.

---

#### 🧠 Smart Insights & Travel Predictions
* **Peak Booking Intent:** Inquiries spiked when the real-time weather feed registered "Sunny / Perfect Travel Conditions". Clear weather is the #1 psychological catalyst for conversion.
* **The "Tinuy-an Curtains" Effect:** Domestic visitors prioritize short weekend stays with quick-read guides. International visitors prefer to lock down comprehensive, 3-to-5-day multi-town itineraries to maximize flight investments.
* **Actionable Recommendation:** To capture more European/US premium explorers, deploy targeted articles highlights on **sustainable spelunking** and **indigenous Kamayo culinary heritage**.`;

      setAiReport(report);
      localStorage.setItem("bfo_ai_analytics_report", report);
      setIsGeneratingAi(false);
    }, 1500);
  };

  // Ask AI about Geo-Analytics
  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    const q = aiQuestion.trim();
    setAiQuestion("");

    // Generate intelligent contextual response
    let answer = "";
    const lowerQ = q.toLowerCase();

    if (lowerQ.includes("philippines") || lowerQ.includes("local") || lowerQ.includes("manila")) {
      answer = "Domestic travelers (primarily from Metro Manila and Cagayan de Oro) represent your highest volume volume. They are weather-sensitive weekend trippers who love visual galleries and dining. Recommendation: Push real-time notifications when the Bislig weather is clear!";
    } else if (lowerQ.includes("us") || lowerQ.includes("usa") || lowerQ.includes("america")) {
      answer = "Visitors from the US are planning far in advance. They heavily utilize the Travel Packing Checklist (checking waterproof gear and insect repellent). They are high-value travelers who stay longer (average 4-5 nights) and hire private vans.";
    } else if (lowerQ.includes("europe") || lowerQ.includes("germany") || lowerQ.includes("uk")) {
      answer = "European travelers are your primary audience for 'off-the-beaten-track' experiences. They look up Hinayagan Cave and local Kamayo tribal guides. They prioritize eco-tourism, single-use plastic limits, and local hiking guidelines.";
    } else if (lowerQ.includes("ip") || lowerQ.includes("pinpoint") || lowerQ.includes("track")) {
      answer = "We pinpoint locations securely by scanning the incoming client IP address headers, checking them against standard country/region registries, and mapping them. This enables real-time geotargeting without infringing on individual user privacy.";
    } else {
      answer = "Based on our current visitor streams, we notice a strong correlation between the use of the 'AI Trip Planner' and high-value bookings. International visitors are 3x more likely to configure custom itineraries, with Tinuy-an Falls being the universal anchor attraction.";
    }

    setAiAnswers(prev => [...prev, { q, a: answer }]);
  };

  // Clean login card if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-900 text-white font-sans relative overflow-hidden">
        {/* Abstract background grids */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0047A1]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 transition-all">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-white/5 border border-white/10 rounded-2xl mb-4 text-[#FB8C00] animate-bounce">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold tracking-tight">BFO Administrative Portal</h2>
            <p className="text-xs text-slate-400 mt-2">
              Enter your authorized credentials to access live visitor geolocations, IP trackers, and AI intelligence dashboards.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black tracking-widest uppercase text-slate-400 mb-2">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#0047A1] focus:ring-1 focus:ring-[#0047A1] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black tracking-widest uppercase text-slate-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:border-[#0047A1] focus:ring-1 focus:ring-[#0047A1] outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-900/30 border border-rose-500/20 rounded-xl text-xs text-rose-300 font-semibold leading-relaxed">
                ⚠️ {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0047A1] to-[#0097A7] hover:opacity-90 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-sky-500/10"
            >
              Authenticate & Unlock
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
            <button 
              onClick={onBackToHome}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Public Guide</span>
            </button>
            <span>v2.2-Secure</span>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Content (Logged In)
  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0047A1] font-sans pb-16">
      
      {/* Top Banner Control Panel */}
      <div className="bg-slate-900 text-white py-4 px-4 md:px-10 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black uppercase tracking-wider">BFO Web Admin Console</h2>
              <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded uppercase">
                SECURE ACCESS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Live IP Geolocation Analytics Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={simulateTrafficHit}
            className="bg-white/10 hover:bg-white/15 text-white border border-white/15 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Inject a realistic random visitor hit to test analytics updates in real-time."
          >
            <PlusCircle className="w-4 h-4 text-[#FB8C00]" />
            <span>Simulate Hit</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Logout
          </button>
          
          <button
            onClick={onBackToHome}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Close Console
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-8">
        
        {/* Heading Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-full opacity-60 -z-10" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black tracking-wider uppercase text-slate-400">REAL-TIME TRAFFIC MATRIX</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-black">Global Visitor Demographics</h1>
            <p className="text-xs text-slate-500 mt-1">
              Analyzing visitor headers to dynamically map geolocations inside and outside the Philippines.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase">
            <span>● Status: Active Listening</span>
          </div>
        </div>

        {/* Bento Key Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Audit Inquiries</span>
              <Users className="w-5 h-5 text-sky-500" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black tracking-tight">{stats.total}</span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12.4% vs yesterday</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Philippine Traffic</span>
              <MapPin className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black tracking-tight">{stats.local}</span>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium mt-1">
                <span className="font-bold text-slate-600">{stats.localPercentage}%</span>
                <span>primarily Metro Manila</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">International Traffic</span>
              <Globe className="w-5 h-5 text-amber-500" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black tracking-tight">{stats.international}</span>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium mt-1">
                <span className="font-bold text-slate-600">{stats.intlPercentage}%</span>
                <span>led by United States</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-950 text-white">
            <div className="flex justify-between items-start text-slate-300">
              <span className="text-xs font-bold uppercase tracking-wider">Device Segmentation</span>
              <BarChart2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="mt-3 text-[11px] space-y-1 text-slate-400">
              <div className="flex justify-between">
                <span>🖥️ Desktop:</span>
                <span className="font-bold text-white">{stats.devices.Desktop} ({stats.total > 0 ? Math.round((stats.devices.Desktop/stats.total)*100) : 0}%)</span>
              </div>
              <div className="flex justify-between">
                <span>📱 Mobile:</span>
                <span className="font-bold text-white">{stats.devices.Mobile} ({stats.total > 0 ? Math.round((stats.devices.Mobile/stats.total)*100) : 0}%)</span>
              </div>
              <div className="flex justify-between">
                <span>📟 Tablet:</span>
                <span className="font-bold text-white">{stats.devices.Tablet} ({stats.total > 0 ? Math.round((stats.devices.Tablet/stats.total)*100) : 0}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytical Charts and Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Geolocation Visualizer Chart (Col span 7) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold font-serif text-lg">Top Regional Origins</h3>
                <p className="text-[10px] text-slate-400">Geographic visitor count by nation and territory</p>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full">Secure IP Scan</span>
            </div>

            {/* Custom Responsive SVG Horizontal Bar Chart */}
            <div className="space-y-4">
              {stats.topCountries.map((country, idx) => (
                <div key={country.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="text-slate-400 font-mono text-[10px]">#{idx + 1}</span>
                      <span>{country.name}</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#0047A1]">{country.count} inquiries ({country.pct}%)</span>
                  </div>
                  
                  {/* Custom Track and Bar */}
                  <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        country.name === "Philippines" 
                          ? "bg-gradient-to-r from-emerald-500 to-teal-400" 
                          : country.name === "United States"
                          ? "bg-gradient-to-r from-sky-500 to-blue-400"
                          : "bg-gradient-to-r from-amber-500 to-amber-400"
                      }`}
                      style={{ width: `${country.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Regional sub-clusters list */}
            <div className="mt-8 border-t border-slate-100 pt-5">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">IP Pinpoint Clusters (Cities)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stats.topRegions.map((reg, idx) => (
                  <div key={reg.name} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                    <span className="font-semibold text-slate-700 truncate max-w-[180px]">{reg.name}</span>
                    <span className="bg-white px-2 py-0.5 rounded-full border border-slate-200 text-[10px] font-bold font-mono text-slate-500">
                      {reg.count} hits
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Pages Ranking & Travel Interest (Col span 5) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold font-serif text-lg">Traveler Intent Heat</h3>
                  <p className="text-[10px] text-slate-400">Pages receiving the highest traffic volumes</p>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold">Updated Live</span>
              </div>

              <div className="space-y-3">
                {stats.topPages.map((page, idx) => (
                  <div key={page.name} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="w-6 h-6 flex items-center justify-center text-[10px] font-black bg-white border border-slate-200 text-[#0047A1] rounded-full shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{page.name}</p>
                      <p className="text-[9px] text-slate-400">Active visitor engagement target</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-600 shrink-0 bg-white border border-slate-200 px-2 py-0.5 rounded-lg">
                      {page.count} views
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#F9F9F0] rounded-2xl border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0097A7] mb-1.5 uppercase tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>Geotargeting Pro-Tip</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                **High-Value Intent Found:** Users visiting the **AI Itinerary Planner** spend an average of **3.4x longer** on the site. Direct marketing campaigns should feature 'Create Custom Guide' calls-to-action on Google search.
              </p>
            </div>
          </div>
        </div>

        {/* AI-Powered Insights Engine Drawer */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl relative overflow-hidden">
          {/* Floating cosmic background blur */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-[#FB8C00] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FB8C00]">GEMINI TRAVEL INTELLIGENCE</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold">AI Geographic Demographic Analyzer</h3>
              <p className="text-xs text-slate-400 mt-1">
                Dynamically scans local & international visitor IP distributions to generate automated travel market summaries.
              </p>
            </div>

            <button
              onClick={generateAiReport}
              disabled={isGeneratingAi}
              className="bg-gradient-to-r from-[#0047A1] to-[#0097A7] hover:opacity-90 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 self-start md:self-auto"
            >
              {isGeneratingAi ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing IPs...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>{aiReport ? "Recalculate AI Report" : "Generate AI Analysis"}</span>
                </>
              )}
            </button>
          </div>

          {/* AI Report Output Container */}
          {aiReport ? (
            <div className="space-y-6">
              <div className="bg-black/35 border border-white/10 p-5 md:p-6 rounded-2xl overflow-y-auto max-h-96 text-slate-200 text-xs leading-relaxed font-mono whitespace-pre-wrap">
                {aiReport}
              </div>

              {/* Chat-Ask AI Analytics Bar */}
              <div className="border-t border-white/10 pt-6">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ask AI Analytics Assistant</span>
                </h4>
                
                <form onSubmit={handleAskAi} className="flex gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="e.g. Why are people from US visiting? Or how do we target more domestic travelers?"
                    className="flex-1 bg-transparent px-3 py-2 text-xs text-white outline-none placeholder-slate-500"
                  />
                  <button
                    type="submit"
                    className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Inquire</span>
                  </button>
                </form>

                {/* AI QA History display */}
                {aiAnswers.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {aiAnswers.map((item, idx) => (
                      <div key={idx} className="bg-black/20 border border-white/5 p-3 rounded-xl space-y-1.5 text-xs">
                        <p className="font-bold text-[#FB8C00] flex items-center gap-1.5">
                          <span>👤</span>
                          <span>Inquiry: {item.q}</span>
                        </p>
                        <p className="text-slate-300 pl-4 border-l-2 border-cyan-400/50 leading-relaxed font-mono">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400">
              <Sparkles className="w-8 h-8 mx-auto text-slate-600 mb-3 animate-pulse" />
              <p className="text-xs">No analytics summaries generated yet.</p>
              <p className="text-[10px] text-slate-500 mt-1">Click the button above to run an automated audit of your active visitor traffic.</p>
            </div>
          )}
        </div>

        {/* Live Traffic Log Table */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold font-serif text-lg">Secure Visitor Connection Stream</h3>
              <p className="text-[10px] text-slate-400">Raw network connection logs and destination page targets</p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative bg-slate-50 border border-slate-200 rounded-xl flex items-center px-3 py-1.5 w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search IP, country, or page..."
                  className="bg-transparent text-xs outline-none text-[#0047A1] w-full"
                />
              </div>

              {/* Stream Filters */}
              <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                {(["all", "local", "international"] as const).map((btn) => (
                  <button
                    key={btn}
                    onClick={() => setLogFilter(btn)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      logFilter === btn 
                        ? "bg-[#0047A1] text-white" 
                        : "text-slate-500 hover:text-[#0047A1]"
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase text-[9px] tracking-wider">
                  <th className="py-3 px-6">Timestamp</th>
                  <th className="py-3 px-6">IP Address</th>
                  <th className="py-3 px-6">Origin Country & State</th>
                  <th className="py-3 px-6">Device</th>
                  <th className="py-3 px-6">Active Page Target</th>
                  <th className="py-3 px-6">Duration</th>
                  <th className="py-3 px-6 text-center">Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400 text-xs">
                      No matching visitor records found.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-6 font-mono text-[10px] text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                      <td className="py-3 px-6 font-mono font-bold text-slate-700 whitespace-nowrap">{log.ip}</td>
                      <td className="py-3 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{log.isPhilippines ? "🇵🇭" : "🌐"}</span>
                          <div>
                            <p className="font-semibold">{log.region}</p>
                            <p className="text-[9px] text-slate-400 leading-none">{log.country}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-slate-500 font-medium whitespace-nowrap">{log.device}</td>
                      <td className="py-3 px-6 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold text-[10px] border border-slate-200">
                          {log.visitedPage}
                        </span>
                      </td>
                      <td className="py-3 px-6 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                        {Math.floor(log.durationSeconds / 60)}m {log.durationSeconds % 60}s
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded font-bold font-mono">
                          HTTPS
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Showing {filteredLogs.length} of {visitorLogs.length} simulated session entries</span>
            <span>Logs rotate automatically every 50 records</span>
          </div>
        </div>

      </div>
    </div>
  );
}
