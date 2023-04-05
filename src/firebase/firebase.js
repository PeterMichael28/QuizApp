import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'quiz-app-e0c8e.firebaseapp.com',
    projectId: 'quiz-app-e0c8e',
    storageBucket: 'quiz-app-e0c8e.appspot.com',
    messagingSenderId: "166681806923",
    appId: import.meta.env.VITE_FIREBASE_API_ID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  export const db = getFirestore(app);



  export default app;
