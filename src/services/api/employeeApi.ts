import { baseApi } from './baseApi';
import type { Employee } from '../../types';

export const employeeApi = {
  async getAll() {
    const { data, error } = await baseApi.supabase
      .from('employees')
      .select('*')
      .order('name');
    
    if (error) return baseApi.handleError(error);
    return data as Employee[];
  },

  async create(employee: Omit<Employee, 'id'>) {
    const { data, error } = await baseApi.supabase
      .from('employees')
      .insert([employee])
      .select()
      .single();
    
    if (error) return baseApi.handleError(error);
    return data as Employee;
  },

  async update(id: string, employee: Partial<Employee>) {
    const { data, error } = await baseApi.supabase
      .from('employees')
      .update(employee)
      .eq('id', id)
      .select()
      .single();
    
    if (error) return baseApi.handleError(error);
    return data as Employee;
  },

  async delete(id: string) {
    const { error } = await baseApi.supabase
      .from('employees')
      .delete()
      .eq('id', id);
    
    if (error) return baseApi.handleError(error);
  }
};