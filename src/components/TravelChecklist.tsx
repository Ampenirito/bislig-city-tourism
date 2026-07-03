import React, { useState, useEffect } from "react";
import { Check, Plus, Trash2, RotateCcw, Backpack, CheckSquare, Square, CheckCircle2, AlertTriangle, Compass, Waves } from "lucide-react";

interface ChecklistItem {
  id: string;
  name: string;
  category: "water" | "trek" | "health" | "essentials" | "custom";
  packed: boolean;
  notes?: string;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  // Water Sports / Waterfalls
  { id: "1", name: "Waterproof Dry Bag (highly recommended for Tinuy-an Falls)", category: "water", packed: false, notes: "Protects cameras and phones" },
  { id: "2", name: "Reef-Safe Sunscreen", category: "water", packed: false, notes: "Eco-friendly for Enchanted River" },
  { id: "3", name: "Waterproof Phone Pouch", category: "water", packed: false, notes: "For capturing balsa ride under the falls" },
  { id: "4", name: "Swimwear / Rash Guard", category: "water", packed: false },
  { id: "5", name: "Quick-dry Microfiber Towel", category: "water", packed: false },

  // Trek & Cave
  { id: "6", name: "Headlamp / Flashlight", category: "trek", packed: false, notes: "Crucial for Hinayagan Cave" },
  { id: "7", name: "Anti-slip Sandals / Water Shoes", category: "trek", packed: false, notes: "Wet limestone cave floors can be slippery" },
  { id: "8", name: "Mosquito Repellent", category: "trek", packed: false, notes: "For forest walks and bird-watching" },
  { id: "9", name: "Sturdy Trekking Shoes", category: "trek", packed: false },

  // Health & Comfort
  { id: "10", name: "First-Aid Kit & Bandages", category: "health", packed: false, notes: "Essential for minor scrapes" },
  { id: "11", name: "Motion Sickness Pills", category: "health", packed: false, notes: "Useful for boat rides & winding coastal roads" },
  { id: "12", name: "Personal Medications", category: "health", packed: false },
  { id: "13", name: "Hand Sanitizer & Wet Wipes", category: "health", packed: false },

  // Essentials / Logistics
  { id: "14", name: "Cash (Philippine Pesos)", category: "essentials", packed: false, notes: "ATMs are scarce, most local spots don't accept cards" },
  { id: "15", name: "Power Bank", category: "essentials", packed: false, notes: "Keep devices charged on long island-hopping days" },
  { id: "16", name: "Waterproof GoPro / Camera", category: "essentials", packed: false },
  { id: "17", name: "Reusable Water Bottle", category: "essentials", packed: false, notes: "Stay hydrated in the humid weather" },
];

export default function TravelChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<"water" | "trek" | "health" | "essentials">("essentials");
  const [showNotification, setShowNotification] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("bislig_travel_checklist");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        setItems(DEFAULT_ITEMS);
      }
    } else {
      setItems(DEFAULT_ITEMS);
    }
  }, []);

  // Save to LocalStorage
  const saveItems = (newItems: ChecklistItem[]) => {
    setItems(newItems);
    localStorage.setItem("bislig_travel_checklist", JSON.stringify(newItems));
  };

  // Toggle packed status
  const togglePacked = (id: string) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    saveItems(updated);
  };

  // Add custom item
  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: "custom",
      packed: false
    };

    saveItems([...items, newItem]);
    setNewItemName("");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Delete checklist item
  const deleteItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    saveItems(updated);
  };

  // Reset checklist
  const resetChecklist = () => {
    if (confirm("Are you sure you want to reset your packing checklist?")) {
      saveItems(DEFAULT_ITEMS);
    }
  };

  // Statistics
  const totalCount = items.length;
  const packedCount = items.filter(i => i.packed).length;
  const progressPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  // Filter items
  const filteredItems = items.filter(item => {
    if (filter === "all") return true;
    if (filter === "custom") return item.category === "custom";
    return item.category === filter;
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "water": return "Water Adventures";
      case "trek": return "Trekking & Caves";
      case "health": return "Health & Comfort";
      case "essentials": return "Core Essentials";
      case "custom": return "My Custom Items";
      default: return "Other";
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "water": return "bg-blue-50 text-blue-700 border-blue-100";
      case "trek": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "health": return "bg-rose-50 text-rose-700 border-rose-100";
      case "essentials": return "bg-amber-50 text-amber-700 border-amber-100";
      case "custom": return "bg-purple-50 text-purple-700 border-purple-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8 mt-12 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -z-10 opacity-60" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Backpack className="w-5 h-5 text-[#0047A1]" />
            <span className="text-[#0047A1] text-xs font-bold uppercase tracking-wider">KAMAYO PACKING ASSISTANT</span>
          </div>
          <h3 className="text-2xl font-serif text-[#0047A1] font-extrabold">Bislig Eco-Adventure Checklist</h3>
          <p className="text-xs text-slate-500 mt-1">
            Ensure you have all necessary gear for waterfalls, white sandbars, and humid tropical caves. Saved automatically to your browser.
          </p>
        </div>

        <button
          onClick={resetChecklist}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50/30 rounded-xl text-xs font-bold transition-all self-start md:self-center"
          title="Reset checklist to original recommendations"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset List</span>
        </button>
      </div>

      {/* Progress Card Section */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0047A1] text-white p-6 rounded-2xl mb-8 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Your Packing Progress</span>
          </div>
          <span className="text-lg font-black tracking-tight">{packedCount} <span className="text-xs text-slate-400 font-normal">of</span> {totalCount} Packed</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-2">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-slate-300">
          <span>{progressPercent}% Complete</span>
          <span>
            {progressPercent === 100 
              ? "🎉 Ready for Bislig adventures!" 
              : progressPercent >= 75 
              ? "Almost fully packed, double check accessories" 
              : "Still compiling gear"}
          </span>
        </div>
      </div>

      {/* Quick Category Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
        {[
          { key: "all", label: "All Items", icon: "🎒" },
          { key: "water", label: "Water Sports", icon: "🌊" },
          { key: "trek", label: "Trekking & Caves", icon: "🥾" },
          { key: "health", label: "Health & Safety", icon: "🩺" },
          { key: "essentials", label: "Essentials", icon: "🔑" },
          { key: "custom", label: "My Custom", icon: "✏️" }
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === btn.key
                ? "bg-[#0047A1] border-[#0047A1] text-white shadow-md shadow-blue-50"
                : "border-slate-100 hover:border-slate-300 text-slate-600 bg-slate-50/50"
            }`}
          >
            <span>{btn.icon}</span>
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {filteredItems.length === 0 ? (
          <div className="col-span-2 text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-xs">No items found matching this filter category.</p>
            {filter === "custom" && (
              <p className="text-slate-400 text-[10px] mt-1">Use the form below to add custom items to your packing list.</p>
            )}
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => togglePacked(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                item.packed
                  ? "bg-slate-50 border-slate-100 opacity-70"
                  : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <div className="mt-0.5">
                {item.packed ? (
                  <div className="bg-[#0047A1] text-white p-0.5 rounded">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="border-2 border-slate-300 hover:border-slate-400 p-0.5 rounded w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold leading-tight ${item.packed ? "line-through text-slate-400" : "text-[#0047A1]"}`}>
                  {item.name}
                </p>
                {item.notes && (
                  <p className="text-[10px] text-slate-500 mt-0.5 font-medium leading-relaxed">
                    💡 {item.notes}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${getCategoryColor(item.category)}`}>
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
              </div>

              {item.category === "custom" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors self-center"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={addItem} className="bg-[#F8FAFC] border border-slate-100 p-5 rounded-2xl flex flex-col sm:flex-row gap-3">
        <div className="flex-1 min-w-0">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Add Personal Equipment</label>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="e.g. Hydro-flask water jug, GoPro harness, Sunglasses..."
            className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#0047A1] focus:ring-1 focus:ring-[#0047A1] text-[#0047A1]"
          />
        </div>
        
        <button
          type="submit"
          className="sm:self-end bg-[#0047A1] hover:bg-[#112237] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Gear</span>
        </button>
      </form>

      {showNotification && (
        <div className="absolute bottom-4 left-4 bg-emerald-600 text-white text-[11px] px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 animate-bounce">
          <Check className="w-3.5 h-3.5" />
          <span>Item added to your custom checklist!</span>
        </div>
      )}
    </div>
  );
}
