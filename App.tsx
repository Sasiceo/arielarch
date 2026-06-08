import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryMenu } from './components/CategoryMenu';
import { CategoryPage } from './components/CategoryPage';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AddProjectModal, ProjectData } from './components/AddProjectModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { motion } from 'motion/react';
import heroImage from './assets/Hero.png';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from './lib/supabase';

interface Project {
  id?: string;
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
  drawings?: string[];
  category: string;
}

interface Category {
  id: string;
  nameEn: string;
  nameHe: string;
  imageUrl: string;
}

const categories: Category[] = [
  {
    id: 'architecture',
    nameEn: 'Architecture',
    nameHe: 'אדריכלות',
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NTM5MjAyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 'interior',
    nameEn: 'Interior Design',
    nameHe: 'עיצוב פנים',
    imageUrl: "https://images.unsplash.com/photo-1571273033940-89c3e9bb18b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1NDIxNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 'product',
    nameEn: 'Product Design',
    nameHe: 'עיצוב מוצר',
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9kdWN0JTIwZGVzaWdufGVufDF8fHx8MTc2NTQ0NzA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 'carpentry',
    nameEn: 'Carpentry',
    nameHe: 'נגרות',
    imageUrl: "https://images.unsplash.com/photo-1703160908045-7ef87496cdd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYXJwZW50cnklMjBkZXRhaWx8ZW58MXx8fHwxNzY1NDQ3MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

const initialProjects: Project[] = [
  {
    titleKey: 'project1.title',
    categoryKey: 'project1.category',
    descriptionKey: 'project1.description',
    detailsKey: 'project1.details',
    category: 'architecture',
    imageUrl: "https://images.unsplash.com/photo-1651699002831-cd33d65d26e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnYWxpbGVlJTIwaG91c2UlMjBleHRlcmlvciUyMHN0b25lfGVufDF8fHx8MTc3Mzc4NTcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1651699002831-cd33d65d26e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnYWxpbGVlJTIwaG91c2UlMjBleHRlcmlvciUyMHN0b25lfGVufDF8fHx8MTc3Mzc4NTcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NTM5MjAyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NTM5MjAyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project2.title',
    categoryKey: 'project2.category',
    descriptionKey: 'project2.description',
    detailsKey: 'project2.details',
    category: 'architecture',
    imageUrl: "https://images.unsplash.com/photo-1761792430733-00e53d2a79b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBjb25jcmV0ZSUyMGhvdXNlJTIwZmFjYWRlfGVufDF8fHx8MTc3Mzc4NTcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1761792430733-00e53d2a79b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBjb25jcmV0ZSUyMGhvdXNlJTIwZmFjYWRlfGVufDF8fHx8MTc3Mzc4NTcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NTM5MjAyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project3.title',
    categoryKey: 'project3.category',
    descriptionKey: 'project3.description',
    detailsKey: 'project3.details',
    category: 'architecture',
    imageUrl: "https://images.unsplash.com/photo-1760067537540-cc36c1700d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdmlsbGElMjBnYXJkZW58ZW58MXx8fHwxNzczNzg1NzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1760067537540-cc36c1700d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdmlsbGElMjBnYXJkZW58ZW58MXx8fHwxNzczNzg1NzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1668532043381-b242ff52b8a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGNvdXJ0eWFyZCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzM3ODU3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project4.title',
    categoryKey: 'project4.category',
    descriptionKey: 'project4.description',
    detailsKey: 'project4.details',
    category: 'architecture',
    imageUrl: "https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob21lJTIwZGVzaWdufGVufDF8fHx8MTc2NTQ0NzA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob21lJTIwZGVzaWdufGVufDF8fHx8MTc2NTQ0NzA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project5.title',
    categoryKey: 'project5.category',
    descriptionKey: 'project5.description',
    detailsKey: 'project5.details',
    category: 'interior',
    imageUrl: "https://images.unsplash.com/photo-1721523234126-72f328545ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwa2l0Y2hlbiUyMGludGVyaW9yJTIwd2hpdGUlMjBvYWt8ZW58MXx8fHwxNzczNzg1NzA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1721523234126-72f328545ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwa2l0Y2hlbiUyMGludGVyaW9yJTIwd2hpdGUlMjBvYWt8ZW58MXx8fHwxNzczNzg1NzA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project6.title',
    categoryKey: 'project6.category',
    descriptionKey: 'project6.description',
    detailsKey: 'project6.details',
    category: 'interior',
    imageUrl: "https://images.unsplash.com/photo-1768946131530-358c52c4c42d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiZWRyb29tJTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc3Mzc4NTcwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1768946131530-358c52c4c42d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiZWRyb29tJTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc3Mzc4NTcwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1571273033940-89c3e9bb18b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1NDIxNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project7.title',
    categoryKey: 'project7.category',
    descriptionKey: 'project7.description',
    detailsKey: 'project7.details',
    category: 'interior',
    imageUrl: "https://images.unsplash.com/photo-1656403002413-2ac6137237d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGluaW5nJTIwcm9vbSUyMHdvb2R8ZW58MXx8fHwxNzczNzQxODA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1656403002413-2ac6137237d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGluaW5nJTIwcm9vbSUyMHdvb2R8ZW58MXx8fHwxNzczNzQxODA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjU0NDQyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project8.title',
    categoryKey: 'project8.category',
    descriptionKey: 'project8.description',
    detailsKey: 'project8.details',
    category: 'interior',
    imageUrl: "https://images.unsplash.com/photo-1750036015902-c6f5ebca924e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMHN0b25lJTIwbWFyYmxlfGVufDF8fHx8MTc3Mzc4NTcwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1750036015902-c6f5ebca924e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMHN0b25lJTIwbWFyYmxlfGVufDF8fHx8MTc3Mzc4NTcwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project9.title',
    categoryKey: 'project9.category',
    descriptionKey: 'project9.description',
    detailsKey: 'project9.details',
    category: 'product',
    imageUrl: "https://images.unsplash.com/flagged/photo-1583345445242-21fb58f40f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjB3b29kZW4lMjBmdXJuaXR1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzczNzg1NzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/flagged/photo-1583345445242-21fb58f40f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjB3b29kZW4lMjBmdXJuaXR1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzczNzg1NzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1666541908174-31270a26d8a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwbWF0ZXJpYWwlMjB0ZXh0dXJlfGVufDF8fHx8MTc2NTQ0NzA3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project10.title',
    categoryKey: 'project10.category',
    descriptionKey: 'project10.description',
    detailsKey: 'project10.details',
    category: 'product',
    imageUrl: "https://images.unsplash.com/photo-1766128868287-7931ad45d6ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWdodGluZyUyMGZpeHR1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzczNzg1NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1766128868287-7931ad45d6ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWdodGluZyUyMGZpeHR1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzczNzg1NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project11.title',
    categoryKey: 'project11.category',
    descriptionKey: 'project11.description',
    detailsKey: 'project11.details',
    category: 'carpentry',
    imageUrl: "https://images.unsplash.com/photo-1590150392241-a4f05ecdaa3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwY2FycGVudHJ5JTIwZGV0YWlsJTIwam9pbmVyeXxlbnwxfHx8fDE3NzM3ODU3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1590150392241-a4f05ecdaa3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwY2FycGVudHJ5JTIwZGV0YWlsJTIwam9pbmVyeXxlbnwxfHx8fDE3NzM3ODU3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1703160908045-7ef87496cdd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYXJwZW50cnklMjBkZXRhaWx8ZW58MXx8fHwxNzY1NDQ3MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  {
    titleKey: 'project12.title',
    categoryKey: 'project12.category',
    descriptionKey: 'project12.description',
    detailsKey: 'project12.details',
    category: 'carpentry',
    imageUrl: "https://images.unsplash.com/photo-1732575886697-0ddcbce961dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBzaGVsdmluZyUyMHN5c3RlbSUyMHdhbG51dHxlbnwxfHx8fDE3NzM3ODU3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1732575886697-0ddcbce961dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBzaGVsdmluZyUyMHN5c3RlbSUyMHdhbG51dHxlbnwxfHx8fDE3NzM3ODU3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  }
];

function mapRowToProject(row: any): Project {
  return {
    id: row.id,
    titleEn: row.title_en || '',
    titleHe: row.title_he || '',
    categoryEn: row.category_en || '',
    categoryHe: row.category_he || '',
    descriptionEn: row.description_en || '',
    descriptionHe: row.description_he || '',
    detailsEn: row.details_en || '',
    detailsHe: row.details_he || '',
    imageUrl: row.image_url,
    images: row.images || [],
    drawings: row.drawings || [],
    category: row.category,
  };
}

function AppContent() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('ariel-admin-auth') === 'true';
  });

  // Fetch projects from Supabase
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      // Fallback to initial projects if DB is empty or errors
      setProjects(initialProjects);
    } else if (data && data.length > 0) {
      setProjects(data.map(mapRowToProject));
    } else {
      // DB is empty — use initial projects as fallback
      setProjects(initialProjects);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Check for admin route
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.hash;
      if (path === '#admin') {
        setIsAdmin(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);

    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  // Scroll to top when category changes
  useEffect(() => {
    if (selectedCategory) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  const handleLogin = (password: string) => {
    localStorage.setItem('ariel-admin-auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('ariel-admin-auth');
    setIsAuthenticated(false);
    setIsAdmin(false);
    window.location.hash = '';
  };

  const handleAddProject = async (newProject: Project) => {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        title_en: newProject.titleEn || '',
        title_he: newProject.titleHe || '',
        category_en: newProject.categoryEn || '',
        category_he: newProject.categoryHe || '',
        description_en: newProject.descriptionEn || '',
        description_he: newProject.descriptionHe || '',
        details_en: newProject.detailsEn || '',
        details_he: newProject.detailsHe || '',
        image_url: newProject.imageUrl,
        images: newProject.images || [],
        drawings: newProject.drawings || [],
        category: newProject.category,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding project:', error);
      alert('Error adding project / שגיאה בהוספת פרויקט');
      return;
    }

    setProjects([...projects, mapRowToProject(data)]);
  };

  const handleEditProject = async (index: number, updatedProject: Project) => {
    const projectToUpdate = projects[index];
    if (!projectToUpdate?.id) {
      console.error('No project ID for update');
      return;
    }

    const { error } = await supabase
      .from('projects')
      .update({
        title_en: updatedProject.titleEn || '',
        title_he: updatedProject.titleHe || '',
        category_en: updatedProject.categoryEn || '',
        category_he: updatedProject.categoryHe || '',
        description_en: updatedProject.descriptionEn || '',
        description_he: updatedProject.descriptionHe || '',
        details_en: updatedProject.detailsEn || '',
        details_he: updatedProject.detailsHe || '',
        image_url: updatedProject.imageUrl,
        images: updatedProject.images || [],
        drawings: updatedProject.drawings || [],
        category: updatedProject.category,
      })
      .eq('id', projectToUpdate.id);

    if (error) {
      console.error('Error updating project:', error);
      alert('Error updating project / שגיאה בעדכון פרויקט');
      return;
    }

    const newProjects = [...projects];
    newProjects[index] = { ...updatedProject, id: projectToUpdate.id };
    setProjects(newProjects);
  };

  const handleDeleteProject = async (index: number) => {
    const projectToDelete = projects[index];
    if (!projectToDelete?.id) {
      console.error('No project ID for delete');
      return;
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectToDelete.id);

    if (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project / שגיאה במחיקת פרויקט');
      return;
    }

    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCurrentCategoryProjects = () => {
    if (!selectedCategory) return [];
    return projects.filter(project => project.category === selectedCategory);
  };

  const getCurrentCategory = () => {
    return categories.find(cat => cat.id === selectedCategory);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div style={{ color: '#C6A667', fontSize: '1rem', fontWeight: 300, letterSpacing: '1px' }}>
          Loading...
        </div>
      </div>
    );
  }

  // Show admin login if admin route but not authenticated
  if (isAdmin && !isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Show admin dashboard if authenticated
  if (isAdmin && isAuthenticated) {
    return (
      <AdminDashboard
        projects={projects}
        categories={categories}
        onAddProject={handleAddProject}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
        onLogout={handleLogout}
      />
    );
  }

  // Show category page if a category is selected
  if (selectedCategory && getCurrentCategory()) {
    return (
      <div className="min-h-screen">
        <Header 
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
        
        <CategoryPage 
          categoryId={selectedCategory}
          categoryNameEn={getCurrentCategory()!.nameEn}
          categoryNameHe={getCurrentCategory()!.nameHe}
          projects={getCurrentCategoryProjects()}
          onProjectClick={handleProjectClick}
          onBack={handleBackToHome}
        />
        
        <Footer />
        
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </div>
    );
  }

  // Show home page
  return (
    <div className="min-h-screen">
      <Header 
        categories={categories}
        onCategoryClick={handleCategoryClick}
      />
      
      <Hero imageUrl={heroImage} />
      
      <section id="portfolio" className="py-32 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[#C6A667]"></div>
              <span style={{ color: '#C6A667', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {t('portfolio.label')}
              </span>
            </div>
            
            <h2 className="mb-6" style={{ color: '#1A1A1A', fontSize: '2.8rem', fontWeight: 300 }}>
              {t('portfolio.title')}
            </h2>
            
            <p className="max-w-3xl" style={{ color: '#1A1A1A', opacity: 0.7, fontSize: '1.05rem', lineHeight: '1.8', fontWeight: 300 }}>
              {t('portfolio.description')}
            </p>
          </motion.div>
          
          <CategoryMenu 
            categories={categories} 
            onCategoryClick={handleCategoryClick}
            language={language}
          />
        </div>
      </section>
      
      <About />
      <Contact />
      <Footer />
      
      <AddProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddProject} 
      />
      
      <ProjectDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}