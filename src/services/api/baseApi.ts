import { supabase } from '../../config/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly originalError?: PostgrestError
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: PostgrestError): never => {
  throw new ApiError(error.message, error);
};

export const baseApi = {
  supabase,
  handleError: handleApiError,
};