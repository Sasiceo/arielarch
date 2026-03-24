import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
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

interface CategoryProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
  categoryNameEn: string;
  categoryNameHe: string;
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function CategoryProjectsModal({ 
  isOpen, 
  onClose, 
  categoryId, 
  categoryNameEn, 
  categoryNameHe,
  projects,
  onProjectClick 
}: CategoryProjectsModalProps) {
  const { t, language } = useLanguage();

  const categoryName = language === 'en' ? categoryNameEn : categoryNameHe;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 overflow-y-auto pointer-events-none"
          >
            <div className="min-h-screen px-4 py-16 md:px-8 md:py-20 pointer-events-auto">
              <div className="bg-white max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 px-8 md:px-12 py-8 border-b border-[#1A1A1A]/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-[1px] w-12 bg-[#C6A667]"></div>
                        <span style={{ 
                          color: '#C6A667', 
                          fontSize: '0.8rem', 
                          fontWeight: 400, 
                          letterSpacing: '1.5px', 
                          textTransform: 'uppercase' 
                        }}>
                          {language === 'en' ? 'Category' : 'קטגוריה'}
                        </span>
                      </div>
                      <h2 style={{ 
                        color: '#1A1A1A', 
                        fontSize: '2.5rem', 
                        fontWeight: 300,
                        letterSpacing: '1px'
                      }}>
                        {categoryName}
                      </h2>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-3 hover:bg-[#F3F3F3] transition-colors duration-300"
                    >
                      <X className="w-6 h-6" style={{ color: '#1A1A1A' }} />
                    </button>
                  </div>
                </div>

                {/* Projects Grid */}
                <div className="px-8 md:px-12 py-12">
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
                    <div className="text-center py-20">
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
