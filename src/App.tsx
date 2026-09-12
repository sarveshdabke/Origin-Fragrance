import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import Lenis from 'lenis';
import { Toaster } from 'react-hot-toast';

import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroFrames } from './components/HeroFrames';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';

const RevealText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");
  return (
    <motion.div 
      className={`flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } }
      }}
    >
      {words.map((word, index) => (
        <motion.span 
          key={index} 
          className="mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const products = [
    {
      id: 1,
      name: 'Aurélia',
      description: 'A luminous blend of white florals and warm amber.',
      price: '$185',
      image: '/product1.jpg'
    },
    {
      id: 2,
      name: 'Nocturne',
      description: 'Deep, mysterious woods intertwined with dark vanilla.',
      price: '$210',
      image: '/product2.jpg'
    },
    {
      id: 3,
      name: 'Aura',
      description: 'A delicate essence of crystal-clear purity and minimalist elegance.',
      price: '$195',
      image: '/product_3.jpg'
    },
    {
      id: 4,
      name: 'Aurora Nightbloom',
      description: 'A deep ruby elixir of midnight blossoms and velvet amber.',
      price: '$230',
      image: '/product_4.jpg'
    },
    {
      id: 5,
      name: 'Éclat de la Forêt',
      description: 'An earthy blend of emerald woods and vibrant botanical notes.',
      price: '$175',
      image: '/product_5.jpg'
    },
    {
      id: 6,
      name: 'Obsidian',
      description: 'A bold, smoky concoction with a heart of dark leather.',
      price: '$225',
      image: '/product_6.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white font-sans cursor-default">
      <Toaster position="bottom-right" />
      <Preloader />
      <CartDrawer />
      <Navbar />
      <HeroFrames />

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 bg-dark relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="text-gold tracking-[0.2em] text-sm uppercase mb-4"><RevealText text="Our Philosophy" /></div>
            <RevealText text="Art in Every Droplet." className="text-4xl md:text-5xl font-serif leading-tight" delay={0.2} />
            <p className="text-white/60 leading-relaxed text-lg font-light">
              At Origin, we believe that a fragrance is more than a scent—it is an invisible garment, a memory captured in amber glass, an extension of one's innermost identity. We source only the rarest botanicals from around the globe to create olfactory masterpieces that linger long after you depart.
            </p>
            <a href="#story" className="inline-block text-sm tracking-widest uppercase pb-2 border-b border-gold/30 hover:border-gold transition-colors">
              Read Our Story
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative h-[600px]"
          >
            <div className="absolute inset-0 border border-gold/20 -translate-x-4 -translate-y-4"></div>
            <img 
              src="/product1.jpg" 
              alt="Philosophy" 
              className="w-full h-full object-cover relative z-10 filter brightness-90"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section id="collections" className="py-32 bg-darker">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-gold tracking-[0.2em] text-sm uppercase mb-4"><RevealText text="The Signatures" className="justify-center" /></div>
            <RevealText text="Featured Collection" className="text-4xl md:text-5xl font-serif justify-center" delay={0.2} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-20">
            <a href="#collections" className="inline-block border border-white/20 px-10 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-dark transition-all duration-300">
              View All Fragrances
            </a>
          </div>
        </div>
      </section>

      {/* Brand Founder Story Section */}
      <section id="story" className="py-32 bg-dark relative overflow-hidden">
        {/* Liquid Shader Background */}
        <div className="liquid-bg opacity-20">
          <div className="liquid-blob-1"></div>
          <div className="liquid-blob-2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative h-[600px] md:order-2"
          >
            <div className="absolute inset-0 border border-gold/20 translate-x-4 -translate-y-4"></div>
            <img 
              src="/founder.jpg" 
              alt="Brand Founder" 
              className="w-full h-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="space-y-8 md:order-1"
          >
            <div className="text-gold tracking-[0.2em] text-sm uppercase mb-4"><RevealText text="The Story" /></div>
            <RevealText text="A Legacy of Elegance" className="text-4xl md:text-5xl font-serif leading-tight" delay={0.2} />
            <p className="text-white/60 leading-relaxed text-lg font-light">
              Origin was born from a singular vision: to distill the essence of the world's most evocative landscapes into a bottle. Our founder, a master perfumer with decades of experience, traveled from the sun-drenched fields of Grasse to the deep, resonant woods of the East.
            </p>
            <p className="text-white/60 leading-relaxed text-lg font-light">
              Every drop undergoes a meticulous, time-honored extraction process. We marry age-old artisanal traditions with avant-garde scientific innovation to capture the purest essence, creating an olfactory masterpiece destined to become your signature legacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#030303] py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="mb-4">
              <img src="/logo.jpg" alt="Origin Fragrance" className="h-10 md:h-14 object-contain" />
            </div>
            <p className="text-white/50 max-w-sm font-light">
              Elevating the everyday through the mastery of scent. Discover the art of modern perfumery.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" aria-label="Instagram" className="text-white/50 hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter" className="text-white/50 hover:text-gold transition-colors"><Twitter size={20} /></a>
              <a href="#" aria-label="Facebook" className="text-white/50 hover:text-gold transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white tracking-widest uppercase text-sm mb-6">Explore</h5>
            <ul className="space-y-4 text-white/50 font-light">
              <li><a href="#philosophy" className="hover:text-gold transition-colors">Our Philosophy</a></li>
              <li><a href="#collections" className="hover:text-gold transition-colors">Collections</a></li>
              <li><a href="#story" className="hover:text-gold transition-colors">The Story</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white tracking-widest uppercase text-sm mb-6">Assistance</h5>
            <ul className="space-y-4 text-white/50 font-light">
              <li><a href="#contact" className="hover:text-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-white/30 text-sm font-light">
          &copy; {new Date().getFullYear()} Origin Fragrance. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
