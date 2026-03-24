import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
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
}

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { t, language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  // Get text based on translation keys or direct text
  const title = project.titleKey 
    ? t(project.titleKey) 
    : (language === 'en' ? project.titleEn : project.titleHe) || '';
  const category = project.categoryKey 
    ? t(project.categoryKey) 
    : (language === 'en' ? project.categoryEn : project.categoryHe) || '';
  const description = project.descriptionKey 
    ? t(project.descriptionKey) 
    : (language === 'en' ? project.descriptionEn : project.descriptionHe) || '';
  const details = project.detailsKey 
    ? t(project.detailsKey) 
    : (language === 'en' ? project.detailsEn : project.detailsHe);

  const images = project.images || [project.imageUrl];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  return (
    <AnimatePresence>
      <div>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
        >
          <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto pointer-events-auto">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-10 p-3 bg-white/90 hover:bg-white transition-colors duration-300"
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <X className="w-6 h-6" style={{ color: '#1A1A1A' }} />
            </button>

            {/* Image Gallery */}
            <div className="relative w-full h-[40vh] md:h-[60vh] bg-[#F3F3F3]">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={images[currentImageIndex]}
                alt={`${title} - ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white border-[1px] border-[#1A1A1A]/10 transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white border-[1px] border-[#1A1A1A]/10 transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" style={{ color: '#1A1A1A' }} />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90" style={{ backdropFilter: 'blur(10px)' }}>
                    <span style={{ color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 300 }}>
                      {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Project Information */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-12 bg-[#C6A667]"></div>
                <span style={{ color: '#C6A667', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  {category}
                </span>
              </div>
              
              <h2 className="mb-6" style={{ color: '#1A1A1A', fontSize: '2.5rem', fontWeight: 300, lineHeight: '1.2' }}>
                {title}
              </h2>
              
              <p className="mb-8 max-w-3xl" style={{ color: '#1A1A1A', opacity: 0.8, fontSize: '1.1rem', lineHeight: '1.9', fontWeight: 300 }}>
                {description}
              </p>

              {details && (
                <div className="border-l-[1px] border-[#C6A667] pl-8 py-4">
                  <p style={{ color: '#1A1A1A', opacity: 0.7, fontSize: '1rem', lineHeight: '1.8', fontWeight: 300, whiteSpace: 'pre-line' }}>
                    {details}
                  </p>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="px-8 md:px-12 pb-12">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square overflow-hidden transition-all duration-300 ${
                        currentImageIndex === index 
                          ? 'ring-2 ring-[#C6A667] opacity-100' 
                          : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}