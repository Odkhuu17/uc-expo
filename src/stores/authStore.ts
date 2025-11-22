import { GetUserQuery } from '@/gql/query/getUserQuery.generated';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { customStorage } from './helpers';

interface IAuthState {
  isAuthenticated: boolean;
  user: GetUserQuery['me'] | null;
  setUser: (user: GetUserQuery['me']) => void;
  login: () => void;
  logout: () => void;
}

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const useAuthStore = create<IAuthState>()(
  persist(
    set => ({
      ...initialState,
      setUser: user => {
        set(state => ({ ...state, user }));
      },
      login: () => {
        set(state => ({ ...state, isAuthenticated: true }));
      },
      logout: () => {
        set(state => ({ ...state, isAuthenticated: false }));
      },
    }),
    {
      name: 'uc-mobile-auth', // Key in AsyncStorage
      storage: createJSONStorage(() => customStorage),

      /**
       * Partialize - Only persist critical fields
       * Reduces storage size and improves performance
       * Transient state like isLoading and error are not persisted
       */
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),

      /**
       * Version for migration support
       * Increment this when changing persisted state structure
       */
      version: 1,

      /**
       * Migration function for handling version updates
       */
      migrate: (persistedState: any) => {
        // Example migration logic
        // if (version === 0) {
        //   persistedState.newField = 'default';
        // }
        return persistedState as IAuthState;
      },
    }
  )
);
