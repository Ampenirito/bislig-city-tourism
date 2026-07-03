import React, { useState, useMemo, useEffect } from "react";
import { MapPin, Compass, Search, ExternalLink, Moon, Sun, Layers, Star, Navigation } from "lucide-react";
import { ATTRACTIONS, ACCOMMODATIONS, RESTAURANTS } from "../data";
import { Attraction, Accommodation, Restaurant } from "../types";

interface GoogleMapSectionProps {
  mapFilter: string;
  setSelectedAttraction: (attraction: Attraction) => void;
  setSelectedAccommodation: (accommodation: Accommodation) => void;
  setSelectedRestaurant: (restaurant: Restaurant) => void;
}

export default function GoogleMapSection({
  mapFilter,
  setSelectedAttraction,
  setSelectedAccommodation,
  setSelectedRestaurant
}: GoogleMapSectionProps) {
  // Combine all location data into a uniform item representation for listing
  const allLocations = useMemo(() => {
    const attrs = ATTRACTIONS.map((item) => ({
      ...item,
      mapType: "attraction" as const,
      color: "#0047A1",
      badgeColor: "bg-[#0047A1]",
      glyph: "F",
      displayCategory: item.category
    }));
    const accs = ACCOMMODATIONS.map((item) => ({
      ...item,
      mapType: "accommodation" as const,
      color: "#6C5CE7",
      badgeColor: "bg-[#6C5CE7]",
      glyph: "H",
      displayCategory: item.category
    }));
    const rests = RESTAURANTS.map((item) => ({
      ...item,
      mapType: "restaurant" as const,
      color: "#E76F51",
      badgeColor: "bg-[#E76F51]",
      glyph: "D",
      displayCategory: item.category
    }));
    return [...attrs, ...accs, ...rests];
  }, []);

  // Filter state for search/chips
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "attraction" | "accommodation" | "restaurant">("all");
  const [mapType, setMapType] = useState<"m" | "k">("m"); // m = standard map, k = satellite

  // The active selected location on the map. Default is Tinuy-an Falls.
  const [activeLocation, setActiveLocation] = useState<any>(() => {
    return allLocations.find((loc) => loc.id === "tinuy-an") || allLocations[0];
  });

  // Keep active location in sync if parent's selected location filter forces a filter change
  useEffect(() => {
    if (mapFilter !== "All") {
      let filtered = allLocations;
      if (mapFilter === "Waterfalls") {
        filtered = allLocations.filter(l => l.mapType === "attraction" && (l.displayCategory === "Waterfalls" || l.displayCategory === "Caves"));
      } else if (mapFilter === "Rivers") {
        filtered = allLocations.filter(l => l.mapType === "attraction" && l.displayCategory === "Rivers");
      } else if (mapFilter === "Beaches") {
        filtered = allLocations.filter(l => l.mapType === "attraction" && l.displayCategory === "Beaches");
      } else if (mapFilter === "Hotels") {
        filtered = allLocations.filter(l => l.mapType === "accommodation");
      } else if (mapFilter === "Restaurants") {
        filtered = allLocations.filter(l => l.mapType === "restaurant");
      }

      if (filtered.length > 0 && !filtered.some(f => f.id === activeLocation.id)) {
        setActiveLocation(filtered[0]);
      }
    }
  }, [mapFilter, allLocations, activeLocation.id]);

  // Handle location selection
  const handleSelectLocation = (loc: any) => {
    setActiveLocation(loc);
    
    // Invoke correct parent selection state so details drawer pops up
    if (loc.mapType === "attraction") {
      setSelectedAttraction(loc as Attraction);
    } else if (loc.mapType === "accommodation") {
      setSelectedAccommodation(loc as Accommodation);
    } else if (loc.mapType === "restaurant") {
      setSelectedRestaurant(loc as Restaurant);
    }
  };

  // Filter items to show in the list based on query, tabs, and parent mapFilter
  const filteredList = useMemo(() => {
    return allLocations.filter((item) => {
      // 1. Parent Tab filter (mapFilter)
      if (mapFilter !== "All") {
        if (mapFilter === "Waterfalls" && !(item.mapType === "attraction" && (item.displayCategory === "Waterfalls" || item.displayCategory === "Caves"))) return false;
        if (mapFilter === "Rivers" && !(item.mapType === "attraction" && item.displayCategory === "Rivers")) return false;
        if (mapFilter === "Beaches" && !(item.mapType === "attraction" && item.displayCategory === "Beaches")) return false;
        if (mapFilter === "Hotels" && item.mapType !== "accommodation") return false;
        if (mapFilter === "Restaurants" && item.mapType !== "restaurant") return false;
      }

      // 2. Local type tab
      if (activeTab !== "all" && item.mapType !== activeTab) return false;

      // 3. Search text query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.displayCategory.toLowerCase().includes(query);
        const matchesDesc = (item.description || "").toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      return true;
    });
  }, [allLocations, mapFilter, activeTab, searchQuery]);

  // Construct Google Map dynamic embed url
  // Using classic dynamic embedding search format which works flawlessly without API key credentials
  const mapEmbedUrl = useMemo(() => {
    // We add specific details to ensure precision on Google Map's backend query search engine
    const queryStr = `${activeLocation.name}, Bislig, Surigao del Sur, Philippines`;
    const zoomLevel = activeLocation.name === "Hagonoy Island" ? 14 : 13;
    return `https://maps.google.com/maps?q=${encodeURIComponent(queryStr)}&t=${mapType}&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;
  }, [activeLocation, mapType]);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[520px]">
      
      {/* LEFT COLUMN: Map Canvas Iframe */}
      <div className="w-full md:w-3/5 h-[240px] md:h-full relative bg-slate-100 flex flex-col border-b md:border-b-0 md:border-r border-slate-200">
        
        {/* HUD Overlay / Floating Information Badge */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md border border-slate-200/50 flex items-center gap-2 max-w-[80%] pointer-events-auto">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shrink-0 ${activeLocation.badgeColor}`}>
              {activeLocation.glyph}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-800 truncate font-serif">{activeLocation.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-500 font-medium">
                <span className="truncate">{activeLocation.displayCategory}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Map vs Satellite Toggle */}
            <button
              onClick={() => setMapType(prev => prev === "m" ? "k" : "m")}
              className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-slate-200/50 flex items-center justify-center text-slate-600 hover:text-[#0047A1] hover:bg-white transition"
              title={mapType === "m" ? "Switch to Satellite View" : "Switch to Map View"}
            >
              <Layers className="w-4 h-4" />
            </button>
            
            {/* Real Navigation Redirector */}
            <a
              href={activeLocation.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-slate-200/50 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:bg-white transition"
              title="Open Directions in Google Maps"
            >
              <Navigation className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* The Free Live Iframe Map */}
        <div className="w-full h-full flex-grow relative">
          <iframe
            title={`Google Map - ${activeLocation.name}`}
            src={mapEmbedUrl}
            className="w-full h-full border-0 grayscale-[5%] contrast-[105%]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Dynamic status footer with simple navigation coordinates and details */}
        <div className="bg-slate-50/90 backdrop-blur-sm px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
          <span className="font-mono text-slate-400">
            LAT: {activeLocation.coordinates.lat.toFixed(4)} • LNG: {activeLocation.coordinates.lng.toFixed(4)}
          </span>
          <button 
            onClick={() => handleSelectLocation(activeLocation)}
            className="text-[#0047A1] font-bold hover:underline flex items-center gap-0.5"
          >
            <span>Read Complete Visitor Log</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Pin & Location Selection List */}
      <div className="w-full md:w-2/5 h-[280px] md:h-full flex flex-col bg-slate-50/50">
        
        {/* Subheader / Search Filter Controls */}
        <div className="p-3 border-b border-slate-200 bg-white space-y-2">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search attractions, dining, cafes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-[#0047A1] focus:bg-white transition"
            />
          </div>

          {/* Segmented type filter tabs */}
          <div className="flex bg-slate-100 rounded-md p-0.5 text-[10px] font-bold">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 text-center py-1 rounded transition-all ${
                activeTab === "all" ? "bg-white text-[#0047A1] shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("attraction")}
              className={`flex-1 text-center py-1 rounded transition-all ${
                activeTab === "attraction" ? "bg-white text-[#0047A1] shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sights
            </button>
            <button
              onClick={() => setActiveTab("accommodation")}
              className={`flex-1 text-center py-1 rounded transition-all ${
                activeTab === "accommodation" ? "bg-white text-[#6C5CE7] shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Stay
            </button>
            <button
              onClick={() => setActiveTab("restaurant")}
              className={`flex-1 text-center py-1 rounded transition-all ${
                activeTab === "restaurant" ? "bg-white text-[#E76F51] shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Eat
            </button>
          </div>
        </div>

        {/* Scrollable list of locations */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
          {filteredList.length === 0 ? (
            <div className="py-12 text-center">
              <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-500">No matching places found</p>
              <p className="text-[10px] text-slate-400 mt-1">Try clearing your filters or changing categories</p>
            </div>
          ) : (
            filteredList.map((loc) => {
              const isSelected = activeLocation.id === loc.id;
              return (
                <div
                  key={`${loc.mapType}-${loc.id}`}
                  onClick={() => handleSelectLocation(loc)}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-start gap-3 border ${
                    isSelected
                      ? "bg-white border-blue-200 shadow-sm ring-1 ring-blue-100/50"
                      : "bg-white/60 hover:bg-white border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {/* Pin identifier with unique visual letter glyph */}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-[11px] shrink-0 ${loc.badgeColor} shadow-inner`}>
                    {loc.glyph}
                  </div>

                  {/* Body Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className={`text-xs font-bold truncate ${isSelected ? "text-[#0047A1]" : "text-slate-800"}`}>
                        {loc.name}
                      </h4>
                    </div>

                    {/* Secondary category details */}
                    <p className="text-[9px] text-slate-500 mt-0.5 truncate leading-tight">
                      {loc.displayCategory} {loc.distance ? `• ${loc.distance} from proper` : ""}
                    </p>

                    {/* Quick tip / snippet excerpt */}
                    <p className="text-[9px] text-slate-400 mt-1 line-clamp-1 leading-normal italic">
                      {loc.description || loc.longDescription || ""}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Legend footer panel */}
        <div className="p-2 border-t border-slate-100 bg-white flex items-center justify-between text-[9px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0047A1]" /> Sights
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7]" /> Stay
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E76F51]" /> Eat
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-medium font-serif">Bislig City Proper</span>
        </div>

      </div>
    </div>
  );
}
