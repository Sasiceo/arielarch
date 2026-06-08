import { motion, AnimatePresence } from 'motion/react';
import logoImage from '../assets/logo.png';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Category {
  id: string;
  nameEn: string;
  nameHe: string;
}

interface HeaderProps {
  categories?: Category[];
  onCategoryClick?: (categoryId: string) => void;
}

export function Header({ categories, onCategoryClick }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Subtle border/shadow + tighter padding once the user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProjectsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
      setIsProjectsOpen(false);
      setMobileOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md transition-[box-shadow,border-color] duration-300 border-b ${
        scrolled ? 'border-black/10 shadow-[0_1px_20px_rgba(0,0,0,0.05)]' : 'border-transparent'
      }`}
    >
      <div className={`max-w-[1200px] mx-auto px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="Ariel Hasan" className="h-8 w-auto" />
          <div>
            <div className="font-display leading-tight" style={{ color: '#1A1A1A', fontSize: '1.15rem', fontWeight: 600 }}>
              {t('header.title')}
            </div>
            <div className="tracking-wide" style={{ color: '#1A1A1A', fontSize: '0.68rem', fontWeight: 300, opacity: 0.6, letterSpacing: '0.06em' }}>
              {t('header.subtitle')}
            </div>
          </div>
        </div>
        
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -me-2 text-ink cursor-pointer"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-12">
            {/* Projects Dropdown */}
            {categories && categories.length > 0 && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="relative group flex items-center gap-1"
                  style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 300, letterSpacing: '0.5px' }}
                >
                  {language === 'en' ? 'Projects' : 'פרויקטים'}
                  <ChevronDown className="w-3 h-3 transition-transform duration-300" style={{ 
                    transform: isProjectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
                  }} />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A667] transition-all duration-300 group-hover:w-full"></span>
                </button>
                
                {/* Dropdown Menu */}
                {isProjectsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-4 bg-white shadow-lg border border-[#1A1A1A]/10 min-w-[200px]"
                    style={{ direction: language === 'he' ? 'rtl' : 'ltr' }}
                  >
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="w-full px-6 py-3 hover:bg-[#F3F3F3] transition-colors duration-200 border-b border-[#1A1A1A]/5 last:border-b-0"
                        style={{ 
                          color: '#1A1A1A', 
                          fontSize: '0.85rem', 
                          fontWeight: 300,
                          letterSpacing: '0.5px',
                          textAlign: language === 'he' ? 'right' : 'left'
                        }}
                      >
                        {language === 'en' ? category.nameEn : category.nameHe}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
            
            <a 
              href="#about" 
              className="relative group"
              style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 300, letterSpacing: '0.5px' }}
            >
              {t('nav.about')}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A667] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#contact" 
              className="relative group"
              style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 300, letterSpacing: '0.5px' }}
            >
              {t('nav.contact')}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A667] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          
          <div className="flex gap-2 border-l border-[#1A1A1A]/10 pl-8">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 transition-all duration-300 ${
                language === 'en' 
                  ? 'border-b-[1px] border-[#C6A667]' 
                  : 'opacity-40 hover:opacity-70'
              }`}
              style={{ color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.5px' }}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('he')}
              className={`px-3 py-1 transition-all duration-300 ${
                language === 'he' 
                  ? 'border-b-[1px] border-[#C6A667]' 
                  : 'opacity-40 hover:opacity-70'
              }`}
              style={{ color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.5px' }}
            >
              עב
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-t border-black/5"
          >
            <nav className="px-8 py-6 flex flex-col gap-1 text-start">
              {categories && categories.length > 0 && (
                <>
                  <span className="kicker block mb-2">{language === 'en' ? 'Projects' : 'פרויקטים'}</span>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="py-2.5 text-start text-ink hover:text-gold transition-colors duration-200 cursor-pointer"
                      style={{ fontSize: '1.05rem' }}
                    >
                      {language === 'en' ? category.nameEn : category.nameHe}
                    </button>
                  ))}
                  <div className="hairline w-full opacity-30 my-4" />
                </>
              )}

              <a
                href="#about"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-ink hover:text-gold transition-colors duration-200"
                style={{ fontSize: '1.05rem' }}
              >
                {t('nav.about')}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-ink hover:text-gold transition-colors duration-200"
                style={{ fontSize: '1.05rem' }}
              >
                {t('nav.contact')}
              </a>

              <div className="hairline w-full opacity-30 my-4" />

              <div className="flex gap-3">
                <button
                  onClick={() => { setLanguage('en'); setMobileOpen(false); }}
                  className={`px-4 py-2 border transition-colors duration-200 cursor-pointer ${language === 'en' ? 'border-gold text-gold' : 'border-ink/15 text-ink/50'}`}
                  style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}
                >
                  English
                </button>
                <button
                  onClick={() => { setLanguage('he'); setMobileOpen(false); }}
                  className={`px-4 py-2 border transition-colors duration-200 cursor-pointer ${language === 'he' ? 'border-gold text-gold' : 'border-ink/15 text-ink/50'}`}
                  style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}
                >
                  עברית
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}