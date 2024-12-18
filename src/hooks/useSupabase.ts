import { useCallback } from 'react';
import { supabase } from '../config/supabase';

export const useSupabase = () => {
  const handleError = useCallback((error: Error) => {
    console.error('Supabase error:', error);
    // Implement your error handling logic here
  }, []);

  return {
    supabase,
    handleError
  };
};