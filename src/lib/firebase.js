import { initializeApp, getApps } from "firebase/app"
import FIREBASE_CONFIG from '../fb.json'

// Safe to call on server — getAnalytics is handled lazily in the Analytics component
export const firebaseApp =
  getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG)
