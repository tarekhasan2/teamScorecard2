// Environment variable validation and typing
export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL as string,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  },
  get isValid() {
    return Boolean(this.supabase.url && this.supabase.anonKey);
  },
  validate() {
    if (!this.supabase.url) {
      throw new Error('VITE_SUPABASE_URL is required');
    }
    if (!this.supabase.anonKey) {
      throw new Error('VITE_SUPABASE_ANON_KEY is required');
    }
  }
};