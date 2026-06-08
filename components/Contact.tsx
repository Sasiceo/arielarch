import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SectionHeading } from './SectionHeading';

const EMAIL = 'idra.arc@gmail.com';
const PHONE_DISPLAY = '052-702-8605';
const PHONE_INTL = '972527028605';

export function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  // No backend yet: hand off to the visitor's mail client with a prefilled
  // message. Swap this for a Formspree/Resend endpoint later if desired.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const whatsappHref = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
    'Hi Ariel, I saw your portfolio and would like to talk about a project.'
  )}`;

  const inputClass =
    'w-full bg-transparent border-b border-ink/20 py-3 text-ink placeholder:text-ink/35 focus:border-gold outline-none transition-colors duration-300';

  const details = [
    { Icon: Mail, label: t('contact.email'), value: EMAIL, href: `mailto:${EMAIL}`, ltr: true },
    { Icon: Phone, label: t('contact.phone'), value: PHONE_DISPLAY, href: `tel:+${PHONE_INTL}`, ltr: true },
    { Icon: MapPin, label: t('contact.location'), value: t('contact.location.value'), href: undefined, ltr: false },
  ];

  return (
    <section id="contact" className="py-28 md:py-36 px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading
          label={t('contact.label')}
          title={t('contact.title')}
          description={t('contact.description')}
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {sent ? (
              <div className="flex flex-col items-start gap-4 h-full justify-center">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-gold">
                  <Check className="w-6 h-6" />
                </span>
                <p className="text-ink-soft" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                  {t('contact.form.success')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7 text-start">
                <div>
                  <label htmlFor="cf-name" className="kicker block mb-2">{t('contact.form.name')}</label>
                  <input
                    id="cf-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className="kicker block mb-2">{t('contact.form.email')}</label>
                  <input
                    id="cf-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    dir="ltr"
                  />
                </div>
                <div>
                  <label htmlFor="cf-message" className="kicker block mb-2">{t('contact.form.message')}</label>
                  <textarea
                    id="cf-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="px-9 py-3.5 bg-ink text-white hover:bg-gold transition-colors duration-300 cursor-pointer"
                  style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}
                >
                  {t('contact.form.send')}
                </button>
              </form>
            )}
          </motion.div>

          {/* Details + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-start"
          >
            <span className="kicker block mb-6">{t('contact.directLabel')}</span>
            <div className="space-y-6 mb-10">
              {details.map(({ Icon, label, value, href, ltr }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="inline-flex items-center justify-center w-11 h-11 border border-ink/15 text-ink shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-ink/50 text-xs tracking-wide mb-0.5">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        className="text-ink hover:text-gold transition-colors duration-300"
                        style={{ fontSize: '1rem' }}
                        dir={ltr ? 'ltr' : undefined}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-ink" style={{ fontSize: '1rem' }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 border border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-300"
              style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.06em' }}
            >
              <MessageCircle className="w-5 h-5" />
              {t('contact.whatsapp')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
