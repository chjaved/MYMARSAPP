import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQWJhTcjn8wmhwOzdcI5JWEXUy_CXuqtQ",
  authDomain: "mymarsapp.firebaseapp.com",
  projectId: "mymarsapp",
  storageBucket: "mymarsapp.appspot.com",
  messagingSenderId: "828966701340",
  appId: "1:828966701340:web:ffc2a52e35caaa7cd192d9"
};

// Initialize Firebase only if no apps have been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const firebaseAuth = getAuth(app);
