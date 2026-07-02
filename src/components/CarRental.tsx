import React, { useState } from "react";
import { 
  Car, 
  User, 
  Users, 
  Check, 
  ArrowRight, 
  Phone, 
  Facebook, 
  Instagram, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  ChevronLeft, 
  Calendar,
  Compass,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  image: string;
  seaters: number;
  luggage: string;
  transmission: string;
  fuel: string;
  rate: string;
  features: string[];
  description: string;
}

interface Operator {
  name: string;
  phone: string;
  rating: string;
  reviews: number;
  badge: string;
  bio: string;
  supportedVehicles: string[]; // vehicle IDs
  supportsSelfDrive: boolean;
  supportsWithDriver: boolean;
  socials: {
    facebook?: string;
    messenger?: string;
    whatsapp?: string;
  };
}

const VEHICLES: Vehicle[] = [
  {
    id: "hiace",
    name: "Toyota Hi Ace Commuter",
    type: "Van / Tourer",
    image: "/assets/images/Toyota Hi Ace.webp",
    seaters: 15,
    luggage: "6-8 Large Bags",
    transmission: "Manual (M/T)",
    fuel: "Diesel",
    rate: "₱3,500 - ₱4,500 / day",
    features: ["Dual Aircon", "High-ceiling Comfort", "Spacious Legroom", "Audio System with Bluetooth"],
    description: "The ultimate group travel choice. Meticulously designed for maximum seating, offering absolute stability and reliability on scenic provincial coastal roads."
  },
  {
    id: "innova",
    name: "Toyota Innova",
    type: "Mid-size MPV / SUV",
    image: "/assets/images/Toyota Innova.webp",
    seaters: 7,
    luggage: "4 Large Bags",
    transmission: "Automatic (A/T)",
    fuel: "Diesel",
    rate: "₱2,500 - ₱3,200 / day",
    features: ["Powerful Climate Control", "Foldable Rear Seats", "Excellent Ground Clearance", "Premium Comfort Seating"],
    description: "Perfect blend of rugged performance and premium comfort. Great for standard families looking to tackle Bislig's mountain paths and waterfall trails with peace of mind."
  },
  {
    id: "vios",
    name: "Toyota Vios",
    type: "Compact Sedan",
    image: "/assets/images/Toyota Vios.webp",
    seaters: 5,
    luggage: "2-3 Medium Bags",
    transmission: "Automatic / Manual",
    fuel: "Gasoline",
    rate: "₱1,500 - ₱2,000 / day",
    features: ["Sleek Compact Size", "Extreme Fuel Economy", "Easy Parking Navigation", "Eco Driving Indicator"],
    description: "Highly practical, smart, and cost-effective sedan. Perfect for solo adventurers, honeymoon couples, or business coordinators moving swiftly between City Center and resort hubs."
  }
];

const OPERATORS: Operator[] = [
  {
    name: "Romeo",
    phone: "+63 926 123 4567",
    rating: "4.9",
    reviews: 142,
    badge: "Super Host & Senior Local Guide",
    bio: "Over 10 years of professional tour guidance and van services in Bislig. Known for sharing secret local dining spots and the best hours to photograph Tinuy-an Falls.",
    supportedVehicles: ["hiace", "innova"],
    supportsSelfDrive: true,
    supportsWithDriver: true,
    socials: {
      facebook: "https://facebook.com/romeo.bislig.rentals",
      messenger: "https://m.me/romeo.bislig.rentals",
      whatsapp: "https://wa.me/639261234567"
    }
  },
  {
    name: "Christopher",
    phone: "+63 915 987 6543",
    rating: "4.8",
    reviews: 98,
    badge: "Top-Rated Vehicle Fleet Manager",
    bio: "Offers meticulously sanitized, highly reliable, and modern units. Known for on-time hotel delivery services and ultra-quick response rates.",
    supportedVehicles: ["innova", "vios"],
    supportsSelfDrive: true,
    supportsWithDriver: true,
    socials: {
      facebook: "https://facebook.com/christopher.car.services",
      messenger: "https://m.me/christopher.car.services"
    }
  },
  {
    name: "Angel",
    phone: "+63 918 222 3344",
    rating: "4.9",
    reviews: 76,
    badge: "Eco-Adventure Advocate",
    bio: "Specializing in self-drive solutions for green-minded tourists. Provides free reusable trash bags and handy paper maps of Hinatuan and Bislig with every rental.",
    supportedVehicles: ["hiace", "vios"],
    supportsSelfDrive: true,
    supportsWithDriver: false,
    socials: {
      facebook: "https://facebook.com/angels.eco.rentals",
      messenger: "https://m.me/angels.eco.rentals",
      whatsapp: "https://wa.me/639182223344"
    }
  },
  {
    name: "Dez",
    phone: "+63 909 444 5566",
    rating: "4.7",
    reviews: 110,
    badge: "Accredited Tourism Transport Driver",
    bio: "Providing safe, defensive-driving tours. Focuses exclusively on 'With Driver' rentals to ensure clients sit back and enjoy the sights hassle-free.",
    supportedVehicles: ["hiace", "innova", "vios"],
    supportsSelfDrive: false,
    supportsWithDriver: true,
    socials: {
      facebook: "https://facebook.com/dez.travel.tours",
      messenger: "https://m.me/dez.travel.tours"
    }
  },
  {
    name: "Ken",
    phone: "+63 927 555 7788",
    rating: "4.8",
    reviews: 54,
    badge: "Sleek Sedan Specialist",
    bio: "Affordable and highly flexible Vios rentals. Perfect for business travelers and light tourists who want an easy, uncomplicated self-drive car.",
    supportedVehicles: ["vios"],
    supportsSelfDrive: true,
    supportsWithDriver: true,
    socials: {
      facebook: "https://facebook.com/kens.safe.rides",
      messenger: "https://m.me/kens.safe.rides"
    }
  },
  {
    name: "Brad",
    phone: "+63 936 888 9900",
    rating: "4.9",
    reviews: 82,
    badge: "Group Tour Coordinator",
    bio: "Big-group logistics expert. Operates a fleet of robust Hi Ace vans with dedicated tourist drivers certified by the Department of Tourism.",
    supportedVehicles: ["hiace"],
    supportsSelfDrive: false,
    supportsWithDriver: true,
    socials: {
      facebook: "https://facebook.com/brads.van.rental",
      messenger: "https://m.me/brads.van.rental",
      whatsapp: "https://wa.me/639368889900"
    }
  }
];

export default function CarRental() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [needsDriver, setNeedsDriver] = useState<boolean | null>(null);
  const [inquirySent, setInquirySent] = useState<string | null>(null);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setStep(2);
  };

  const handleSelectDriverPreference = (pref: boolean) => {
    setNeedsDriver(pref);
    setStep(3);
  };

  const getFilteredOperators = () => {
    if (!selectedVehicle) return [];
    return OPERATORS.filter((op) => {
      // Must support selected vehicle
      const supportsVehicle = op.supportedVehicles.includes(selectedVehicle.id);
      if (!supportsVehicle) return false;

      // Must support chosen driver preference
      if (needsDriver === true && !op.supportsWithDriver) return false;
      if (needsDriver === false && !op.supportsSelfDrive) return false;

      return true;
    });
  };

  const handleSendQuickInquiry = (opName: string) => {
    setInquirySent(opName);
    setTimeout(() => {
      setInquirySent(null);
    }, 4000);
  };

  const filteredOperators = getFilteredOperators();

  const resetWizard = () => {
    setSelectedVehicle(null);
    setNeedsDriver(null);
    setStep(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-[#0077B6] text-xs font-bold uppercase tracking-[0.2em] block">PREMIUM MOBILITY SOLUTIONS</span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#1D3557] font-bold">Bislig Car Rental Hub</h2>
        <p className="text-slate-500 text-xs max-w-2xl mx-auto">
          Explore Surigao del Sur with comfort. Pick a model matching your group size, decide on a professional driver, and directly coordinate with verified local operators.
        </p>
      </div>

      {/* Stepper Header */}
      <div className="max-w-xl mx-auto flex items-center justify-between relative px-2 mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-[#0077B6] -translate-y-1/2 transition-all duration-300 z-0"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        ></div>

        <button 
          onClick={() => { if (step > 1) setStep(1); }}
          className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            step >= 1 ? "bg-[#0077B6] text-white shadow-md" : "bg-slate-200 text-slate-500"
          }`}
        >
          {step > 1 ? <Check className="w-4 h-4" /> : "1"}
        </button>

        <button 
          onClick={() => { if (step > 2) setStep(2); }}
          disabled={!selectedVehicle}
          className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            step >= 2 ? "bg-[#0077B6] text-white shadow-md" : "bg-white border-2 border-slate-200 text-slate-500"
          }`}
        >
          {step > 2 ? <Check className="w-4 h-4" /> : "2"}
        </button>

        <button 
          disabled={!selectedVehicle || needsDriver === null}
          className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            step >= 3 ? "bg-[#0077B6] text-white shadow-md" : "bg-white border-2 border-slate-200 text-slate-500"
          }`}
        >
          "3"
        </button>
      </div>

      {/* STEP 1: SELECT VEHICLE */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-[#1D3557] flex items-center gap-2">
              <Car className="w-5 h-5 text-[#0077B6]" />
              Step 1: Choose Your Vehicle Model
            </h3>
            <span className="text-slate-400 text-xs font-semibold">Select a model to proceed</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {VEHICLES.map((vehicle) => (
              <div 
                key={vehicle.id} 
                onClick={() => handleSelectVehicle(vehicle)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#0077B6]/30 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div>
                  <div className="h-56 bg-slate-100 relative overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border px-2.5 py-1 rounded-full text-[10px] font-bold text-[#1D3557] flex items-center gap-1 shadow-sm">
                      <Users className="w-3 h-3 text-[#0077B6]" />
                      <span>{vehicle.seaters} Seaters</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] text-[#2A9D8F] font-bold uppercase tracking-wider">{vehicle.type}</span>
                      <h4 className="font-serif font-bold text-xl text-[#1D3557] mt-1 group-hover:text-[#0077B6] transition-colors">{vehicle.name}</h4>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{vehicle.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>Trans: <span className="text-[#1D3557] font-bold">{vehicle.transmission}</span></div>
                      <div>Fuel: <span className="text-[#1D3557] font-bold">{vehicle.fuel}</span></div>
                      <div className="col-span-2">Luggage: <span className="text-[#1D3557] font-bold">{vehicle.luggage}</span></div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Features Included:</p>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-slate-600">
                        {vehicle.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <span className="w-1 h-1 bg-[#2A9D8F] rounded-full"></span>
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Est. Rate Range</span>
                    <span className="font-bold text-sm text-[#2A9D8F]">{vehicle.rate}</span>
                  </div>
                  <button className="bg-[#0077B6] text-white p-2.5 rounded-xl hover:bg-[#005f92] transition-colors flex items-center gap-1 text-xs font-bold shadow-sm">
                    <span>Configure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: DRIVER PREFERENCE */}
      {step === 2 && selectedVehicle && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setStep(1)} 
              className="p-2 border hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
              title="Back to vehicle list"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-lg font-bold text-[#1D3557] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2A9D8F]" />
                Step 2: Choose Driving Preference
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">For {selectedVehicle.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
            {/* Self-Drive */}
            <div 
              onClick={() => handleSelectDriverPreference(false)}
              className="bg-white border-2 border-slate-200 hover:border-[#0077B6] rounded-2xl p-8 cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between text-center relative group transform hover:-translate-y-1"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 bg-blue-50 text-[#0077B6] rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                  <Car className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-xl text-[#1D3557]">Self-Drive Option</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Rent the keys and drive yourself across Surigao. Navigate on your own schedule. Perfect for couples or private families seeking freedom.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl text-left space-y-2.5 border text-xs text-slate-600">
                  <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Self-Drive Requirements:</div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Valid Philippine / International Driver's License</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>One valid government photo ID card</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Security refundable deposit (approx. ₱3,000)</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <span className="w-full inline-block bg-[#0077B6] group-hover:bg-[#005f92] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
                  Select Self-Drive
                </span>
              </div>
            </div>

            {/* With Driver */}
            <div 
              onClick={() => handleSelectDriverPreference(true)}
              className="bg-white border-2 border-slate-200 hover:border-[#2A9D8F] rounded-2xl p-8 cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between text-center relative group transform hover:-translate-y-1"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 bg-emerald-50 text-[#2A9D8F] rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                  <User className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-xl text-[#1D3557]">With Professional Driver</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sit back, relax, and take in Bislig's beautiful rainforests. Our DOT-accredited drivers double as friendly local guides who handle routes, gas, and parking.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl text-left space-y-2.5 border text-xs text-slate-600">
                  <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">What's Covered:</div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Department of Tourism accredited chauffeur</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Driver's meals & lodging handles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Stress-free parking & navigating complex terrain</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <span className="w-full inline-block bg-[#2A9D8F] group-hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
                  Select With Driver
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: MATCHED LOCAL OPERATORS */}
      {step === 3 && selectedVehicle && needsDriver !== null && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setStep(2)} 
                className="p-2 border hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
                title="Back to driver selection"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div>
                <h3 className="text-lg font-bold text-[#1D3557] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#F4B400] animate-pulse" />
                  Step 3: Matched Local Operators ({filteredOperators.length})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Filtered for: <strong className="text-slate-600">{selectedVehicle.name}</strong> • <strong className="text-slate-600">{needsDriver ? "With Driver" : "Self-Drive"}</strong>
                </p>
              </div>
            </div>

            <button 
              onClick={resetWizard}
              className="text-xs text-[#0077B6] hover:underline font-bold self-start sm:self-auto"
            >
              Start Over / Clear Filters
            </button>
          </div>

          {filteredOperators.length === 0 ? (
            <div className="bg-slate-50 border p-12 rounded-2xl text-center space-y-4 max-w-lg mx-auto">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-[#1D3557]">No Direct Match Found</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Currently, none of our verified individuals offer the {selectedVehicle.name} in {needsDriver ? "With Driver" : "Self-Drive"} mode. Let us know and we'll help source one!
              </p>
              <button 
                onClick={resetWizard}
                className="bg-[#0077B6] text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Choose Another Model
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOperators.map((op) => (
                <div 
                  key={op.name}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Header: Avatar, Name, Rating */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#F8F6F2] border border-slate-200 flex items-center justify-center text-[#1D3557] font-serif font-bold text-lg relative shrink-0">
                          {op.name.charAt(0)}
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1D3557] flex items-center gap-1">
                            {op.name}
                          </h4>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200 uppercase tracking-wide block mt-0.5 max-w-max">
                            {op.badge}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-[#2A9D8F] bg-[#2A9D8F]/10 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                          Verified
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      "{op.bio}"
                    </p>

                    {/* Operator Specs */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Response Time:</span>
                        <span className="font-semibold text-slate-700">~15 Minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Unit Coverage:</span>
                        <span className="font-semibold text-[#0077B6] uppercase text-[10px] tracking-wider">
                          {op.supportedVehicles.join(" & ")}
                        </span>
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Direct Socials:</span>
                      <div className="flex gap-2">
                        {op.socials.facebook && (
                          <a 
                            href={op.socials.facebook} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-1.5 bg-slate-100 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Facebook Page"
                          >
                            <Facebook className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {op.socials.messenger && (
                          <a 
                            href={op.socials.messenger} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-1.5 bg-slate-100 hover:bg-cyan-50 text-cyan-600 rounded-lg transition-colors"
                            title="Messenger Chat"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {op.socials.whatsapp && (
                          <a 
                            href={op.socials.whatsapp} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-1.5 bg-slate-100 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"
                            title="WhatsApp Chat"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Booking Trigger / Contact Form */}
                  <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Mobile Hotline:</span>
                      <strong className="text-[#1D3557] select-all">{op.phone}</strong>
                    </div>

                    {inquirySent === op.name ? (
                      <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2 text-emerald-700 text-xs font-bold animate-scaleIn">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 animate-pulse" />
                        <span>Inquiry sent to {op.name}! They will SMS you.</span>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleSendQuickInquiry(op.name)}
                        className="w-full py-2.5 bg-[#0077B6] hover:bg-[#005f92] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Inquire Instantly via SMS</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Informational Notice */}
          <div className="bg-[#F8F6F2] p-4 rounded-xl border border-gray-100 text-slate-500 text-[10px] md:text-xs leading-relaxed max-w-4xl mx-auto flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#2A9D8F] shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-700 block mb-0.5">Rental Fair Trade Policy</strong>
              All listed operators are certified local residents of Bislig City. Rates are standardized by the Surigao Transport Cooperative to prevent price gauging. Social media links are provided for direct traveler-to-local communication, meaning zero middle-man fees.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
