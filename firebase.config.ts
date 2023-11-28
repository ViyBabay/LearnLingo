import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCpLpR72WDf9gcJuU0hzAXAJAo1Ztebh20",
  authDomain: "learnlingo-9b065.firebaseapp.com",
  projectId: "learnlingo-9b065",
  storageBucket: "learnlingo-9b065.appspot.com",
  messagingSenderId: "738095000262",
  appId: "1:738095000262:web:a2b1da97c922c3a17c45c7",
};

export const app = initializeApp(firebaseConfig);
