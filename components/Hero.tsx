import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  imageUrl: string;
}

export function Hero({ imageUrl }: HeroProps) {
  const { t } = useLanguage();

  const scrollToPortfolio = () =>
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Background image with slow Ken Burns */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 7, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src={imageUrl}
          alt={t('hero.title')}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Legibility scrims: bottom-up darkening + a soft overall wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-black/10" />

      {/* Content — bottom, start-aligned (works for LTR & RTL) */}
      <div className="relative h-full flex items-end">
        <div className="w-full max-w-[1200px] mx-auto px-8 pb-28 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="max-w-3xl text-start"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline w-12" />
              <span className="kicker text-white/90">{t('hero.kicker')}</span>
            </div>

            <h1 className="text-white mb-7" style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)' }}>
              {t('hero.title')}
            </h1>

            <p className="text-white/85 mb-10 max-w-xl" style={{ fontSize: '1.075rem', lineHeight: 1.85 }}>
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap items-center gap-7">
              <button
                onClick={scrollToPortfolio}
                className="px-9 py-3.5 bg-white text-ink transition-colors duration-300 hover:bg-gold hover:text-white cursor-pointer"
                style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                {t('hero.cta')}
              </button>

              <button
                onClick={scrollToContact}
                className="group relative text-white/90 transition-colors duration-300 hover:text-gold cursor-pointer"
                style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                {t('hero.cta2')}
                <span className="absolute -bottom-1 inset-x-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToPortfolio}
        aria-label={t('hero.scroll')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="text-white/60 text-[0.65rem] tracking-[0.25em] uppercase">{t('hero.scroll')}</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="block w-px h-8 bg-white/50"
        />
      </motion.button>
    </section>
  );
}
