import { createClient } from "@supabase/supabase-js";

// Leemos del .env
const supabaseUrl    = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// (Opcional) debug para verificar que se cargan bien
console.log("→ RAW Anon Key length:", supabaseAnonKey.length);
console.log("→ RAW Anon Key (first/last 5 chars):", supabaseAnonKey.slice(0,5), "...", supabaseAnonKey.slice(-5));

export const supabase = createClient(supabaseUrl, supabaseAnonKey);