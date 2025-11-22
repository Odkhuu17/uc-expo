// src/services/index.ts
/**
 * Central export point for all services
 *
 * This allows for cleaner imports throughout the app:
 * import { authService, apiClient } from '@/services';
 */

// Auth service
export { default as authService } from './auth/auth.service';
export type { LoginCredentials, AuthTokens } from './auth/auth.service';

// API client (REST)
export { default as apiClient } from './api/client';

// Apollo client and cache utilities
export { default as apolloClient } from '@/apollo/apollo.client';
export {
  cache as apolloCache,
  persistCache,
  restoreCache,
  clearPersistedCache,
} from '@/apollo/apollo.client';

// Storage utilities
export {
  STORAGE_KEYS,
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  removeStorageItems,
  clearAllStorage,
  getAllStorageKeys,
  getMultipleStorageItems,
  getStorageInfo,
  storageHasKey,
} from '@/utils/storage';
