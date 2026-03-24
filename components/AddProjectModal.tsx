import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: ProjectData) => void;
}

export interface ProjectData {
  titleEn: string;
  titleHe: string;
  categoryEn: string;
  categoryHe: string;
  descriptionEn: string;
  descriptionHe: string;
  detailsEn?: string;
  detailsHe?: string;
  imageUrl: string;
  images?: string[];
  category: string;
}

export function AddProjectModal({ isOpen, onClose, onAdd }: AddProjectModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<ProjectData>({
    titleEn: '',
    titleHe: '',
    categoryEn: '',
    categoryHe: '',
    descriptionEn: '',
    descriptionHe: '',
    detailsEn: '',
    detailsHe: '',
    imageUrl: '',
    images: [],
    category: 'architecture'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If images array is empty, use imageUrl as the only image
    const projectData = {
      ...formData,
      images: formData.images && formData.images.length > 0 ? formData.images : [formData.imageUrl]
    };
    onAdd(projectData);
    setFormData({
      titleEn: '',
      titleHe: '',
      categoryEn: '',
      categoryHe: '',
      descriptionEn: '',
      descriptionHe: '',
      detailsEn: '',
      detailsHe: '',
      imageUrl: '',
      images: [],
      category: 'architecture'
    });
    onClose();
  };

  const handleChange = (field: keyof ProjectData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUrlsChange = (value: string) => {
    // Split by newlines and filter empty lines
    const urls = value.split('\n').map(url => url.trim()).filter(url => url.length > 0);
    handleChange('images', urls);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 style={{ color: '#1A1A1A', fontSize: '2rem', fontWeight: 300 }}>
                {language === 'en' ? 'Add New Project' : 'הוסף פרויקט חדש'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#F3F3F3] transition-colors duration-300"
              >
                <X className="w-5 h-5" style={{ color: '#1A1A1A' }} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* English Fields */}
              <div className="border-l-[1px] border-[#C6A667] pl-6 space-y-4">
                <h3 style={{ color: '#C6A667', fontSize: '0.85rem', fontWeight: 400, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  English
                </h3>
                
                <div>
                  <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => handleChange('titleEn', e.target.value)}
                    className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300"
                    style={{ color: '#1A1A1A', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.categoryEn}
                    onChange={(e) => handleChange('categoryEn', e.target.value)}
                    className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300"
                    style={{ color: '#1A1A1A', fontSize: '0.95rem' }}
                    placeholder="e.g., Residential, Interior Design, Carpentry"
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.descriptionEn}
                    onChange={(e) => handleChange('descriptionEn', e.target.value)}
                    className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300 resize-none"
                    style={{ color: '#1A1A1A', fontSize: '0.95rem', lineHeight: '1.6' }}
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                    Details
                  </label>
                  <textarea
                    rows={3}
                    value={formData.detailsEn}
                    onChange={(e) => handleChange('detailsEn', e.target.value)}
                    className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300 resize-none"
                    style={{ color: '#1A1A1A', fontSize: '0.95rem', lineHeight: '1.6' }}
                  />
                </div>
              </div>

              {/* Hebrew Fields */}
              <div className="border-l-[1px] border-[#C6A667] pl-6 space-y-4">
                <h3 style={{ color: '#C6A667', fontSize: '0.85rem', fontWeight: 400, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  עברית
                </h3>
                
                <div>
                  <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                    כותרת
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleHe}
                    onChange={(e) => handleChange('titleHe', e.target.value)}
                    className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300"
                    style={{ color: '#1A1A1A', fontSize: '0.95rem' }}
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                    קטגוריה
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.categoryHe}
                    onChange={(e) => handleChange('categoryHe', e.target.value)}
                    className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300"
                    style={{ color: '#1A1A1A', fontSize: '0.95rem' }}
                    dir="rtl"
                    placeholder="למשל: מגורים, עיצוב פנים, נגרות"
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                    תיאור
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.descriptionHe}
                    onChange={(e) => handleChange('descriptionHe', e.target.value)}
                    className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300 resize-none"
                    style={{ color: '#1A1A1A', fontSize: '0.95rem', lineHeight: '1.6' }}
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                    פרטים
                  </label>
                  <textarea
                    rows={3}
                    value={formData.detailsHe}
                    onChange={(e) => handleChange('detailsHe', e.target.value)}
                    className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300 resize-none"
                    style={{ color: '#1A1A1A', fontSize: '0.95rem', lineHeight: '1.6' }}
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Project Section Selection */}
              <div>
                <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                  {language === 'en' ? 'Project Section' : 'קטגוריית פרויקט'}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300"
                  style={{ color: '#1A1A1A', fontSize: '0.95rem' }}
                >
                  <option value="architecture">{language === 'en' ? 'Architecture' : 'אדריכלות'}</option>
                  <option value="interior">{language === 'en' ? 'Interior Design' : 'עיצוב פנים'}</option>
                  <option value="product">{language === 'en' ? 'Product Design' : 'עיצוב מוצר'}</option>
                  <option value="carpentry">{language === 'en' ? 'Carpentry' : 'נגרות'}</option>
                </select>
                <p className="mt-2" style={{ color: '#1A1A1A', opacity: 0.5, fontSize: '0.85rem' }}>
                  {language === 'en' 
                    ? 'Select which section this project belongs to' 
                    : 'בחר לאיזו קטגוריה שייך הפרויקט'}
                </p>
              </div>

              {/* Image URL */}
              <div>
                <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                  {language === 'en' ? 'Image URL' : 'כתובת תמונה'}
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => handleChange('imageUrl', e.target.value)}
                  className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300"
                  style={{ color: '#1A1A1A', fontSize: '0.95rem' }}
                  placeholder="https://..."
                />
                <p className="mt-2" style={{ color: '#1A1A1A', opacity: 0.5, fontSize: '0.85rem' }}>
                  {language === 'en' 
                    ? 'Enter a direct URL to your project image' 
                    : 'הזן כתובת ישירה לתמונת הפרויקט'}
                </p>
              </div>

              {/* Additional Image URLs */}
              <div>
                <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                  {language === 'en' ? 'Additional Image URLs' : 'כתובות תמונות נוספות'}
                </label>
                <textarea
                  rows={3}
                  value={formData.images ? formData.images.join('\n') : ''}
                  onChange={(e) => handleImageUrlsChange(e.target.value)}
                  className="w-full px-4 py-3 border-[1px] border-[#1A1A1A]/20 focus:border-[#C6A667] outline-none transition-colors duration-300 resize-none"
                  style={{ color: '#1A1A1A', fontSize: '0.95rem', lineHeight: '1.6' }}
                  placeholder="https://...\nhttps://..."
                />
                <p className="mt-2" style={{ color: '#1A1A1A', opacity: 0.5, fontSize: '0.85rem' }}>
                  {language === 'en' 
                    ? 'Enter additional image URLs, one per line' 
                    : 'הזן כתובות תמונות נוספות, אחת בשורה'}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#1A1A1A] border border-[#1A1A1A] transition-all duration-300 hover:bg-transparent hover:border-[#C6A667] hover:text-[#1A1A1A]"
                  style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 400, letterSpacing: '1px' }}
                >
                  {language === 'en' ? 'Add Project' : 'הוסף פרויקט'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-[#1A1A1A]/20 transition-all duration-300 hover:border-[#1A1A1A]"
                  style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400, letterSpacing: '1px' }}
                >
                  {language === 'en' ? 'Cancel' : 'ביטול'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}