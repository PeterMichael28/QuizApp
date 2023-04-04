import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyB3zMzd3IFSmOtysvrxruAv7LAIyJy32mM',
    authDomain: 'quiz-app-e0c8e.firebaseapp.com',
    projectId: 'quiz-app-e0c8e',
    storageBucket: 'quiz-app-e0c8e.appspot.com',
    messagingSenderId: "166681806923",
    appId: '1:166681806923:web:4fc9f38ec642591dc4a5ce'
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  export const db = getFirestore(app);



  export default app;
