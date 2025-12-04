import { createClient } from '@supabase/supabase-js';

// Suporta tanto VITE_ (desenvolvimento local) quanto NEXT_PUBLIC_ (Vercel)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug: Verificar se as variáveis estão sendo carregadas
console.log('🔍 Verificando variáveis de ambiente:');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL ? '✅ Definida' : '❌ Não encontrada');
console.log('NEXT_PUBLIC_SUPABASE_URL:', import.meta.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Definida' : '❌ Não encontrada');
console.log('URL final:', supabaseUrl ? '✅ OK' : '❌ FALTANDO');
console.log('ANON_KEY final:', supabaseAnonKey ? '✅ OK' : '❌ FALTANDO');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ CRITICAL: Supabase environment variables are missing!');
    console.error('📝 Make sure VITE_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL and VITE_SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY are set');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);