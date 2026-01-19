export * from './config';
export * from './provider';
export * from './client-provider';
export * from './auth/use-user';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

// This function should only be called on the client side.
export function initializeFirebase() {
  if (typeof window !== 'undefined') {
    if (!getApps().length) {
      const initializedApp = initializeApp(firebaseConfig);
      app = initializedApp;
      auth = getAuth(initializedApp);
      firestore = getFirestore(initializedApp);
    } else {
      const initializedApp = getApp();
      app = initializedApp;
      auth = getAuth(initializedApp);
      firestore = getFirestore(initializedApp);
    }
  }
  return { app, auth, firestore };
}
