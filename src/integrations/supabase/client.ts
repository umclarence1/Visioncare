// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kkbmbkzhebxgfcdorcii.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYm1ia3poZWJ4Z2ZjZG9yY2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2ODUxNzUsImV4cCI6MjA2NjI2MTE3NX0.PO5zVHJ2L7ZXD8LFtOsp6JDuba-MYs7LVz1hhaDQKp4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);