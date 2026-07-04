import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "motion/react";
import { jsPDF } from "jspdf";
import {
  Compass,
  MapPin,
  Calendar,
  Utensils,
  Hotel,
  Image as ImageIcon,
  BookOpen,
  Info,
  Phone,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Heart,
  Share2,
  Download,
  Sparkles,
  Map as MapIcon,
  Plus,
  Minus,
  Trash2,
  Printer,
  Calculator,
  AlertCircle,
  ExternalLink,
  Accessibility,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSun,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Globe,
  X,
  Send,
  HelpCircle,
  CheckCircle2,
  Check,
  Menu,
  Star,
  Facebook,
  Mail,
  ChevronDown
} from "lucide-react";

import {
  ATTRACTIONS,
  ACCOMMODATIONS,
  RESTAURANTS,
  EVENTS,
  GALLERY_ITEMS,
  BLOG_POSTS,
  FAQS,
  ESTABLISHMENTS
} from "./data";

import {
  Attraction,
  Accommodation,
  Restaurant,
  TripPreference,
  GeneratedItinerary,
  SavedItinerary,
  Establishment
} from "./types";

import GoogleMapSection from "./components/GoogleMapSection";
import AiChatbot from "./components/AiChatbot";
import TravelChecklist from "./components/TravelChecklist";
import ImageCarousel from "./components/ImageCarousel";
import AdminDashboard from "./components/AdminDashboard";
import CarRental from "./components/CarRental";

const ATTRACTION_PHOTOS: Record<string, string[]> = {
  "tinuyan-falls": [
    "/assets/images/Tinuy.an Featured 1.webp",
    "/assets/images/Tinuy.an Featured 2.webp",
    "/assets/images/Tinuy.an Featured 3.webp"
  ],
  "enchanted-river": [
    "/assets/images/Enchanted River Featured 1.jpg",
    "/assets/images/Enchanted River Featured 2.jpg",
    "/assets/images/Enchanted River Featured 3.jpg"
  ],
  "kawa-kawa-sa-awog": [
    "/assets/images/kawa-kawa featured 1.webp",
    "/assets/images/kawa-kawa featured 2.webp",
    "/assets/images/kawa-kawa featured 3.webp"
  ],
  "hagonoy-island": [
    "/assets/images/hagonoy featured 1.jpg",
    "/assets/images/hagonoy featured 2.jpg",
    "/assets/images/hagonoy featured 3.jpg"
  ],
  "hinayagan-cave": [
    "/assets/images/Hinayagan Cave Featured 1.jpg",
    "/assets/images/Hinayagan Cave Featured 2.jpg",
    "/assets/images/Hinayagan Cave Featured 3.jpg"
  ],
  "lake-77": [
    "/assets/images/Lake 77 Featured 1.jpg",
    "/assets/images/Lake 77 Featured 2.jpg",
    "/assets/images/Lake 77 Featured 3.jpg"
  ]
};

const KajabiFormEmbed = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
              <style>
                body {
                  margin: 0;
                  padding: 16px;
                  background: transparent;
                  font-family: 'Inter', sans-serif;
                }
                #kajabi-form {
                  max-width: 100% !important;
                  margin: 0 auto !important;
                  box-sizing: border-box !important;
                }
                .kajabi-form__content {
                  padding: 0 !important;
                }
                .kajabi-form__title {
                  display: none !important;
                }
                .kajabi-form__form-item {
                  margin-bottom: 16px !important;
                }
                .kajabi-form__form-item input[type="text"],
                .kajabi-form__form-item input[type="email"],
                .kajabi-form__form-item input[type="tel"] {
                  width: 100% !important;
                  box-sizing: border-box !important;
                  padding: 14px 18px !important;
                  border: 1px solid #E2E8F0 !important;
                  border-radius: 12px !important;
                  font-size: 14px !important;
                  font-family: 'Inter', sans-serif !important;
                  background-color: #FAFAFA !important;
                  color: #1E293B !important;
                  outline: none !important;
                  transition: all 0.2s ease !important;
                }
                .kajabi-form__form-item input:focus {
                  background-color: #FFFFFF !important;
                  border-color: #0047A1 !important;
                  box-shadow: 0 0 0 3px rgba(0, 71, 161, 0.15) !important;
                }
                .radio-buttons-field {
                  margin: 20px 0 !important;
                }
                .radio-buttons-field > label {
                  font-size: 13px !important;
                  font-weight: 700 !important;
                  color: #475569 !important;
                  margin-bottom: 12px !important;
                  display: block !important;
                }
                .radio {
                  margin-bottom: 10px !important;
                }
                .radio label {
                  display: flex !important;
                  align-items: center !important;
                  gap: 10px !important;
                  color: #334155 !important;
                  font-size: 13.5px !important;
                  font-weight: 500 !important;
                  cursor: pointer !important;
                  position: relative !important;
                }
                .radio input[type="radio"] {
                  width: 18px !important;
                  height: 18px !important;
                  accent-color: #0047A1 !important;
                  cursor: pointer !important;
                  margin: 0 !important;
                }
                .radio .overlay, .radio .text {
                  display: inline-block !important;
                }
                .kajabi-form__btn {
                  width: 100% !important;
                  padding: 14px 24px !important;
                  background-color: #0047A1 !important;
                  color: #FFFFFF !important;
                  font-family: 'Inter', sans-serif !important;
                  font-weight: 700 !important;
                  font-size: 14px !important;
                  text-transform: uppercase !important;
                  letter-spacing: 0.05em !important;
                  border-radius: 9999px !important;
                  border: none !important;
                  cursor: pointer !important;
                  transition: all 0.25s ease !important;
                  box-shadow: 0 4px 6px -1px rgba(0, 71, 161, 0.15), 0 2px 4px -1px rgba(0, 71, 161, 0.08) !important;
                }
                .kajabi-form__btn:hover {
                  background-color: #002D6E !important;
                  transform: translateY(-2.5px) !important;
                  box-shadow: 0 8px 16px -2px rgba(0, 71, 161, 0.25) !important;
                }
              </style>
            </head>
            <body>
              <script src="https://desiree-bastiano-3d5b.mykajabi.com/forms/2149631471/embed.js"></script>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Kajabi Contact Form"
      className="w-full h-[620px] border-0 rounded-2xl bg-white"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
};

export default function App() {
  // Real-time Weather State
  const [weatherData, setWeatherData] = useState<{
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    isDay: boolean;
    windSpeed: number;
    precipitation: number;
    condition: string;
    weatherCode: number;
    location: string;
  } | null>(null);
  const [loadingWeather, setLoadingWeather] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) throw new Error("Failed to load weather");
        const data = await res.json();
        setWeatherData(data);
        setWeatherError(false);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setWeatherError(true);
      } finally {
        setLoadingWeather(false);
      }
    }
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // refresh every 10 mins
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code: number, isDay: boolean = true, size = 20, className = "") => {
    if (code === 0) {
      return isDay ? <Sun size={size} className={`text-amber-400 ${className}`} /> : <Moon size={size} className={`text-sky-300 ${className}`} />;
    }
    if (code >= 1 && code <= 3) {
      return <CloudSun size={size} className={`text-blue-300 ${className}`} />;
    }
    if (code === 45 || code === 48) {
      return <Cloud size={size} className={`text-slate-300 ${className}`} />;
    }
    if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82)) {
      return <CloudRain size={size} className={`text-sky-400 ${className}`} />;
    }
    if (code >= 95 && code <= 99) {
      return <CloudLightning size={size} className={`text-amber-500 ${className}`} />;
    }
    return <CloudSun size={size} className={`text-blue-300 ${className}`} />;
  };

  // Navigation State
  // Values: 'home' | 'explore' | 'attractions' | 'things-to-do' | 'hotels' | 'restaurants' | 'map' | 'gallery' | 'blog' | 'about' | 'contact' | 'downloads' | 'events' | 'event-detail'
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const selectedEvent = EVENTS.find(e => e.id === selectedEventId) ?? null;

  // Accessibility State
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState<boolean>(false);
  const [colorTheme, setColorTheme] = useState<"original" | "premium" | "tropical" | "waterfall" | "sunset-adv" | "island" | "nature" | "coastal" | "heritage" | "festival">("original");

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("bislig_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Itinerary Builder State
  const [customItinerary, setCustomItinerary] = useState<Record<number, any[]>>({
    1: [],
    2: [],
    3: []
  });
  const [selectedItineraryDay, setSelectedItineraryDay] = useState<number>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showNotifBar, setShowNotifBar] = useState<boolean>(true);
  const [showLangMenu, setShowLangMenu] = useState<boolean>(false);
  const [showDirectoryDropdown, setShowDirectoryDropdown] = useState<boolean>(false);
  
  // Read active language from Google Translate cookie on load
  const [activeLang, setActiveLang] = useState<string>(() => {
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    return match ? match[1] : "en";
  });

  const LANGUAGES = [
    { code: "en",    flag: "🇺🇸", label: "English"    },
    { code: "tl",    flag: "🇵🇭", label: "Filipino"   }, // 'tl' for Google Translate Tagalog/Filipino
    { code: "zh-CN", flag: "🇨🇳", label: "中文"        },
    { code: "ja",    flag: "🇯🇵", label: "日本語"      },
    { code: "ko",    flag: "🇰🇷", label: "한국어"      },
    { code: "de",    flag: "🇩🇪", label: "Deutsch"    },
    { code: "fr",    flag: "🇫🇷", label: "Français"   },
    { code: "es",    flag: "🇪🇸", label: "Español"    },
  ];

  const changeLang = (code: string) => {
    setActiveLang(code);
    setShowLangMenu(false);
    
    // Clear existing translation cookies
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
    
    const hostParts = window.location.hostname.split('.');
    if (hostParts.length > 2) {
      const apexDomain = hostParts.slice(-2).join('.');
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + apexDomain;
    }

    if (code !== "en") {
      // Set new translation cookie
      document.cookie = "googtrans=/en/" + code + "; path=/;";
      document.cookie = "googtrans=/en/" + code + "; path=/; domain=" + window.location.hostname;
      if (hostParts.length > 2) {
        const apexDomain = hostParts.slice(-2).join('.');
        document.cookie = "googtrans=/en/" + code + "; path=/; domain=." + apexDomain;
      }
    }
    
    // Page reload ensures translation triggers cleanly across all components
    window.location.reload();
  };

  const currentLang = LANGUAGES.find((l) => l.code === activeLang) ?? LANGUAGES[0];

  // AI Planner State
  const [aiDays, setAiDays] = useState<number>(3);
  const [aiInterest, setAiInterest] = useState<string>("Waterfall Chasing & Adventure");
  const [aiBudget, setAiBudget] = useState<"Budget" | "Mid-range" | "Luxury">("Mid-range");
  const [aiGroupSize, setAiGroupSize] = useState<"Solo" | "Couple" | "Family" | "Friends">("Couple");
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Selected details modal state
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);

  // Directory Filtering State
  const [selectedDirectoryCategory, setSelectedDirectoryCategory] = useState<string>("All");
  const [directorySearchQuery, setDirectorySearchQuery] = useState<string>("");

  // Merge Attractions, Accommodations, and Restaurants dynamically into Directory items
  const allEstablishments = useMemo(() => {
    // 1. Map Attractions
    const mappedAttractions: Establishment[] = ATTRACTIONS.map((att) => ({
      id: att.id,
      name: att.name,
      description: att.description,
      longDescription: att.longDescription,
      category: "Attractions",
      image: att.image,
      location: att.distance ? `${att.distance} from city proper` : "Bislig City",
      contact: "Tourism Office: +63 86 853 6000",
      socialMedia: "facebook.com/bisligcitytourism",
      website: "",
      operatingHours: att.openingHours,
      coordinates: att.coordinates,
      mapUrl: att.mapUrl,
      rating: att.rating
    }));

    // 2. Map Accommodations
    const mappedAccommodations: Establishment[] = ACCOMMODATIONS.map((acc) => ({
      id: acc.id,
      name: acc.name,
      description: acc.description,
      category: "Accommodations",
      image: acc.image,
      location: "Bislig / Surigao del Sur",
      contact: acc.contact || "N/A",
      socialMedia: acc.socialMedia || "",
      website: acc.website || "",
      operatingHours: acc.operatingHours || "24/7",
      coordinates: acc.coordinates,
      mapUrl: acc.mapUrl,
      rating: acc.rating
    }));

    // 3. Map Restaurants
    const mappedRestaurants: Establishment[] = RESTAURANTS.map((rest) => ({
      id: rest.id,
      name: rest.name,
      description: rest.description,
      category: "Dining & Cafes",
      image: rest.image,
      location: "Bislig City proper",
      contact: rest.contact || "N/A",
      socialMedia: rest.socialMedia || "",
      website: rest.website || "",
      operatingHours: rest.operatingHours || "10:00 AM - 09:00 PM",
      coordinates: rest.coordinates,
      mapUrl: rest.mapUrl,
      rating: rest.rating
    }));

    // Prevent duplicates (e.g. Ocean View Park which is defined in both Attractions and Establishments)
    const estNames = new Set(ESTABLISHMENTS.map((e) => e.name.toLowerCase()));
    
    const uniqueAttractions = mappedAttractions.filter((a) => !estNames.has(a.name.toLowerCase()));
    const uniqueAccommodations = mappedAccommodations.filter((a) => !estNames.has(a.name.toLowerCase()));
    const uniqueRestaurants = mappedRestaurants.filter((a) => !estNames.has(a.name.toLowerCase()));

    return [...ESTABLISHMENTS, ...uniqueAttractions, ...uniqueAccommodations, ...uniqueRestaurants];
  }, []);

  const filteredEstablishments = useMemo(() => {
    const list = allEstablishments.filter((est) => {
      const matchesCategory =
        selectedDirectoryCategory === "All" || 
        est.category === selectedDirectoryCategory ||
        // Ocean View Park cross-categorization (Dining & Cafes, Attractions)
        (est.name.toLowerCase().includes("ocean view park") && 
          (selectedDirectoryCategory === "Dining & Cafes" || 
           selectedDirectoryCategory === "Attractions")) ||
        // I Love Bislig cross-categorization (Attractions, Churches & Landmarks)
        (est.id === "i-love-bislig" && 
          (selectedDirectoryCategory === "Attractions" || 
           selectedDirectoryCategory === "Churches & Landmarks"));
      const matchesSearch =
        est.name.toLowerCase().includes(directorySearchQuery.toLowerCase()) ||
        est.location.toLowerCase().includes(directorySearchQuery.toLowerCase()) ||
        est.description.toLowerCase().includes(directorySearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [allEstablishments, selectedDirectoryCategory, directorySearchQuery]);

  // Filters
  const [attractionFilter, setAttractionFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [hotelFilter, setHotelFilter] = useState<string>("All");
  const [restaurantFilter, setRestaurantFilter] = useState<string>("All");
  const [galleryFilter, setGalleryFilter] = useState<string>("All");

  // Map Filter State
  const [mapFilter, setMapFilter] = useState<string>("All");

  // Lightbox State
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; author: string } | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "Trip Inquiry",
    message: ""
  });
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Hero slideshow state
  const [heroSlide, setHeroSlide] = useState<number>(0);
  const heroSlides = [
    {
      image: "/assets/images/Hero Slide 1.webp",
      title: "Chasing Rainbows",
      subtitle: "The majestic curtains of Tinuy-an Falls await"
    },
    {
      image: "/assets/images/Hero Slide 2.jpg",
      title: "Mystical Depths",
      subtitle: "Unravel the magical sapphire of Enchanted River"
    },
    {
      image: "/assets/images/Hero Slide 3.jpg",
      title: "Sunrise Serenade",
      subtitle: "Bask in golden warmth overlooking Bislig Bay"
    }
  ];

  // Auto slide effect
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Handle accessibility high contrast body class toggle
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  // Handle color theme class toggle
  useEffect(() => {
    document.body.classList.remove("theme-premium", "theme-tropical", "theme-waterfall", "theme-sunset-adv", "theme-island", "theme-nature", "theme-coastal", "theme-heritage", "theme-festival");
    if (colorTheme !== "original") {
      document.body.classList.add(`theme-${colorTheme}`);
    }
  }, [colorTheme]);

  // Handle text size accessibility scaling
  useEffect(() => {
    document.documentElement.classList.remove("text-size-large", "text-size-xlarge");
    if (textSize === "large") {
      document.documentElement.classList.add("text-size-large");
    } else if (textSize === "xlarge") {
      document.documentElement.classList.add("text-size-xlarge");
    }
  }, [textSize]);

  // Save favorites to local storage
  const toggleFavorite = (id: string) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("bislig_favorites", JSON.stringify(updated));
  };

  // Add item to custom itinerary
  const [addedFeedback, setAddedFeedback] = useState<Record<string, boolean>>({});

  const addToItinerary = (item: any, type: "attraction" | "restaurant" | "hotel") => {
    const dayList = customItinerary[selectedItineraryDay] || [];
    // Prevent duplicates within the same day
    if (dayList.some((existing) => existing.id === item.id)) {
      setAddedFeedback((prev) => ({ ...prev, [item.id]: true }));
      setTimeout(() => {
        setAddedFeedback((prev) => ({ ...prev, [item.id]: false }));
      }, 1500);
      return;
    }

    setCustomItinerary({
      ...customItinerary,
      [selectedItineraryDay]: [...dayList, { ...item, itineraryType: type }]
    });

    setAddedFeedback((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedFeedback((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  // Export personalized/AI itinerary to PDF
  const exportItineraryToPdf = async (itinerary: GeneratedItinerary) => {
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
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      let y = 20;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - margin) {
          doc.addPage();
          doc.setFillColor(29, 53, 87);
          doc.rect(0, 0, pageWidth, 5, "F");
          y = 20;
        }
      };

      // Title header band
      doc.setFillColor(29, 53, 87);
      doc.rect(0, 0, pageWidth, 12, "F");
      
      doc.setFillColor(42, 157, 143);
      doc.rect(0, 12, pageWidth, 2, "F");

      y = 24;

      doc.setTextColor(29, 53, 87);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("BISLIG CITY TRAVEL GUIDE", margin, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(115, 120, 130);
      doc.text(`Kamayo Heritage Custom Guide  |  Official Bislig City Tourism Planner  |  ${new Date().toLocaleDateString()}`, margin, y);
      y += 5;

      // Draw official logo image on the top right
      if (logoImg) {
        doc.addImage(logoImg, "JPEG", pageWidth - margin - 16, 17, 16, 16);
      }

      doc.setDrawColor(220, 225, 230);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      doc.setTextColor(0, 119, 182);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      const titleLines = doc.splitTextToSize(itinerary.itineraryName, contentWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 7 + 3;

      itinerary.days.forEach((day) => {
        checkPageBreak(30);

        doc.setFillColor(248, 246, 242);
        doc.setDrawColor(230, 225, 215);
        doc.rect(margin, y, contentWidth, 10, "FD");

        doc.setTextColor(29, 53, 87);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(`DAY ${day.dayNumber}: ${day.theme}`, margin + 4, y + 6.5);
        y += 15;

        day.activities.forEach((act) => {
          const descLines = doc.splitTextToSize(act.description, contentWidth - 10);
          
          let costLines: string[] = [];
          if (act.estimatedCost) {
            costLines = doc.splitTextToSize(`Cost: ${act.estimatedCost}`, contentWidth - 10);
          }
          
          const costHeight = costLines.length * 4.5;
          const actHeight = 16 + (descLines.length * 4.5) + costHeight;
          
          checkPageBreak(actHeight);

          doc.setDrawColor(0, 119, 182);
          doc.setLineWidth(1);
          doc.line(margin + 2, y - 5, margin + 2, y + actHeight - 12);

          doc.setFillColor(0, 119, 182);
          doc.circle(margin + 2, y, 1.5, "F");

          doc.setTextColor(100, 110, 120);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);
          doc.text(act.time, margin + 8, y + 1);

          y += 5.5;

          doc.setTextColor(29, 53, 87);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.text(act.activityName, margin + 8, y);
          y += 4.5;

          doc.setTextColor(115, 120, 130);
          doc.setFont("helvetica", "italic");
          doc.setFontSize(8.5);
          doc.text(`@ ${act.locationName}`, margin + 8, y);
          y += 4.5;

          if (act.estimatedCost) {
            doc.setTextColor(42, 157, 143);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8.5);
            costLines.forEach((line) => {
              doc.text(line, margin + 8, y);
              y += 4.5;
            });
          }

          doc.setTextColor(80, 85, 95);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          descLines.forEach((line: string) => {
            doc.text(line, margin + 8, y);
            y += 4.5;
          });

          y += 4;
        });

        y += 4;
      });

      if (itinerary.travelTips && itinerary.travelTips.length > 0) {
        checkPageBreak(30);
        y += 4;

        doc.setFillColor(240, 246, 246);
        doc.setDrawColor(220, 235, 235);
        doc.rect(margin, y, contentWidth, 8, "FD");

        doc.setTextColor(42, 157, 143);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("LOCAL TRAVEL ADVICE", margin + 4, y + 5.5);
        y += 12;

        itinerary.travelTips.forEach((tip) => {
          const tipLines = doc.splitTextToSize(tip, contentWidth - 10);
          checkPageBreak(tipLines.length * 4.5 + 4);

          doc.setFillColor(42, 157, 143);
          doc.circle(margin + 4, y - 1, 1, "F");

          doc.setTextColor(80, 85, 95);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          tipLines.forEach((line: string) => {
            doc.text(line, margin + 8, y);
            y += 4.5;
          });
          y += 2.5;
        });
      }

      if (itinerary.budgetBreakdown) {
        const breakdown = itinerary.budgetBreakdown;
        
        // Build items list
        const budgetItems = [
          { label: "Accommodation", value: breakdown.accommodation },
          { label: "Food & Dining", value: breakdown.food },
          { label: "Tours & Permits", value: breakdown.toursAndEntranceFees },
          { label: "Transportation", value: breakdown.transportation }
        ];

        // Check page break dynamically based on maximum expected rows
        checkPageBreak(55);
        y += 6;

        doc.setDrawColor(220, 225, 230);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;

        doc.setTextColor(29, 53, 87);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("ESTIMATED BUDGET SUMMARY", margin, y);
        y += 7;

        // Render each budget item vertically with label and description to prevent overlapping
        budgetItems.forEach((item) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9.5);
          doc.setTextColor(29, 53, 87);
          doc.text(`${item.label}:`, margin, y);

          doc.setFont("helvetica", "normal");
          doc.setTextColor(80, 85, 95);
          // Wrap descriptions dynamically to fit within page margins
          const wrappedValue = doc.splitTextToSize(item.value, contentWidth - 42);
          doc.text(wrappedValue, margin + 40, y);
          
          y += wrappedValue.length * 4.5 + 1.5;
        });

        y += 3;

        const totalText = breakdown.totalEstimated;
        let amountPart = totalText;
        let notesPart = "";
        
        const parenIndex = totalText.indexOf("(");
        if (parenIndex !== -1) {
          amountPart = totalText.substring(0, parenIndex).trim();
          notesPart = totalText.substring(parenIndex).trim();
        }

        // Calculate height of the summary box dynamically
        let summaryBoxHeight = 11;
        let wrappedNotes: string[] = [];
        if (notesPart) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          wrappedNotes = doc.splitTextToSize(notesPart, contentWidth - 8);
          summaryBoxHeight += (wrappedNotes.length * 4.5) + 2;
        }

        doc.setDrawColor(230, 235, 240);
        doc.setFillColor(245, 248, 250);
        doc.rect(margin, y, contentWidth, summaryBoxHeight, "FD");

        // Draw Left Label
        doc.setTextColor(29, 53, 87);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("Total Estimated Expenses (PHP)", margin + 4, y + 7);

        // Draw Right Amount (short, will not overlap)
        doc.setTextColor(42, 157, 143);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        doc.text(amountPart, pageWidth - margin - 4, y + 7, { align: "right" });

        // Draw Notes below if present
        if (notesPart) {
          doc.setTextColor(115, 120, 130);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8.5);
          let notesY = y + 12;
          wrappedNotes.forEach((line) => {
            doc.text(line, margin + 4, notesY);
            notesY += 4.5;
          });
        }
        
        y += summaryBoxHeight + 5;
      }

      const totalPages = doc.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setTextColor(150, 155, 165);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(
          `Page ${i} of ${totalPages}  |  Bislig City Tourism Assistant  |  https://bislig.gov.ph`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      }

      const fileName = `${itinerary.itineraryName.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_itinerary.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("There was an error generating the PDF.");
    }
  };

  // Remove item from itinerary
  const removeFromItinerary = (day: number, id: string) => {
    const dayList = customItinerary[day] || [];
    setCustomItinerary({
      ...customItinerary,
      [day]: dayList.filter((item) => item.id !== id)
    });
  };

  // Calculate estimated total budget of built itinerary
  const itineraryExpenses = useMemo(() => {
    let total = 0;
    Object.values(customItinerary).forEach((items: any) => {
      items.forEach((item: any) => {
        if (item.itineraryType === "attraction") {
          const digits = item.entranceFee.match(/\d+/);
          total += digits ? parseInt(digits[0]) : 30;
        } else if (item.itineraryType === "restaurant") {
          total += 350; // default estimated meal cost
        } else if (item.itineraryType === "hotel") {
          total += 2000; // default estimated night cost
        }
      });
    });
    return total;
  }, [customItinerary]);

  // Festival countdown state
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });
  useEffect(() => {
    const targetDate = new Date("2026-09-17T08:00:00-07:00").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown({ days: d, hours: h, mins: m });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top on every page / tab navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab, selectedEventId]);

  // Keep-alive ping — prevents Vercel serverless cold starts every 4 minutes
  useEffect(() => {
    const ping = () => fetch("/api/ping").catch(() => {});
    ping(); // ping immediately on load
    const id = setInterval(ping, 4 * 60 * 1000); // then every 4 min
    return () => clearInterval(id);
  }, []);

  // 1. All Attractions Page Items (merge ATTRACTIONS + directory landmarks)
  const allAttractionsPageItems = useMemo(() => {
    const items = [...ATTRACTIONS];
    const dirAttractions = ESTABLISHMENTS.filter((e) => 
      e.id === "ocean-view-park-directory" || 
      e.id === "lawigan-surf-point" ||
      e.id === "i-love-bislig"
    );
    dirAttractions.forEach((da) => {
      if (!items.some((i) => i.name.toLowerCase() === da.name.toLowerCase())) {
        items.push({
          id: da.id,
          name: da.name,
          description: da.description,
          longDescription: da.longDescription || da.description,
          category: da.id === "saint-vincent-parish" || da.id === "iglesia-ni-cristo-directory" ? "Culture" : "Parks",
          image: da.image,
          distance: da.name.includes("Falls") ? "18 km" : "Local",
          travelTime: "10-20 mins",
          difficulty: "Easy",
          bestTime: "Daylight hours",
          entranceFee: "Free",
          openingHours: da.operatingHours,
          travelTips: ["Wear comfortable walking shoes.", "Bring your camera for photography."],
          nearbyAttractions: [],
          nearbyRestaurants: [],
          accessibility: "Paved entrance.",
          coordinates: da.coordinates,
          mapUrl: da.mapUrl,
          rating: da.rating
        });
      }
    });
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // 2. All Accommodations Page Items (merge ACCOMMODATIONS + directory accommodations)
  const allAccommodationsPageItems = useMemo(() => {
    const items = [...ACCOMMODATIONS];
    const dirAccommodations = ESTABLISHMENTS.filter((e) => e.category === "Accommodations");
    dirAccommodations.forEach((da) => {
      if (!items.some((i) => i.name.toLowerCase() === da.name.toLowerCase())) {
        items.push({
          id: da.id,
          name: da.name,
          description: da.description,
          category: da.name.toLowerCase().includes("resort") ? "Beachfront" : "Mid-range",
          image: da.image,
          priceRange: da.id === "citi-side-inn" ? "₱1,000 - ₱1,800 per night" : "₱1,500 - ₱3,500 per night",
          amenities: ["Free WiFi", "Air Conditioning", "Private Bathrooms", "Cable TV", "24/7 Desk"],
          contact: da.contact,
          socialMedia: da.socialMedia,
          website: da.website,
          operatingHours: da.operatingHours,
          coordinates: da.coordinates,
          mapUrl: da.mapUrl,
          rating: da.rating
        });
      }
    });
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // 3. All Restaurants Page Items (merge RESTAURANTS + directory dining)
  const allRestaurantsPageItems = useMemo(() => {
    const items = [...RESTAURANTS];
    const dirRestaurants = ESTABLISHMENTS.filter((e) => e.category === "Dining & Cafes");
    dirRestaurants.forEach((dr) => {
      if (!items.some((i) => i.name.toLowerCase() === dr.name.toLowerCase())) {
        items.push({
          id: dr.id,
          name: dr.name,
          description: dr.description,
          category: dr.name.toLowerCase().includes("cafe") ? "Cafe" : "Local Cuisine",
          image: dr.image,
          specialty: ["Local Seafood Delicacies", "Traditional Favorites", "Cold Drinks"],
          priceRange: "₱150 - ₱450 per person",
          contact: dr.contact,
          socialMedia: dr.socialMedia,
          website: dr.website,
          operatingHours: dr.operatingHours,
          coordinates: dr.coordinates,
          mapUrl: dr.mapUrl,
          rating: dr.rating
        });
      }
    });
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Search filtered items
  const filteredAttractions = useMemo(() => {
    return allAttractionsPageItems.filter((att) => {
      const matchesCategory = attractionFilter === "All" || att.category === attractionFilter;
      const matchesSearch =
        att.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allAttractionsPageItems, attractionFilter, searchQuery]);

  // AI Trip Planner generation trigger
  const handleGenerateAiItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingAi(true);
    setAiError(null);
    setGeneratedItinerary(null);

    try {
      const response = await fetch("/api/ai/plan-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days: aiDays,
          interest: aiInterest,
          budget: aiBudget,
          groupSize: aiGroupSize
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate itinerary. Please try again later.");
      }

      const data = await response.json();
      setGeneratedItinerary(data);
    } catch (err: any) {
      setAiError(err.message || "An unexpected error occurred during trip planning.");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // CSS Text-Size Class generator
  const textClass = (base: string, multiplier: number) => {
    if (textSize === "large") return `${base} text-lg md:text-xl`;
    if (textSize === "xlarge") return `${base} text-xl md:text-2xl`;
    return base;
  };

  if (activeTab === "admin") {
    return <AdminDashboard onBackToHome={() => setActiveTab("home")} />;
  }

  return (
    <div className={`min-h-screen bg-[#FAFCFC] text-[#0047A1] font-sans flex flex-col relative transition-all duration-300 overflow-x-hidden ${highContrast ? 'bg-black text-white' : ''}`}>
      
      {/* Dynamic Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#F8F6F2] z-[100]">
        <div className="h-full bg-gradient-to-r from-[#0047A1] to-[#0097A7] transition-all duration-300 w-full" style={{ width: "100%" }}></div>
      </div>

      {/* =========================================
          FEATURED EVENT NOTIFICATION BAR
          ========================================= */}
      {showNotifBar && (
        <div className="relative z-[60] w-full bg-gradient-to-r from-[#1D3557] via-[#0047A1] to-[#1D3557] text-white overflow-hidden">
          {/* Animated shimmer background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
          </div>
          {/* Centered content wrapper */}
          <div className="relative flex items-center justify-center px-4 py-3">
            {/* Center: event info + CTA */}
            <div className="flex items-center gap-5 flex-wrap justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FB8C00] shrink-0">Featured Event</span>
              <span className="text-white/40 text-xs mx-1">·</span>
              <span className="text-xs font-semibold text-white/90">
                🎉 <strong>Karawasan Festival</strong> — Sep 17–18, 2025 · Bislig City Plaza &amp; Baywalk Park
              </span>
              <button
                onClick={() => { setSelectedEventId("karawasan"); setActiveTab("event-detail"); }}
                className="flex items-center gap-1.5 bg-[#FB8C00] hover:bg-[#e57c00] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0 ml-2"
              >
                View Event <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            {/* Dismiss — absolute right so it doesn't affect centering */}
            <button
              onClick={() => setShowNotifBar(false)}
              className="absolute right-4 p-1 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}


      {/* Transparent Sticky Navigation */}
      <nav id="navbar" className="z-50 w-full px-4 md:px-10 h-20 flex items-center justify-between glass sticky top-0 border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="flex items-center cursor-pointer group" onClick={() => setActiveTab("home")}>
          {/* Custom Stylized Logo of Bislig (Sun, Forests, and Tinuy-an Falls Cascades) */}
          <div className="w-16 h-16 relative shrink-0 transform group-hover:scale-105 transition-transform duration-300">
            <img src="/assets/images/logo.jpg" className="w-full h-full object-cover rounded-full border border-gray-200 shadow-sm" alt="Bislig City Tourism Logo" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <button
            onClick={() => setActiveTab("home")}
            className={`text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 py-2 transition-all ${
              activeTab === "home" ? "border-[#0047A1] text-[#0047A1]" : "border-transparent text-slate-600 hover:text-[#0047A1]"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("explore")}
            className={`text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 py-2 transition-all ${
              activeTab === "explore" ? "border-[#0047A1] text-[#0047A1]" : "border-transparent text-slate-600 hover:text-[#0047A1]"
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveTab("attractions")}
            className={`text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 py-2 transition-all ${
              activeTab === "attractions" ? "border-[#0047A1] text-[#0047A1]" : "border-transparent text-slate-600 hover:text-[#0047A1]"
            }`}
          >
            Attractions
          </button>
          <button
            onClick={() => setActiveTab("things-to-do")}
            className={`text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 py-2 transition-all ${
              activeTab === "things-to-do" ? "border-[#0047A1] text-[#0047A1]" : "border-transparent text-slate-600 hover:text-[#0047A1]"
            }`}
          >
            Things to Do
          </button>
          <button
            onClick={() => setActiveTab("hotels")}
            className={`text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 py-2 transition-all ${
              activeTab === "hotels" ? "border-[#0047A1] text-[#0047A1]" : "border-transparent text-slate-600 hover:text-[#0047A1]"
            }`}
          >
            Accommodations
          </button>
          <button
            onClick={() => setActiveTab("restaurants")}
            className={`text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 py-2 transition-all ${
              activeTab === "restaurants" ? "border-[#0047A1] text-[#0047A1]" : "border-transparent text-slate-600 hover:text-[#0047A1]"
            }`}
          >
            Dining
          </button>
          {/* Dropdown Directory Tab */}
          <div
            className="relative"
            onMouseEnter={() => setShowDirectoryDropdown(true)}
            onMouseLeave={() => setShowDirectoryDropdown(false)}
          >
            <button
              onClick={() => {
                setActiveTab("directory");
                setSelectedDirectoryCategory("All");
              }}
              className={`text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 py-2 transition-all flex items-center gap-1 ${
                activeTab === "directory" ? "border-[#0047A1] text-[#0047A1]" : "border-transparent text-slate-600 hover:text-[#0047A1]"
              }`}
            >
              <span>Directory</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showDirectoryDropdown && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-52 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/80 p-2.5 z-[80] animate-fadeIn">
                <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0047A1]">Categories</p>
                </div>
                {[
                  { label: "All Directory", value: "All" },
                  { label: "Accommodations", value: "Accommodations" },
                  { label: "Dining & Cafes", value: "Dining & Cafes" },
                  { label: "Attractions", value: "Attractions" },
                  { label: "Shops & Malls", value: "Shops & Malls" },
                  { label: "Sports & Recreation", value: "Sports & Recreation" },
                  { label: "Churches & Landmarks", value: "Churches & Landmarks" },
                  { label: "Surfing & Beaches", value: "Surfing & Beaches" },
                  { label: "Services & Others", value: "Services & Others" }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setActiveTab("directory");
                      setSelectedDirectoryCategory(item.value);
                      setShowDirectoryDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                      selectedDirectoryCategory === item.value && activeTab === "directory"
                        ? "bg-[#0047A1]/10 text-[#0047A1]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#0047A1]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {selectedDirectoryCategory === item.value && activeTab === "directory" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0047A1]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setActiveTab("car-rental")}
            className={`text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 py-2 transition-all ${
              activeTab === "car-rental" ? "border-[#0047A1] text-[#0047A1]" : "border-transparent text-slate-600 hover:text-[#0047A1]"
            }`}
          >
            Car Rental
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 py-2 transition-all ${
              activeTab === "events" || activeTab === "event-detail" ? "border-[#0047A1] text-[#0047A1]" : "border-transparent text-slate-600 hover:text-[#0047A1]"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 py-2 transition-all ${
              activeTab === "contact" ? "border-[#0047A1] text-[#0047A1]" : "border-transparent text-slate-600 hover:text-[#0047A1]"
            }`}
          >
            Contact Us
          </button>


        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200/80 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              title={`Active Language: ${currentLang.label}`}
            >
              <span className="text-lg leading-none">{currentLang.flag}</span>
            </button>

            {/* Dropdown Grid */}
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/80 p-3 z-[80] animate-fadeIn">
                <div className="text-center mb-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Select Language</p>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all hover:scale-110 active:scale-90 cursor-pointer ${
                        activeLang === lang.code
                          ? "bg-[#0047A1]/10 ring-2 ring-[#0047A1]"
                          : "hover:bg-slate-100"
                      }`}
                      title={lang.label}
                    >
                      <span className="text-xl leading-none">{lang.flag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors relative"
            title="Accessibility Toolbar"
            id="accessibility-btn"
          >
            <Accessibility className="w-5 h-5 text-[#0047A1]" />
          </button>
          
          <button
            onClick={() => setActiveTab("map")}
            className="hidden lg:block bg-[#0047A1] text-white px-4 py-2 rounded-full font-bold text-xs tracking-wider uppercase shadow-md hover:bg-[#005F92] transition-colors btn-glow"
          >
            PLAN YOUR TRIP
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-700"
            aria-label="Toggle Menu"
            id="hamburger-btn"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Hidden Google Translate element — powers language switching */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 w-full bg-white/95 backdrop-blur-md z-[45] border-b border-gray-200 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto animate-fadeIn">
          <div className="p-6 space-y-3 flex flex-col">
            <button
              onClick={() => {
                setActiveTab("home");
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm font-bold uppercase tracking-wider text-left py-2.5 px-4 rounded-xl transition-all ${
                activeTab === "home" ? "bg-[#0047A1]/10 text-[#0047A1]" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveTab("explore");
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm font-bold uppercase tracking-wider text-left py-2.5 px-4 rounded-xl transition-all ${
                activeTab === "explore" ? "bg-[#0047A1]/10 text-[#0047A1]" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => {
                setActiveTab("attractions");
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm font-bold uppercase tracking-wider text-left py-2.5 px-4 rounded-xl transition-all ${
                activeTab === "attractions" ? "bg-[#0047A1]/10 text-[#0047A1]" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Attractions
            </button>
            <button
              onClick={() => {
                setActiveTab("things-to-do");
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm font-bold uppercase tracking-wider text-left py-2.5 px-4 rounded-xl transition-all ${
                activeTab === "things-to-do" ? "bg-[#0047A1]/10 text-[#0047A1]" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Things to Do
            </button>
            <button
              onClick={() => {
                setActiveTab("hotels");
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm font-bold uppercase tracking-wider text-left py-2.5 px-4 rounded-xl transition-all ${
                activeTab === "hotels" ? "bg-[#0047A1]/10 text-[#0047A1]" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Accommodations
            </button>
            <button
              onClick={() => {
                setActiveTab("restaurants");
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm font-bold uppercase tracking-wider text-left py-2.5 px-4 rounded-xl transition-all ${
                activeTab === "restaurants" ? "bg-[#0047A1]/10 text-[#0047A1]" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Dining
            </button>
            <button
              onClick={() => {
                setActiveTab("directory");
                setSelectedDirectoryCategory("All");
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm font-bold uppercase tracking-wider text-left py-2.5 px-4 rounded-xl transition-all ${
                activeTab === "directory" ? "bg-[#0047A1]/10 text-[#0047A1]" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Directory
            </button>
            
            {activeTab === "directory" && (
              <div className="pl-6 pr-2 py-1 space-y-1.5 flex flex-col border-l border-slate-100 ml-4 animate-fadeIn">
                {[
                  { label: "All Directory", value: "All" },
                  { label: "Accommodations", value: "Accommodations" },
                  { label: "Dining & Cafes", value: "Dining & Cafes" },
                  { label: "Attractions", value: "Attractions" },
                  { label: "Shops & Malls", value: "Shops & Malls" },
                  { label: "Sports & Recreation", value: "Sports & Recreation" },
                  { label: "Churches & Landmarks", value: "Churches & Landmarks" },
                  { label: "Surfing & Beaches", value: "Surfing & Beaches" },
                  { label: "Services & Others", value: "Services & Others" }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setSelectedDirectoryCategory(item.value);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-xs font-semibold text-left py-1.5 px-3 rounded-lg transition-all ${
                      selectedDirectoryCategory === item.value
                        ? "bg-[#0047A1]/10 text-[#0047A1]"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    • {item.label}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => {
                setActiveTab("car-rental");
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm font-bold uppercase tracking-wider text-left py-2.5 px-4 rounded-xl transition-all ${
                activeTab === "car-rental" ? "bg-[#0047A1]/10 text-[#0047A1]" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Car Rental
            </button>
            <button
              onClick={() => {
                setActiveTab("events");
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm font-bold uppercase tracking-wider text-left py-2.5 px-4 rounded-xl transition-all ${
                activeTab === "events" || activeTab === "event-detail" ? "bg-[#0047A1]/10 text-[#0047A1]" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => {
                setActiveTab("contact");
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm font-bold uppercase tracking-wider text-left py-2.5 px-4 rounded-xl transition-all ${
                activeTab === "contact" ? "bg-[#0047A1]/10 text-[#0047A1]" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Contact Us
            </button>

            
            {/* Language Selector — Mobile */}
            <div className="pt-4 border-t border-gray-100 mt-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 px-1">🌐 Select Language</p>
              <div className="grid grid-cols-4 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { changeLang(lang.code); setIsMobileMenuOpen(false); }}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all cursor-pointer ${
                      activeLang === lang.code
                        ? "bg-[#0047A1]/10 ring-2 ring-[#0047A1]"
                        : "bg-slate-50 hover:bg-slate-100"
                    }`}
                    title={lang.label}
                  >
                    <span className="text-2xl leading-none">{lang.flag}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  setActiveTab("map");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-[#0047A1] text-white py-3 px-4 rounded-full font-bold text-xs tracking-wider uppercase shadow-md hover:bg-[#005F92] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FB8C00] animate-pulse" />
                PLAN YOUR TRIP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Accessibility Toolbar Dropdown */}
      {showAccessibilityMenu && (
        <div className="fixed top-24 right-4 md:right-10 z-[60] w-72 glass p-5 rounded-xl shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm text-[#0047A1] flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-[#0047A1]" />
              Accessibility Assist
            </h3>
            <button onClick={() => setShowAccessibilityMenu(false)} className="text-slate-400 hover:text-[#0047A1]">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">Contrast Mode</label>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-full py-2 px-3 text-xs rounded-lg font-semibold flex items-center justify-between border ${
                  highContrast ? "bg-black text-white border-white" : "bg-slate-100 text-[#0047A1] border-gray-200"
                }`}
              >
                <span>High Contrast Blackout</span>
                {highContrast ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">Text Size Multiplier</label>
              <div className="grid grid-cols-3 gap-1">
                {(["normal", "large", "xlarge"] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setTextSize(sz)}
                    className={`py-1.5 text-xs font-semibold rounded-md border capitalize ${
                      textSize === sz ? "bg-[#0047A1] text-white border-transparent" : "bg-white text-[#0047A1] border-gray-200"
                    }`}
                  >
                    {sz === "normal" ? "Standard" : sz === "large" ? "Large" : "Extra"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">Animations / Motion</label>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`w-full py-2 px-3 text-xs rounded-lg font-semibold flex items-center justify-between border ${
                  reducedMotion ? "bg-[#0097A7] text-white border-transparent" : "bg-white text-[#0047A1] border-gray-200"
                }`}
              >
                <span>Reduce Motion Effects</span>
                {reducedMotion ? <CheckCircle2 className="w-4 h-4 text-white" /> : <AlertCircle className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">Color Palette Themes</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(["original", "premium", "tropical", "waterfall", "sunset-adv", "island", "nature", "coastal", "heritage", "festival"] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setColorTheme(theme)}
                    className={`py-2 px-1 text-[10px] font-bold rounded-lg border capitalize flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                      colorTheme === theme
                        ? "bg-[#0047A1] text-white border-transparent shadow-sm"
                        : "bg-white text-slate-700 border-gray-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex gap-1">
                      {theme === "original" && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0047A1]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0097A7]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C00]"></span>
                        </>
                      )}
                      {theme === "premium" && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1557B8]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#129DA3]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EEA542]"></span>
                        </>
                      )}
                      {theme === "tropical" && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1557B8]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#129DA3]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#489E4C]"></span>
                        </>
                      )}
                      {theme === "waterfall" && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#129DA3]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1557B8]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#489E4C]"></span>
                        </>
                      )}
                      {theme === "sunset-adv" && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EEA542]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F2C425]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#489E4C]"></span>
                        </>
                      )}
                      {theme === "island" && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1F2F8A]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#129DA3]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8A6B5D]"></span>
                        </>
                      )}
                      {theme === "nature" && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#489E4C]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#129DA3]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F2C425]"></span>
                        </>
                      )}
                      {theme === "coastal" && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1557B8]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#129DA3]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F2C425]"></span>
                        </>
                      )}
                      {theme === "heritage" && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8A6B5D]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EEA542]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#489E4C]"></span>
                        </>
                      )}
                      {theme === "festival" && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1557B8]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F2C425]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EEA542]"></span>
                        </>
                      )}
                    </div>
                    <span>{theme === "original" ? "Reset" : theme === "sunset-adv" ? "sunset" : theme}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Render Area */}
      <main className="flex-grow">
        
        {/* ==================================
            HOME TAB RENDER
            ================================== */}
        {activeTab === "home" && (
          <div className="flex flex-col animate-fadeIn">
            
            {/* Cinematic Hero Slider with Water overlay and Floating panel */}
            <div className="relative w-full h-[640px] md:h-[700px] overflow-hidden bg-[#0047A1]">
              {/* Slideshow background */}
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                    heroSlide === index ? "opacity-90 scale-100" : "opacity-0 scale-105"
                  } transition-transform duration-[6000ms] ease-out`}
                  style={{ backgroundImage: `url('${slide.image}')` }}
                />
              ))}

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent"></div>
              
              {/* Water Floating Particles / Ripple effect (CSS Animation) */}
              {!reducedMotion && (
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full border border-white water-ripple"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full border border-[#48CAE4] water-ripple" style={{ animationDelay: "1.5s" }}></div>
                </div>
              )}

              {/* Cinematic text left container */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
                className="absolute inset-y-0 left-0 w-full max-w-4xl px-4 md:px-12 lg:px-20 flex flex-col justify-center z-10 text-white pr-4 md:pr-0"
              >
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="w-12 h-[2px] bg-[#FB8C00] hidden sm:block"></span>
                  <span className="text-[#FB8C00] text-xs font-bold tracking-[0.25em] uppercase">NATURE'S WONDER. PEOPLE'S PRIDE.</span>
                  {!loadingWeather && weatherData && (
                    <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur border border-white/15 px-2.5 py-0.5 rounded-full text-[10px] text-white font-bold md:hidden">
                      {getWeatherIcon(weatherData.weatherCode, weatherData.isDay, 12)}
                      <span>{weatherData.temperature}°C</span>
                      <span className="text-slate-300 font-medium">| {weatherData.condition}</span>
                    </span>
                  )}
                </div>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-6 italic">
                  Discover the <br />
                  <span className="not-italic font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#48CAE4]">
                    Hidden Paradise
                  </span>
                </h2>
                
                <p className="text-white/90 text-sm md:text-lg max-w-xl leading-relaxed mb-8">
                  Experience the legendary tiered cascades of <strong className="text-white underline decoration-[#FB8C00] underline-offset-4">Tinuy-an Falls</strong> and the deep mystical sapphire spring waters of the <strong className="text-white underline decoration-[#0097A7] underline-offset-4">Enchanted River</strong> in beautiful Bislig City.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab("attractions")}
                    className="bg-[#0047A1] hover:bg-[#005F92] text-white px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all btn-glow"
                  >
                    <span>Explore Attractions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("map")}
                    className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all btn-glow"
                  >
                    Plan Your Itinerary
                  </button>
                </div>
              </motion.div>

              {/* Floating Real-time Weather Widget for Hero Slider (Desktop/Tablet) */}
              <div className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 z-20 max-w-[280px] sm:max-w-xs w-full hidden md:block">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-white shadow-2xl relative overflow-hidden group">
                  {/* Glowing background accent */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-sky-400/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                  
                  <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] font-black tracking-widest uppercase text-slate-300">Live Weather</span>
                    </div>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-slate-200 uppercase font-bold">Bislig City</span>
                  </div>

                  {loadingWeather ? (
                    <div className="py-4 flex flex-col items-center justify-center space-y-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-sky-400 border-t-transparent" />
                      <span className="text-[10px] text-slate-400">Syncing live condition...</span>
                    </div>
                  ) : weatherError || !weatherData ? (
                    <div className="py-2 text-center text-xs text-rose-300">
                      Weather temporarily offline
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/10 p-3 rounded-xl">
                          {getWeatherIcon(weatherData.weatherCode, weatherData.isDay, 36, "animate-pulse")}
                        </div>
                        <div>
                          <div className="flex items-baseline">
                            <span className="text-3xl font-extrabold tracking-tight">{weatherData.temperature}</span>
                            <span className="text-lg font-semibold text-sky-300">°C</span>
                          </div>
                          <p className="text-xs text-slate-200 font-semibold">{weatherData.condition}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] bg-black/20 p-2.5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                          <div>
                            <span className="block text-[8px] text-slate-400 font-bold uppercase leading-none">Feels Like</span>
                            <span className="font-semibold text-white">{weatherData.apparentTemperature}°C</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Droplets className="w-3.5 h-3.5 text-sky-400" />
                          <div>
                            <span className="block text-[8px] text-slate-400 font-bold uppercase leading-none">Humidity</span>
                            <span className="font-semibold text-white">{weatherData.humidity}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300 col-span-2 border-t border-white/5 pt-1.5 mt-0.5">
                          <Wind className="w-3.5 h-3.5 text-teal-400" />
                          <div>
                            <span className="text-[8px] text-slate-400 font-bold uppercase mr-1">Wind:</span>
                            <span className="font-semibold text-white">{weatherData.windSpeed} km/h</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-[9px] text-slate-400 flex items-center justify-between">
                        <span>Refreshed automatically</span>
                        <span className="text-emerald-400 flex items-center gap-0.5 font-bold">
                          ● Perfect for travel
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick slide control indicators */}
              <div className="absolute bottom-8 left-4 md:left-20 flex gap-3 z-10">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroSlide(idx)}
                    className={`h-1.5 transition-all ${heroSlide === idx ? "w-10 bg-[#FB8C00]" : "w-4 bg-white/40"}`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="bg-[#0047A1] text-white py-6 px-4 md:px-12 border-t border-white/10 flex flex-wrap justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#0047A1]/20 rounded-lg">
                  {loadingWeather ? (
                    <Sun className="w-6 h-6 text-[#FB8C00] animate-spin" />
                  ) : weatherData ? (
                    getWeatherIcon(weatherData.weatherCode, weatherData.isDay, 24)
                  ) : (
                    <Sun className="w-6 h-6 text-[#FB8C00]" />
                  )}
                </div>
                <div>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Current Forecast</p>
                  <p className="text-sm font-bold">
                    {loadingWeather ? "Syncing..." : weatherData ? `${weatherData.temperature}°C ${weatherData.condition}` : "29°C Sunny"} — Bislig City
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#0097A7]/20 rounded-lg">
                  <Clock className="w-6 h-6 text-[#0097A7]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Marine Sunrise</p>
                  <p className="text-sm font-bold">05:32 AM UTC+8</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#FB8C00]/20 rounded-lg">
                  <Globe className="w-6 h-6 text-[#FB8C00]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Sustainable Tourism</p>
                  <p className="text-sm font-bold">Cert #2024-DOT13</p>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="px-3 py-1.5 bg-[#0097A7] text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow">
                  Safe Destination Approved
                </span>
              </div>
            </div>

            {/* Top Curated Attractions (The Right Panel design from mockup) */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="py-16 px-4 md:px-12 lg:px-20 bg-[#F8F6F2]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left side: Curated list of required top spots */}
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <span className="text-[#0097A7] text-xs font-bold uppercase tracking-[0.2em] block mb-2">CURATED SELECTION</span>
                    <h3 className="text-3xl md:text-4xl font-serif text-[#0047A1] font-bold">Featured Iconic Attractions</h3>
                    <p className="text-slate-600 mt-2 max-w-2xl text-sm md:text-base">
                      These legendary coordinates define the magnificent beauty of Bislig and neighboring areas. Click on any card to explore maps, tips, and fees.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Filter to show key required ones */}
                    {ATTRACTIONS.slice(0, 4).map((att) => (
                      <div
                        key={att.id}
                        onClick={() => setSelectedAttraction(att)}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#0047A1] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-full h-44 rounded-lg overflow-hidden bg-slate-200 mb-4 relative">
                            <img
                              src={att.image}
                              alt={att.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-[#0047A1]">
                              {att.category}
                            </div>
                            {!loadingWeather && weatherData && (
                              <div className="absolute bottom-2 left-2 bg-black/65 backdrop-blur-md px-2 py-1 rounded-md text-[9px] font-bold text-white flex items-center gap-1 shadow-md">
                                {getWeatherIcon(weatherData.weatherCode, weatherData.isDay, 11, "text-white")}
                                <span>{weatherData.temperature}°C</span>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-[#0047A1] text-base group-hover:text-[#0047A1] transition-colors">{att.name}</h4>
                          </div>
                          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{att.description}</p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                            <MapPin className="w-3 h-3 text-[#0047A1]" />
                            {att.distance} from City
                          </span>
                          <span className="text-[10px] font-bold text-[#0097A7] uppercase tracking-wide">
                            {att.travelTime}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center md:text-left">
                    <button
                      onClick={() => setActiveTab("attractions")}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0047A1] hover:text-[#005f92] border-b-2 border-[#0047A1] pb-1"
                    >
                      <span>View All Attractions</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right side: Interactive Mini-Map Preview Card (mockup reference) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-serif text-[#0047A1] font-bold mb-1">Interactive Map & Planner</h3>
                    <p className="text-xs text-[#0097A7] font-bold uppercase tracking-wider">24 Active Coordinates</p>
                    <p className="text-xs text-slate-500 mt-2">
                      Access our visual geographic explorer. Pinpoint primary waterfalls, eco-resorts, beachheads, and dining hubs with simple toggle filters.
                    </p>
                  </div>

                  <div className="my-6">
                    <GoogleMapSection
                      mapFilter="All"
                      setSelectedAttraction={setSelectedAttraction}
                      setSelectedAccommodation={setSelectedAccommodation}
                      setSelectedRestaurant={setSelectedRestaurant}
                    />
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => setActiveTab("map")}
                      className="w-full bg-[#0047A1] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow hover:bg-slate-800 transition-all"
                    >
                      <MapIcon className="w-4 h-4 text-[#FB8C00]" />
                      <span>Launch Map Explorer</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.section>

            {/* Official Bislig Tourism Video Section */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="py-16 px-4 md:px-12 lg:px-20 bg-[#F1F5F9]/50 border-y border-slate-100"
            >
              <div className="max-w-5xl mx-auto text-center">
                <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.25em] block mb-2">WATCH & DISCOVER</span>
                <h3 className="text-3xl md:text-4xl font-serif text-[#0047A1] font-extrabold mb-4">Suruyon Ta! (Let's Explore!)</h3>
                <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                  Immerse yourself in the breathtaking landscapes, majestic waterfalls, and thriving cultural heritage of Bislig City. Experience our official tourism anthem and visual guide.
                </p>

                {/* Video Player Container */}
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#0f172a] group hover:shadow-cyan-100/40 transition-shadow duration-300">
                  <video
                    className="w-full h-full object-cover"
                    src="https://tourism.bislig.gov.ph/watch-videos/suruyon%20ta.mp4"
                    controls
                    preload="metadata"
                    playsInline
                    poster="/assets/images/Tinuy.an Featured 1.webp"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </motion.section>

            {/* Why Visit Bislig (Bento Grid Style) */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="py-20 px-4 md:px-12 lg:px-20 bg-white"
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block mb-2">EXPLORE MINDANAO</span>
                <h3 className="text-3xl md:text-5xl font-serif text-[#0047A1] font-bold">Why Bislig City Belongs on Your Bucket List</h3>
                <p className="text-slate-600 mt-4 text-sm md:text-base">
                  Bislig is more than a destination; it's an authentic encounter with wild nature, ancient tribal heritage, and local culinary masterpieces.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-6 bg-[#FAFCFC] rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-[#0047A1]/10 rounded-xl flex items-center justify-center text-[#0047A1] mb-5 font-bold">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-[#0047A1] mb-2">Nature Adventures</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Hike through centuries-old pristine rainforests, swim in cold spring pools, and kayak down scenic quiet lakes.
                  </p>
                </div>

                <div className="p-6 bg-[#FAFCFC] rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-[#0097A7]/10 rounded-xl flex items-center justify-center text-[#0097A7] mb-5 font-bold">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-[#0047A1] mb-2">Sustainable Eco-Tourism</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Our city has dedicated conservation policies in place to preserve the pristine conditions of waterfalls and marine estuaries.
                  </p>
                </div>

                <div className="p-6 bg-[#FAFCFC] rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-[#FB8C00]/10 rounded-xl flex items-center justify-center text-[#FB8C00] mb-5 font-bold">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-[#0047A1] mb-2">Fresh Seafood Platters</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Savor world-class Kamayo mud crabs, sweet river oysters, and fresh marine tuna directly from local fishermen's boats.
                  </p>
                </div>

                <div className="p-6 bg-[#FAFCFC] rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-[#3A7D44]/10 rounded-xl flex items-center justify-center text-[#3A7D44] mb-5 font-bold">
                    <Info className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-[#0047A1] mb-2">Friendly Kamayo Tribe</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Experience deep-rooted warm hospitality from our residents who are eager to share local legends, customs, and crafts.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Event Countdown Banner & Tourism Calendar */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="py-16 px-4 md:px-12 lg:px-20 bg-[#1D3557] text-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left countdown widget */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-[#FB8C00] text-xs font-bold uppercase tracking-[0.25em] block">UPCOMING CULTURAL SPECTACLE</span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold">Karawasan Festival</h3>
                  <p className="text-slate-300 text-sm max-w-md">
                    Experience the legendary crab harvest dance of the Kamayo tribe. Vibrant street choreographies, indigenous musical instruments, and local feasts.
                  </p>

                  <div className="flex gap-3 pt-4">
                    <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center flex-1">
                      <p className="text-2xl font-bold text-[#FB8C00]">{countdown.days}</p>
                      <p className="text-[10px] text-slate-300 uppercase font-semibold">Days</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center flex-1">
                      <p className="text-2xl font-bold text-[#FB8C00]">{countdown.hours}</p>
                      <p className="text-[10px] text-slate-300 uppercase font-semibold">Hours</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center flex-1">
                      <p className="text-2xl font-bold text-[#FB8C00]">{countdown.mins}</p>
                      <p className="text-[10px] text-slate-300 uppercase font-semibold">Minutes</p>
                    </div>
                  </div>
                </div>

                {/* Right calendar items list */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-sm tracking-widest uppercase text-slate-300">DOT Event Calendar</h4>
                    <span className="text-xs text-[#FB8C00]">September Highlights</span>
                  </div>

                  <div className="space-y-4">
                    {EVENTS.map((evt) => (
                      <button
                        key={evt.id}
                        onClick={() => { setSelectedEventId(evt.id); setActiveTab("event-detail"); }}
                        className="w-full text-left bg-white/5 border border-white/10 hover:border-[#FB8C00]/60 hover:bg-white/10 rounded-xl p-4 flex gap-4 transition-all group cursor-pointer"
                      >
                        <div className="bg-[#0047A1] w-12 h-14 rounded-lg flex flex-col items-center justify-center text-center shrink-0 group-hover:bg-[#FB8C00] transition-colors">
                          <span className="text-[9px] font-bold tracking-wider text-slate-200">{evt.month}</span>
                          <span className="text-lg font-bold leading-none">{evt.day}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5 className="font-bold text-base text-white group-hover:text-[#FB8C00] transition-colors">{evt.title}</h5>
                            <span className="text-[9px] px-2 py-0.5 bg-white/15 rounded text-slate-300 uppercase tracking-wider">
                              {evt.type}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 line-clamp-2">{evt.description}</p>
                          <span className="text-[10px] text-[#FB8C00]/70 mt-2 block group-hover:text-[#FB8C00] transition-colors">Read more →</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* View All Events Button */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setActiveTab("events")}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#FB8C00] hover:bg-[#e57c00] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <Calendar className="w-4 h-4" />
                      View All Events
                    </button>
                  </div>
                </div>

              </div>
            </motion.section>

            {/* Newsletter Subscription */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="py-20 px-4 bg-[#FAFCFC] text-center border-t border-gray-100"
            >
              <div className="max-w-2xl mx-auto">
                <span className="text-[#0097A7] text-xs font-bold uppercase tracking-[0.2em] block mb-2">STAY INSPIRED</span>
                <h3 className="text-2xl md:text-4xl font-serif text-[#0047A1] font-bold">Get Secret Destination Guides</h3>
                <p className="text-slate-500 mt-3 text-xs md:text-sm">
                  Subscribe to receive quarterly curated travel schedules, newly discovered waterfalls, local discount packages, and cultural celebration dates.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for subscribing to our official Department of Tourism Updates!");
                  }}
                  className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your personal email address"
                    className="flex-grow px-5 py-3 rounded-full bg-white border border-gray-300 text-xs focus:ring-2 focus:ring-[#0047A1] outline-none shadow-inner"
                  />
                  <button
                    type="submit"
                    className="bg-[#0047A1] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow hover:bg-[#005f92] transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-[10px] text-slate-400 mt-3">We respect your privacy. Unsubscribe any time.</p>
              </div>
            </motion.section>

          </div>
        )}

        {/* ==================================
            EXPLORE CITY TAB RENDER
            ================================== */}
        {activeTab === "explore" && (
          <div className="max-w-6xl mx-auto px-4 py-16 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block mb-2">INTRODUCING THE CITY</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#0047A1] font-bold">Nature's Wonder. People's Pride.</h2>
              <p className="text-slate-600 mt-3 text-sm md:text-base">
                Bislig City, situated in Surigao del Sur, is blessed with beautiful geographical diversity. It faces the vast Pacific Ocean to the east, producing breathtaking golden sunrises over sprawling coastal islands.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/assets/images/Tinuy.an Featured 1.webp"
                  alt="Bislig Rainforest"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#FB8C00]">SURIGAO DEL SUR</p>
                  <h4 className="text-xl font-bold font-serif">Pristine Waterway Resources</h4>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-[#0047A1] font-bold">Culture, Heritage & the Kamayo Tribe</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The local culture is shaped largely by the **Kamayo tribe**, the original ethnic inhabitants of Bislig and surrounding coastal waters. The Kamayo language is unique, known for its soft intonations and close affinity to classical Visayan dialects.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Historically, Bislig was a key center of the forestry and paper milling industries in Southeast Asia during the late 20th century. Today, the city is transitioning into one of the Philippines' most successful models for community-centric **sustainable eco-tourism**.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-2xl font-bold text-[#0047A1] block">12+</span>
                    <span className="text-xs font-bold text-slate-500 uppercase">Pristine Waterfalls</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#0097A7] block">100%</span>
                    <span className="text-xs font-bold text-slate-500 uppercase">Local Tour Guide Guided</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Seasons and Information */}
            <div className="bg-[#F8F6F2] p-8 rounded-2xl border border-gray-100">
              <h3 className="text-2xl font-serif text-[#0047A1] font-bold mb-6 text-center">Fast Facts for Planning Your Visit</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <span className="text-[#0047A1] font-bold text-sm block mb-2">Optimal Season</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    **March to October** brings warm sunny skies, making it ideal for coastal beach hopping, forest trekking, cave viewing, and boat rentals.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <span className="text-[#0097A7] font-bold text-sm block mb-2">Local Dialects</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    **Kamayo** is native. However, **Cebuano/Visayan**, **Tagalog**, and **English** are universally spoken and understood by locals.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <span className="text-[#FB8C00] font-bold text-sm block mb-2">Financial Advice</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    There are numerous commercial bank ATMs in the city proper. However, carrying cash (Philippine Peso) is highly recommended for entrance fees and local guides.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ==================================
            ATTRACTIONS TAB RENDER
            ================================== */}
        {activeTab === "attractions" && (
          <div className="max-w-6xl mx-auto px-4 py-16 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block mb-2">VISIT THE ICONS</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#0047A1] font-bold">Majestic Natural Coordinates</h2>
              <p className="text-slate-600 mt-3 text-sm md:text-base">
                Explore our waterfalls, spring-fed rivers, quiet caves, and white sand beachheads. Filter and save your favorites to build a dynamic travel plan.
              </p>
            </div>

            {/* Filter buttons and Search bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-gray-100">
              <div className="flex flex-wrap gap-2">
                {["All", "Waterfalls", "Rivers", "Beaches", "Caves", "Parks"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setAttractionFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${
                      attractionFilter === cat
                        ? "bg-[#0047A1] text-white shadow"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search key attraction names..."
                  value={searchQuery === " " ? "" : searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0047A1]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              </div>
            </div>

            {/* Attractions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAttractions.map((att) => {
                const isFavorite = favorites.includes(att.id);
                return (
                  <div
                    key={att.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group hover:border-[#0047A1] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-52 bg-slate-200 relative overflow-hidden">
                        <img
                          src={att.image}
                          alt={att.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(att.id);
                          }}
                          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur shadow hover:scale-110 transition-transform text-red-500"
                          title="Save to My Trip List"
                        >
                          <Heart className={`w-4.5 h-4.5 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
                        </button>
                        <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#0047A1] shadow">
                          {att.category}
                        </span>
                        {!loadingWeather && weatherData && (
                          <span className="absolute bottom-4 right-4 bg-black/65 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 shadow">
                            {getWeatherIcon(weatherData.weatherCode, weatherData.isDay, 11, "text-white")}
                            <span>{weatherData.temperature}°C</span>
                            <span className="text-slate-300 font-medium hidden sm:inline">| {weatherData.condition}</span>
                          </span>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-bold font-serif text-lg text-[#0047A1] group-hover:text-[#0047A1] transition-colors">
                            {att.name}
                          </h3>
                        </div>

                        <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-4">
                          {att.description}
                        </p>

                        <div className="space-y-2 border-t border-slate-50 pt-3 text-[11px] text-slate-400 font-medium">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#0047A1]" />
                            <span>{att.distance} from City center</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#0097A7]" />
                            <span>Approx. {att.travelTime} travel time</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex gap-2">
                      <button
                        onClick={() => setSelectedAttraction(att)}
                        className="flex-grow bg-slate-100 text-[#0047A1] text-center py-2.5 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                      >
                        Read Visitor Guide
                      </button>
                      <button
                        onClick={() => addToItinerary(att, "attraction")}
                        className={`transition-all duration-300 p-2.5 rounded-lg flex items-center justify-center gap-1.5 ${
                          addedFeedback[att.id]
                            ? "bg-[#0097A7] text-white scale-105"
                            : "bg-[#0047A1] text-white hover:bg-[#005f92]"
                        }`}
                        title={addedFeedback[att.id] ? `Added to Day ${selectedItineraryDay}` : "Add to Custom Itinerary"}
                      >
                        {addedFeedback[att.id] ? (
                          <>
                            <Check className="w-4 h-4 animate-scaleIn" />
                            <span className="text-[10px] font-bold px-1 whitespace-nowrap">Added!</span>
                          </>
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ==================================
            THINGS TO DO TAB RENDER
            ================================== */}
        {activeTab === "things-to-do" && (
          <div className="max-w-6xl mx-auto px-4 py-16 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block mb-2">OUTDOOR EXPERIENCES</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#0047A1] font-bold">Unforgettable Adventures</h2>
              <p className="text-slate-600 mt-3 text-sm md:text-base">
                From soaring waterfalls to deep-river cave exploration, Bislig and surrounding nature reserves offer world-class outdoor activities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Waterfall Chasing",
                  icon: "🌊",
                  desc: "Take a traditional bamboo raft (balsa) right underneath the roaring torrent of Tinuy-an Falls for a magnificent hydro-massage.",
                  tips: "Wear dry suits, water goggles, and use a waterproof dry bag."
                },
                {
                  title: "Estuary River Swimming",
                  icon: "🏊",
                  desc: "Swim down the crystal-clear saltwater flow of Hinatuan Enchanted River, surrounded by thick limestone walls and jungle vines.",
                  tips: "Strict life vest rules apply. Use eco-friendly reef-safe sunscreen."
                },
                {
                  title: "Hagonoy Island Hopping",
                  icon: "🏝️",
                  desc: "Rent an outrigger bangka boat from the City Baywalk and land on a glistening white sandbar flanked by a single palm tree stand.",
                  tips: "Best enjoyed during low tide. Purchase fresh crabs at the pier."
                },
                {
                  title: "Hinayagan Cave Exploration",
                  icon: "🕳️",
                  desc: "Trek down a lush valley and crawl into a limestone cathedral decorated with sunbeams piercing through a ceiling dome.",
                  tips: "Wear safety helmets and non-slip sandals. Always follow your local guide."
                },
                {
                  title: "Lake Kayaking",
                  icon: "🛶",
                  desc: "Rent manual wood kayaks on Lake 77 and glide silently over mirror-flat waters reflecting beautiful tall forest canopies.",
                  tips: "Perfect for quiet dawn bird-watching."
                },
                {
                  title: "Hot Stone Jungle Bath",
                  icon: "🔥",
                  desc: "Soak in a giant metal cauldron (kawa) filled with mineral waters, floral petals, and ginger leaves heated gently by wood fire.",
                  tips: "A relaxing traditional body spa treatment at Kawa-Kawa Lodge."
                }
              ].map((act, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl block mb-4">{act.icon}</span>
                  <h4 className="font-bold font-serif text-lg text-[#0047A1] mb-2">{act.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{act.desc}</p>
                  <div className="bg-[#F8F6F2] p-3 rounded-lg border border-gray-100">
                    <p className="text-[10px] font-bold text-[#0097A7] uppercase">Pro Tip</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">{act.tips}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Travel Packing Checklist Section */}
            <TravelChecklist />
          </div>
        )}

        {/* ==================================
            HOTELS & RESORTS TAB RENDER
            ================================== */}
        {activeTab === "hotels" && (
          <div className="max-w-6xl mx-auto px-4 py-16 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block mb-2">WHERE TO STAY</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#0047A1] font-bold">Accommodations & Resorts</h2>
              <p className="text-slate-600 mt-3 text-sm md:text-base">
                From cozy coastal surf cabins to quiet forest eco-lodges, locate the perfect base for your Surigao del Sur exploration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {allAccommodationsPageItems.map((res) => (
                <div
                  key={res.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:border-[#0097A7] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 bg-slate-200 relative">
                      <img src={res.image} alt={res.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <span className="absolute top-4 left-4 bg-white px-2.5 py-1 rounded text-[10px] font-bold text-[#0097A7] shadow">
                        {res.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold font-serif text-lg text-[#0047A1]">{res.name}</h3>
                      </div>
                      <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-4">{res.description}</p>
                      <p className="text-xs font-bold text-[#0097A7]">{res.priceRange}</p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {res.amenities.slice(0, 3).map((amen, idx) => (
                          <span key={idx} className="bg-[#F8F6F2] text-slate-600 px-2 py-0.5 rounded text-[9px] font-medium border border-gray-100">
                            {amen}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex gap-2">
                    <button
                      onClick={() => setSelectedAccommodation(res)}
                      className="flex-grow bg-slate-100 text-[#0047A1] text-center py-2.5 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      View Details & Contact
                    </button>
                    <button
                      onClick={() => addToItinerary(res, "hotel")}
                      className={`transition-all duration-300 p-2.5 rounded-lg flex items-center justify-center gap-1.5 ${
                        addedFeedback[res.id]
                          ? "bg-[#0097A7] text-white scale-105"
                          : "bg-[#0097A7] text-white hover:bg-emerald-700"
                      }`}
                      title={addedFeedback[res.id] ? `Added to Day ${selectedItineraryDay}` : "Add to Custom Itinerary"}
                    >
                      {addedFeedback[res.id] ? (
                        <>
                          <Check className="w-4 h-4 animate-scaleIn" />
                          <span className="text-[10px] font-bold px-1 whitespace-nowrap">Added!</span>
                        </>
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================
            DINING / RESTAURANTS TAB RENDER
            ================================== */}
        {activeTab === "restaurants" && (
          <div className="max-w-6xl mx-auto px-4 py-16 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block mb-2">KAMAYO CUISINE</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#0047A1] font-bold">Restaurants & Cafés</h2>
              <p className="text-slate-600 mt-3 text-sm md:text-base">
                Discover excellent local culinary experiences, specialized highlands cold brews, and coastal seafood platters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {allRestaurantsPageItems.map((rest) => (
                <div
                  key={rest.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:border-[#FB8C00] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 bg-slate-200 relative">
                      <img src={rest.image} alt={rest.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <span className="absolute top-4 left-4 bg-white px-2.5 py-1 rounded text-[10px] font-bold text-[#0047A1] shadow">
                        {rest.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold font-serif text-lg text-[#0047A1]">{rest.name}</h3>
                      </div>
                      <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-4">{rest.description}</p>
                      
                      <div className="bg-[#F8F6F2] p-3 rounded-lg border border-gray-100 mt-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">House Specialties</p>
                        <ul className="text-[10px] text-slate-600 mt-1 space-y-0.5 list-disc pl-3">
                          {rest.specialty.map((spec, i) => (
                            <li key={i}>{spec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex gap-2">
                    <button
                      onClick={() => setSelectedRestaurant(rest)}
                      className="flex-grow bg-slate-100 text-[#0047A1] text-center py-2.5 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      Map & Dining Hours
                    </button>
                    <button
                      onClick={() => addToItinerary(rest, "restaurant")}
                      className={`transition-all duration-300 p-2.5 rounded-lg flex items-center justify-center gap-1.5 ${
                        addedFeedback[rest.id]
                          ? "bg-[#0097A7] text-white scale-105"
                          : "bg-[#0047A1] text-white hover:bg-[#005f92]"
                      }`}
                      title={addedFeedback[rest.id] ? `Added to Day ${selectedItineraryDay}` : "Add to Custom Itinerary"}
                    >
                      {addedFeedback[rest.id] ? (
                        <>
                          <Check className="w-4 h-4 animate-scaleIn" />
                          <span className="text-[10px] font-bold px-1 whitespace-nowrap">Added!</span>
                        </>
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================
            INTERACTIVE MAP & AI ITINERARY TAB RENDER
            ================================== */}
        {activeTab === "map" && (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn">
            
            {/* Header / Intro */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block mb-2">ITINERARY WORKSHOP</span>
              <h2 className="text-3xl font-serif text-[#0047A1] font-bold">Geography & Custom Trip Planner</h2>
              <p className="text-slate-500 text-xs mt-2">
                Browse coordinates on our interactive map dashboard, select items to build a manual travel itinerary, or use our premium server-side AI travel assistant.
              </p>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

              {/* Left Column: Interactive Map Pinpoint Plotter */}
              <div className="lg:col-span-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <div className="flex flex-col gap-3 mb-4">
                  <div>
                    <h3 className="font-bold font-serif text-lg text-[#0047A1]">Interactive Coordinate Plotter</h3>
                    <p className="text-[10px] text-slate-400">Filter by category to view custom pin-points</p>
                  </div>
                  {/* Scrollable filter pill row — never overflows on mobile */}
                  <div className="flex gap-1 bg-[#F8F6F2] p-1 rounded-lg overflow-x-auto scrollbar-hide">
                    {["All", "Waterfalls", "Rivers", "Beaches", "Hotels", "Restaurants"].map((filt) => (
                      <button
                        key={filt}
                        onClick={() => setMapFilter(filt)}
                        className={`px-2.5 py-1.5 text-[9px] font-bold uppercase rounded-md transition-colors shrink-0 ${
                          mapFilter === filt ? "bg-[#0047A1] text-white" : "text-slate-500 hover:text-[#0047A1]"
                        }`}
                      >
                        {filt === "Waterfalls" ? "Falls" : filt === "Restaurants" ? "Dine" : filt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Real Google Maps Component */}
                <GoogleMapSection
                  mapFilter={mapFilter}
                  setSelectedAttraction={setSelectedAttraction}
                  setSelectedAccommodation={setSelectedAccommodation}
                  setSelectedRestaurant={setSelectedRestaurant}
                />

                {/* Quick Help List */}
                <div className="mt-4 p-4 bg-[#F8F6F2] rounded-xl border border-gray-100 flex items-center gap-3">
                  <Info className="w-5 h-5 text-[#0047A1] shrink-0" />
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    **Want to navigate in real life?** Inside the details drawer of any landmark, click the **Open in Google Maps** button to instantly map driving routes in Bislig.
                  </p>
                </div>
              </div>

              {/* Right Column: Custom Itinerary Builder & AI Travel assistant */}
              <div className="lg:col-span-6 space-y-8">
                
                {/* 1. Custom Manual Itinerary Planner */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold font-serif text-lg text-[#0047A1]">Your Personalized Trip</h3>
                    <div className="flex gap-1 bg-[#F8F6F2] p-0.5 rounded-lg border border-gray-100">
                      {[1, 2, 3].map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedItineraryDay(d)}
                          className={`px-3 py-1 text-xs font-bold rounded-md ${
                            selectedItineraryDay === d ? "bg-[#0047A1] text-white" : "text-slate-500"
                          }`}
                        >
                          Day {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Day activity list */}
                  <div className="space-y-3 min-h-[160px] max-h-[300px] overflow-y-auto mb-4 border border-dashed border-gray-200 rounded-xl p-3">
                    {customItinerary[selectedItineraryDay]?.length === 0 ? (
                      <div className="h-32 flex flex-col items-center justify-center text-center">
                        <p className="text-xs text-slate-400">Your Day {selectedItineraryDay} schedule is empty.</p>
                        <p className="text-[10px] text-slate-400 max-w-[280px] mt-1">
                          Click the "+" icon on any tourist attraction, restaurant, or resort card to organize them here.
                        </p>
                      </div>
                    ) : (
                      customItinerary[selectedItineraryDay]?.map((item, idx) => (
                        <div key={idx} className="bg-[#F8F6F2] p-3 rounded-lg flex items-center justify-between border border-gray-100">
                          <div>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-white text-slate-500 font-bold uppercase border">
                              {item.itineraryType}
                            </span>
                            <h4 className="font-bold text-xs text-[#0047A1] mt-1">{item.name}</h4>
                            <p className="text-[9px] text-slate-400">{item.distance || "City center"}</p>
                          </div>
                          <button
                            onClick={() => removeFromItinerary(selectedItineraryDay, item.id)}
                            className="p-1 text-red-500 hover:bg-white rounded-full transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Budget & Action Buttons */}
                  <div className="border-t border-slate-100 pt-4 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Estimated Travel Expenses</p>
                      <p className="text-lg font-bold text-[#0097A7]">₱{itineraryExpenses.toLocaleString()}.00</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          window.print();
                        }}
                        className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold flex items-center gap-1"
                        title="Print Itinerary"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setCustomItinerary({ 1: [], 2: [], 3: [] });
                          alert("Your custom itinerary has been cleared.");
                        }}
                        className="p-2.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg text-xs font-bold"
                        title="Reset All Days"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Premium AI-Powered Travel assistant (contacts Gemini server API) */}
                <div className="bg-gradient-to-br from-[#0047A1] to-slate-900 text-white p-6 rounded-2xl shadow-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#FB8C00] animate-pulse" />
                    <h3 className="font-bold font-serif text-lg">AI Trip Planner Assistant</h3>
                  </div>
                  <p className="text-slate-300 text-xs mb-5">
                    Select your travel options below, and we will instantly build a customized day-by-day travel plan with local advice and budget estimates.
                  </p>

                  <form onSubmit={handleGenerateAiItinerary} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-300 font-bold uppercase block mb-1">Duration (Days)</label>
                        <select
                          value={aiDays}
                          onChange={(e) => setAiDays(parseInt(e.target.value))}
                          className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#FB8C00] text-white outline-none"
                        >
                          {[1, 2, 3, 4, 5].map((d) => (
                            <option key={d} value={d} className="text-slate-900">
                              {d} {d === 1 ? "Day" : "Days"}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-300 font-bold uppercase block mb-1">Budget Tier</label>
                        <select
                          value={aiBudget}
                          onChange={(e) => setAiBudget(e.target.value as any)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#FB8C00] text-white outline-none"
                        >
                          {["Budget", "Mid-range", "Luxury"].map((b) => (
                            <option key={b} value={b} className="text-slate-900">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-300 font-bold uppercase block mb-1">Primary Interest</label>
                        <select
                          value={aiInterest}
                          onChange={(e) => setAiInterest(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#FB8C00] text-white outline-none"
                        >
                          <option value="Waterfall Chasing & Adventure" className="text-slate-900">Waterfalls & Trekking</option>
                          <option value="Beaches & Island Hopping" className="text-slate-900">Beaches & Islands</option>
                          <option value="Local Culture & Heritage" className="text-slate-900">History & Kamayo Tribe</option>
                          <option value="Food & Specialty Coffee Tours" className="text-slate-900">Local Seafood & Cafes</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-300 font-bold uppercase block mb-1">Group Setup</label>
                        <select
                          value={aiGroupSize}
                          onChange={(e) => setAiGroupSize(e.target.value as any)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#FB8C00] text-white outline-none"
                        >
                          {["Solo", "Couple", "Family", "Friends"].map((g) => (
                            <option key={g} value={g} className="text-slate-900">
                              {g} Travel
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isGeneratingAi}
                      className="w-full bg-[#FB8C00] text-slate-900 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#d69f00] disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      {isGeneratingAi ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                          <span>Planning Itinerary...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Generate Custom Itinerary</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Error Alert */}
                  {aiError && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-xs text-red-100 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
                      <span>{aiError}</span>
                    </div>
                  )}

                  {/* AI Generated Itinerary Output Modal/Pane */}
                  {generatedItinerary && (
                    <div className="mt-6 bg-white text-[#0047A1] rounded-xl p-5 space-y-4 max-h-[500px] overflow-y-auto shadow-inner animate-fadeIn">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-3 gap-4">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Curated Schedule</p>
                          <h4 className="font-bold text-sm text-[#0047A1]">{generatedItinerary.itineraryName}</h4>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => exportItineraryToPdf(generatedItinerary)}
                            className="p-1.5 px-2.5 bg-[#0047A1] text-white hover:bg-[#005f92] rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all shadow-sm"
                            title="Download PDF Itinerary"
                          >
                            <Download className="w-3 h-3" />
                            <span>Export PDF</span>
                          </button>
                          <button
                            onClick={() => window.print()}
                            className="p-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all"
                            title="Print Itinerary"
                          >
                            <Printer className="w-3 h-3" />
                            <span>Print</span>
                          </button>
                          <button
                            onClick={() => setGeneratedItinerary(null)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors ml-1"
                            title="Close"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Day Loops */}
                      <div className="space-y-5">
                        {generatedItinerary.days.map((day) => (
                          <div key={day.dayNumber} className="space-y-3">
                            <h5 className="font-bold text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md inline-block">
                              Day {day.dayNumber}: {day.theme}
                            </h5>
                            <div className="space-y-3 pl-2 border-l border-[#0047A1]/30">
                              {day.activities.map((act, idx) => (
                                <div key={idx} className="text-xs">
                                  <div className="flex justify-between items-start">
                                    <span className="font-bold text-[10px] text-slate-400 uppercase tracking-tight">{act.time}</span>
                                    <span className="text-[9px] font-bold text-[#0097A7]">{act.estimatedCost}</span>
                                  </div>
                                  <p className="font-bold text-[#0047A1] mt-0.5">{act.activityName}</p>
                                  <p className="text-[10px] text-slate-400 italic">@ {act.locationName}</p>
                                  <p className="text-slate-500 text-[10px] mt-0.5 leading-relaxed">{act.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Travel Tips */}
                      <div className="bg-[#F8F6F2] p-4 rounded-lg space-y-2 border border-gray-100">
                        <p className="font-bold text-[10px] text-[#0097A7] uppercase tracking-wider">Local Travel Advice</p>
                        <ul className="text-[10px] text-slate-600 space-y-1 list-disc pl-3">
                          {generatedItinerary.travelTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Budget Estimates */}
                      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
                        <p className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">Itinerary Budget Summary (PHP)</p>
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                          <div>Accommodation: <strong className="text-slate-700">{generatedItinerary.budgetBreakdown.accommodation}</strong></div>
                          <div>Food & Dining: <strong className="text-slate-700">{generatedItinerary.budgetBreakdown.food}</strong></div>
                          <div>Tours & Permits: <strong className="text-slate-700">{generatedItinerary.budgetBreakdown.toursAndEntranceFees}</strong></div>
                          <div>Transport Hire: <strong className="text-slate-700">{generatedItinerary.budgetBreakdown.transportation}</strong></div>
                        </div>
                        <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between">
                          <span className="font-bold text-slate-700">Total Est Expense:</span>
                          <span className="font-bold text-[#0097A7]">{generatedItinerary.budgetBreakdown.totalEstimated}</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==================================
            GALLERY TAB RENDER
            ================================== */}
        {activeTab === "gallery" && (
          <div className="max-w-6xl mx-auto px-4 py-16 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block mb-2">LANDSCAPE CAPTURES</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#0047A1] font-bold">Immersive Photography</h2>
              <p className="text-slate-600 mt-3 text-sm md:text-base">
                Admire the breathtaking cascades, mystical spring channels, and community festivities captured by local adventurers.
              </p>
            </div>

            {/* Gallery Category Selectors */}
            <div className="flex flex-wrap gap-2 justify-center mb-10 pb-4 border-b border-gray-100">
              {["All", "Waterfalls", "Rivers", "Beaches", "People", "Food", "Drone"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${
                    galleryFilter === cat
                      ? "bg-[#0047A1] text-white shadow"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_ITEMS.filter((item) => galleryFilter === "All" || item.category === galleryFilter).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxImage({ src: item.image, title: item.title, author: item.author })}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all cursor-pointer group"
                >
                  <div className="h-64 bg-slate-200 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div>
                        <p className="text-white font-bold text-xs">{item.title}</p>
                        <p className="text-white/80 text-[10px]">Photo by: {item.author}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Blog Highlight Stories */}
            <div className="mt-20 border-t border-gray-100 pt-16">
              <h3 className="text-2xl font-serif text-[#0047A1] font-bold text-center mb-10">Department Travel Stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {BLOG_POSTS.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col md:flex-row"
                  >
                    <div className="w-full md:w-44 h-48 bg-slate-200 shrink-0">
                      <img src={post.image} alt={post.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] px-2.5 py-1 bg-[#F8F6F2] rounded-full text-[#0047A1] font-bold uppercase border">
                          {post.category}
                        </span>
                        <h4 className="font-bold font-serif text-base text-[#0047A1] mt-2 line-clamp-2">{post.title}</h4>
                        <p className="text-slate-500 text-xs mt-1 line-clamp-2">{post.excerpt}</p>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-4 border-t border-slate-50 mt-4">
                        <span>{post.date}</span>
                        <button
                          onClick={() => setSelectedBlog(post)}
                          className="text-[#0047A1] hover:underline"
                        >
                          Read Story
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {activeTab === "car-rental" && (
          <div className="w-full">
            <CarRental />
          </div>
        )}

        {activeTab === "directory" && (
          <div className="max-w-6xl mx-auto px-4 py-16 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block mb-2">LOCAL RESOURCES</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#0047A1] font-bold">Bislig City Business & Services Directory</h2>
              <p className="text-slate-600 mt-3 text-sm md:text-base">
                Discover the best local accommodations, dining spots, shopping centers, convenience stores, sports facilities, churches, landmarks, and emergency services around Bislig proper.
              </p>
            </div>

            {/* Filter and Search Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-12 space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search establishments by name or location..."
                  value={directorySearchQuery}
                  onChange={(e) => setDirectorySearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0047A1] focus:ring-1 focus:ring-[#0047A1] transition-all bg-[#FAFAFA]"
                />
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {["All", "Accommodations", "Dining & Cafes", "Attractions", "Shops & Malls", "Sports & Recreation", "Churches & Landmarks", "Surfing & Beaches", "Services & Others"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedDirectoryCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all border ${
                      selectedDirectoryCategory === cat
                        ? "bg-[#0047A1] border-[#0047A1] text-white shadow-sm"
                        : "bg-[#FAFCFC] border-slate-200 text-slate-600 hover:border-[#0047A1] hover:text-[#0047A1]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Establishments */}
            {filteredEstablishments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEstablishments.map((est) => (
                  <div
                    key={est.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="h-48 bg-slate-100 relative overflow-hidden group shrink-0">
                      <img
                        src={est.image}
                        alt={est.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="text-[9px] font-extrabold uppercase px-2.5 py-1 bg-white text-slate-800 rounded-full shadow-sm border border-slate-100 tracking-wider">
                          {est.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow space-y-3">
                      <div className="flex items-center">
                        <span className="text-[10px] text-slate-400 font-semibold">{est.operatingHours}</span>
                      </div>

                      <h3 className="text-lg font-bold font-serif text-[#0047A1] leading-snug line-clamp-1">
                        {est.name}
                      </h3>

                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                        {est.description}
                      </p>

                      <div className="flex items-center gap-1 text-slate-400 text-[11px] pt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{est.location}</span>
                      </div>

                      <div className="pt-4 mt-auto">
                        <button
                          onClick={() => setSelectedEstablishment(est)}
                          className="w-full bg-[#FAFCFC] border border-slate-200 text-[#0047A1] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center cursor-pointer hover:bg-[#0047A1] hover:text-white hover:border-[#0047A1] transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>View Business Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-serif font-bold text-slate-700">No Establishments Found</h3>
                <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
                  We couldn't find any results matching "{directorySearchQuery}" in the category "{selectedDirectoryCategory}".
                </p>
                <button
                  onClick={() => {
                    setDirectorySearchQuery("");
                    setSelectedDirectoryCategory("All");
                  }}
                  className="mt-6 px-5 py-2.5 bg-[#0047A1] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#005f92] transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================
            EVENTS LIST PAGE
            ================================== */}
        {activeTab === "events" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-4 py-16"
          >
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[#FB8C00] text-xs font-bold uppercase tracking-[0.25em] block mb-2">Bislig City</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#0047A1] font-bold mb-3">Events & Festivals</h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Discover the vibrant cultural calendar of Bislig City — from ancient tribal festivals to modern sports marathons — every event a window into the heart of the Kamayo people.
              </p>
            </div>

            {/* Visual Calendar Strip */}
            <div className="bg-[#1D3557] rounded-2xl p-6 mb-12 overflow-x-auto">
              <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-5 text-center">2025 Event Calendar</h3>
              <div className="flex gap-3 justify-center flex-wrap">
                {["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"].map((m) => {
                  const eventsInMonth = EVENTS.filter(e => e.month === m);
                  const hasEvent = eventsInMonth.length > 0;
                  return (
                    <div key={m} className={`relative flex flex-col items-center gap-1.5 ${hasEvent ? "cursor-pointer" : ""}`}>
                      <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all ${
                        hasEvent
                          ? "bg-[#FB8C00] shadow-lg shadow-[#FB8C00]/30 scale-110"
                          : "bg-white/10"
                      }`}>
                        <span className="text-[9px] font-bold text-white/70 uppercase">{m}</span>
                        {hasEvent && (
                          <span className="text-white font-bold text-base leading-none">{eventsInMonth[0].day}</span>
                        )}
                        {!hasEvent && <span className="text-white/30 text-xs">—</span>}
                      </div>
                      {hasEvent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C00] animate-pulse"></span>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-white/40 text-center text-[10px] mt-4 uppercase tracking-wider">Orange months have scheduled events</p>
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {EVENTS.map((evt, idx) => {
                const typeColors: Record<string, string> = {
                  Festival: "bg-purple-500/20 text-purple-300 border-purple-500/30",
                  Community: "bg-blue-500/20 text-blue-300 border-blue-500/30",
                  Sports: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                  Seasonal: "bg-amber-500/20 text-amber-300 border-amber-500/30"
                };
                return (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                  >
                    <button
                      onClick={() => { setSelectedEventId(evt.id); setActiveTab("event-detail"); }}
                      className="w-full text-left group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                    >
                      {/* Card Image */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        {/* Date badge */}
                        <div className="absolute top-4 left-4 bg-[#0047A1] text-white rounded-xl px-3 py-2 text-center min-w-[52px] shadow-lg">
                          <p className="text-[9px] font-bold uppercase tracking-wider opacity-80">{evt.month}</p>
                          <p className="text-xl font-bold leading-none">{evt.day}</p>
                        </div>
                        {/* Type badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border backdrop-blur-sm ${typeColors[evt.type]}`}>
                            {evt.type}
                          </span>
                        </div>
                      </div>
                      {/* Card Body */}
                      <div className="p-5">
                        <h3 className="font-serif font-bold text-lg text-[#0047A1] group-hover:text-[#0097A7] transition-colors leading-snug">{evt.title}</h3>
                        <p className="text-xs text-slate-400 mt-1 mb-3 flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {evt.location}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{evt.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {evt.tags.slice(0,3).map(tag => (
                              <span key={tag} className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                          </div>
                          <span className="text-xs font-bold text-[#0047A1] group-hover:text-[#FB8C00] transition-colors flex items-center gap-1">
                            Read <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ==================================
            EVENT DETAIL BLOG PAGE
            ================================== */}
        {activeTab === "event-detail" && selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Banner */}
            <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
              <img
                src={selectedEvent.heroImage}
                alt={selectedEvent.title}
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              {/* Back button */}
              <button
                onClick={() => setActiveTab("events")}
                className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-white/30"
              >
                <ChevronLeft className="w-4 h-4" /> All Events
              </button>
              {/* Hero text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-4xl">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FB8C00]">{selectedEvent.type}</span>
                  <span className="text-white/50 text-xs">·</span>
                  <span className="text-white/70 text-xs">{selectedEvent.dateRange}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-2">{selectedEvent.title}</h1>
                <p className="text-white/80 text-sm md:text-base max-w-2xl">{selectedEvent.subtitle}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="max-w-5xl mx-auto px-4 py-12">
              {/* Meta bar */}
              <div className="flex flex-wrap gap-6 pb-8 mb-8 border-b border-gray-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0047A1]" />
                  <span>{selectedEvent.dateRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0097A7]" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FB8C00]" />
                  <span>{selectedEvent.organizer}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main article content */}
                <div className="lg:col-span-2 space-y-10">

                  {/* Overview */}
                  <section>
                    <h2 className="text-xl font-serif font-bold text-[#0047A1] mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#0047A1] rounded-full block"></span>
                      Overview
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">{selectedEvent.overview}</p>
                  </section>

                  {/* History */}
                  <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h2 className="text-xl font-serif font-bold text-[#0047A1] mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#FB8C00] rounded-full block"></span>
                      History & Origin
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-sm">{selectedEvent.history}</p>
                  </section>

                  {/* Highlights */}
                  <section>
                    <h2 className="text-xl font-serif font-bold text-[#0047A1] mb-5 flex items-center gap-2">
                      <span className="w-1 h-6 bg-emerald-500 rounded-full block"></span>
                      Event Highlights
                    </h2>
                    <ul className="space-y-3">
                      {selectedEvent.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <span className="w-5 h-5 shrink-0 rounded-full bg-[#0047A1]/10 text-[#0047A1] flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Photo Gallery */}
                  <section>
                    <h2 className="text-xl font-serif font-bold text-[#0047A1] mb-5 flex items-center gap-2">
                      <span className="w-1 h-6 bg-purple-500 rounded-full block"></span>
                      Event Gallery
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedEvent.gallery.map((img, i) => (
                        <div key={i} className="aspect-video rounded-xl overflow-hidden">
                          <img src={img} alt={`${selectedEvent.title} gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </section>

                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Schedule */}
                  <div className="bg-[#1D3557] rounded-2xl p-6 text-white">
                    <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-[#FB8C00]">Program Schedule</h3>
                    <div className="space-y-4">
                      {selectedEvent.schedule.map((s, i) => (
                        <div key={i} className="flex gap-3 text-xs border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <div className="shrink-0">
                            <span className="text-[#FB8C00] font-bold block leading-tight">{s.time}</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{s.activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visitor Tips */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-amber-800 mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Visitor Tips
                    </h3>
                    <ul className="space-y-3">
                      {selectedEvent.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-amber-900 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map(tag => (
                        <span key={tag} className="text-[11px] bg-[#0047A1]/10 text-[#0047A1] px-3 py-1 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="w-full bg-[#0047A1] hover:bg-[#005f92] text-white py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Mail className="w-4 h-4" /> Inquire About This Event
                  </button>
                </div>
              </div>

              {/* More Events */}
              <div className="mt-14 pt-10 border-t border-gray-100">
                <h3 className="font-serif font-bold text-xl text-[#0047A1] mb-6">More Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {EVENTS.filter(e => e.id !== selectedEvent.id).map(evt => (
                    <button
                      key={evt.id}
                      onClick={() => { setSelectedEventId(evt.id); setActiveTab("event-detail"); }}
                      className="group text-left bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="h-32 overflow-hidden">
                        <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-4">
                        <span className="text-[9px] text-[#FB8C00] font-bold uppercase tracking-wider">{evt.month} {evt.day} · {evt.type}</span>
                        <h4 className="font-serif font-bold text-sm text-[#0047A1] mt-1 group-hover:text-[#0097A7] transition-colors">{evt.title}</h4>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================
            CONTACT US TAB RENDER
            ================================== */}
        {activeTab === "contact" && (

          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="max-w-6xl mx-auto px-4 py-16"
          >
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block mb-2">GET IN TOUCH</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#0047A1] font-bold">Connect With Us</h2>
              <p className="text-slate-600 mt-3 text-sm md:text-base">
                Have questions about your trip, rentals, or bookings? Send us a message and our official tourism officers will get back to you shortly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Contact Details Column */}
              <div className="lg:col-span-5 space-y-8 bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#0047A1] mb-2">Tourism Headquarters</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Official Information & Assistance Center, Department of Tourism, Bislig City Administration.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#0097A7] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-700">Office Address</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Tourism Building, Baywalk Park, Brgy. Poblacion, Bislig City, Surigao del Sur, Philippines
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-700">Hotlines</h4>
                      <p className="text-xs text-slate-500 mt-1 font-mono leading-relaxed">
                        Tourism: +63 (086) 853-6089<br />
                        Emergency PNP: +63 998-598-6754
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-700">Official Email</h4>
                      <p className="text-xs text-slate-500 mt-1 font-mono leading-relaxed">
                        tourism@bislig.gov.ph
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="font-bold text-xs text-slate-700 mb-2">Office Hours</h4>
                  <p className="text-xs text-slate-500">Monday – Friday: 8:00 AM – 5:00 PM PHT</p>
                  <p className="text-[10px] text-slate-400 mt-1">Closed on weekends and public holidays.</p>
                </div>
              </div>

              {/* Kajabi Form Embedded Column */}
              <div className="lg:col-span-7 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm relative">
                <KajabiFormEmbed />
              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* ==================================
          DETAILED ATTRACTIOn DRAWER MODAL
          ================================== */}
      {selectedAttraction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#FAFCFC] text-[#0047A1] w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col relative">
            {/* STICKY CLOSE BUTTON AT TOP-RIGHT OF MODAL */}
            <button
              onClick={() => setSelectedAttraction(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm shadow-lg z-50 transition-transform hover:scale-105 cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto">
              {/* Image Header banner with Interactive Auto-playing Carousel */}
              <div className="h-72 sm:h-80 bg-slate-300 relative overflow-hidden">
                <ImageCarousel 
                  images={ATTRACTION_PHOTOS[selectedAttraction.id] || [selectedAttraction.image]} 
                  attractionName={selectedAttraction.name}
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0047A1]/90 via-[#0047A1]/30 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-6 left-6 text-white z-20 pointer-events-none">
                  <span className="text-[10px] px-2.5 py-1 bg-[#0097A7] text-white rounded-full font-bold uppercase shadow-md">
                    {selectedAttraction.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mt-2 tracking-tight text-white drop-shadow-md">{selectedAttraction.name}</h2>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap gap-4 text-xs font-semibold border-b border-slate-100 pb-4">
                  <div className="bg-slate-100 px-3 py-1.5 rounded-md text-slate-600">
                    Entrance: <strong className="text-slate-700">{selectedAttraction.entranceFee}</strong>
                  </div>
                  <div className="bg-slate-100 px-3 py-1.5 rounded-md text-slate-600">
                    Hours: <strong className="text-slate-700">{selectedAttraction.openingHours}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-lg mb-2">About this Coordinate</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{selectedAttraction.longDescription}</p>
                </div>

                {/* Weather-Specific Dynamic Travel Tip */}
                {weatherData && (
                  <div className="p-4 rounded-xl border flex items-start gap-3 bg-gradient-to-r transition-all duration-300 shadow-sm border-[#0047A1]/15 bg-[#0047A1]/5">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-lg shrink-0 flex items-center justify-center">
                      {getWeatherIcon(weatherData.weatherCode, weatherData.isDay, 20)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#0047A1]">Live Weather Advisory</span>
                        <span className="text-[10px] text-slate-500 font-semibold">• {weatherData.temperature}°C {weatherData.condition}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {(() => {
                          const code = weatherData.weatherCode;
                          if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99)) {
                            return "It is currently raining or stormy in Bislig. We highly recommend bringing proper rain gear (like an umbrella or raincoat), wearing sturdy slip-resistant footwear, and being cautious near slippery rocks. Some outdoor water activities or raft rides might be paused for visitor safety.";
                          }
                          if (code === 0) {
                            return "Beautiful clear sky and sunny weather in Bislig! Perfect for taking gorgeous photos, swimming, and outdoor tours. Make sure to apply reef-safe sunblock, wear sunglasses/hat, and stay hydrated with a water bottle.";
                          }
                          return "We have overcast or cloudy skies in Bislig right now. It's a fantastic day to explore without the intense tropical heat, and the soft lighting is prime for landscape photography! We suggest keeping a light umbrella nearby just in case of light passing showers.";
                        })()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Traveler Advice Checklist */}
                <div className="bg-[#F8F6F2] p-5 rounded-xl border border-gray-100 space-y-3">
                  <h5 className="text-[11px] font-bold text-[#0097A7] uppercase tracking-wider">Official Visitor Guidelines</h5>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                    {selectedAttraction.travelTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <h5 className="font-bold text-[#0047A1] mb-1">Nearby Dining</h5>
                    <p className="text-slate-500 text-[11px]">{selectedAttraction.nearbyRestaurants.join(", ")}</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0047A1] mb-1">Accessibility Support</h5>
                    <p className="text-slate-500 text-[11px]">{selectedAttraction.accessibility}</p>
                  </div>
                </div>

                {/* Action Redirection Button to Google Maps */}
                <div className="pt-6 border-t border-slate-100 flex gap-4">
                  <a
                    href={selectedAttraction.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-grow bg-[#0047A1] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-[#005f92] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open on Google Maps</span>
                  </a>
                  <button
                    onClick={() => addToItinerary(selectedAttraction, "attraction")}
                    className={`px-6 py-3 rounded-lg text-xs font-bold uppercase transition-all duration-300 ${
                      addedFeedback[selectedAttraction.id]
                        ? "bg-[#0097A7] text-white scale-105"
                        : "bg-[#2D9B8B] text-white hover:bg-emerald-700"
                    }`}
                  >
                    {addedFeedback[selectedAttraction.id] ? "Added to Itinerary ✓" : "Add to Custom Itinerary"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACCOMMODATION DETAILS MODAL */}
      {selectedAccommodation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAFCFC] text-[#0047A1] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="h-52 bg-slate-300 relative">
              <img src={selectedAccommodation.image} alt={selectedAccommodation.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedAccommodation(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[9px] px-2 py-0.5 bg-[#0097A7] text-white rounded font-bold uppercase">{selectedAccommodation.category}</span>
                <h3 className="text-xl font-bold font-serif mt-1">{selectedAccommodation.name}</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-600 text-xs leading-relaxed">{selectedAccommodation.description}</p>
              
              <div className="text-xs space-y-1.5 border-t border-b border-slate-100 py-3">
                <p>💸 Price Range: <strong className="text-emerald-600">{selectedAccommodation.priceRange}</strong></p>
                <p>📞 Phone/Contact: <strong>{selectedAccommodation.contact}</strong></p>
                <p>🌐 Site Links: <a href={selectedAccommodation.website} target="_blank" rel="noreferrer" className="text-[#0047A1] underline">{selectedAccommodation.website}</a></p>
                <p>⏰ Check-In/Hours: <strong>{selectedAccommodation.operatingHours}</strong></p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Standard Lodge Amenities</p>
                <div className="flex flex-wrap gap-1">
                  {selectedAccommodation.amenities.map((amen, idx) => (
                    <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-[9px] text-slate-600 font-medium">{amen}</span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={selectedAccommodation.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#0047A1] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  <ExternalLink className="w-4.5 h-4.5" />
                  <span>Navigate with Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESTAURANT DETAILS MODAL */}
      {selectedRestaurant && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAFCFC] text-[#0047A1] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="h-52 bg-slate-300 relative">
              <img src={selectedRestaurant.image} alt={selectedRestaurant.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[9px] px-2 py-0.5 bg-orange-500 text-white rounded font-bold uppercase">{selectedRestaurant.category}</span>
                <h3 className="text-xl font-bold font-serif mt-1">{selectedRestaurant.name}</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-600 text-xs leading-relaxed">{selectedRestaurant.description}</p>

              <div className="text-xs space-y-1.5 border-t border-b border-slate-100 py-3">
                <p>💸 Price Class: <strong className="text-slate-700">{selectedRestaurant.priceRange}</strong></p>
                <p>⏰ Dining Hours: <strong>{selectedRestaurant.operatingHours}</strong></p>
                <p>📞 Phone Booking: <strong>{selectedRestaurant.contact}</strong></p>
                <p>🌐 Social Page: <a href={`https://${selectedRestaurant.socialMedia}`} target="_blank" rel="noreferrer" className="text-[#0047A1] underline">{selectedRestaurant.socialMedia}</a></p>
                <p>💻 Official Website: <a href={selectedRestaurant.website} target="_blank" rel="noreferrer" className="text-[#0047A1] underline hover:text-[#005f92] transition-colors">{selectedRestaurant.website}</a></p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">House Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {selectedRestaurant.specialty.map((spec, idx) => (
                    <span key={idx} className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[9px] font-semibold border border-orange-100">{spec}</span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={selectedRestaurant.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#0047A1] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  <ExternalLink className="w-4.5 h-4.5" />
                  <span>Navigate with Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BLOG STORY READING MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAFCFC] text-[#0047A1] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="h-64 bg-slate-300 relative shrink-0">
              <img src={selectedBlog.image} alt={selectedBlog.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[9px] px-2 py-0.5 bg-[#0047A1] text-white rounded font-bold uppercase">{selectedBlog.category}</span>
                <h3 className="text-xl md:text-2xl font-bold font-serif mt-1">{selectedBlog.title}</h3>
              </div>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold border-b border-slate-100 pb-2">
                <span>By: {selectedBlog.author}</span>
                <span>{selectedBlog.date} • {selectedBlog.readTime}</span>
              </div>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-line">{selectedBlog.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* ESTABLISHMENT DETAILS MODAL */}
      {selectedEstablishment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAFCFC] text-[#0047A1] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="h-52 bg-slate-300 relative shrink-0">
              <img src={selectedEstablishment.image} alt={selectedEstablishment.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedEstablishment(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-800 cursor-pointer shadow-sm hover:bg-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
                <span className="text-[9px] px-2 py-0.5 bg-[#0047A1] text-white rounded font-bold uppercase">{selectedEstablishment.category}</span>
                <h3 className="text-xl font-bold font-serif mt-1 text-white">{selectedEstablishment.name}</h3>
              </div>
            </div>
            <div className="p-6 space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto">


              <p className="text-slate-600 text-xs leading-relaxed">
                {selectedEstablishment.longDescription || selectedEstablishment.description}
              </p>

              <div className="text-xs space-y-2.5 border-t border-b border-slate-100 py-4 text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#0047A1] shrink-0 mt-0.5" />
                  <p>📍 Location: <strong className="text-slate-700">{selectedEstablishment.location}</strong></p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#0047A1] shrink-0" />
                  <p>⏰ Hours: <strong className="text-slate-700">{selectedEstablishment.operatingHours}</strong></p>
                </div>
                {selectedEstablishment.contact !== "N/A" && selectedEstablishment.contact !== "N/A (Public Market Authority)" && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#0047A1] shrink-0" />
                    <p>📞 Contact: <strong className="text-slate-700">{selectedEstablishment.contact}</strong></p>
                  </div>
                )}
                {selectedEstablishment.socialMedia !== "N/A" && (
                  <div className="flex items-center gap-2">
                    <Facebook className="w-3.5 h-3.5 text-[#0047A1] shrink-0" />
                    <p>🌐 Socials: <a href={`https://${selectedEstablishment.socialMedia}`} target="_blank" rel="noreferrer" className="text-[#0047A1] underline hover:text-[#005f92] transition-colors">{selectedEstablishment.socialMedia}</a></p>
                  </div>
                )}
                {selectedEstablishment.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#0047A1] shrink-0" />
                    <p>💻 Website: <a href={selectedEstablishment.website} target="_blank" rel="noreferrer" className="text-[#0047A1] underline hover:text-[#005f92] transition-colors">{selectedEstablishment.website}</a></p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <a
                  href={selectedEstablishment.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#0047A1] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  <ExternalLink className="w-4.5 h-4.5" />
                  <span>Navigate with Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4 cursor-zoom-out"
        >
          <img src={lightboxImage.src} alt={lightboxImage.title} referrerPolicy="no-referrer" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
          <div className="text-center mt-4">
            <p className="text-white font-bold text-sm">{lightboxImage.title}</p>
            <p className="text-slate-400 text-xs">Photograph by {lightboxImage.author}</p>
          </div>
        </div>
      )}

      {/* ==================================
          BOTTOM UTILITY FOOTER
          ================================== */}
      <footer className="bg-[#1D3557] px-4 md:px-10 py-10 text-white border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center">
              <div className="w-16 h-16 relative shrink-0">
                <img src="/assets/images/logo.jpg" className="w-full h-full object-cover rounded-full border border-white/20 shadow-sm bg-white" alt="Bislig City Tourism Logo" />
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Official digital tourism portal for Bislig City Tourism, Mindanao, Philippines. Working hand in hand with the local Kamayo tribal council to offer pristine sustainable nature adventures.
            </p>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-serif font-bold text-lg text-white mb-4">Quick Links</h5>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li>
                <button 
                  onClick={() => { setActiveTab("attractions"); setAttractionFilter("Waterfalls"); }} 
                  className="hover:text-[#FB8C00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C00]/60"></span>
                  <span>Tinuy-an Falls</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab("attractions"); setAttractionFilter("Rivers"); }} 
                  className="hover:text-[#FB8C00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C00]/60"></span>
                  <span>Enchanted River</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab("attractions"); setAttractionFilter("Waterfalls"); }} 
                  className="hover:text-[#FB8C00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C00]/60"></span>
                  <span>Kawa-kawa sa Awog</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab("attractions"); setAttractionFilter("Beaches"); }} 
                  className="hover:text-[#FB8C00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C00]/60"></span>
                  <span>Hagonoy Island</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("contact")} 
                  className="hover:text-[#FB8C00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C00]/60"></span>
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("admin")} 

                  className="hover:text-[#FB8C00] text-slate-400 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500/60"></span>
                  <span>🔒 Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h5 className="font-serif font-bold text-lg text-white mb-4">Tourism Downloads</h5>
            <div className="space-y-3">
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()} 
                className="block border border-white/10 rounded-xl p-3 bg-slate-900/35 hover:bg-slate-900/50 transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h6 className="font-sans font-bold text-xs text-white group-hover:text-[#FB8C00] transition-colors">Official Travel Guide</h6>
                    <p className="text-[10px] text-slate-400 font-mono">PDF &bull; 8.4 MB</p>
                  </div>
                  <Download className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
              </a>
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()} 
                className="block border border-white/10 rounded-xl p-3 bg-slate-900/35 hover:bg-slate-900/50 transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h6 className="font-sans font-bold text-xs text-white group-hover:text-[#FB8C00] transition-colors">Official GIS City Map</h6>
                    <p className="text-[10px] text-slate-400 font-mono">PDF &bull; 12.1 MB</p>
                  </div>
                  <Download className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
              </a>
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()} 
                className="block border border-white/10 rounded-xl p-3 bg-slate-900/35 hover:bg-slate-900/50 transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h6 className="font-sans font-bold text-xs text-white group-hover:text-[#FB8C00] transition-colors">Festival Brochure</h6>
                    <p className="text-[10px] text-slate-400 font-mono">PDF &bull; 4.2 MB</p>
                  </div>
                  <Download className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h5 className="font-serif font-bold text-lg text-white mb-4">Emergency Hotlines</h5>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h6 className="font-sans font-bold text-xs text-white">Tourism Office</h6>
                  <p className="text-[11px] text-slate-300 font-mono mt-0.5">+63 (086) 853-6089</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h6 className="font-sans font-bold text-xs text-white">Tourist Police (PNP)</h6>
                  <p className="text-[11px] text-slate-300 font-mono mt-0.5">+63 998-598-6754</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h6 className="font-sans font-bold text-xs text-white">City Hospital</h6>
                  <p className="text-[11px] text-slate-300 font-mono mt-0.5">(086) 853-2214</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            <p>© 2026 Bislig City Tourism. All Rights Reserved. Promoting Sustainable and Ethical Eco-Tourism.</p>
          </div>
          
          <div className="flex gap-4">
            <a href="https://facebook.com/bisligtourism" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
            <a href="https://instagram.com/bisligtourism" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <span className="text-slate-600">|</span>
            <button onClick={() => setActiveTab("admin")} className="hover:text-white transition-colors cursor-pointer text-slate-400 font-semibold">Admin Portal</button>
            <span className="text-slate-600">|</span>
            <span>v2.2.0 WCAG Compliant</span>
          </div>
        </div>
      </footer>

      {/* Floating Interactive AI Chatbot Concierge */}
      <AiChatbot />
    </div>
  );
}
