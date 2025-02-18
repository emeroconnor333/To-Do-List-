import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wcwoiuhwvvjplmgxwbxc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjd29pdWh3dnZqcGxtZ3h3YnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NzE2MzksImV4cCI6MjA1NTQ0NzYzOX0.3uIRdfVUZsPdkaTkrMvtY24g8lxhcn6VwdnIwmTerHE"; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
