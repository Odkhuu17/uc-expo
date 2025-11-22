import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { customStorage } from './helpers';

interface IGeneralState {
  mode: 'driver' | 'shipper';
  setMode: (mode: 'driver' | 'shipper') => void;
}

const initialState = {
  mode: 'driver' as 'driver' | 'shipper',
};

export const useGeneralStore = create<IGeneralState>()(
  persist(
    set => ({
      ...initialState,
      setMode: (mode: 'driver' | 'shipper') => {
        set(state => ({ ...state, mode }));
      },
    }),
    {
      name: 'uc-mobile-general', // Key in AsyncStorage
      storage: createJSONStorage(() => customStorage),

      /**
       * Partialize - Only persist critical fields
       * Reduces storage size and improves performance
       */
      partialize: state => ({
        mode: state.mode,
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
        return persistedState as IGeneralState;
      },
    }
  )
);
