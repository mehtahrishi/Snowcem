"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

const DEFAULT_IMAGES = [
  "/featured/1.png",
  "/featured/2.png",
  "/featured/3.png",
];

export default function FeaturedProductsCarousel() {
  const [images, setImages] = useState<string[]>(DEFAULT_IMAGES);

  // Virtual index starts at 1 because index 0 is the cloned last slide
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Drag / Swipe Interaction State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch dynamic images from API (scans public/featured/)
  useEffect(() => {
    let isMounted = true;
    async function loadFeaturedImages() {
      try {
        const res = await fetch("/api/featured-products");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.images) && data.images.length > 0) {
            setImages(data.images);
            // Reset to first real slide
            setCurrentIndex(1);
            setIsTransitioning(false);
          }
        }
      } catch (err) {
        console.error("Failed to fetch featured product images:", err);
      }
    }
    loadFeaturedImages();
    return () => {
      isMounted = false;
    };
  }, []);

  // Pause timer when browser tab is inactive to prevent animation queue buildup
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Extended slides array for truly infinite, seamless looping: [cloneLast, ...original, cloneFirst]
  const extendedSlides = useMemo(() => {
    if (images.length === 0) return [];
    if (images.length === 1) return images;
    return [images[images.length - 1], ...images, images[0]];
  }, [images]);

  const totalOriginal = images.length;
  const isMultiSlide = totalOriginal > 1;

  // Active indicator dot index (0 to totalOriginal - 1)
  const activeDotIndex = useMemo(() => {
    if (totalOriginal <= 1) return 0;
    if (currentIndex === 0) return totalOriginal - 1;
    if (currentIndex === extendedSlides.length - 1) return 0;
    return currentIndex - 1;
  }, [currentIndex, totalOriginal, extendedSlides.length]);

  const nextSlide = useCallback(() => {
    if (!isMultiSlide) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isMultiSlide]);

  const prevSlide = useCallback(() => {
    if (!isMultiSlide) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isMultiSlide]);

  const goToSlide = (dotIndex: number) => {
    if (!isMultiSlide) return;
    setIsTransitioning(true);
    setCurrentIndex(dotIndex + 1);
  };

  // Handle seamless infinite loop jump when transition finishes
  const handleTransitionEnd = () => {
    if (!isMultiSlide) return;

    // If we transitioned forward into the clone of the first slide at the end
    if (currentIndex >= extendedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
    // If we transitioned backward into the clone of the last slide at the start
    else if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(extendedSlides.length - 2);
    }
  };

  // Auto-play timer for smooth infinite loop
  useEffect(() => {
    if (isPaused || isDragging || !isMultiSlide) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, isMultiSlide, nextSlide]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMultiSlide) return;
    setIsDragging(true);
    setIsTransitioning(false);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const diff = currentX - startX;
    setIsDragging(false);

    if (diff < -50) {
      nextSlide();
    } else if (diff > 50) {
      prevSlide();
    } else {
      // Snap back smoothly
      setIsTransitioning(true);
    }
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMultiSlide) return;
    setIsDragging(true);
    setIsTransitioning(false);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const diff = currentX - startX;
    setIsDragging(false);

    if (diff < -50) {
      nextSlide();
    } else if (diff > 50) {
      prevSlide();
    } else {
      setIsTransitioning(true);
    }
    setStartX(0);
    setCurrentX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setIsPaused(false);
  };

  if (totalOriginal === 0) return null;

  const dragOffset = isDragging ? currentX - startX : 0;

  return (
    <section className="w-full bg-white pt-10 sm:pt-14 md:pt-16 pb-0 border-t border-slate-100">
      {/* Animated Gradient Wave Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4 space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading animate-gradient-wave inline-block">
          Featured Products
        </h2>
        <p className="text-slate-600 text-xs sm:text-base font-normal leading-relaxed px-2">
          Discover Snowcem&apos;s trusted range of interior, exterior, waterproofing, and finishing solutions, made to bring lasting colour and protection to every space.
        </p>
      </div>

      {/* Full-Width Carousel Stage */}
      <div
        className="relative w-full overflow-hidden select-none p-0 m-0 bg-transparent block"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Sliding Infinite Track */}
        <div
          ref={containerRef}
          className={`flex w-full will-change-transform ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            transform: `translate3d(calc(-${currentIndex * 100}% + ${dragOffset}px), 0, 0)`,
            transition: isTransitioning
              ? "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {extendedSlides.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="min-w-full w-full flex-shrink-0 relative overflow-hidden"
            >
              {/* Full-width responsive banner image */}
              <img
                src={src}
                alt={`Featured Product ${index + 1}`}
                loading={index <= 2 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-auto block object-cover select-none pointer-events-none"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith(".jpg")) {
                    target.src = target.src.replace(/\.jpg$/, ".png");
                  } else if (target.src.endsWith(".png")) {
                    target.src = target.src.replace(/\.png$/, ".jpg");
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Sleek Minimal Indicator Dots */}
        {isMultiSlide && (
          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20 pointer-events-auto">
            {images.map((_, index) => {
              const isActive = index === activeDotIndex;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Featured slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    isActive
                      ? "w-7 sm:w-9 h-1.5 sm:h-2 bg-white shadow-md"
                      : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
