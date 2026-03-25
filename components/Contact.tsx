import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-[#C6A667]"></div>
            <span style={{ color: '#C6A667', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              {t('contact.label')}
            </span>
            <div className="h-[1px] w-12 bg-[#C6A667]"></div>
          </div>
          
          <h2 className="mb-6" style={{ color: '#1A1A1A', fontSize: '2.8rem', fontWeight: 300 }}>
            {t('contact.title')}
          </h2>
          
          <p className="max-w-2xl mx-auto" style={{ color: '#1A1A1A', opacity: 0.7, fontSize: '1.05rem', lineHeight: '1.8', fontWeight: 300 }}>
            {t('contact.description')}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto"
        >
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-[1px] border-[#1A1A1A] transition-colors duration-300 group-hover:border-[#C6A667]">
              <Mail className="w-6 h-6" style={{ color: '#1A1A1A' }} />
            </div>
            <h3 className="mb-2" style={{ color: '#1A1A1A', fontSize: '1.1rem', fontWeight: 400 }}>
              {t('contact.email')}
            </h3>
            <a 
              href="mailto:idra.arc@gmail.com"
              className="transition-colors duration-300 hover:text-[#C6A667]"
              style={{ color: '#1A1A1A', opacity: 0.7, fontSize: '0.95rem', fontWeight: 300 }}
            >
              idra.arc@gmail.com
            </a>
          </div>
          
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-[1px] border-[#1A1A1A] transition-colors duration-300 group-hover:border-[#C6A667]">
              <Phone className="w-6 h-6" style={{ color: '#1A1A1A' }} />
            </div>
            <h3 className="mb-2" style={{ color: '#1A1A1A', fontSize: '1.1rem', fontWeight: 400 }}>
              {t('contact.phone')}
            </h3>
            <a 
              href="tel:+972527028605"
              className="transition-colors duration-300 hover:text-[#C6A667]"
              style={{ color: '#1A1A1A', opacity: 0.7, fontSize: '0.95rem', fontWeight: 300 }}
            >
              052-702-8605
            </a>
          </div>
          
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-[1px] border-[#1A1A1A] transition-colors duration-300 group-hover:border-[#C6A667]">
              <MapPin className="w-6 h-6" style={{ color: '#1A1A1A' }} />
            </div>
            <h3 className="mb-2" style={{ color: '#1A1A1A', fontSize: '1.1rem', fontWeight: 400 }}>
              {t('contact.location')}
            </h3>
            <p style={{ color: '#1A1A1A', opacity: 0.7, fontSize: '0.95rem', fontWeight: 300 }}>
              {t('contact.location.value')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}