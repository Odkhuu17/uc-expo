// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage Utility
 *
 * Centralized storage management for AsyncStorage with consistent key naming,
 * error handling, and type safety.
 *
 * Storage Strategy:
 * - AsyncStorage: Non-sensitive data (app state, preferences, cached data)
 * - SecureStore: Sensitive data (tokens, credentials) - handled in authService
 */

// ============================================================================
// STORAGE KEYS
// ============================================================================

/**
 * Centralized storage keys to avoid key conflicts and typos
 * Add new keys here as the app grows
 */
export const STORAGE_KEYS = {
  // Auth-related (Zustand persists auth state here)
  AUTH_STATE: 'uc-mobile-auth',

  // Apollo cache
  APOLLO_CACHE: 'apollo-cache-persist',

  // App preferences (examples)
  // THEME: 'uc-mobile-theme',
  // LANGUAGE: 'uc-mobile-language',
  // NOTIFICATIONS: 'uc-mobile-notifications',

  // Feature flags or user preferences
  // ONBOARDING_COMPLETED: 'uc-mobile-onboarding-completed',
  // LAST_SYNC_TIME: 'uc-mobile-last-sync',
} as const;

// ============================================================================
// STORAGE OPERATIONS
// ============================================================================

/**
 * Get item from AsyncStorage with type safety
 */
export async function getStorageItem<T = string>(
  key: string
): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;

    // Try to parse as JSON, return as string if fails
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  } catch (error) {
    console.error(`Error getting item ${key} from storage:`, error);
    return null;
  }
}

/**
 * Set item in AsyncStorage
 */
export async function setStorageItem<T = string>(
  key: string,
  value: T
): Promise<boolean> {
  try {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    console.error(`Error setting item ${key} in storage:`, error);
    return false;
  }
}

/**
 * Remove item from AsyncStorage
 */
export async function removeStorageItem(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key} from storage:`, error);
    return false;
  }
}

/**
 * Remove multiple items from AsyncStorage
 */
export async function removeStorageItems(keys: string[]): Promise<boolean> {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error('Error removing multiple items from storage:', error);
    return false;
  }
}

/**
 * Clear all AsyncStorage data
 * WARNING: Use with caution - clears all app data from AsyncStorage
 */
export async function clearAllStorage(): Promise<boolean> {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}

/**
 * Get all keys in AsyncStorage
 * Useful for debugging and data management
 */
export async function getAllStorageKeys(): Promise<readonly string[]> {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all storage keys:', error);
    return [];
  }
}

/**
 * Get multiple items from AsyncStorage
 */
export async function getMultipleStorageItems(
  keys: string[]
): Promise<Record<string, string | null>> {
  try {
    const items = await AsyncStorage.multiGet(keys);
    return Object.fromEntries(items);
  } catch (error) {
    console.error('Error getting multiple items from storage:', error);
    return {};
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get storage size information (useful for debugging)
 */
export async function getStorageInfo(): Promise<{
  keys: readonly string[];
  count: number;
}> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return {
      keys,
      count: keys.length,
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { keys: [], count: 0 };
  }
}

/**
 * Check if a key exists in storage
 */
export async function storageHasKey(key: string): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error(`Error checking if key ${key} exists:`, error);
    return false;
  }
}
