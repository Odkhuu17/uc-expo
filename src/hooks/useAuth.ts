import { LoginCredentials } from '@/services/auth/auth.service';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const {
    isAuthenticated,
    user,
    isLoading,
    error,
    isInitialized,
    login,
    logout,
    setUser,
  } = useAuthStore();

  const handleLogin = async (credentials: LoginCredentials) => {
    await login(credentials);
  };

  const handleLogout = async () => {
    await logout();
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    isInitialized,
    login: handleLogin,
    logout: handleLogout,
    setUser,
  };
};
