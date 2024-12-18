import { create } from 'zustand';
import { Employee } from '../types';
import { employeeService } from '../services/database/employeeService';

interface EmployeeStore {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  
  fetchEmployees: () => Promise<void>;
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  removeEmployee: (id: string) => Promise<void>;
  getEmployeeById: (id: string) => Employee | undefined;
  getEmployeesByManager: (managerId: string) => Employee[];
  getEmployeesByDepartment: (department: string) => Employee[];
}

export const useEmployeeStore = create<EmployeeStore>()((set, get) => ({
  employees: [],
  loading: false,
  error: null,

  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const employees = await employeeService.getAll();
      set({ employees, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addEmployee: async (employee) => {
    set({ loading: true, error: null });
    try {
      const newEmployee = await employeeService.create(employee);
      set(state => ({ 
        employees: [...state.employees, newEmployee],
        loading: false 
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateEmployee: async (id, updatedEmployee) => {
    set({ loading: true, error: null });
    try {
      const updated = await employeeService.update(id, updatedEmployee);
      set(state => ({
        employees: state.employees.map(emp => 
          emp.id === id ? updated : emp
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  removeEmployee: async (id) => {
    set({ loading: true, error: null });
    try {
      await employeeService.delete(id);
      set(state => ({
        employees: state.employees.filter(emp => emp.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getEmployeeById: (id) => get().employees.find((emp) => emp.id === id),
  
  getEmployeesByManager: (managerId) =>
    get().employees.filter((emp) => emp.managerId === managerId),
  
  getEmployeesByDepartment: (department) =>
    get().employees.filter((emp) => emp.department === department),
}));