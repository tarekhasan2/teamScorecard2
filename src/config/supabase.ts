import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Validate environment variables before creating client
env.validate();

// Create and export the Supabase client
export const supabase = createClient(env.supabase.url, env.supabase.anonKey);