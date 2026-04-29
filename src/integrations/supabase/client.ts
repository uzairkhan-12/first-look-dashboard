import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://igxzqabdagmcmftqwbfw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlneHpxYWJkYWdtY21mdHF3YmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NTk4NzcsImV4cCI6MjA5MjQzNTg3N30.TjK8oQXuenrPYoqSAIJ25XYIlmnHsMhofnaUgYa2g2U";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
