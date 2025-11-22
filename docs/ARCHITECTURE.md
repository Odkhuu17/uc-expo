# Architecture Documentation

## State Management & Data Persistence Architecture

This document explains how Zustand, Apollo Client, and AsyncStorage work together in the UC Mobile application.

---

## Table of Contents

1. [Overview](#overview)
2. [Storage Strategy](#storage-strategy)
3. [Zustand Setup](#zustand-setup)
4. [Apollo Client Cache Strategy](#apollo-client-cache-strategy)
5. [AsyncStorage Usage Patterns](#asyncstorage-usage-patterns)
6. [Integration & Data Flow](#integration--data-flow)
7. [Best Practices](#best-practices)
8. [Common Patterns](#common-patterns)

---

## Overview

The application uses a three-tier storage and state management system:

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
├─────────────────────────────────────────────────────────┤
│  Zustand Stores          Apollo Client          REST API │
│  (Local State)           (GraphQL)              (Axios)  │
├─────────────────────────────────────────────────────────┤
│           Storage & Persistence Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ AsyncStorage │  │ SecureStore  │  │ In-Memory    │  │
│  │ (Non-sensitive)│  │ (Tokens)   │  │ (Transient)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Key Components

- **Zustand**: Client-side state management with persistence
- **Apollo Client**: GraphQL client with intelligent caching
- **AsyncStorage**: Non-sensitive data persistence
- **SecureStore**: Encrypted storage for sensitive data (tokens)

---

## Storage Strategy

### When to Use Each Storage Type

| Storage Type     | Use Case                      | Examples                           |
| ---------------- | ----------------------------- | ---------------------------------- |
| **AsyncStorage** | Non-sensitive persistent data | User preferences, cache, app state |
| **SecureStore**  | Sensitive data (encrypted)    | Access tokens, refresh tokens      |
| **In-Memory**    | Transient state, session data | Loading states, temporary errors   |

### Storage Keys Management

Centralized in `src/utils/storage.ts`:

```typescript
export const STORAGE_KEYS = {
  AUTH_STATE: 'uc-mobile-auth', // Zustand auth state
  APOLLO_CACHE: 'apollo-cache-persist', // Apollo cache
  // Add new keys here
} as const;
```

**Benefits:**

- No key conflicts
- Easy to track what's stored
- Type-safe key access
- Single source of truth

---

## Zustand Setup

### Architecture

Located in `src/stores/authStore.ts`

```typescript
export const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) => ({
      // State and actions
    }),
    {
      name: 'uc-mobile-auth',
      storage: createJSONStorage(() => customStorage),
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      version: 1,
    }
  )
);
```

### Key Features

#### 1. **Persist Middleware**

- Automatically saves state to AsyncStorage
- Rehydrates state on app restart
- Uses `partialize` to only persist critical fields

#### 2. **Custom Storage Wrapper**

```typescript
const customStorage: StateStorage = {
  getItem: async name => {
    /* with error handling */
  },
  setItem: async (name, value) => {
    /* with error handling */
  },
  removeItem: async name => {
    /* with error handling */
  },
};
```

#### 3. **State Partitioning**

Only persist what's necessary:

```typescript
partialize: state => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
  // isLoading, error are NOT persisted (transient)
});
```

#### 4. **Version & Migration Support**

```typescript
version: 1,
migrate: (persistedState, version) => {
  // Handle version upgrades
  return persistedState;
}
```

### Usage Example

```typescript
import { useAuthStore } from '@/stores/authStore';

function MyComponent() {
  const { user, login, logout } = useAuthStore();

  return (
    <View>
      <Text>{user?.name}</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  );
}
```

---

## Apollo Client Cache Strategy

### Architecture

Located in `src/apollo/apollo.client.tsx`

#### 1. **InMemoryCache with Type Policies**

```typescript
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Configure field-level caching
        products: {
          keyArgs: ['filter'],
          merge(existing, incoming, { args }) {
            // Custom merge logic for pagination
          },
        },
      },
    },
    Product: {
      keyFields: ['id'], // Custom cache key
    },
  },
});
```

**Benefits:**

- Normalized cache (entities stored once by ID)
- Automatic cache updates
- Pagination support
- Custom merge strategies

#### 2. **Cache Persistence**

```typescript
// Export functions for cache management
export const persistCache = async () => {
  const data = cache.extract();
  await AsyncStorage.setItem(CACHE_PERSIST_KEY, JSON.stringify(data));
};

export const restoreCache = async () => {
  const data = await AsyncStorage.getItem(CACHE_PERSIST_KEY);
  if (data) cache.restore(JSON.parse(data));
};

export const clearPersistedCache = async () => {
  await AsyncStorage.removeItem(CACHE_PERSIST_KEY);
  await cache.reset();
};
```

**When to call:**

- `restoreCache()`: On app initialization
- `persistCache()`: After mutations (auto via afterware link)
- `clearPersistedCache()`: On logout

#### 3. **Apollo Links Chain**

```typescript
ApolloLink.from([
  errorLink, // Handle GraphQL/network errors
  afterwareLink, // Auto-persist cache after mutations
  authLink, // Inject auth token from SecureStore
  httpLink, // HTTP transport
]);
```

#### 4. **Fetch Policies**

```typescript
defaultOptions: {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  },
  query: {
    fetchPolicy: 'cache-first', // Prioritize cache
  },
  mutate: {
    errorPolicy: 'all',
  },
}
```

**Fetch Policy Guide:**

- `cache-first`: Try cache, then network (default for queries)
- `cache-and-network`: Return cache immediately, then fetch (watchQuery)
- `network-only`: Always fetch from network
- `cache-only`: Only use cache, never fetch
- `no-cache`: Fetch but don't store in cache

### Usage Example

```typescript
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from './queries';

function ProductList() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    // Override default fetch policy if needed
    fetchPolicy: 'cache-and-network',
  });

  // Cache is automatically updated and persisted
  return <ProductListView products={data?.products} />;
}
```

---

## AsyncStorage Usage Patterns

### Centralized Storage Utility

Located in `src/utils/storage.ts`

#### Basic Operations

```typescript
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  STORAGE_KEYS,
} from '@/utils/storage';

// Set item
await setStorageItem(STORAGE_KEYS.THEME, 'dark');

// Get item with type safety
const theme = await getStorageItem<string>(STORAGE_KEYS.THEME);

// Remove item
await removeStorageItem(STORAGE_KEYS.THEME);
```

#### Advanced Operations

```typescript
// Get multiple items
const items = await getMultipleStorageItems([
  STORAGE_KEYS.AUTH_STATE,
  STORAGE_KEYS.APOLLO_CACHE,
]);

// Remove multiple items
await removeStorageItems([STORAGE_KEYS.THEME, STORAGE_KEYS.LANGUAGE]);

// Debug storage
const info = await getStorageInfo();
console.log(`Storage has ${info.count} keys:`, info.keys);
```

### Best Practices

1. **Always use STORAGE_KEYS constants**

   ```typescript
   // ✅ Good
   await setStorageItem(STORAGE_KEYS.AUTH_STATE, data);

   // ❌ Bad
   await setStorageItem('auth-state', data);
   ```

2. **Handle errors gracefully**

   ```typescript
   const success = await setStorageItem(key, value);
   if (!success) {
     // Handle storage error
   }
   ```

3. **Use type parameters for type safety**

   ```typescript
   interface UserPreferences {
     theme: string;
     notifications: boolean;
   }

   const prefs = await getStorageItem<UserPreferences>(
     STORAGE_KEYS.PREFERENCES
   );
   ```

---

## Integration & Data Flow

### Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                    LOGIN FLOW                            │
└─────────────────────────────────────────────────────────┘

1. User enters credentials
   ↓
2. Zustand store calls authService.login()
   ↓
3. authService makes REST API call
   ↓
4. Tokens stored in SecureStore (encrypted)
   ↓
5. Zustand state updated (isAuthenticated: true)
   ↓
6. Zustand state persisted to AsyncStorage
   ↓
7. Apollo queries now include auth token (from authLink)


┌─────────────────────────────────────────────────────────┐
│                    LOGOUT FLOW                           │
└─────────────────────────────────────────────────────────┘

1. User clicks logout
   ↓
2. Zustand store calls authService.logout()
   ↓
3. authService clears tokens from SecureStore
   ↓
4. authService calls clearPersistedCache()
   ├─→ Removes Apollo cache from AsyncStorage
   └─→ Resets in-memory Apollo cache
   ↓
5. Zustand state reset to initialState
   ↓
6. AsyncStorage auth state cleared via persist middleware
```

### Data Fetching Flow

```
┌─────────────────────────────────────────────────────────┐
│              GRAPHQL QUERY FLOW                          │
└─────────────────────────────────────────────────────────┘

1. Component calls useQuery()
   ↓
2. Apollo checks in-memory cache
   ├─→ Cache HIT: Return cached data immediately
   └─→ Cache MISS: Continue to step 3
   ↓
3. authLink injects token from SecureStore
   ↓
4. HTTP request sent to GraphQL server
   ↓
5. Response normalized and stored in cache
   ↓
6. afterwareLink auto-persists cache to AsyncStorage
   ↓
7. Component receives data


┌─────────────────────────────────────────────────────────┐
│              MUTATION FLOW                               │
└─────────────────────────────────────────────────────────┘

1. Component calls useMutation()
   ↓
2. Mutation executed with auth token
   ↓
3. Server responds with updated data
   ↓
4. Apollo cache automatically updated
   ↓
5. afterwareLink persists cache to AsyncStorage
   ↓
6. Related queries automatically re-render
```

### App Initialization Flow

```
┌─────────────────────────────────────────────────────────┐
│              APP STARTUP FLOW                            │
└─────────────────────────────────────────────────────────┘

1. App starts
   ↓
2. Zustand rehydrates state from AsyncStorage
   ├─→ Restores isAuthenticated, user data
   └─→ Transient state (isLoading, error) reset
   ↓
3. Apollo restoreCache() called
   └─→ Restores normalized cache from AsyncStorage
   ↓
4. authStore.initializeAuth() called
   └─→ Validates token in SecureStore
   ↓
5. App renders with restored state
```

---

## Best Practices

### 1. State Management

#### ✅ DO

```typescript
// Use Zustand for global client state
const { user, isAuthenticated } = useAuthStore();

// Use Apollo for server state
const { data } = useQuery(GET_USER_PROFILE);

// Use local state for UI-only state
const [isModalOpen, setModalOpen] = useState(false);
```

#### ❌ DON'T

```typescript
// Don't store server data in Zustand
const setProducts = useStore(state => state.setProducts);

// Don't store transient UI state in Zustand
const setIsLoadingModal = useStore(state => state.setLoadingModal);
```

### 2. Cache Management

#### ✅ DO

```typescript
// Clear cache on logout
await clearPersistedCache();

// Use cache-first for read-heavy queries
useQuery(GET_PRODUCTS, { fetchPolicy: 'cache-first' });

// Use cache-and-network for data that changes frequently
useQuery(GET_NOTIFICATIONS, { fetchPolicy: 'cache-and-network' });
```

#### ❌ DON'T

```typescript
// Don't manually manage cache in components
cache.writeQuery({ ... }); // Let Apollo handle it

// Don't use network-only by default (waste of resources)
useQuery(GET_PRODUCTS, { fetchPolicy: 'network-only' });
```

### 3. Storage Management

#### ✅ DO

```typescript
// Use centralized storage keys
await setStorageItem(STORAGE_KEYS.THEME, theme);

// Handle storage errors
const success = await setStorageItem(key, value);
if (!success) showError('Failed to save preferences');

// Partition Zustand state properly
partialize: state => ({
  // Only persist what's needed
  preferences: state.preferences,
});
```

#### ❌ DON'T

```typescript
// Don't use raw AsyncStorage directly
await AsyncStorage.setItem('my-key', value); // Use storage utility

// Don't store large data in AsyncStorage
await setStorageItem('huge-dataset', massiveArray); // Use cache or API

// Don't persist transient state
partialize: state => ({
  isLoading: state.isLoading, // ❌ Don't persist
});
```

---

## Common Patterns

### Pattern 1: Protected Route with Auth State

```typescript
import { useAuthStore } from '@/stores/authStore';
import { Redirect } from 'expo-router';

export default function ProtectedScreen() {
  const { isAuthenticated, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return <ProtectedContent />;
}
```

### Pattern 2: Optimistic UI with Apollo

```typescript
const [updateProduct] = useMutation(UPDATE_PRODUCT, {
  optimisticResponse: {
    updateProduct: {
      __typename: 'Product',
      id: productId,
      name: newName,
    },
  },
  // Cache automatically updated
});
```

### Pattern 3: Offline-First with Cache

```typescript
const { data } = useQuery(GET_PRODUCTS, {
  fetchPolicy: 'cache-first', // Return cache immediately
  nextFetchPolicy: 'cache-and-network', // Then update from network
});

// User sees cached data instantly, updates when online
```

### Pattern 4: Clearing All User Data on Logout

```typescript
async logout() {
  // 1. Clear tokens
  await authService.logout(); // Clears SecureStore + Apollo cache

  // 2. Reset Zustand state
  set(initialState);

  // 3. Optional: Clear other user-specific data
  await removeStorageItems([
    STORAGE_KEYS.USER_PREFERENCES,
    STORAGE_KEYS.CART_ITEMS,
  ]);
}
```

### Pattern 5: App-Wide Error Handling

```typescript
// In apollo.client.tsx
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        // Clear auth and redirect to login
        useAuthStore.getState().logout();
      }
    });
  }
});
```

---

## Summary

### Storage Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ Component State (useState, useReducer)                  │
│ • Transient UI state                                    │
│ • Form inputs                                           │
│ • Modal visibility                                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Zustand Stores                                          │
│ • Global client state                                   │
│ • Auth state (persisted to AsyncStorage)                │
│ • User preferences                                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ Apollo Client Cache                                     │
│ • Server data (GraphQL)                                 │
│ • Normalized entities                                   │
│ • Persisted to AsyncStorage                             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ SecureStore                                             │
│ • Access tokens                                         │
│ • Refresh tokens                                        │
│ • Sensitive credentials                                 │
└─────────────────────────────────────────────────────────┘
```

### Key Takeaways

1. **Zustand**: Global client state with selective persistence
2. **Apollo**: Server state with intelligent caching and persistence
3. **AsyncStorage**: Non-sensitive persistent data (used by both)
4. **SecureStore**: Encrypted storage for sensitive data (tokens)
5. **Integration**: All systems work together, cleared together on logout

This architecture provides:

- ✅ Fast performance (cache-first strategies)
- ✅ Offline support (persisted cache)
- ✅ Security (encrypted token storage)
- ✅ Clean separation of concerns
- ✅ Easy to maintain and extend
