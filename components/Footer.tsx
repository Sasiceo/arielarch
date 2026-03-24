import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const handleAdminAccess = () => {
    window.location.hash = 'admin';
  };

  return (
    <footer className="py-12 px-8 border-t-[1px] border-[#1A1A1A]/10" style={{ backgroundColor: '#F3F3F3' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p 
              onDoubleClick={handleAdminAccess}
              className="cursor-default select-none"
              style={{ color: '#1A1A1A', opacity: 0.6, fontSize: '0.85rem', fontWeight: 300 }}
            >
              {t('footer.copyright')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-8"
          >
            <a 
              href="#" 
              className="transition-all duration-300 hover:opacity-100"
              style={{ color: '#1A1A1A', opacity: 0.6, fontSize: '0.85rem', fontWeight: 300 }}
            >
              Instagram
            </a>
            <a 
              href="#" 
              className="transition-all duration-300 hover:opacity-100"
              style={{ color: '#1A1A1A', opacity: 0.6, fontSize: '0.85rem', fontWeight: 300 }}
            >
              LinkedIn
            </a>
            <a 
              href="#" 
              className="transition-all duration-300 hover:opacity-100"
              style={{ color: '#1A1A1A', opacity: 0.6, fontSize: '0.85rem', fontWeight: 300 }}
            >
              Pinterest
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}