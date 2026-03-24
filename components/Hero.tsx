import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  imageUrl: string;
}

export function Hero({ imageUrl }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src={imageUrl} 
          alt="Contemporary Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
      </motion.div>
      
      <div className="relative h-full flex items-end justify-start max-w-[1200px] mx-auto px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl"
        >
          <h1 className="text-white mb-6" style={{ fontSize: '4rem', fontWeight: 300, letterSpacing: '-0.02em' }}>
            {t('hero.title')}
          </h1>
          <p className="text-white/90 mb-8 max-w-2xl" style={{ fontSize: '1.1rem', lineHeight: '1.8', fontWeight: 300 }}>
            {t('hero.description')}
          </p>
          <button 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white border border-white transition-all duration-300 hover:bg-transparent hover:border-[#C6A667] hover:text-white"
            style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400, letterSpacing: '1px' }}
          >
            {t('hero.cta')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}