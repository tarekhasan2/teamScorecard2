import { supabase } from '../../config/supabase';
import { KPI, KPIEntry } from '../../types';

export const kpiService = {
  async getAllKPIs() {
    const { data, error } = await supabase
      .from('kpis')
      .select('*');
    
    if (error) throw error;
    return data as KPI[];
  },

  async createKPI(kpi: Omit<KPI, 'id'>) {
    const { data, error } = await supabase
      .from('kpis')
      .insert([kpi])
      .select()
      .single();
    
    if (error) throw error;
    return data as KPI;
  },

  async updateKPI(id: string, kpi: Partial<KPI>) {
    const { data, error } = await supabase
      .from('kpis')
      .update(kpi)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as KPI;
  },

  async getAllEntries() {
    const { data, error } = await supabase
      .from('kpi_entries')
      .select('*');
    
    if (error) throw error;
    return data as KPIEntry[];
  },

  async createEntry(entry: Omit<KPIEntry, 'id'>) {
    const { data, error } = await supabase
      .from('kpi_entries')
      .insert([entry])
      .select()
      .single();
    
    if (error) throw error;
    return data as KPIEntry;
  }
};