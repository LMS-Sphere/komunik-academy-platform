import { useState } from 'react';
import { User, UserRole } from '@/types';

// Mock authentication hook - replace with your Laravel backend integration
export const useAuth = () => {
  // Mock current user - replace with actual authentication
  const [currentUser] = useState<User>({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 30,
    country: 'France',
    role: 'admin', // Change this to test different roles: 'admin', 'trainer', 'learner'
    password: '',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const hasRole = (role: UserRole) => currentUser?.role === role;
  const canManageModules = () => hasRole('admin') || hasRole('trainer');
  const canCreateModule = () => hasRole('admin') || hasRole('trainer');
  const canViewAllModules = () => hasRole('admin');

  return {
    currentUser,
    hasRole,
    canManageModules,
    canCreateModule,
    canViewAllModules,
    isAuthenticated: !!currentUser
  };
};