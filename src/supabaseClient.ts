import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('CRITICAL: Supabase environment variables are missing. The app will not function correctly.');

    // Create a mock client to prevent app crash on load
    // This allows the UI to render, even if data fetching fails
    supabaseInstance = {
        from: () => ({
            select: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY' } }),
            insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
            update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
            delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
            upsert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        }),
        storage: {
            from: () => ({
                getPublicUrl: () => ({ data: { publicUrl: '' } })
            })
        }
    } as unknown as SupabaseClient;
} else {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseInstance;