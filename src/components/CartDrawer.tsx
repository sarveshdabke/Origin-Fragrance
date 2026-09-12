import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const CartDrawer = () => {
  const { isOpen, items, setIsOpen, updateQuantity, removeItem } = useCartStore();

  const totalAmount = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (price * item.quantity);
  }, 0);

  // Focus trapping and esc key handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-darker/80 z-[400] backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-dark z-[500] border-l border-gold/20 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="text-2xl font-serif text-gold">Your Cart</h3>
              <button 
                aria-label="Close Cart"
                onClick={() => setIsOpen(false)} 
                className="hover:text-gold transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/50">
                  <p className="mb-4">Your cart is empty.</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="border border-white/20 px-6 py-2 uppercase tracking-widest text-xs hover:bg-white hover:text-dark transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-md border border-white/10" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-lg">{item.name}</h4>
                        <button 
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeItem(item.id)}
                          className="text-white/40 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-gold mb-2">{item.price}</p>
                      <div className="flex items-center space-x-3 border border-white/20 w-fit rounded-md px-2 py-1">
                        <button 
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="hover:text-gold transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <button 
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="hover:text-gold transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-darker">
                <div className="flex justify-between items-center mb-6 text-lg font-serif">
                  <span>Subtotal</span>
                  <span className="text-gold">${totalAmount.toFixed(2)}</span>
                </div>
                <button className="w-full bg-gold text-dark font-bold tracking-widest uppercase py-4 hover:bg-white transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
