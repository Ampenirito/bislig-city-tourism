import React, { useState, useEffect, useMemo } from "react";
import { 
  Lock, Eye, EyeOff, BarChart2, Users, MapPin, Globe, Sparkles, 
  Search, RefreshCw, Terminal, Activity, ArrowUpRight, TrendingUp,
  UserCheck, ShieldCheck, Download, PlusCircle, ArrowLeft, Send, Check,
  FileSpreadsheet, UploadCloud, FileText, CheckCircle, Image
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
  const [activeAdminTab, setActiveAdminTab] = useState<"analytics" | "consulting">("analytics");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileTextContent, setFileTextContent] = useState<string>("");
  const [fileMimeType, setFileMimeType] = useState<string>("text/plain");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isAnalyzingFile, setIsAnalyzingFile] = useState<boolean>(false);
  const [selectedOfficeIdx, setSelectedOfficeIdx] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<any>(() => {
    const saved = localStorage.getItem("bfo_file_analysis_result");
    return saved ? JSON.parse(saved) : {
      organizationName: "Bislig City Local Government Unit",
      analysisScope: "Digital Service Readiness & Administrative Efficiency",
      executiveSummary: "Based on survey responses across multiple departments and local businesses, we identified shared bottlenecks in manual administrative workflows and response times. The BFO Diagnostics Workbench recommends division-specific online forms, QR-coded permit verification systems, and print cue scheduling tools to streamline local operations.",
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

    if (resolvedMime === "application/pdf" || isImage) {
      reader.onload = (event) => {
        const result = event.target?.result as string;
        // Extract base64 representation from DataURL
        const base64 = result.split(",")[1] || "";
        setFileTextContent(base64);
        setFileMimeType(resolvedMime || (isImage ? "image/png" : "application/pdf"));
      };
      reader.onerror = () => {
        setAnalysisError(`Failed to read the ${isImage ? "image" : "PDF"} file. Please try again.`);
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setFileTextContent(text);
        setFileMimeType(resolvedMime || "text/plain");
      };
      reader.onerror = () => {
        setAnalysisError("Failed to read the file. Please try again.");
      };
      reader.readAsText(file);
    }
  };

  // Run File Analysis trigger
  const runFileAnalysis = async () => {
    const dataToAnalyze = fileTextContent.trim();
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
        throw new Error("Failed to parse analysis from Gemini.");
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
    
    // Add Executive Summary row
    const escapedSummary = analysisResult.executiveSummary.replace(/"/g, '""');
    csvContent += `Overall,Executive Summary,"General Synthesis","N/A","${escapedSummary}"\n`;
    
    // Add Recommendations for each office
    analysisResult.offices?.forEach((off: any) => {
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
        const img = new Image();
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
      doc.text(`Organization: ${analysisResult.organizationName || "Bislig Local Enterprise Survey Group"}`, pageWidth - 15, 25, { align: "right" });
      doc.text(`Scope: ${analysisResult.analysisScope || "Operational Efficiency"}`, pageWidth - 15, 29, { align: "right" });

      y = 48;

      // 1. Overall Executive Summary Section (on page 1)
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("BFO Overall Executive Summary", 15, y);
      y += 5;

      const summaryLines = doc.splitTextToSize(analysisResult.executiveSummary, pageWidth - 38);
      const cardHeight = summaryLines.length * 4.5 + 8;
      
      doc.setFillColor(250, 250, 250); // slate-50
      doc.setDrawColor(241, 140, 0); // orange border
      doc.setLineWidth(0.5);
      doc.roundedRect(15, y, pageWidth - 30, cardHeight, 3, 3, "FD");

      doc.setTextColor(51, 65, 85);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9.5);
      let textY = y + 6;
      summaryLines.forEach((line: string) => {
        doc.text(line, 19, textY);
        textY += 4.5;
      });

      y += cardHeight + 12;

      // Draw overall project scope
      doc.setTextColor(71, 85, 105);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Consulting Project Parameters:", 15, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      doc.text(`• LGU Entity / Client: ${analysisResult.organizationName || "Bislig City LGU"}`, 18, y);
      doc.text(`• Project Scope Focus: ${analysisResult.analysisScope || "Operational Diagnostics"}`, 18, y + 4.5);
      doc.text(`• Departments Analyzed: ${analysisResult.offices?.length || 0} Offices / Businesses`, 18, y + 9);

      // 2. Loop through each office and draw its page
      analysisResult.offices?.forEach((off: any, idx: number) => {
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
          const probText = `Problem #${recIdx + 1}: ${rec.problem}`;
          const solText = `Recommended Solutions: ${rec.solutions.join(", ")}`;
          const benText = `Expected Benefit: ${rec.benefits}`;

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
    } catch (error) {
      console.error("PDF generation error:", error);
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
        </div>

        {activeAdminTab === "analytics" ? (
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
    ) : (
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

            {/* Text Area for Direct Data Entry */}
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

            {/* Step 2: Custom Prompt/Directive (Optional) */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <div>
                <h3 className="font-bold font-serif text-base mb-1">Step 2: BFO Directive (Optional)</h3>
                <p className="text-[10px] text-slate-400">Guide the Gemini model or ask a question regarding the dataset.</p>
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
              disabled={isAnalyzingFile || !fileTextContent.trim()}
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
                <div className="space-y-2 max-w-sm">
                  <h4 className="font-bold text-base text-slate-800 animate-pulse">Running Digital Diagnostic</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Gemini is compiling survey clusters, formulating strategic solutions, and projecting implementation benefits...
                  </p>
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

                {/* Organization Details Panel */}
                <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-3xl space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/60 pb-4">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#0047A1] block mb-0.5">Target Organization / Entity</span>
                      <h2 className="text-base font-black text-slate-800">
                        {analysisResult.organizationName || "Bislig Local Enterprise Survey Group"}
                      </h2>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shrink-0 border border-emerald-100 shadow-sm self-start md:self-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Active Diagnostics</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Analysis Scope Focus</span>
                      <span className="font-bold text-slate-700 block mt-0.5">{analysisResult.analysisScope || "Operational Efficiency"}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Scope Size</span>
                      <span className="font-bold text-slate-700 block mt-0.5">{analysisResult.offices?.length || 0} Distinct Offices Analyzed</span>
                    </div>
                  </div>
                </div>

                {/* Executive Summary Card */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full" />
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-100">01</div>
                    <div>
                      <h3 className="font-bold font-serif text-base text-slate-800 leading-none">BFO Executive Summary</h3>
                      <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest mt-1">High Impact Synthesis</p>
                    </div>
                  </div>

                  <div className="text-slate-600 text-xs md:text-sm leading-relaxed border-l-4 border-amber-500 pl-4 py-1 italic bg-amber-50/20 rounded-r-xl pr-2">
                    "{analysisResult.executiveSummary}"
                  </div>
                </div>

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
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-slate-200/60 shadow-sm text-center space-y-4 min-h-[420px] flex flex-col justify-center items-center">
                <UploadCloud className="w-12 h-12 text-slate-300" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-700">Awaiting Business Data</h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Configure your data sources and prompts on the left, then trigger Gemini to render consulting recommendations.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    )}

  </div>
</div>
  );
}
