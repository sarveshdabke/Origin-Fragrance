import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    // We use a small interval to ensure metadata is loaded, or listen to onloadedmetadata
    const setupScrollAnimation = () => {
      gsap.to(video, {
        currentTime: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "+=2000",
          scrub: 0.5,
          pin: true,
        }
      });
    };

    if (video.readyState >= 1) {
      setupScrollAnimation();
    } else {
      video.addEventListener('loadedmetadata', setupScrollAnimation);
    }
    
    return () => {
      video.removeEventListener('loadedmetadata', setupScrollAnimation);
    }
  }, []);

  return (
    <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          src="/0912.mp4" 
          className="absolute inset-0 w-full h-full object-cover z-0"
          muted 
          playsInline 
          preload="auto"
        />
        {/* Subtle gradient so text is legible but video is visible */}
        <div className="absolute inset-0 bg-darker/30 z-10 pointer-events-none" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-20 pointer-events-none">
        <motion.div
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-gold tracking-[0.3em] text-sm md:text-base uppercase mb-6">The Essence of Perfection</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif font-light mb-8 leading-tight">
              Crafted for the <br /> <span className="italic text-white/90">Extraordinary</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pointer-events-auto"
          >
            <a href="#collections" className="inline-flex items-center space-x-3 border border-gold/50 px-8 py-4 uppercase tracking-widest text-sm hover:bg-gold hover:text-dark transition-all duration-300">
              <span>Discover the Collection</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none"
      >
        <span className="text-xs tracking-widest uppercase text-white/50 mb-4">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-gold/50"
        />
      </motion.div>
    </section>
  );
};
