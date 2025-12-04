import { createClient } from '@supabase/supabase-js';

// Credenciais fornecidas
const supabaseUrl = "https://hcaxhibanbkdznqlzpmq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYXhoaWJhbmJrZHpucWx6cG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3Njg4NjIsImV4cCI6MjA3OTM0NDg2Mn0.tcCCOgYRNW-uA6LYLskiLUr6j_RjizBy0cF7XdXdTLM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);