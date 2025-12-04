import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Verificar se as variáveis estão sendo carregadas
console.log('🔍 Verificando variáveis de ambiente:');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Definida' : '❌ FALTANDO');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Definida' : '❌ FALTANDO');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ CRITICAL: Supabase environment variables are missing!');
    console.error('📝 Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
    console.error('🔧 For Vercel: Add these variables in Project Settings > Environment Variables');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);