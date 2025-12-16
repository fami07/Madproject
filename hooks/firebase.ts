import Constants from 'expo-constants';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Prefer values injected via `app.config.js` (Constants.manifest.extra).
// Fall back to process.env for non-Expo environments or when using a bundler
// that replaces env vars at build time.
const extras = (Constants.manifest && (Constants.manifest as any).extra) || {};

// NOTE: The app prefers values injected via `app.config.js` (`expo.extra`) or
// environment variables. For convenience you asked to embed your Firebase
// web config directly as a fallback. This is only intended for local testing
// and temporary use — do NOT commit real secrets to source control for
// production. If you prefer, stop now and add these values to a local `.env`.
export const firebaseConfig = {
  apiKey:
    extras.FIREBASE_API_KEY ?? process.env.FIREBASE_API_KEY ?? 'AIzaSyBicx3ieZHxmZw19YqNJUVLvk0RUCzZlyg',
  authDomain:
    extras.FIREBASE_AUTH_DOMAIN ?? process.env.FIREBASE_AUTH_DOMAIN ?? 'medexa-c673d.firebaseapp.com',
  projectId:
    extras.FIREBASE_PROJECT_ID ?? process.env.FIREBASE_PROJECT_ID ?? 'medexa-c673d',
  storageBucket:
    extras.FIREBASE_STORAGE_BUCKET ?? process.env.FIREBASE_STORAGE_BUCKET ?? 'medexa-c673d.firebasestorage.app',
  messagingSenderId:
    extras.FIREBASE_MESSAGING_SENDER_ID ?? process.env.FIREBASE_MESSAGING_SENDER_ID ?? '195065354916',
  appId:
    extras.FIREBASE_APP_ID ?? process.env.FIREBASE_APP_ID ?? '1:195065354916:web:0ae298430d05ab22162431',
};

let app: any | undefined;
let auth: any | undefined;
let isFirebaseConfigured = false;
let db: any | undefined;

try {
  // Only initialize if we have at least an apiKey and projectId
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    try {
      db = getFirestore(app);
    } catch (e) {
      // ignore firestore init errors
       
      console.warn('Firestore init error', e);
    }
    isFirebaseConfigured = true;
  } else {
    console.warn('Firebase config is incomplete — skipping initialization.');
  }
} catch (err) {
  // Catch runtime errors during initialization (invalid keys, environment issues)
  // and continue without crashing the app. The consumer can check isFirebaseConfigured.
   
  console.warn('Firebase initialization error:', err);
  isFirebaseConfigured = false;
}

export { auth, db, isFirebaseConfigured };

// IMPORTANT: Do NOT commit your Firebase keys directly into source control.
// Add them to `app.config.js` (under `expo.extra`) or use a .env file and
// a build-time injector for production. See README for instructions.
