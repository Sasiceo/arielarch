import { motion } from 'motion/react';
import { useState } from 'react';
import { Plus, Edit, Trash2, LogOut, Image as ImageIcon } from 'lucide-react';
import { AdminProjectForm } from './AdminProjectForm';
import logoImage from '../assets/logo.png';

interface Project {
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
  drawings?: string[];
  category: string;
}

interface Category {
  id: string;
  nameEn: string;
  nameHe: string;
}

interface AdminDashboardProps {
  projects: Project[];
  categories: Category[];
  onAddProject: (project: Project) => void;
  onEditProject: (index: number, project: Project) => void;
  onDeleteProject: (index: number) => void;
  onLogout: () => void;
}

export function AdminDashboard({ 
  projects, 
  categories, 
  onAddProject, 
  onEditProject, 
  onDeleteProject,
  onLogout 
}: AdminDashboardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleSaveProject = (project: Project) => {
    if (editingIndex !== null) {
      onEditProject(editingIndex, project);
      setEditingIndex(null);
    } else {
      onAddProject(project);
    }
    setIsFormOpen(false);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this project?\nהאם אתה בטוח שברצונך למחוק פרויקט זה?')) {
      onDeleteProject(index);
    }
  };

  const filteredProjects = filterCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === filterCategory);

  const getCategoryName = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? `${cat.nameEn} / ${cat.nameHe}` : categoryId;
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Header */}
      <div className="bg-white border-b border-[#1A1A1A]/10">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Ariel Hasan" className="h-8 w-auto" />
            <div>
              <div className="tracking-wide" style={{ color: '#1A1A1A', fontSize: '0.95rem', fontWeight: 400 }}>
                Admin Dashboard
              </div>
              <div className="tracking-wide" style={{ color: '#1A1A1A', fontSize: '0.7rem', fontWeight: 300, opacity: 0.6 }}>
                מערכת ניהול פרויקטים
              </div>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-[#F3F3F3] transition-colors"
            style={{ color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 300 }}
          >
            <LogOut className="w-4 h-4" />
            Logout / התנתק
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 border border-[#1A1A1A]/10"
          >
            <div style={{ color: '#C6A667', fontSize: '2rem', fontWeight: 300 }}>
              {projects.length}
            </div>
            <div style={{ color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 300, opacity: 0.7 }}>
              Total Projects / סה"כ פרויקטים
            </div>
          </motion.div>

          {categories.map((cat, index) => {
            const count = projects.filter(p => p.category === cat.id).length;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white p-6 border border-[#1A1A1A]/10"
              >
                <div style={{ color: '#C6A667', fontSize: '2rem', fontWeight: 300 }}>
                  {count}
                </div>
                <div style={{ color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 300, opacity: 0.7 }}>
                  {cat.nameEn} / {cat.nameHe}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <label style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
              Filter / סנן:
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-[#1A1A1A]/20 focus:border-[#C6A667] focus:outline-none bg-white"
              style={{ fontSize: '0.85rem', fontWeight: 300 }}
            >
              <option value="all">All Categories / כל הקטגוריות</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameEn} / {cat.nameHe}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              setEditingIndex(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-[#C6A667] text-white hover:bg-[#B89557] transition-colors"
            style={{ fontSize: '0.9rem', fontWeight: 400, letterSpacing: '0.5px' }}
          >
            <Plus className="w-4 h-4" />
            Add New Project / הוסף פרויקט חדש
          </button>
        </div>

        {/* Projects List */}
        <div className="bg-white border border-[#1A1A1A]/10">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#1A1A1A]/10 bg-[#F3F3F3]">
            <div className="col-span-1" style={{ color: '#1A1A1A', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '0.5px' }}>
              Image
            </div>
            <div className="col-span-3" style={{ color: '#1A1A1A', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '0.5px' }}>
              Title / כותרת
            </div>
            <div className="col-span-2" style={{ color: '#1A1A1A', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '0.5px' }}>
              Category / קטגוריה
            </div>
            <div className="col-span-4" style={{ color: '#1A1A1A', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '0.5px' }}>
              Description / תיאור
            </div>
            <div className="col-span-2 text-center" style={{ color: '#1A1A1A', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '0.5px' }}>
              Actions / פעולות
            </div>
          </div>

          {/* Table Rows */}
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => {
              const actualIndex = projects.indexOf(project);
              return (
                <motion.div
                  key={actualIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#1A1A1A]/5 hover:bg-[#F3F3F3]/50 transition-colors"
                >
                  <div className="col-span-1">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.titleEn || ''} 
                        className="w-12 h-12 object-cover border border-[#1A1A1A]/10"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#F3F3F3] flex items-center justify-center border border-[#1A1A1A]/10">
                        <ImageIcon className="w-5 h-5 text-[#1A1A1A]/30" />
                      </div>
                    )}
                  </div>
                  <div className="col-span-3 flex flex-col justify-center">
                    <div style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: 400 }}>
                      {project.titleEn || 'No title'}
                    </div>
                    <div style={{ color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 300, opacity: 0.6 }} dir="rtl">
                      {project.titleHe || 'אין כותרת'}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="px-3 py-1 bg-[#C6A667]/10 border border-[#C6A667]/20" style={{ color: '#C6A667', fontSize: '0.75rem', fontWeight: 400 }}>
                      {getCategoryName(project.category)}
                    </span>
                  </div>
                  <div className="col-span-4 flex items-center">
                    <p className="line-clamp-2" style={{ color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 300, opacity: 0.7 }}>
                      {project.descriptionEn || 'No description'}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(actualIndex)}
                      className="p-2 hover:bg-[#C6A667]/10 transition-colors rounded"
                      title="Edit / ערוך"
                    >
                      <Edit className="w-4 h-4" style={{ color: '#C6A667' }} />
                    </button>
                    <button
                      onClick={() => handleDelete(actualIndex)}
                      className="p-2 hover:bg-red-50 transition-colors rounded"
                      title="Delete / מחק"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-20 text-center">
              <ImageIcon className="w-12 h-12 mx-auto mb-4" style={{ color: '#1A1A1A', opacity: 0.2 }} />
              <p style={{ color: '#1A1A1A', fontSize: '0.95rem', fontWeight: 300, opacity: 0.5 }}>
                No projects found / לא נמצאו פרויקטים
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Project Form Modal */}
      {isFormOpen && (
        <AdminProjectForm
          onClose={() => {
            setIsFormOpen(false);
            setEditingIndex(null);
          }}
          onSave={handleSaveProject}
          categories={categories}
          editProject={editingIndex !== null ? projects[editingIndex] : null}
        />
      )}
    </div>
  );
}
