import { motion } from 'motion/react';

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          onClick={() => onCategoryClick(category.id)}
          className="group relative h-[400px] overflow-hidden cursor-pointer text-left"
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-[#F3F3F3]">
            <img 
              src={category.imageUrl} 
              alt={language === 'en' ? category.nameEn : category.nameHe}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500"></div>
          </div>
          
          {/* Category Label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[1px] w-12 bg-[#C6A667] transition-all duration-500 group-hover:w-20"></div>
              </div>
              <h3 className="transition-all duration-300" style={{ 
                color: '#FFFFFF', 
                fontSize: '2rem', 
                fontWeight: 300,
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {language === 'en' ? category.nameEn : category.nameHe}
              </h3>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
