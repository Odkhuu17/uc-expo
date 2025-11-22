# Architecture Quick Reference

## 🚀 Quick Start Guide

### Storage Strategy at a Glance

| What to Store           | Where                  | How                                     |
| ----------------------- | ---------------------- | --------------------------------------- |
| Auth tokens (sensitive) | SecureStore            | `authService.storeTokens()`             |
| User auth state         | Zustand → AsyncStorage | Automatic via persist middleware        |
| GraphQL cache           | Apollo → AsyncStorage  | Automatic after mutations               |
| App preferences         | AsyncStorage           | `setStorageItem(STORAGE_KEYS.X, value)` |

---

## 📦 Key Files

```
src/
├── apollo/
│   └── apollo.client.tsx       # Apollo setup with cache persistence
├── stores/
│   └── authStore.ts            # Zustand auth store with AsyncStorage
├── services/
│   ├── auth/auth.service.ts    # Token management + cache clearing
│   ├── api/client.ts           # Axios REST client
│   └── index.ts                # Centralized exports
└── utils/
    └── storage.ts              # AsyncStorage utilities
```

---

## 🔧 Common Tasks

### 1. Using Zustand Store

```typescript
import { useAuthStore } from '@/stores/authStore';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  // Use the state and actions
  if (isAuthenticated) {
    return <Welcome user={user} onLogout={logout} />;
  }
}
```

### 2. Using Apollo Client

```typescript
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, UPDATE_PRODUCT } from './queries';

function ProductList() {
  // Query with cache-first (default)
  const { data, loading } = useQuery(GET_PRODUCTS);

  // Mutation (cache auto-persisted)
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  return <ProductView data={data} onUpdate={updateProduct} />;
}
```

### 3. Using Storage Utilities

```typescript
import { STORAGE_KEYS, setStorageItem, getStorageItem } from '@/utils/storage';

// Save preference
await setStorageItem(STORAGE_KEYS.THEME, 'dark');

// Get preference
const theme = await getStorageItem<string>(STORAGE_KEYS.THEME);
```

### 4. Centralized Imports

```typescript
// Instead of multiple imports, use:
import {
  authService,
  apolloClient,
  persistCache,
  STORAGE_KEYS,
} from '@/services';
```

---

## 🔑 Key Improvements Made

### ✅ Apollo Client

- ✨ Added cache persistence to AsyncStorage
- ✨ Type policies for better normalization
- ✨ Afterware link for auto-persist after mutations
- ✨ Enhanced error handling with auth detection
- ✨ Changed to cache-first for better performance
- ✨ Export `persistCache()`, `restoreCache()`, `clearPersistedCache()`

### ✅ Zustand Store

- ✨ Custom storage wrapper with error handling
- ✨ Version & migration support
- ✨ Better error handling in all actions
- ✨ Comprehensive documentation
- ✨ Proper integration with Apollo cache clearing

### ✅ Auth Service

- ✨ Clears Apollo cache on logout
- ✨ Comprehensive documentation
- ✨ Better error handling

### ✅ Storage Utilities

- ✨ Centralized STORAGE_KEYS constants
- ✨ Type-safe storage operations
- ✨ Comprehensive helper functions
- ✨ Consistent error handling

### ✅ Services Index

- ✨ Central export point for all services
- ✨ Cleaner imports throughout the app

---

## 🎯 Integration Points

### On App Startup

```typescript
// 1. Zustand auto-rehydrates from AsyncStorage
// 2. Call restoreCache() to restore Apollo cache
import { restoreCache } from '@/services';

useEffect(() => {
  restoreCache(); // Restore Apollo cache on app start
}, []);
```

### On Login

```typescript
const login = useAuthStore(state => state.login);

await login(credentials);
// ✅ Tokens stored in SecureStore
// ✅ Auth state persisted to AsyncStorage
// ✅ Apollo queries now include auth token
```

### On Logout

```typescript
const logout = useAuthStore(state => state.logout);

await logout();
// ✅ Tokens cleared from SecureStore
// ✅ Apollo cache cleared (memory + AsyncStorage)
// ✅ Zustand state reset
```

---

## 📊 Data Flow Overview

```
User Action → Zustand Store → Auth Service
                    ↓              ↓
              AsyncStorage    SecureStore (tokens)
                                   ↓
                            Apollo Auth Link
                                   ↓
                            GraphQL Queries
                                   ↓
                            Apollo Cache
                                   ↓
                            AsyncStorage (persisted)
```

---

## 🚨 Important Rules

### DO ✅

- Use STORAGE_KEYS constants for all AsyncStorage keys
- Let Zustand persist middleware handle auth state
- Let Apollo afterware link handle cache persistence
- Use cache-first for most queries
- Clear all storage on logout via authService.logout()

### DON'T ❌

- Don't use raw AsyncStorage.setItem() directly
- Don't store tokens in AsyncStorage (use SecureStore)
- Don't manually persist Zustand state (middleware does it)
- Don't manually persist Apollo cache (afterware does it)
- Don't use network-only fetch policy by default

---

## 🔍 Debugging

### Check what's in AsyncStorage

```typescript
import { getStorageInfo } from '@/utils/storage';

const info = await getStorageInfo();
console.log('Keys:', info.keys);
console.log('Count:', info.count);
```

### Check Apollo cache

```typescript
import { apolloCache } from '@/services';

const data = apolloCache.extract();
console.log('Apollo cache:', data);
```

### Check Zustand state

```typescript
import { useAuthStore } from '@/stores/authStore';

const state = useAuthStore.getState();
console.log('Auth state:', state);
```

---

## 📚 Full Documentation

For detailed explanations, see:

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Complete architecture guide

---

## 💡 Quick Tips

1. **Performance**: Use `cache-first` or `cache-and-network` fetch policies
2. **Offline**: Cache persists to AsyncStorage - works offline
3. **Security**: Tokens in SecureStore (encrypted), not AsyncStorage
4. **State**: Server data in Apollo, client data in Zustand
5. **Cleanup**: Single logout clears everything properly

---

## 🎓 Example: Complete Auth Flow

```typescript
// Login
import { useAuthStore } from '@/stores/authStore';

function LoginScreen() {
  const login = useAuthStore(state => state.login);
  const error = useAuthStore(state => state.error);

  const handleLogin = async () => {
    try {
      await login({ username, password });
      // ✅ Automatically: tokens → SecureStore
      // ✅ Automatically: auth state → AsyncStorage
      router.push('/home');
    } catch (err) {
      // Error already in store
      console.log('Login error:', error);
    }
  };

  return <LoginForm onSubmit={handleLogin} error={error} />;
}

// Using auth in GraphQL queries
function UserProfile() {
  const { data } = useQuery(GET_USER_PROFILE);
  // ✅ Token automatically injected from SecureStore
  // ✅ Response cached in Apollo
  // ✅ Cache persisted to AsyncStorage

  return <ProfileView user={data?.user} />;
}

// Logout
function LogoutButton() {
  const logout = useAuthStore(state => state.logout);

  const handleLogout = async () => {
    await logout();
    // ✅ Tokens cleared from SecureStore
    // ✅ Apollo cache cleared (memory + AsyncStorage)
    // ✅ Zustand state reset
    router.push('/login');
  };

  return <Button onPress={handleLogout} title="Logout" />;
}
```

---

## 🔗 Related Files to Review

- `src/apollo/apollo.client.tsx` - Apollo configuration
- `src/stores/authStore.ts` - Zustand auth store
- `src/services/auth/auth.service.ts` - Auth service
- `src/utils/storage.ts` - Storage utilities
- `src/services/index.ts` - Centralized exports
