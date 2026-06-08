import { motion } from 'motion/react';
import { Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  // Hidden admin entry: double-click the copyright line
  const handleAdminAccess = () => {
    window.location.hash = 'admin';
  };

  const socials = [
    { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <footer className="px-8 pt-16 pb-10 border-t border-ink/10 bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between gap-10 mb-12"
        >
          {/* Brand */}
          <div className="max-w-sm text-start">
            <div className="font-display text-2xl text-ink mb-3" style={{ fontWeight: 600 }}>
              {t('header.title')}
            </div>
            <p className="text-ink-soft" style={{ fontSize: '0.92rem', lineHeight: 1.7 }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick contact */}
          <div className="text-start">
            <span className="kicker block mb-4">{t('nav.contact')}</span>
            <a
              href="mailto:idra.arc@gmail.com"
              className="block text-ink-soft hover:text-gold transition-colors duration-300 mb-2"
              style={{ fontSize: '0.92rem' }}
            >
              idra.arc@gmail.com
            </a>
            <a
              href="tel:+972527028605"
              className="block text-ink-soft hover:text-gold transition-colors duration-300"
              style={{ fontSize: '0.92rem' }}
              dir="ltr"
            >
              052-702-8605
            </a>
          </div>

          {/* Social */}
          <div className="text-start">
            <span className="kicker block mb-4">{t('footer.follow')}</span>
            <div className="flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 border border-ink/15 text-ink-soft hover:border-gold hover:text-gold transition-colors duration-300"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="hairline w-full opacity-30 mb-6" />

        <p
          onDoubleClick={handleAdminAccess}
          className="cursor-default select-none text-ink/50 text-start"
          style={{ fontSize: '0.82rem', fontWeight: 300 }}
        >
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
