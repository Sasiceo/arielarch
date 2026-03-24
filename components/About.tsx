import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 px-8" style={{ backgroundColor: '#F3F3F3' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[#C6A667]"></div>
              <span style={{ color: '#C6A667', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {t('about.label')}
              </span>
            </div>
            
            <h2 className="mb-6" style={{ color: '#1A1A1A', fontSize: '2.8rem', fontWeight: 300 }}>
              {t('about.title')}
            </h2>
            
            <p className="mb-6" style={{ color: '#1A1A1A', opacity: 0.8, fontSize: '1.05rem', lineHeight: '1.9', fontWeight: 300 }}>
              {t('about.description1')}
            </p>
            
            <p style={{ color: '#1A1A1A', opacity: 0.8, fontSize: '1.05rem', lineHeight: '1.9', fontWeight: 300 }}>
              {t('about.description2')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="border-l-[1px] border-[#C6A667] pl-8 py-4">
              <h3 className="mb-2" style={{ color: '#1A1A1A', fontSize: '1.3rem', fontWeight: 400 }}>
                {t('about.service1.title')}
              </h3>
              <p style={{ color: '#1A1A1A', opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.7', fontWeight: 300 }}>
                {t('about.service1.description')}
              </p>
            </div>
            
            <div className="border-l-[1px] border-[#C6A667] pl-8 py-4">
              <h3 className="mb-2" style={{ color: '#1A1A1A', fontSize: '1.3rem', fontWeight: 400 }}>
                {t('about.service2.title')}
              </h3>
              <p style={{ color: '#1A1A1A', opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.7', fontWeight: 300 }}>
                {t('about.service2.description')}
              </p>
            </div>
            
            <div className="border-l-[1px] border-[#C6A667] pl-8 py-4">
              <h3 className="mb-2" style={{ color: '#1A1A1A', fontSize: '1.3rem', fontWeight: 400 }}>
                {t('about.service3.title')}
              </h3>
              <p style={{ color: '#1A1A1A', opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.7', fontWeight: 300 }}>
                {t('about.service3.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}