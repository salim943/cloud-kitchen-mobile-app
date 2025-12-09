

import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  browserLocalPersistence,
} from "firebase/auth";

// Expo-secure-storage alternative (Firebase v12 removed ReactNativePersistence)
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
  
};

const app = initializeApp(firebaseConfig);

// For React Native / Expo (Firebase v12+)
// Use AsyncStorage manually
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence, // uses in-memory storage fallback
});

export { app, auth };
