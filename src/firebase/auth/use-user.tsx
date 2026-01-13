'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

export function useUser(): UserState {
  const auth = useAuth();
  const [userState, setUserState] = useState<UserState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!auth) {
      // Set loading to false once we know auth is not available.
      if (userState.isLoading) { // Prevents unnecessary re-renders
        setUserState({ user: null, isLoading: false, error: new Error("Auth service not available.") });
      }
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUserState({ user: firebaseUser, isLoading: false, error: null });
      },
      (error) => {
        console.error("useUser: onAuthStateChanged error:", error);
        setUserState({ user: null, isLoading: false, error: error });
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, userState.isLoading]); // Depend on auth and isLoading

  return userState;
}
