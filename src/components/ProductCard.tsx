import React from 'react';
import { motion } from 'motion/react';
import { useCartStore, Product } from '../store/cartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to your cart`, {
      style: {
        background: '#1a1a1a',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      },
      iconTheme: {
        primary: '#D4AF37',
        secondary: '#000',
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden relative aspect-[3/4] md:aspect-[4/5] rounded-3xl mb-8 border border-white/5 group-hover:border-gold/30 transition-colors duration-700 shadow-2xl">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full"
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Subtle inner vignette to blend images with the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-darker/90 via-darker/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-darker/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
      </div>
      <div className="flex justify-between items-start mt-6 group-hover:translate-x-3 transition-transform duration-500 ease-out">
        <div>
          <h4 className="text-3xl font-serif mb-2">{product.name}</h4>
          <p className="text-white/60 font-light max-w-sm mb-4">{product.description}</p>
          <button 
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAddToCart} 
            className="text-xs tracking-widest uppercase border-b border-gold/30 hover:border-gold hover:text-gold transition-colors pb-1"
          >
            Add to Cart
          </button>
        </div>
        <span className="text-gold font-serif text-xl">{product.price}</span>
      </div>
    </motion.div>
  );
};
