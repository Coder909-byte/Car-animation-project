'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 1. Register the plugin inside useEffect for Next.js SSR compatibility
    gsap.registerPlugin(ScrollTrigger);

    // 2. Use gsap.context for clean memory management (Industry Standard)
    const ctx = gsap.context(() => {
      
      // INITIAL LOAD: Reveal text and prepare scene
      gsap.fromTo(headlineRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
      );

      // SCROLL ANIMATION: The "Not Time-Based" requirement
      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",      // Start when user begins scrolling
          end: "bottom bottom",  // End at the bottom of the 300vh track
          scrub: 1.2,            // Smooth "follow" effect (Interpolation)
        },
        x: "70vw",               // Moves car across the screen
        rotation: 10,            // Dynamic tilt
        scale: 1.1,              // Slight zoom for depth
        ease: "none",            // Scrub handles the easing physics
      });

    }, mainRef);

    return () => ctx.revert(); // Cleanup on unmount to prevent lag
  }, []);

  return (
    <main ref={mainRef} className="bg-black text-white">
      {/* THE TRACK: Provides 3 screens worth of scroll distance */}
      <section className="relative h-[300vh] w-full">
        
        {/* THE CAMERA: Locked to the user's viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* Background Headline */}
          <h1 
            ref={headlineRef} 
            className="text-6xl md:text-[10rem] font-black letter-spaced z-10 text-center opacity-0"
          >
            Welcome
          </h1>

          {/* The Hero Subject (Car) */}
          <div 
            ref={carRef} 
            className="absolute left-[-25%] w-[300px] md:w-[700px] z-20 pointer-events-none"
          >
            <Image 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070" 
              alt="Premium Car"
              width={800}
              height={500}
              priority // Fixes LCP warning and ensures image loads instantly
              className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(255,255,255,0.1)]"
            />
          </div>

          {/* Bottom Stats Bar */}
          <div className="absolute bottom-12 w-full max-w-6xl px-12 flex justify-between z-30">
            <div className="flex flex-col">
              <span className="text-4xl md:text-6xl font-bold italic">100%</span>
              <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">Performance</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-4xl md:text-6xl font-bold italic">0.24s</span>
              <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">Latency</span>
            </div>
          </div>

        </div>
      </section>

      {/* Final Section */}
      <section className="h-screen bg-zinc-950 flex items-center justify-center border-t border-zinc-900">
        <p className="text-zinc-600 tracking-widest uppercase text-xs">Animation Sequence Complete</p>
      </section>
    </main>
  );
}