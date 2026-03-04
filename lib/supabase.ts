import { createClient } from '@supabase/supabase-js';

// Estas líneas leen las llaves que acabas de poner en el .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("FALTAN CLAVES DE SUPABASE: Por favor configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tu archivo .env.local");
}

// Aquí creamos la conexión oficial (Si falla por falta de llaves, Next.js no explotará en la primera vista)
export const supabase = createClient(supabaseUrl || "https://dummyproject.supabase.co", supabaseAnonKey || "dummykey");