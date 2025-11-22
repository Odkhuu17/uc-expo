import { useRouter, useSegments } from 'expo-router';
import { ReactNode, useEffect } from 'react';

import { useAppSelector } from '@/redux/hooks';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const segments = useSegments();

  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/auth/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/');
    }
  }, [isAuthenticated, router, segments]);

  return <>{children}</>;
}
