import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lirffynpdvrgfxycewrg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpcmZmeW5wZHZyZ2Z4eWNld3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDcwNjEsImV4cCI6MjA0ODEyMzA2MX0.ZRRxuuNFNjEhFZwypaYVX4qr8RQUTXg7cPQq7rdlBq0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
