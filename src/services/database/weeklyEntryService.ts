import { supabase } from '../../config/supabase';
import { WeeklyEntry } from '../../types';

export const weeklyEntryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('weekly_entries')
      .select('*, kpi_entries(*)');
    
    if (error) throw error;
    return data as WeeklyEntry[];
  },

  async create(entry: Omit<WeeklyEntry, 'id'>) {
    const { data, error } = await supabase
      .from('weekly_entries')
      .insert([entry])
      .select()
      .single();
    
    if (error) throw error;
    return data as WeeklyEntry;
  },

  async update(id: string, entry: Partial<WeeklyEntry>) {
    const { data, error } = await supabase
      .from('weekly_entries')
      .update(entry)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as WeeklyEntry;
  }
};