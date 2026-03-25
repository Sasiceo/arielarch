import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ProjectRow {
  id: string
  title_en: string | null
  title_he: string | null
  category_en: string | null
  category_he: string | null
  description_en: string | null
  description_he: string | null
  details_en: string | null
  details_he: string | null
  image_url: string
  images: string[]
  drawings: string[]
  category: string
  created_at: string
}
