import { createClient } from '@supabase/supabase-js';

const cleanEnvVar = (value: string | undefined) => {
  if (!value) return undefined;
  // Remove espaços e aspas (simples ou duplas) do início e fim
  return value.trim().replace(/^["']+|["']+$/g, '');
};

const rawUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = cleanEnvVar(rawUrl) || 'https://placeholder.supabase.co';
const supabaseAnonKey = cleanEnvVar(rawKey) || 'placeholder-key';

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('⚠️ Supabase URL is missing. Using placeholder to prevent crash. Check your environment variables.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
