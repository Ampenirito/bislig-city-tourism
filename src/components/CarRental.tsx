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
  AlertCircle,
  Plus
} from "lucide-react";
import { Vehicle, Operator } from "../types";
import { VEHICLES as DEFAULT_VEHICLES, OPERATORS as DEFAULT_OPERATORS } from "../data";

interface CarRentalProps {
  vehicles?: Vehicle[];
  operators?: Operator[];
  addToItinerary?: (item: any, type: "attraction" | "restaurant" | "hotel" | "event" | "directory" | "rental" | "custom") => void;
  addedFeedback?: Record<string, boolean>;
}

export default function CarRental({ 
  vehicles = DEFAULT_VEHICLES, 
  operators = DEFAULT_OPERATORS,
  addToItinerary,
  addedFeedback
}: CarRentalProps) {
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
    return operators.filter((op) => {
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
        <span className="text-[#0047A1] text-xs font-bold uppercase tracking-[0.2em] block">PREMIUM MOBILITY SOLUTIONS</span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#0047A1] font-bold">Bislig Car Rental Hub</h2>
        <p className="text-slate-500 text-xs max-w-2xl mx-auto">
          Explore Surigao del Sur with comfort. Pick a model matching your group size, decide on a professional driver, and directly coordinate with verified local operators.
        </p>
      </div>

      {/* Stepper Header */}
      <div className="max-w-xl mx-auto flex items-center justify-between relative px-2 mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-[#0047A1] -translate-y-1/2 transition-all duration-300 z-0"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        ></div>

        <button 
          onClick={() => { if (step > 1) setStep(1); }}
          className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            step >= 1 ? "bg-[#0047A1] text-white shadow-md" : "bg-slate-200 text-slate-500"
          }`}
        >
          {step > 1 ? <Check className="w-4 h-4" /> : "1"}
        </button>

        <button 
          onClick={() => { if (step > 2) setStep(2); }}
          disabled={!selectedVehicle}
          className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            step >= 2 ? "bg-[#0047A1] text-white shadow-md" : "bg-white border-2 border-slate-200 text-slate-500"
          }`}
        >
          {step > 2 ? <Check className="w-4 h-4" /> : "2"}
        </button>

        <button 
          disabled={!selectedVehicle || needsDriver === null}
          className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            step >= 3 ? "bg-[#0047A1] text-white shadow-md" : "bg-white border-2 border-slate-200 text-slate-500"
          }`}
        >
          "3"
        </button>
      </div>

      {/* STEP 1: SELECT VEHICLE */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-[#0047A1] flex items-center gap-2">
              <Car className="w-5 h-5 text-[#0047A1]" />
              Step 1: Choose Your Vehicle Model
            </h3>
            <span className="text-slate-400 text-xs font-semibold">Select a model to proceed</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <div 
                key={vehicle.id} 
                onClick={() => handleSelectVehicle(vehicle)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#0047A1]/30 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div>
                  <div className="h-56 bg-slate-100 relative overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border px-2.5 py-1 rounded-full text-[10px] font-bold text-[#0047A1] flex items-center gap-1 shadow-sm">
                      <Users className="w-3 h-3 text-[#0047A1]" />
                      <span>{vehicle.seaters} Seaters</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] text-[#0097A7] font-bold uppercase tracking-wider">{vehicle.type}</span>
                      <h4 className="font-serif font-bold text-xl text-[#0047A1] mt-1 group-hover:text-[#0047A1] transition-colors">{vehicle.name}</h4>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{vehicle.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>Trans: <span className="text-[#0047A1] font-bold">{vehicle.transmission}</span></div>
                      <div>Fuel: <span className="text-[#0047A1] font-bold">{vehicle.fuel}</span></div>
                      <div className="col-span-2">Luggage: <span className="text-[#0047A1] font-bold">{vehicle.luggage}</span></div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Features Included:</p>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-slate-600">
                        {vehicle.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <span className="w-1 h-1 bg-[#0097A7] rounded-full"></span>
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 gap-2">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Est. Rate Range</span>
                    <span className="font-bold text-xs text-[#0097A7]">{vehicle.rate}</span>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {addToItinerary && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToItinerary(vehicle, "rental");
                        }}
                        className={`p-2 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer ${
                          addedFeedback && addedFeedback[vehicle.id]
                            ? "bg-[#0097A7] text-white"
                            : "bg-slate-100 text-[#0047A1] hover:bg-[#0047A1] hover:text-white"
                        }`}
                        title={addedFeedback && addedFeedback[vehicle.id] ? "Added to itinerary" : "Add vehicle to itinerary"}
                      >
                        {addedFeedback && addedFeedback[vehicle.id] ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    )}
                    <button 
                      onClick={() => handleSelectVehicle(vehicle)}
                      className="bg-[#0047A1] text-white p-2.5 rounded-xl hover:bg-[#005f92] transition-colors flex items-center gap-1 text-xs font-bold shadow-sm"
                    >
                      <span>Configure</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
              <h3 className="text-lg font-bold text-[#0047A1] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0097A7]" />
                Step 2: Choose Driving Preference
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">For {selectedVehicle.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
            {/* Self-Drive */}
            <div 
              onClick={() => handleSelectDriverPreference(false)}
              className="bg-white border-2 border-slate-200 hover:border-[#0047A1] rounded-2xl p-8 cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between text-center relative group transform hover:-translate-y-1"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 bg-blue-50 text-[#0047A1] rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                  <Car className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-xl text-[#0047A1]">Self-Drive Option</h4>
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
                <span className="w-full inline-block bg-[#0047A1] group-hover:bg-[#005f92] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
                  Select Self-Drive
                </span>
              </div>
            </div>

            {/* With Driver */}
            <div 
              onClick={() => handleSelectDriverPreference(true)}
              className="bg-white border-2 border-slate-200 hover:border-[#0097A7] rounded-2xl p-8 cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between text-center relative group transform hover:-translate-y-1"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 bg-emerald-50 text-[#0097A7] rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                  <User className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-xl text-[#0047A1]">With Professional Driver</h4>
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
                <span className="w-full inline-block bg-[#0097A7] group-hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
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
                <h3 className="text-lg font-bold text-[#0047A1] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FB8C00] animate-pulse" />
                  Step 3: Matched Local Operators ({filteredOperators.length})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Filtered for: <strong className="text-slate-600">{selectedVehicle.name}</strong> • <strong className="text-slate-600">{needsDriver ? "With Driver" : "Self-Drive"}</strong>
                </p>
              </div>
            </div>

            <button 
              onClick={resetWizard}
              className="text-xs text-[#0047A1] hover:underline font-bold self-start sm:self-auto"
            >
              Start Over / Clear Filters
            </button>
          </div>

          {filteredOperators.length === 0 ? (
            <div className="bg-slate-50 border p-12 rounded-2xl text-center space-y-4 max-w-lg mx-auto">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-[#0047A1]">No Direct Match Found</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Currently, none of our verified individuals offer the {selectedVehicle.name} in {needsDriver ? "With Driver" : "Self-Drive"} mode. Let us know and we'll help source one!
              </p>
              <button 
                onClick={resetWizard}
                className="bg-[#0047A1] text-white px-5 py-2 rounded-xl text-xs font-bold"
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
                        <div className="w-12 h-12 rounded-full bg-[#F9F9F0] border border-slate-200 flex items-center justify-center text-[#0047A1] font-serif font-bold text-lg relative shrink-0">
                          {op.name.charAt(0)}
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0047A1] flex items-center gap-1">
                            {op.name}
                          </h4>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200 uppercase tracking-wide block mt-0.5 max-w-max">
                            {op.badge}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-[#0097A7] bg-[#0097A7]/10 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
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
                        <span className="font-semibold text-[#0047A1] uppercase text-[10px] tracking-wider">
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
                      <strong className="text-[#0047A1] select-all">{op.phone}</strong>
                    </div>

                    {inquirySent === op.name ? (
                      <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2 text-emerald-700 text-xs font-bold animate-scaleIn">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 animate-pulse" />
                        <span>Inquiry sent to {op.name}! They will SMS you.</span>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleSendQuickInquiry(op.name)}
                        className="w-full py-2.5 bg-[#0047A1] hover:bg-[#005f92] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
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
          <div className="bg-[#F9F9F0] p-4 rounded-xl border border-gray-100 text-slate-500 text-[10px] md:text-xs leading-relaxed max-w-4xl mx-auto flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0097A7] shrink-0 mt-0.5" />
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
