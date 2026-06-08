import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Category {
  id: string;
  nameEn: string;
  nameHe: string;
  imageUrl: string;
}

interface CategoryMenuProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
  language: string;
}

export function CategoryMenu({ categories, onCategoryClick, language }: CategoryMenuProps) {
  const { t } = useLanguage();
  const Arrow = language === 'he' ? ArrowLeft : ArrowRight;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.08 }}
          onClick={() => onCategoryClick(category.id)}
          className="group relative h-[440px] lg:h-[480px] overflow-hidden cursor-pointer text-start w-full"
        >
          {/* Background image */}
          <div className="absolute inset-0 bg-cream">
            <img
              src={category.imageUrl}
              alt={language === 'en' ? category.nameEn : category.nameHe}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
            />
            {/* Gradient + hover wash */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
          </div>

          {/* Index number, top-start */}
          <span className="absolute top-7 start-8 text-white/70 font-display text-2xl leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Label + reveal, bottom-start */}
          <div className="absolute bottom-8 start-8 end-8">
            <span className="hairline block w-10 mb-4 transition-all duration-500 group-hover:w-16" />
            <h3 className="text-white mb-3" style={{ fontSize: '2.1rem', lineHeight: 1.1 }}>
              {language === 'en' ? category.nameEn : category.nameHe}
            </h3>
            <span className="inline-flex items-center gap-2 text-white/0 group-hover:text-white/90 transition-colors duration-300 text-sm tracking-wide">
              {t('category.view')}
              <Arrow className="w-4 h-4" />
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
