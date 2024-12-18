import { useCallback } from 'react';
import { employeeApi } from '../../services/api/employeeApi';
import { useEmployeeStore } from '../../store/employeeStore';
import type { Employee } from '../../types';

export const useEmployees = () => {
  const store = useEmployeeStore();

  const fetchEmployees = useCallback(async () => {
    try {
      store.setLoading(true);
      const employees = await employeeApi.getAll();
      store.setEmployees(employees);
    } catch (error) {
      store.setError(error instanceof Error ? error.message : 'Failed to fetch employees');
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  const addEmployee = useCallback(async (employee: Omit<Employee, 'id'>) => {
    try {
      store.setLoading(true);
      const newEmployee = await employeeApi.create(employee);
      store.addEmployee(newEmployee);
      return newEmployee;
    } catch (error) {
      store.setError(error instanceof Error ? error.message : 'Failed to add employee');
      throw error;
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  return {
    employees: store.employees,
    loading: store.loading,
    error: store.error,
    fetchEmployees,
    addEmployee,
    updateEmployee: store.updateEmployee,
    removeEmployee: store.removeEmployee,
    getEmployeeById: store.getEmployeeById,
  };
};