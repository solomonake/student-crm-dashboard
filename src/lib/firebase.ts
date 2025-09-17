import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Check if demo mode is enabled
export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

// Only initialize Firebase if not in demo mode
let app: any = null;
let db: any = null;
let auth: any = null;

if (!isDemoMode) {
  const firebaseConfig = {
    // Add your Firebase config here
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  // Initialize Firestore
  db = getFirestore(app);

  // Initialize Auth
  auth = getAuth(app);
} else {
  console.warn('Demo mode enabled - Firebase services not initialized');
}

export { db, auth };
export default app;
