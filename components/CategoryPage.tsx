import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { useLanguage } from '../contexts/LanguageContext';

interface Project {
  titleKey?: string;
  categoryKey?: string;
  descriptionKey?: string;
  detailsKey?: string;
  titleEn?: string;
  titleHe?: string;
  categoryEn?: string;
  categoryHe?: string;
  descriptionEn?: string;
  descriptionHe?: string;
  detailsEn?: string;
  detailsHe?: string;
  imageUrl: string;
  images?: string[];
  category: string;
}

interface CategoryPageProps {
  categoryId: string;
  categoryNameEn: string;
  categoryNameHe: string;
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onBack: () => void;
}

export function CategoryPage({ 
  categoryId, 
  categoryNameEn, 
  categoryNameHe,
  projects,
  onProjectClick,
  onBack
}: CategoryPageProps) {
  const { t, language } = useLanguage();

  const categoryName = language === 'en' ? categoryNameEn : categoryNameHe;

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-8 mb-16">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onBack}
          className="flex items-center gap-2 mb-12 group"
          style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 300 }}
        >
          {language === 'en' ? (
            <>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </>
          ) : (
            <>
              <span>חזרה לדף הבית</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-[#C6A667]"></div>
            <span style={{ 
              color: '#C6A667', 
              fontSize: '0.8rem', 
              fontWeight: 400, 
              letterSpacing: '1.5px', 
              textTransform: 'uppercase' 
            }}>
              {language === 'en' ? 'Projects' : 'פרויקטים'}
            </span>
          </div>
          
          <h1 className="mb-6" style={{ 
            color: '#1A1A1A', 
            fontSize: '3.5rem', 
            fontWeight: 300,
            letterSpacing: '1px'
          }}>
            {categoryName}
          </h1>
          
          <p style={{ 
            color: '#1A1A1A', 
            opacity: 0.6, 
            fontSize: '1.05rem', 
            lineHeight: '1.8', 
            fontWeight: 300,
            maxWidth: '800px'
          }}>
            {language === 'en' 
              ? `Explore our curated collection of ${categoryNameEn.toLowerCase()} projects, showcasing innovative design and exceptional craftsmanship.`
              : `גלה את אוסף הפרויקטים שלנו ב${categoryNameHe}, המציגים עיצוב חדשני ואומנות יוצאת דופן.`}
          </p>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1200px] mx-auto px-8 pb-32">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {projects.map((project, index) => {
              const title = project.titleKey 
                ? t(project.titleKey) 
                : (language === 'en' ? project.titleEn : project.titleHe) || '';
              const category = project.categoryKey 
                ? t(project.categoryKey) 
                : (language === 'en' ? project.categoryEn : project.categoryHe) || '';
              const description = project.descriptionKey 
                ? t(project.descriptionKey) 
                : (language === 'en' ? project.descriptionEn : project.descriptionHe) || '';
              
              return (
                <ProjectCard 
                  key={index} 
                  title={title}
                  category={category}
                  description={description}
                  imageUrl={project.imageUrl}
                  index={index}
                  onClick={() => onProjectClick(project)}
                />
              );
            })}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <p style={{ 
              color: '#1A1A1A', 
              opacity: 0.5, 
              fontSize: '1.1rem', 
              fontWeight: 300 
            }}>
              {language === 'en' 
                ? 'No projects in this category yet.' 
                : 'אין פרויקטים בקטגוריה זו עדיין.'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
