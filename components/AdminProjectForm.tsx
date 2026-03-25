import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { X, Upload, Plus, Trash2, Loader2, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface Category {
  id: string;
  nameEn: string;
  nameHe: string;
}

interface ProjectFormData {
  titleEn: string;
  titleHe: string;
  categoryEn: string;
  categoryHe: string;
  descriptionEn: string;
  descriptionHe: string;
  detailsEn: string;
  detailsHe: string;
  imageUrl: string;
  images: string[];
  drawings: string[];
  category: string;
}

interface AdminProjectFormProps {
  onClose: () => void;
  onSave: (project: ProjectFormData) => void;
  categories: Category[];
  editProject?: ProjectFormData | null;
}

export function AdminProjectForm({ onClose, onSave, categories, editProject }: AdminProjectFormProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<ProjectFormData>(
    editProject || {
      titleEn: '',
      titleHe: '',
      categoryEn: '',
      categoryHe: '',
      descriptionEn: '',
      descriptionHe: '',
      detailsEn: '',
      detailsHe: '',
      imageUrl: '',
      images: [''],
      drawings: [],
      category: ''
    }
  );

  const [imageInput, setImageInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = (categoryId: string) => {
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    if (selectedCategory) {
      setFormData({
        ...formData,
        category: categoryId,
        categoryEn: selectedCategory.nameEn,
        categoryHe: selectedCategory.nameHe
      });
    }
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageInput.trim()],
        imageUrl: formData.imageUrl || imageInput.trim() // Set as main image if none exists
      });
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages,
      imageUrl: newImages.length > 0 ? newImages[0] : ''
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        alert(`Failed to upload ${file.name} / שגיאה בהעלאת ${file.name}`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      newImages.push(urlData.publicUrl);
    }

    if (newImages.length > 0) {
      const updatedImages = [...formData.images.filter(img => img), ...newImages];
      setFormData({
        ...formData,
        images: updatedImages,
        imageUrl: formData.imageUrl || updatedImages[0]
      });
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setPdfUploading(true);
    const newDrawings: string[] = [];

    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/drawings/${fileName}`;

      const { error } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        alert(`Failed to upload ${file.name} / שגיאה בהעלאת ${file.name}`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      newDrawings.push(urlData.publicUrl);
    }

    if (newDrawings.length > 0) {
      setFormData({
        ...formData,
        drawings: [...formData.drawings, ...newDrawings],
      });
    }

    setPdfUploading(false);
    if (pdfInputRef.current) pdfInputRef.current.value = '';
  };

  const handleRemoveDrawing = (index: number) => {
    setFormData({
      ...formData,
      drawings: formData.drawings.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.titleEn || !formData.titleHe || !formData.category || !formData.imageUrl) {
      alert('נא למלא את כל השדות החובה / Please fill all required fields');
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#1A1A1A]/10 px-8 py-6 flex items-center justify-between">
          <h2 style={{ color: '#1A1A1A', fontSize: '1.5rem', fontWeight: 300 }}>
            {editProject ? 'Edit Project / ערוך פרויקט' : 'Add New Project / הוסף פרויקט חדש'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F3F3F3] transition-colors rounded-full"
          >
            <X className="w-5 h-5" style={{ color: '#1A1A1A' }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Category Selection */}
          <div className="mb-8">
            <label className="block mb-3" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
              Category / קטגוריה <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#C6A667] focus:outline-none"
              required
            >
              <option value="">Select Category / בחר קטגוריה</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameEn} / {cat.nameHe}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                Title (English) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#C6A667] focus:outline-none"
                placeholder="Project Title"
                required
              />
            </div>
            <div>
              <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400, direction: 'rtl', textAlign: 'right' }}>
                כותרת (עברית) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.titleHe}
                onChange={(e) => setFormData({ ...formData, titleHe: e.target.value })}
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#C6A667] focus:outline-none"
                placeholder="כותרת הפרויקט"
                dir="rtl"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                Description (English)
              </label>
              <textarea
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#C6A667] focus:outline-none min-h-[100px]"
                placeholder="Short description"
              />
            </div>
            <div>
              <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400, direction: 'rtl', textAlign: 'right' }}>
                תיאור (עברית)
              </label>
              <textarea
                value={formData.descriptionHe}
                onChange={(e) => setFormData({ ...formData, descriptionHe: e.target.value })}
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#C6A667] focus:outline-none min-h-[100px]"
                placeholder="תיאור קצר"
                dir="rtl"
              />
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                Details (English)
              </label>
              <textarea
                value={formData.detailsEn}
                onChange={(e) => setFormData({ ...formData, detailsEn: e.target.value })}
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#C6A667] focus:outline-none min-h-[150px]"
                placeholder="Detailed project description"
              />
            </div>
            <div>
              <label className="block mb-2" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400, direction: 'rtl', textAlign: 'right' }}>
                פרטים (עברית)
              </label>
              <textarea
                value={formData.detailsHe}
                onChange={(e) => setFormData({ ...formData, detailsHe: e.target.value })}
                className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#C6A667] focus:outline-none min-h-[150px]"
                placeholder="תיאור מפורט של הפרויקט"
                dir="rtl"
              />
            </div>
          </div>

          {/* Images */}
          <div className="mb-8">
            <label className="block mb-3" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
              Project Images / תמונות פרויקט <span className="text-red-500">*</span>
            </label>
            
            {/* Current Images */}
            {formData.images.length > 0 && formData.images[0] && (
              <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((img, index) => img && (
                  <div key={index} className="relative group">
                    <img 
                      src={img} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover border border-[#1A1A1A]/10"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#C6A667] text-white text-xs">
                        Main
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload Images */}
            <div className="mb-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full px-6 py-4 border-2 border-dashed border-[#1A1A1A]/20 hover:border-[#C6A667] transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#C6A667' }} />
                    <span style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 300 }}>
                      Uploading... / מעלה...
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" style={{ color: '#C6A667' }} />
                    <span style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 300 }}>
                      Upload Images / העלה תמונות
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Or Add by URL */}
            <div className="flex gap-2">
              <input
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                className="flex-1 px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#C6A667] focus:outline-none"
                placeholder="Or paste image URL (https://...)"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-6 py-3 bg-[#C6A667] text-white hover:bg-[#B89557] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add / הוסף
              </button>
            </div>
            <p className="mt-2 text-xs" style={{ color: '#1A1A1A', opacity: 0.5 }}>
              First image will be the main project image / התמונה הראשונה תהיה התמונה הראשית
            </p>
          </div>

          {/* Drawings (PDF) */}
          <div className="mb-8">
            <label className="block mb-3" style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
              Drawings / שרטוטים (PDF)
            </label>

            {/* Uploaded Drawings List */}
            {formData.drawings.length > 0 && (
              <div className="mb-4 space-y-2">
                {formData.drawings.map((url, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-[#1A1A1A]/10 group">
                    <FileText className="w-5 h-5 flex-shrink-0" style={{ color: '#C6A667' }} />
                    <span className="flex-1 truncate" style={{ color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 300 }}>
                      {language === 'en' ? `Drawing ${index + 1}` : `שרטוט ${index + 1}`}
                    </span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs hover:bg-[#F3F3F3] transition-colors"
                      style={{ color: '#C6A667', fontWeight: 400 }}
                    >
                      View / צפה
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveDrawing(index)}
                      className="p-1.5 hover:bg-red-50 transition-colors rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload PDF Button */}
            <input
              ref={pdfInputRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handlePdfUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => pdfInputRef.current?.click()}
              disabled={pdfUploading}
              className="w-full px-6 py-4 border-2 border-dashed border-[#1A1A1A]/20 hover:border-[#C6A667] transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {pdfUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#C6A667' }} />
                  <span style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 300 }}>
                    Uploading... / מעלה...
                  </span>
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" style={{ color: '#C6A667' }} />
                  <span style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 300 }}>
                    Upload Drawings (PDF) / העלה שרטוטים
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-[#1A1A1A]/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[#1A1A1A]/20 hover:bg-[#F3F3F3] transition-colors"
              style={{ fontSize: '0.9rem', fontWeight: 400 }}
            >
              Cancel / ביטול
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#C6A667] text-white hover:bg-[#B89557] transition-colors"
              style={{ fontSize: '0.9rem', fontWeight: 400 }}
            >
              {editProject ? 'Update Project / עדכן' : 'Add Project / הוסף'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
