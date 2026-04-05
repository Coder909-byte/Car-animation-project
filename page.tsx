'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Load Animation
      gsap.fromTo(headlineRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
      );

      // 2. Scroll Animation
      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
        x: "75vw",
        rotation: 8,
        scale: 1.15,
        ease: "none",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="bg-black text-white">
      {/* Scroll Track */}
      <section className="relative h-[300vh] w-full">
        
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          
          <h1 ref={headlineRef} className="text-5xl md:text-8xl font-black uppercase tracking-[0.3em] z-10 text-center">
            Welcome
          </h1>

          {/* Car Image - Using standard img for easier Vercel deployment */}
          <div ref={carRef} className="absolute left-[-20%] w-[300px] md:w-[600px] z-20 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070" 
              alt="Car"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Stats Bar */}
          <div className="absolute bottom-12 w-full max-w-6xl px-12 flex justify-between z-30">
            <div className="flex flex-col">
              <span className="text-4xl font-bold italic">100%</span>
              <span className="text-[10px] tracking-widest text-zinc-500 uppercase">Performance</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-4xl font-bold italic">0.24s</span>
              <span className="text-[10px] tracking-widest text-zinc-500 uppercase">Latency</span>
            </div>
          </div>

        </div>
      </section>

      {/* Spacer Section */}
      <section className="h-screen bg-zinc-950 flex items-center justify-center border-t border-zinc-900">
         <p className="text-zinc-600 tracking-widest uppercase text-sm">Scroll interaction complete</p>
      </section>
    </main>
  );
}