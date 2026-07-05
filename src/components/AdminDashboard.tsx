import React, { useState, useEffect, useMemo } from "react";
import { 
  Lock, Eye, EyeOff, BarChart2, Users, MapPin, Globe, Sparkles, 
  Search, RefreshCw, Terminal, Activity, ArrowUpRight, TrendingUp, Calculator, Coins,
  UserCheck, ShieldCheck, Download, PlusCircle, ArrowLeft, Send, Check,
  FileSpreadsheet, UploadCloud, FileText, CheckCircle, Image, AlertCircle
} from "lucide-react";
import { jsPDF } from "jspdf";

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

// Helper to render basic markdown elements into clean JSX
const renderMarkdown = (text: string) => {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    // Bold parsing: **text**
    const parseBold = (str: string) => {
      const parts = str.split(/\*\*(.*?)\*\*/g);
      return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-slate-800">{part}</strong> : part);
    };

    const trimmed = line.trim();
    if (trimmed.startsWith("### ")) {
      return <h4 key={idx} className="text-xs font-black text-slate-700 mt-4 mb-1.5 uppercase tracking-wider">{parseBold(trimmed.slice(4))}</h4>;
    }
    if (trimmed.startsWith("## ")) {
      return <h3 key={idx} className="text-sm font-black text-[#0047A1] mt-5 mb-2 font-serif">{parseBold(trimmed.slice(3))}</h3>;
    }
    if (trimmed.startsWith("# ")) {
      return <h2 key={idx} className="text-base font-black text-slate-900 mt-6 mb-3 font-serif border-b border-slate-200 pb-1">{parseBold(trimmed.slice(2))}</h2>;
    }
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      return (
        <li key={idx} className="ml-4 list-disc text-xs text-slate-600 my-1 pl-1">
          {parseBold(trimmed.slice(2))}
        </li>
      );
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s(.*)/);
      return (
        <li key={idx} className="ml-4 list-decimal text-xs text-slate-600 my-1 pl-1">
          {parseBold(match ? match[2] : trimmed)}
        </li>
      );
    }
    if (trimmed === "") {
      return <div key={idx} className="h-2" />;
    }
    return <p key={idx} className="text-xs text-slate-600 leading-relaxed my-1.5">{parseBold(line)}</p>;
  });
};

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

  // AI Consulting / File Analysis States
  const [activeAdminTab, setActiveAdminTab] = useState<"analytics" | "consulting" | "roi">("analytics");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileTextContent, setFileTextContent] = useState<string>("");
  const [binaryBase64, setBinaryBase64] = useState<string>("");
  const [fileMimeType, setFileMimeType] = useState<string>("text/plain");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isAnalyzingFile, setIsAnalyzingFile] = useState<boolean>(false);
  const [fileProgress, setFileProgress] = useState<number>(0);
  useEffect(() => {
    let interval: any;
    if (isAnalyzingFile) {
      setFileProgress(0);
      interval = setInterval(() => {
        setFileProgress((prev) => {
          if (prev >= 98) return prev;
          const diff = 100 - prev;
          const inc = Math.max(1, Math.floor(diff / 10));
          return prev + inc;
        });
      }, 350);
    } else {
      setFileProgress(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzingFile]);
  const [selectedOfficeIdx, setSelectedOfficeIdx] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<any>(() => {
    const saved = localStorage.getItem("bfo_file_analysis_result");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.overallSummary) {
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    return {
      documentTitle: "Digital Service Readiness & Administrative Efficiency Diagnostic Report",
      overallSummary: `### Executive Overview
Based on survey responses across multiple departments and local businesses, we identified shared bottlenecks in manual administrative workflows and response times. The BFO Diagnostics Workbench recommends division-specific online forms, QR-coded permit verification systems, and print cue scheduling tools to streamline local operations.

### Key Operational Challenges
* **Manual Entry & Registration:** High administrative load on staff, delaying member registrations and business clearances.
* **Paper-Based Permit handshakes:** Delays client coordination and animal vaccine safety processing.
* **Lack of Automated Messaging:** Slow communication regarding printed project approvals or lead client matches.

### Digital Strategy Roadmap
1. **Develop online service portals:** Minimize foot traffic and automate queue assignments.
2. **Standardize secure digital permits:** Enable QR codes to make validations quick and tamper-proof.
3. **Transition to structured CRM repositories:** Centralize client listings and support requests.`,
      offices: [
        {
          officeName: "Bislig City Chamber of Commerce & Industry",
          bottlenecks: [
            { name: "Manual Member Registration & Invoicing", percentage: 78 },
            { name: "Delayed Business Coordination Updates", percentage: 55 }
          ],
          digitalMaturityKPIs: {
            willingness: 90,
            trainingNeed: 35,
            budgetBarrier: 50
          },
          recommendations: [
            {
              problem: "Manual Member Registration & Paper Billing",
              solutions: ["Online Chamber Portal", "Automated Invoice Billing", "Consolidated Directory Search"],
              benefits: "Saves up to 15 hours per week of volunteer administrative tracking and speeds up member applications."
            }
          ]
        },
        {
          officeName: "CVA Printing Services",
          bottlenecks: [
            { name: "Manual Order Queue Tracking", percentage: 70 },
            { name: "Paper-based Billing & Invoice Handshake", percentage: 65 }
          ],
          digitalMaturityKPIs: {
            willingness: 80,
            trainingNeed: 50,
            budgetBarrier: 70
          },
          recommendations: [
            {
              problem: "Manual Order Intake Tracking",
              solutions: ["Print Job Board System", "SMS Automatic Notification Gateway"],
              benefits: "Increases printing order processing speed by 40% and keeps clients informed of order status."
            }
          ]
        },
        {
          officeName: "City Veterinary Services Office",
          bottlenecks: [
            { name: "Paper Animal Health Permits & Clearances", percentage: 85 },
            { name: "Manual Consultation Scheduling & Filing", percentage: 60 }
          ],
          digitalMaturityKPIs: {
            willingness: 85,
            trainingNeed: 45,
            budgetBarrier: 55
          },
          recommendations: [
            {
              problem: "Paper Animal Health Permits",
              solutions: ["Online Veterinary Permit App", "QR Code Security Verification"],
              benefits: "Cuts permit issuance time from days to minutes and facilitates instant authenticity inspections."
            }
          ]
        },
        {
          officeName: "NEX-GEN Realty",
          bottlenecks: [
            { name: "Scattered Property Listing Records", percentage: 72 },
            { name: "Slow Lead Response via Social Channels", percentage: 58 }
          ],
          digitalMaturityKPIs: {
            willingness: 95,
            trainingNeed: 30,
            budgetBarrier: 40
          },
          recommendations: [
            {
              problem: "Scattered Property Records",
              solutions: ["Centralized MLS Database", "Real Estate CRM Suite"],
              benefits: "Speeds up client matches and property searches by 60%."
            }
          ]
        },
        {
          officeName: "City Information Office - IT Division",
          bottlenecks: [
            { name: "Manual IT Support Ticketing", percentage: 82 },
            { name: "Lack of Consolidated Asset Tracking", percentage: 68 }
          ],
          digitalMaturityKPIs: {
            willingness: 95,
            trainingNeed: 20,
            budgetBarrier: 65
          },
          recommendations: [
            {
              problem: "Manual Support Ticketing",
              solutions: ["Automated Service Desk", "Knowledge Base Portal"],
              benefits: "Resolves IT service requests 3x faster and cuts phone calls."
            }
          ]
        }
      ]
    };
  });
  const [analysisError, setAnalysisError] = useState<string>("");

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

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setAnalysisError("");

    const reader = new FileReader();
    const fileNameLower = file.name.toLowerCase();
    const isImage = file.type.startsWith("image/") || 
                    fileNameLower.endsWith(".png") || 
                    fileNameLower.endsWith(".jpg") || 
                    fileNameLower.endsWith(".jpeg") || 
                    fileNameLower.endsWith(".webp") || 
                    fileNameLower.endsWith(".gif") || 
                    fileNameLower.endsWith(".heic") || 
                    fileNameLower.endsWith(".heif");
    
    let resolvedMime = file.type;
    if (isImage && !resolvedMime) {
      if (fileNameLower.endsWith(".png")) resolvedMime = "image/png";
      else if (fileNameLower.endsWith(".webp")) resolvedMime = "image/webp";
      else if (fileNameLower.endsWith(".heic")) resolvedMime = "image/heic";
      else if (fileNameLower.endsWith(".heif")) resolvedMime = "image/heif";
      else if (fileNameLower.endsWith(".gif")) resolvedMime = "image/gif";
      else resolvedMime = "image/jpeg";
    } else if (fileNameLower.endsWith(".pdf") && !resolvedMime) {
      resolvedMime = "application/pdf";
    }

    setFileMimeType(resolvedMime || "text/plain");

    if (resolvedMime === "application/pdf" || isImage) {
      reader.onload = (event) => {
        const result = event.target?.result as string;
        // Extract base64 representation from DataURL
        const base64 = result.split(",")[1] || "";
        setBinaryBase64(base64);
        setFileTextContent(""); // clear direct text input to avoid base64 code rendering
      };
      reader.onerror = () => {
        setAnalysisError(`Failed to read the ${isImage ? "image" : "PDF"} file. Please try again.`);
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setFileTextContent(text);
        setBinaryBase64(""); // clear binary
      };
      reader.onerror = () => {
        setAnalysisError("Failed to read the file. Please try again.");
      };
      reader.readAsText(file);
    }
  };

  // Run File Analysis trigger
  const runFileAnalysis = async () => {
    const isBinary = fileMimeType === "application/pdf" || fileMimeType.startsWith("image/");
    const dataToAnalyze = isBinary ? binaryBase64 : fileTextContent.trim();

    if (!dataToAnalyze) {
      setAnalysisError("Please upload a file or paste some data to analyze.");
      return;
    }

    setIsAnalyzingFile(true);
    setAnalysisError("");

    try {
      const response = await fetch("/api/admin/analyze-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileContent: dataToAnalyze,
          mimeType: fileMimeType,
          customPrompt: customPrompt.trim(),
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to parse analysis from BFO.");
      }

      const result = await response.json();
      setAnalysisResult(result);
      setSelectedOfficeIdx(0);
      localStorage.setItem("bfo_file_analysis_result", JSON.stringify(result));
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || "An unexpected error occurred during BFO analysis.");
    } finally {
      setIsAnalyzingFile(false);
    }
  };

  // Export Results to CSV format
  const exportToCsv = () => {
    if (!analysisResult) return;
    
    // Construct CSV rows
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Office/Department,Type,Topic/Problem,Recommended Solutions,Expected Benefit/Impact\n";
    
    // Add Summary report row
    const escapedSummary = (analysisResult.overallSummary || "").replace(/"/g, '""');
    const escapedTitle = (analysisResult.documentTitle || "BFO Multimodal Consulting Report").replace(/"/g, '""');
    csvContent += `Overall,Report Summary,"${escapedTitle}","N/A","${escapedSummary}"\n`;
    
    // Add Recommendations for each office if they exist
    if (analysisResult.offices && analysisResult.offices.length > 0) {
      analysisResult.offices.forEach((off: any) => {
        const escapedOffice = off.officeName.replace(/"/g, '""');
        
        // Add maturity metrics as rows
        csvContent += `"${escapedOffice}",Maturity Metrics,"Willingness: ${off.digitalMaturityKPIs?.willingness}% | Training: ${off.digitalMaturityKPIs?.trainingNeed}%","Budget Barrier: ${off.digitalMaturityKPIs?.budgetBarrier}%","N/A"\n`;
        
        off.recommendations?.forEach((rec: any) => {
          const escapedProblem = rec.problem.replace(/"/g, '""');
          const escapedSolutions = rec.solutions.join(" | ").replace(/"/g, '""');
          const escapedBenefits = rec.benefits.replace(/"/g, '""');
          csvContent += `"${escapedOffice}",Recommendation,"${escapedProblem}","${escapedSolutions}","${escapedBenefits}"\n`;
        });
      });
    }
    
    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BFO_Consulting_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Results to modern, clean PDF format with logo
  const exportToPdf = async () => {
    if (!analysisResult) return;
    
    try {
      // Load official logo image asynchronously
      const logoImg = await new Promise<HTMLImageElement | null>((resolve) => {
        const img = new window.Image();
        img.src = "/assets/images/logo.jpg";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = 15;

      const checkPageBreak = (heightNeeded: number) => {
        if (y + heightNeeded > pageHeight - 15) {
          doc.addPage();
          y = 15;
          // Draw header line on new page
          doc.setDrawColor(0, 71, 161);
          doc.setLineWidth(0.8);
          doc.line(15, y, pageWidth - 15, y);
          y += 8;
        }
      };

      // Header Banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, 40, "F");

      // Draw Logo centered inside a circle
      if (logoImg) {
        // Draw white circle background
        doc.setFillColor(255, 255, 255);
        doc.circle(25, 20, 12, "F");
        // Center the 16x16 image inside the 24mm diameter circle
        doc.addImage(logoImg, "JPEG", 17, 12, 16, 16);
      }

      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text("BFO CONSULTING DIAGNOSTICS", pageWidth - 15, 15, { align: "right" });
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(251, 140, 0); // Orange subtext
      doc.text("Automated Executive Summary & Digital Recommendations", pageWidth - 15, 20, { align: "right" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(156, 163, 175); // gray-400
      doc.text(`Document: ${analysisResult.documentTitle || "BFO Multimodal Consulting Report"}`, pageWidth - 15, 25, { align: "right" });
      doc.text(`Source: ${uploadedFile ? uploadedFile.name : "Simulated Seed Data"}`, pageWidth - 15, 29, { align: "right" });

      y = 48;

      // 1. Overall Executive Summary Section (on page 1)
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("BFO Overall Executive Summary & Report", 15, y);
      y += 6;

      const summaryLines = doc.splitTextToSize(analysisResult.overallSummary || "", pageWidth - 30);
      doc.setTextColor(51, 65, 85);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);

      summaryLines.forEach((line: string) => {
        checkPageBreak(5);
        // Clean line text
        const cleanLine = line.replace(/^\s*[#\-*]+\s+/, "").replace(/\*\*/g, "");
        doc.text(cleanLine, 15, y);
        y += 4.5;
      });

      y += 8;

      // Draw overall project scope parameters
      checkPageBreak(25);
      doc.setTextColor(71, 85, 105);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Consulting Project Parameters:", 15, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      doc.text(`• Document Title: ${analysisResult.documentTitle || "BFO Multimodal Report"}`, 18, y);
      doc.text(`• Source File: ${uploadedFile ? uploadedFile.name : "Simulated Seed Data"}`, 18, y + 4.5);
      doc.text(`• Scope Classification: ${analysisResult.offices?.length > 0 ? "Structured Dataset" : "General Document Analysis"}`, 18, y + 9);
      y += 18;

      // 2. Loop through each office and draw its page if offices exist
      if (analysisResult.offices && analysisResult.offices.length > 0) {
        analysisResult.offices.forEach((off: any, idx: number) => {
        doc.addPage();
        
        // Draw Header Banner on new page
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, pageWidth, 28, "F");

        // Small circular logo
        if (logoImg) {
          doc.setFillColor(255, 255, 255);
          doc.circle(22, 14, 8, "F");
          doc.addImage(logoImg, "JPEG", 16.5, 8.5, 11, 11);
        }

        // Header Title
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("BFO CONSULTING DIAGNOSTICS", pageWidth - 15, 12, { align: "right" });
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(251, 140, 0);
        doc.text(`Department Diagnostic: ${off.officeName}`, pageWidth - 15, 17, { align: "right" });
        doc.setTextColor(156, 163, 175);
        doc.text(`Part ${idx + 1} of ${analysisResult.offices.length}  |  Bislig City LGU`, pageWidth - 15, 21, { align: "right" });

        y = 36;

        // Bottlenecks & Digital Readiness charts (side-by-side)
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        doc.text("Operational Diagnostics & Digital Maturity", 15, y);
        y += 5;

        // Bottlenecks card (Left)
        const graphWidth = 90;
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.roundedRect(15, y, graphWidth, 34, 3, 3, "FD");

        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("Top Operational Bottlenecks", 19, y + 5.5);

        let barY = y + 12;
        off.bottlenecks?.forEach((item: any) => {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(7);
          doc.setTextColor(71, 85, 105);
          doc.text(`${item.name} (${item.percentage}%)`, 19, barY);
          
          // Background track
          doc.setFillColor(226, 232, 240);
          doc.rect(19, barY + 1.8, 80, 1.8, "F");
          
          // Fill bar
          doc.setFillColor(0, 71, 161);
          doc.rect(19, barY + 1.8, 80 * (item.percentage / 100), 1.8, "F");
          
          barY += 7.5;
        });

        // Digital Readiness card (Right)
        const metricsWidth = 85;
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(110, y, metricsWidth, 34, 3, 3, "FD");

        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("Digital Readiness Indicators", 114, y + 5.5);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(51, 65, 85);
        
        doc.text(` Willingness to Adopt Tools:      ${off.digitalMaturityKPIs?.willingness}%`, 114, y + 13);
        doc.text(` Needs Digital Training:            ${off.digitalMaturityKPIs?.trainingNeed}%`, 114, y + 20);
        doc.text(` Cites Budget Barrier:              ${off.digitalMaturityKPIs?.budgetBarrier}%`, 114, y + 27);

        y += 41;

        // Recommendations List for this Office
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("Recommended Digital Solutions Plan", 15, y);
        y += 5;

        off.recommendations?.forEach((rec: any, recIdx: number) => {
          const probText = `Problem #${recIdx + 1}: ${rec.problem || ""}`;
          const solText = `Recommended Solutions: ${(rec.solutions || []).join(", ")}`;
          const benText = `Expected Benefit: ${rec.benefits || ""}`;

          const probLines = doc.splitTextToSize(probText, pageWidth - 38);
          const solLines = doc.splitTextToSize(solText, pageWidth - 38);
          const benLines = doc.splitTextToSize(benText, pageWidth - 38);

          const recHeight = (probLines.length + solLines.length + benLines.length) * 4 + 11;

          checkPageBreak(recHeight);

          doc.setFillColor(248, 250, 252);
          doc.setDrawColor(226, 232, 240);
          doc.roundedRect(15, y, pageWidth - 30, recHeight, 3, 3, "FD");

          let insideY = y + 5.5;
          doc.setTextColor(225, 29, 72);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);
          probLines.forEach((line: string) => {
            doc.text(line, 19, insideY);
            insideY += 4;
          });

          doc.setTextColor(30, 41, 59);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          solLines.forEach((line: string) => {
            doc.text(line, 19, insideY);
            insideY += 4;
          });

          doc.setTextColor(3, 105, 161);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          benLines.forEach((line: string) => {
            doc.text(line, 19, insideY);
            insideY += 4;
          });

          y += recHeight + 5;
        });
      });
    }

      // Draw footers on all pages
      const totalPages = doc.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(15, pageHeight - 14, pageWidth - 15, pageHeight - 14);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text("Bislig City Tourism Office (BFO) Diagnostic Portal · Confidential Report", 15, pageHeight - 9);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - 15, pageHeight - 9, { align: "right" });
      }

      doc.save(`BFO_Consulting_Diagnostics_${Date.now()}.pdf`);
    } catch (error: any) {
      console.error("PDF generation error:", error);
      alert("PDF Export Error: " + (error?.message || error) + "\nStack: " + (error?.stack || "No stack trace"));
    }
  };

  // Reset File Analysis to seed data
  const handleResetAnalysis = () => {
    setUploadedFile(null);
    setFileTextContent("");
    setCustomPrompt("");
    setAnalysisError("");
    const defaultData = {
      organizationName: "Bislig City Local Government Unit",
      targetOffice: "Public Information & Tourism Operations",
      respondentCount: 27,
      analysisScope: "Digital Service Readiness & Administrative Efficiency",
      executiveSummary: "Based on 27 survey responses, the most common operational challenge is manual administrative work (74%), followed by slow customer response (53%). Most departments are willing to adopt digital tools (85%) but cite budget (60%) and training (40%) as primary barriers.",
      bottlenecks: [
        { name: "Manual Data Entry & Paper Filing", percentage: 74 },
        { name: "Slow Response in Frontline Inquiries", percentage: 53 },
        { name: "Lack of Centralized Records Management", percentage: 41 }
      ],
      digitalMaturityKPIs: {
        willingness: 85,
        trainingNeed: 40,
        budgetBarrier: 60
      },
      recommendations: [
        {
          problem: "Slow customer response",
          solutions: ["BFO Citizen Chatbot", "Public CRM System", "Auto Reply Desk"],
          benefits: "Improve response time by up to 90%."
        },
        {
          problem: "Manual administrative work",
          solutions: ["Zapier Cloud Automation", "Google Workspace Migration", "Digital Form Hub"],
          benefits: "Saves up to 15 hours of manual work per week."
        },
        {
          problem: "Limited marketing reach",
          solutions: ["Tourism Promotion Scheduler", "Targeted Tourist Campaigns", "SEO Optimizations"],
          benefits: "Increases tourism inquiries and organic traffic by 40%."
        }
      ]
    };
    setAnalysisResult(defaultData);
    localStorage.setItem("bfo_file_analysis_result", JSON.stringify(defaultData));
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
        
        {/* Admin Dashboard Tab Selector */}
        <div className="flex border-b border-slate-200 gap-1.5 pb-px">
          <button
            onClick={() => setActiveAdminTab("analytics")}
            className={`py-3 px-5 font-black text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === "analytics"
                ? "border-[#0047A1] text-[#0047A1]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Traffic Analytics</span>
          </button>
          <button
            onClick={() => setActiveAdminTab("consulting")}
            className={`py-3 px-5 font-black text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === "consulting"
                ? "border-[#0047A1] text-[#0047A1]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>BFO Consulting Analyst (Demo)</span>
          </button>
          <button
            onClick={() => setActiveAdminTab("roi")}
            className={`py-3 px-5 font-black text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === "roi"
                ? "border-[#0047A1] text-[#0047A1]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Calculator className="w-4 h-4 text-[#2D9B8B]" />
            <span>BFO ROI Calculator</span>
          </button>
        </div>

        {activeAdminTab === "analytics" && (
          <>
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
              <h3 className="text-xl md:text-2xl font-serif font-bold">BFO Geographic Demographic Analyzer</h3>
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
                  <span>{aiReport ? "Recalculate BFO Report" : "Generate BFO Analysis"}</span>
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
                  <span>Ask BFO Analytics Assistant</span>
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
      </>
    )}

    {activeAdminTab === "consulting" && (
      <div className="space-y-8 animate-fadeIn">
        
        {/* Dashboard Header Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full opacity-60 -z-10" />
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black tracking-wider uppercase text-slate-400">BFO CONSULTING WORKBENCH</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-black">BFO Executive Summary & Recommendations</h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Upload survey responses, spreadsheets, PDFs, or business reports to instantly extract high-impact executive summaries and digital solution recommendations.
            </p>
          </div>
          {analysisResult && (
            <button
              onClick={handleResetAnalysis}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Seed Demo</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: File Upload & Input Options */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold font-serif text-base mb-1.5">Step 1: Input Data Source</h3>
              <p className="text-[10px] text-slate-400">Upload a spreadsheet (CSV, Excel), PDF, text file, or paste text directly.</p>
            </div>

            {/* Drag and Drop File Area */}
            <div className="relative border-2 border-dashed border-slate-200 hover:border-[#0047A1]/40 rounded-2xl p-6 transition-all bg-slate-50/50 hover:bg-[#0047A1]/5 flex flex-col items-center justify-center text-center group cursor-pointer">
              <input
                type="file"
                accept=".csv,.xlsx,.xls,.txt,.json,.pdf,.png,.jpg,.jpeg,.webp"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="p-3 bg-white border border-slate-200 rounded-xl mb-3 text-slate-400 group-hover:text-[#0047A1] group-hover:scale-110 transition-all shadow-sm">
                {uploadedFile?.name.endsWith(".xlsx") || uploadedFile?.name.endsWith(".xls") ? (
                  <FileSpreadsheet className="w-8 h-8 text-emerald-500" />
                ) : uploadedFile?.name.endsWith(".pdf") ? (
                  <FileText className="w-8 h-8 text-rose-500" />
                ) : uploadedFile?.type.startsWith("image/") ? (
                  <Image className="w-8 h-8 text-sky-500" />
                ) : uploadedFile ? (
                  <FileText className="w-8 h-8 text-[#0047A1]" />
                ) : (
                  <UploadCloud className="w-8 h-8" />
                )}
              </div>
              
              {uploadedFile ? (
                <div>
                  <p className="text-xs font-bold text-slate-800 max-w-[240px] truncate">{uploadedFile.name}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{(uploadedFile.size / 1024).toFixed(1)} KB · Click to change file</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold text-slate-700">Choose File or Drag Here</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">Supports CSV, Excel, PDF, Images (PNG, JPG, WebP), TXT, JSON</p>
                </div>
              )}
            </div>

            {/* Text Area or Binary File Preview Container */}
            {uploadedFile && (fileMimeType === "application/pdf" || fileMimeType.startsWith("image/")) ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">File Payload Preview</label>
                  <button 
                    onClick={() => { setUploadedFile(null); setBinaryBase64(""); setFileMimeType("text/plain"); }}
                    className="text-[9px] text-rose-500 hover:underline font-bold cursor-pointer"
                  >
                    Remove File
                  </button>
                </div>
                
                {binaryBase64 && fileMimeType.startsWith("image/") && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                    <img 
                      src={`data:${fileMimeType};base64,${binaryBase64}`} 
                      alt="Uploaded preview" 
                      className="max-h-48 rounded-xl object-contain border border-slate-200/80 shadow-md animate-fadeIn"
                    />
                    <span className="text-[9px] font-black uppercase tracking-wider text-sky-600 mt-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                      Image loaded for BFO analysis
                    </span>
                  </div>
                )}

                {fileMimeType === "application/pdf" && (
                  <div className="p-4 bg-rose-50/40 border border-rose-100 rounded-2xl flex items-center gap-3">
                    <FileText className="w-8 h-8 text-rose-500 shrink-0" />
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-rose-600">Document Loaded</span>
                      <p className="text-xs font-bold text-slate-700">PDF Document ready for BFO analysis</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Or Paste Raw Data Directly</label>
                  {fileTextContent && (
                    <button 
                      onClick={() => { setUploadedFile(null); setFileTextContent(""); }}
                      className="text-[9px] text-rose-500 hover:underline font-bold"
                    >
                      Clear Data
                    </button>
                  )}
                </div>
                <textarea
                  value={fileTextContent}
                  onChange={(e) => setFileTextContent(e.target.value)}
                  placeholder="Paste surveys responses, review columns, list of challenges, or client feedback here..."
                  rows={6}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs outline-none focus:border-[#0047A1] focus:ring-1 focus:ring-[#0047A1] transition-colors resize-none placeholder-slate-400"
                />
              </div>
            )}

            {/* Step 2: Custom Prompt/Directive (Optional) */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <div>
                <h3 className="font-bold font-serif text-base mb-1">Step 2: BFO Directive (Optional)</h3>
                <p className="text-[10px] text-slate-400">Guide the BFO model or ask a question regarding the dataset.</p>
              </div>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., 'What is the main bottleneck reported by employees?' or 'Focus the solutions strictly on low-cost open-source tools.'"
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs outline-none focus:border-[#0047A1] focus:ring-1 focus:ring-[#0047A1] transition-colors resize-none placeholder-slate-400"
              />
            </div>

            {analysisError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 font-semibold">
                ⚠️ {analysisError}
              </div>
            )}

            {/* Submit Trigger Button */}
            <button
              onClick={runFileAnalysis}
              disabled={isAnalyzingFile || !(fileMimeType === "application/pdf" || fileMimeType.startsWith("image/") ? binaryBase64 : fileTextContent.trim())}
              className="w-full bg-gradient-to-r from-[#0047A1] to-[#0097A7] hover:opacity-90 disabled:opacity-40 text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-sky-500/10 flex items-center justify-center gap-2"
            >
              {isAnalyzingFile ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>BFO is Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run BFO Intelligence</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Beautiful Interactive Results */}
          <div className="lg:col-span-7 space-y-6">
            
            {isAnalyzingFile ? (
              <div className="bg-white p-12 rounded-3xl border border-slate-200/60 shadow-sm text-center space-y-6 min-h-[420px] flex flex-col justify-center items-center">
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#0047A1]/10 rounded-full animate-ping" />
                  <div className="w-12 h-12 bg-gradient-to-r from-[#0047A1] to-[#0097A7] text-white rounded-full flex items-center justify-center shadow-lg relative">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-4 max-w-sm w-full">
                  <div className="space-y-2">
                    <h4 className="font-bold text-base text-slate-800 animate-pulse">Running Digital Diagnostic</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      BFO is compiling survey clusters, formulating strategic solutions, and projecting implementation benefits...
                    </p>
                  </div>

                  {/* Premium Loading Bar */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      <span>Analyzing Document Layout</span>
                      <span className="font-mono text-[#0047A1]">{fileProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/40">
                      <div
                        className="bg-gradient-to-r from-[#0047A1] to-[#0097A7] h-full rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${fileProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="w-full max-w-xs bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="text-[10px] text-slate-400 font-mono">Status: Synthesizing records</span>
                </div>
              </div>
            ) : analysisResult ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Export Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 px-6 rounded-3xl border border-slate-200/60 shadow-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-800">Diagnostics Generated</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={exportToCsv}
                      className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm border border-slate-200"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      onClick={exportToPdf}
                      className="flex items-center gap-1.5 bg-[#0047A1] hover:bg-[#003c8f] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/10"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export PDF Report</span>
                    </button>
                  </div>
                </div>

                {/* Organization/Document Details Panel */}
                <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-3xl space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/60 pb-4">
                    <div className="max-w-xl">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#0047A1] block mb-0.5">Document Title / Topic</span>
                      <h2 className="text-base font-black text-slate-800 leading-tight">
                        {analysisResult.documentTitle || "BFO Multimodal Consulting Analysis Report"}
                      </h2>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shrink-0 border border-emerald-100 shadow-sm self-start md:self-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Active Diagnostics</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Analysis Classification</span>
                      <span className="font-bold text-slate-700 block mt-0.5">
                        {analysisResult.offices && analysisResult.offices.length > 0 
                          ? "Structured Survey Dataset" 
                          : "General Multimodal Analysis"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Source Payload</span>
                      <span className="font-bold text-slate-700 block mt-0.5">
                        {uploadedFile ? uploadedFile.name : "Simulated Seed Data"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Executive Summary & Detailed Report Card */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full" />
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-100">01</div>
                    <div>
                      <h3 className="font-bold font-serif text-base text-slate-800 leading-none">BFO Intelligence Consulting Report</h3>
                      <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest mt-1">Detailed Findings & Synthesis</p>
                    </div>
                  </div>

                  <div className="text-slate-600 text-xs md:text-sm leading-relaxed border-l-4 border-amber-500 pl-4 py-1.5 bg-amber-50/10 rounded-r-xl pr-2 space-y-1">
                    {renderMarkdown(analysisResult.overallSummary)}
                  </div>
                </div>

                {analysisResult.offices && analysisResult.offices.length > 0 && (
                  <div className="space-y-8">
                    {/* Office Breakdown Selector Tab bar */}
                <div className="space-y-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block px-1">Select Office/Department Diagnostics</span>
                  <div className="bg-white p-2 rounded-2xl border border-slate-200/60 shadow-sm flex flex-wrap gap-1.5">
                    {analysisResult.offices?.map((off: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedOfficeIdx(idx)}
                        className={`px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          selectedOfficeIdx === idx
                            ? "bg-[#0047A1] text-white shadow-md shadow-blue-500/10"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        {off.officeName}
                      </button>
                    ))}
                  </div>
                </div>

                {(() => {
                  const activeOffice = analysisResult.offices?.[selectedOfficeIdx] || analysisResult.offices?.[0];
                  if (!activeOffice) return null;
                  
                  return (
                    <>
                      {/* Diagnostics Infographics Panel for Active Office */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 animate-fadeIn">
                        {/* Top Bottlenecks Bar Graph (7 cols) */}
                        <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                              {activeOffice.officeName} Metrics
                            </span>
                            <h4 className="font-bold text-xs text-slate-800">Top Operational Bottlenecks</h4>
                          </div>
                          
                          <div className="space-y-3">
                            {activeOffice.bottlenecks?.map((item: any, idx: number) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                                  <span className="truncate max-w-[200px]">{item.name}</span>
                                  <span className="text-[#0047A1] font-mono">{item.percentage}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-[#0047A1] to-[#0097A7] rounded-full transition-all duration-500" 
                                    style={{ width: `${item.percentage}%` }} 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Digital Maturity Indicator Blocks (5 cols) */}
                        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between gap-4">
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Readiness Check</span>
                            <h4 className="font-bold text-xs text-slate-800">Digital Maturity KPIs</h4>
                          </div>

                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between bg-emerald-50/40 border border-emerald-100 p-2 px-3 rounded-xl">
                              <span className="text-[10px] font-bold text-slate-600">Willingness to Adopt</span>
                              <span className="text-xs font-black text-emerald-700">{activeOffice.digitalMaturityKPIs?.willingness}%</span>
                            </div>
                            <div className="flex items-center justify-between bg-amber-50/40 border border-amber-100 p-2 px-3 rounded-xl">
                              <span className="text-[10px] font-bold text-slate-600">Training Needed</span>
                              <span className="text-xs font-black text-amber-700">{activeOffice.digitalMaturityKPIs?.trainingNeed}%</span>
                            </div>
                            <div className="flex items-center justify-between bg-rose-50/40 border border-rose-100 p-2 px-3 rounded-xl">
                              <span className="text-[10px] font-bold text-slate-600">Budget Barrier</span>
                              <span className="text-xs font-black text-rose-700">{activeOffice.digitalMaturityKPIs?.budgetBarrier}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recommendation Engine Card */}
                      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs shrink-0 border border-sky-100">02</div>
                          <div>
                            <h3 className="font-bold font-serif text-base text-slate-800 leading-none">BFO Solution Recommendations</h3>
                            <p className="text-[9px] font-bold text-sky-600 uppercase tracking-widest mt-1">
                              Custom Blueprints for {activeOffice.officeName}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-5">
                          {activeOffice.recommendations?.map((rec: any, idx: number) => (
                            <div key={idx} className="p-5 bg-slate-50 border border-slate-200/50 rounded-2xl space-y-4 hover:border-[#0047A1]/20 transition-all hover:bg-white hover:shadow-md animate-fadeIn">
                              
                              {/* Identified Problem */}
                              <div>
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Identified Problem</span>
                                <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                  <span>{rec.problem}</span>
                                </span>
                              </div>

                              {/* Recommended Solutions */}
                              <div>
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-2">Recommended Digital Solutions</span>
                                <div className="flex flex-wrap gap-2">
                                  {rec.solutions?.map((sol: string, sIdx: number) => (
                                    <span key={sIdx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                      <Check className="w-3 h-3 text-emerald-600" />
                                      <span>{sol}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Expected Benefits */}
                              <div className="bg-sky-50/50 border border-sky-100 p-3.5 rounded-xl text-slate-600 flex items-start gap-2.5">
                                <TrendingUp className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-[9px] font-black uppercase tracking-wider text-sky-700 block mb-0.5">Expected Benefit</span>
                                  <p className="text-xs font-semibold text-slate-700">{rec.benefits}</p>
                                </div>
                              </div>

                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
                  </div>
                )}

              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-slate-200/60 shadow-sm text-center space-y-4 min-h-[420px] flex flex-col justify-center items-center">
                <UploadCloud className="w-12 h-12 text-slate-300" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-700">Awaiting Business Data</h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Configure your data sources and prompts on the left, then trigger BFO to render consulting recommendations.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    )}

    {activeAdminTab === "roi" && (
      <BfoRoiCalculator />
    )}

  </div>
</div>
  );
}

// ============================================================================
// BFO ROI CALCULATOR COMPONENT
// ============================================================================
function BfoRoiCalculator() {
  const [bfoTool, setBfoTool] = useState<"portal" | "chatbot" | "crm" | "suite">("portal");
  const [monthlyVolume, setMonthlyVolume] = useState<number>(2500);
  const [manualTime, setManualTime] = useState<number>(20);
  const [employeeWage, setEmployeeWage] = useState<number>(150);
  const [monthlyCost, setMonthlyCost] = useState<number>(5000);
  const [oneTimeInvestment, setOneTimeInvestment] = useState<number>(50000);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [strategyReport, setStrategyReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Efficiency factor based on tool selection
  const efficiency = useMemo(() => {
    switch (bfoTool) {
      case "portal": return 0.75;
      case "chatbot": return 0.85;
      case "crm": return 0.60;
      case "suite": return 0.80;
    }
  }, [bfoTool]);

  // Real-time calculations
  const hoursSaved = useMemo(() => {
    return Math.round(monthlyVolume * (manualTime / 60) * efficiency);
  }, [monthlyVolume, manualTime, efficiency]);

  const grossMonthlySavings = useMemo(() => {
    return Math.round(hoursSaved * employeeWage);
  }, [hoursSaved, employeeWage]);

  const netMonthlySavings = useMemo(() => {
    return grossMonthlySavings - monthlyCost;
  }, [grossMonthlySavings, monthlyCost]);

  const paybackPeriod = useMemo(() => {
    if (netMonthlySavings <= 0) return "Never";
    return (oneTimeInvestment / netMonthlySavings).toFixed(1);
  }, [oneTimeInvestment, netMonthlySavings]);

  const year1Roi = useMemo(() => {
    if (netMonthlySavings <= 0) return 0;
    const year1Savings = (netMonthlySavings * 12) - oneTimeInvestment;
    return Math.round((year1Savings / oneTimeInvestment) * 100);
  }, [netMonthlySavings, oneTimeInvestment]);

  // 5-Year Cumulative Savings projection list
  const cumulativeProjections = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const year = i + 1;
      const totalSavings = netMonthlySavings * 12 * year;
      const netSavings = totalSavings - oneTimeInvestment;
      return { year, netSavings };
    });
  }, [netMonthlySavings, oneTimeInvestment]);

  // Simulated progress bar effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) {
            clearInterval(interval);
            return 98;
          }
          return prev + Math.floor(Math.random() * 6) + 3;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Call BFO Intelligence to generate full strategic report
  const generateAiReport = async () => {
    setIsGenerating(true);
    setError(null);
    setStrategyReport(null);

    const prompt = `
Generate a highly detailed, professional BFO digital transformation ROI strategy audit for Bislig City.
Use these input parameters:
- Implemented System: BFO ${bfoTool.toUpperCase()} (Efficiency Gain: ${efficiency * 100}%)
- Monthly Requests/Transactions: ${monthlyVolume} transactions
- Avg. Manual Time: ${manualTime} minutes per transaction
- Average Staff Hourly Wage: ₱${employeeWage} PHP/hour
- BFO Monthly Licensing/Support: ₱${monthlyCost} PHP/month
- One-Time Setup & Training Cost: ₱${oneTimeInvestment} PHP

Calculations:
- Monthly Hours Reclaimed: ${hoursSaved} hours
- Monthly Net Savings: ₱${netMonthlySavings.toLocaleString()} PHP
- Payback Period: ${paybackPeriod} months
- Year 1 Net ROI: ${year1Roi}%

Generate a comprehensive 4-section report formatted in standard clean markdown:
1. Executive Summary: Explain the organizational significance of adopting the BFO ${bfoTool} suite for Bislig City, focusing on modern citizen service delivery.
2. Financial Feasibility Analysis: Detail why the payback period of ${paybackPeriod} months is highly viable and evaluate the 5-year savings projection.
3. Operational Restructuring & Reinvestment: Reclaiming ${hoursSaved} hours/month frees up extensive staff time. Suggest exactly how to upskill or reallocate these staff hours to high-value community projects.
4. 5-Year Strategic Scale Roadmap: Provide a chronological guide (Year 1 to Year 5) to expand these systems across all local services.
`;

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ sender: "user", text: prompt }]
        })
      });

      if (!res.ok) throw new Error("Server failed to respond to ROI analysis request.");
      const data = await res.json();
      setProgress(100);
      setStrategyReport(data.reply);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to communicate with BFO Intelligence. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      {/* Left Input Configuration Panel (5 cols) */}
      <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase block mb-1">CONFIGURATION CONTROL</span>
          <h2 className="text-xl font-serif font-black text-[#0047A1]">BFO ROI Parameters</h2>
          <p className="text-[11px] text-slate-500">Adjust the inputs below to calculate real-time savings and productivity gains.</p>
        </div>

        {/* BFO Tool Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">1. Select BFO Digital Solution</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "portal", label: "BFO Portal", desc: "Citizen Portal (75% speedup)" },
              { id: "chatbot", label: "BFO Chatbot", desc: "AI Concierge (85% speedup)" },
              { id: "crm", label: "BFO CRM", desc: "Feedback Desk (60% speedup)" },
              { id: "suite", label: "Custom Suite", desc: "Complete Suite (80% speedup)" }
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setBfoTool(tool.id as any)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  bfoTool === tool.id
                    ? "border-[#0047A1] ring-2 ring-[#0047A1]/20 bg-white"
                    : "border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300"
                }`}
              >
                <span className="font-extrabold text-xs text-slate-800">{tool.label}</span>
                <span className="text-[9px] text-slate-400 mt-1 leading-tight">{tool.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Volume Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider">2. Monthly Transaction Volume</label>
            <span className="text-xs font-mono font-bold text-[#0047A1] bg-blue-50 px-2 py-0.5 rounded-md">{monthlyVolume.toLocaleString()} requests</span>
          </div>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={monthlyVolume}
            onChange={(e) => setMonthlyVolume(Number(e.target.value))}
            className="w-full accent-[#0047A1] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-bold font-mono">
            <span>100</span>
            <span>5,000</span>
            <span>10,000</span>
          </div>
        </div>

        {/* Manual Time Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider">3. Avg. Time per Request (Manual)</label>
            <span className="text-xs font-mono font-bold text-[#0047A1] bg-blue-50 px-2 py-0.5 rounded-md">{manualTime} mins</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            step="1"
            value={manualTime}
            onChange={(e) => setManualTime(Number(e.target.value))}
            className="w-full accent-[#0047A1] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-bold font-mono">
            <span>5 mins</span>
            <span>30 mins</span>
            <span>60 mins</span>
          </div>
        </div>

        {/* Staff Hourly Wage Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider">4. Average Employee Hourly Wage</label>
            <span className="text-xs font-mono font-bold text-[#0047A1] bg-blue-50 px-2 py-0.5 rounded-md">₱{employeeWage} / hr</span>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={employeeWage}
            onChange={(e) => setEmployeeWage(Number(e.target.value))}
            className="w-full accent-[#0047A1] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-bold font-mono">
            <span>₱50/hr</span>
            <span>₱250/hr</span>
            <span>₱500/hr</span>
          </div>
        </div>

        {/* Monthly Licensing Cost */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider">5. BFO Monthly Licensing Cost</label>
            <span className="text-xs font-mono font-bold text-[#0047A1] bg-blue-50 px-2 py-0.5 rounded-md">₱{monthlyCost.toLocaleString()} / mo</span>
          </div>
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={monthlyCost}
            onChange={(e) => setMonthlyCost(Number(e.target.value))}
            className="w-full accent-[#0047A1] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-bold font-mono">
            <span>₱1,000</span>
            <span>₱10,000</span>
            <span>₱20,000</span>
          </div>
        </div>

        {/* One-Time setup Investment */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider">6. One-Time Setup & Training Investment</label>
            <span className="text-xs font-mono font-bold text-[#0047A1] bg-blue-50 px-2 py-0.5 rounded-md">₱{oneTimeInvestment.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="10000"
            max="200000"
            step="5000"
            value={oneTimeInvestment}
            onChange={(e) => setOneTimeInvestment(Number(e.target.value))}
            className="w-full accent-[#0047A1] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-bold font-mono">
            <span>₱10,000</span>
            <span>₱100,000</span>
            <span>₱200,000</span>
          </div>
        </div>
      </div>

      {/* Right Outputs and SVG Projection Graph Panel (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Real-time KPIs cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Monthly Net Savings</span>
            <span className={`text-sm font-extrabold font-mono ${netMonthlySavings >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
              {netMonthlySavings >= 0 ? "+" : ""}₱{netMonthlySavings.toLocaleString()}
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Hours Reclaimed</span>
            <span className="text-sm font-extrabold text-indigo-600 font-mono">
              {hoursSaved} hrs/mo
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Payback Period</span>
            <span className="text-sm font-extrabold text-amber-600 font-mono">
              {paybackPeriod} {paybackPeriod !== "Never" ? "Months" : ""}
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Year 1 Net ROI</span>
            <span className="text-sm font-extrabold text-[#2D9B8B] font-mono">
              {year1Roi}%
            </span>
          </div>
        </div>

        {/* 5-Year Profit SVG Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
          <div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">FINANCIAL TIMELINE</span>
            <h4 className="font-bold text-xs text-slate-800">5-Year Cumulative Profit/Savings Trend</h4>
          </div>

          <div className="h-64 flex flex-col justify-between border-b border-slate-100 pb-2">
            <svg viewBox="0 0 500 220" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#cbd5e1" strokeWidth="1.5" /> {/* Baseline 0 */}
              <line x1="40" y1="170" x2="480" y2="170" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />

              {/* Baseline indicator text */}
              <text x="12" y="123" fill="#94a3b8" fontSize="8" fontFamily="monospace">₱0</text>

              {/* Render Bars */}
              {cumulativeProjections.map((proj, idx) => {
                const x = 70 + idx * 85;
                const barWidth = 40;
                
                // Scale net savings to fit 100 height (above or below baseline)
                // Baseline 0 is at y = 120. Scale factor represents maximum height of 80px.
                const maxSavings = Math.max(...cumulativeProjections.map(p => Math.abs(p.netSavings)), 100000);
                const barHeight = (proj.netSavings / maxSavings) * 80;
                const y = barHeight >= 0 ? 120 - barHeight : 120;
                const absHeight = Math.max(Math.abs(barHeight), 3); // minimum height
                const fillClass = proj.netSavings >= 0 ? "fill-emerald-500" : "fill-rose-400";
                
                return (
                  <g key={idx} className="group cursor-pointer">
                    <rect 
                      x={x - 10} 
                      y="10" 
                      width={barWidth + 20} 
                      height="200" 
                      fill="transparent" 
                    />
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={absHeight}
                      rx={4}
                      className={`${fillClass} transition-all duration-500 hover:opacity-85`}
                    />
                    <text
                      x={x + barWidth / 2}
                      y={proj.netSavings >= 0 ? y - 6 : y + absHeight + 12}
                      textAnchor="middle"
                      fill={proj.netSavings >= 0 ? "#0f766e" : "#e11d48"}
                      fontSize="8"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {proj.netSavings >= 0 ? "+" : ""}
                      {Math.round(proj.netSavings / 1000)}k
                    </text>
                    <text
                      x={x + barWidth / 2}
                      y="215"
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="9"
                      fontWeight="extrabold"
                    >
                      Year {proj.year}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded" /> Net Positive Profit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-rose-400 rounded" /> Outstanding Debt (Amortization)
            </span>
          </div>
        </div>

        {/* AI report generation section */}
        <div className="bg-slate-900 border border-white/10 p-6 md:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FB8C00]/10 rounded-bl-full opacity-60 -z-10" />

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold font-serif text-lg text-white">BFO AI Strategic Financial Audit</h3>
              <p className="text-[10px] text-slate-400">Generate a custom 5-year digital transformation roadmap based on these metrics</p>
            </div>
          </div>

          {isGenerating ? (
            <div className="bg-black/30 p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-full max-w-xs h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FB8C00] to-amber-300 rounded-full transition-all duration-300 shadow-lg"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">
                BFO Intelligence modeling strategy... {progress}%
              </span>
            </div>
          ) : strategyReport ? (
            <div className="space-y-4">
              <div className="bg-black/30 p-5 rounded-2xl border border-white/5 max-h-96 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300 font-sans shadow-inner scrollbar-thin">
                {strategyReport.split("\n\n").map((para, pIdx) => {
                  if (para.startsWith("#")) {
                    const level = para.match(/^#+/)?.[0].length || 1;
                    const text = para.replace(/^#+\s*/, "");
                    const hClasses = level === 1 
                      ? "text-sm font-serif font-black text-[#FB8C00] border-b border-white/10 pb-1.5 mt-4 first:mt-0"
                      : "text-xs font-bold text-white mt-3";
                    return React.createElement(`h${Math.min(level + 2, 6)}` as any, { key: pIdx, className: hClasses }, text);
                  }
                  
                  if (para.startsWith("- ") || para.startsWith("* ")) {
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-1 mt-1 text-slate-400">
                        {para.split("\n").map((li, lIdx) => (
                          <li key={lIdx}>{li.replace(/^[\-\*]\s*/, "")}</li>
                        ))}
                      </ul>
                    );
                  }

                  return <p key={pIdx} className="text-slate-300">{para}</p>;
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={generateAiReport}
                  className="flex-grow bg-white/10 border border-white/15 hover:bg-white/20 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Recalculate & Re-Generate
                </button>
                <button
                  onClick={() => {
                    const doc = new jsPDF();
                    doc.setFont("Helvetica", "bold");
                    doc.text("BFO Digital Transformation ROI Audit", 20, 20);
                    doc.setFontSize(10);
                    doc.setFont("Helvetica", "normal");
                    doc.text(`Solution Type: BFO ${bfoTool.toUpperCase()}`, 20, 30);
                    doc.text(`Monthly Volume: ${monthlyVolume.toLocaleString()} requests`, 20, 35);
                    doc.text(`Hours Reclaimed: ${hoursSaved} hrs/mo`, 20, 40);
                    doc.text(`Net Monthly Savings: PHP ${netMonthlySavings.toLocaleString()}`, 20, 45);
                    doc.text(`Year 1 Net ROI: ${year1Roi}%`, 20, 50);

                    // Add content line by line
                    let y = 65;
                    doc.setFont("Helvetica", "bold");
                    doc.text("Strategic Audit Recommendations:", 20, 60);
                    doc.setFont("Helvetica", "normal");
                    const lines = doc.splitTextToSize(strategyReport || "", 170);
                    lines.forEach((line: string) => {
                      if (y > 275) {
                        doc.addPage();
                        y = 20;
                      }
                      doc.text(line, 20, y);
                      y += 6;
                    });
                    doc.save(`BFO_ROI_Strategy_${bfoTool}.pdf`);
                  }}
                  className="bg-[#FB8C00] text-slate-900 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#d69f00] transition-all cursor-pointer"
                >
                  Export Strategic PDF
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3.5 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}
              
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Run BFO intelligence to generate a full, executive strategic analysis on operational upskilling routes, budget allocations, and year-by-year scaling milestones.
              </p>

              <button
                onClick={generateAiReport}
                className="w-full bg-[#FB8C00] text-slate-900 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#e68000] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/10"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Generate BFO Strategic Financial Report</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
