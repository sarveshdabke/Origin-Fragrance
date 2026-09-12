import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const { items, toggleCart } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setNavVisible(window.scrollY > 2000); // Show navbar after pinned hero section
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${navVisible || mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'} ${isScrolled || mobileMenuOpen ? 'bg-darker/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="md:hidden">
            <button 
              aria-label="Toggle Mobile Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-white hover:text-gold transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#collections" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">Collections</a>
            <a href="#philosophy" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">Philosophy</a>
          </div>

          <div className="text-2xl font-serif tracking-[0.2em] text-center font-bold">
            <span className="text-gold">O</span>RIGIN
          </div>

          <div className="flex items-center space-x-6">
            <a href="#story" className="hidden md:block text-sm tracking-widest uppercase hover:text-gold transition-colors">Story</a>
            <button 
              aria-label="Open Cart"
              onClick={toggleCart} 
              className="hover:text-gold transition-colors relative"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-dark text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-darker/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-10"
          >
            <a href="#collections" onClick={() => setMobileMenuOpen(false)} className="text-white text-3xl font-serif tracking-widest hover:text-gold transition-colors">Collections</a>
            <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="text-white text-3xl font-serif tracking-widest hover:text-gold transition-colors">Philosophy</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="text-white text-3xl font-serif tracking-widest hover:text-gold transition-colors">Story</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
