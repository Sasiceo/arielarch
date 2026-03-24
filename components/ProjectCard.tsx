import { motion } from 'motion/react';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  index: number;
  onClick?: () => void;
}

export function ProjectCard({ title, category, description, imageUrl, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-[400px] mb-6 bg-[#F3F3F3]">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="h-[1px] w-8 bg-[#C6A667] transition-all duration-500 group-hover:w-12"></div>
        <span style={{ color: '#C6A667', fontSize: '0.75rem', fontWeight: 400, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
          {category}
        </span>
      </div>
      
      <h3 className="mb-3 transition-colors duration-300 group-hover:text-[#C6A667]" style={{ color: '#1A1A1A', fontSize: '1.6rem', fontWeight: 400 }}>
        {title}
      </h3>
      
      <p style={{ color: '#1A1A1A', opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.7', fontWeight: 300 }}>
        {description}
      </p>
    </motion.div>
  );
}