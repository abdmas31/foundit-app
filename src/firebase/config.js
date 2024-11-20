import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD0l9ewQB24pI28zHaBrig_0R2N7Nye53c",
  authDomain: "find-5b9da.firebaseapp.com",
  projectId: "find-5b9da",
  storageBucket: "find-5b9da.appspot.com",
  messagingSenderId: "1049346771708",
  appId: "1:1049346771708:web:9181e8b06607e2bb49e579",
  databaseURL: "https://find-5b9da-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Realtime Database
export const db = getDatabase(app);

export default app;
