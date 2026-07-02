import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ImageCarouselProps {
  images: string[];
  autoPlayInterval?: number;
  className?: string;
  attractionName?: string;
}

export default function ImageCarousel({
  images,
  autoPlayInterval = 4000,
  className = "",
  attractionName = "Destination"
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  // Auto Play Effect
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, images.length, autoPlayInterval]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for Swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe distance of 50px
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (!images || images.length === 0) {
    return <div className="w-full h-full bg-slate-200 animate-pulse" />;
  }

  return (
    <div
      className={`relative overflow-hidden w-full h-full group ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides using motion for elegant fade-in/fade-out */}
      <div className="absolute inset-0 bg-slate-900">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${attractionName} View ${currentIndex + 1}`}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </AnimatePresence>
      </div>

      {/* Aesthetic bottom overlay gradient */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />

      {/* Navigation arrows (Only show on hover/desktop) */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 cursor-pointer z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 cursor-pointer z-10"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Top right status/control overlay */}
      <div className="absolute top-4 left-4 z-10 flex gap-2 items-center">
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors cursor-pointer"
            title={isPlaying ? "Pause Slideshow" : "Start Slideshow"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        )}
        
        <span className="text-[10px] font-mono tracking-widest uppercase bg-black/40 text-slate-300 px-2.5 py-1 rounded-lg backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Bottom slide dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? "w-5 bg-[#F4B400]" : "w-2 bg-white/50 hover:bg-white"
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
