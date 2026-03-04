import { createClient } from '@supabase/supabase-js';

// Estas líneas leen las llaves que acabas de poner en el .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Aquí creamos la conexión oficial
export const supabase = createClient(supabaseUrl, supabaseAnonKey);