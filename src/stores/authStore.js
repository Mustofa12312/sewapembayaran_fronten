import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Admin state
      adminToken: null,
      adminUser: null,

      // Customer state
      customerToken: null,
      customerUser: null,

      // Admin actions
      setAdminAuth: (token, user) =>
        set({ adminToken: token, adminUser: user }),

      clearAdminAuth: () =>
        set({ adminToken: null, adminUser: null }),

      // Customer actions
      setCustomerAuth: (token, user) =>
        set({ customerToken: token, customerUser: user }),

      clearCustomerAuth: () =>
        set({ customerToken: null, customerUser: null }),

      // Selectors
      isAdminAuthenticated: () => !!get().adminToken,
      isCustomerAuthenticated: () => !!get().customerToken,
    }),
    {
      name: 'auth-storage',
      // Only persist tokens, not user objects (those are re-fetched on load)
      partialize: (state) => ({
        adminToken: state.adminToken,
        customerToken: state.customerToken,
      }),
    }
  )
);

export default useAuthStore;
