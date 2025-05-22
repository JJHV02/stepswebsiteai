import { createClient } from "@supabase/supabase-js";

// Leemos del .env
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// (Opcional) debug para verificar que se cargan bien
console.log("✅ URL:", supabaseUrl);
console.log("✅ Key:", supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);