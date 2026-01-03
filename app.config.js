import 'dotenv/config';

/**
 * Simple app.config.js that exposes env vars to the Expo manifest under `expo.extra`.
 * Add your Firebase keys to a local `.env` file (not committed) matching `.env.example`.
 */
export default {
  expo: {
    name: 'Medexa',
    slug: 'madproject',
    version: '1.0.0',
    platforms: ['ios', 'android', 'web'],
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    },
  },
};
