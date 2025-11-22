import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function useAuthGuard(requireAuth = true) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  console.log(isAuthenticated, 'isAuthenticated');
  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.replace('/auth/login');
    } else if (!requireAuth && isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, requireAuth, router]);

  return isAuthenticated;
}
