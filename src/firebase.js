import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  authDomain: "ai-project-30388.firebaseapp.com",
  projectId: "ai-project-30388",
  storageBucket: "ai-project-30388.appspot.com",
  messagingSenderId: "208750293032",
  appId: "1:208750293032:web:b86cf5458f30514f14051d",
  measurementId: "G-DDZ6L82SZ5",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
