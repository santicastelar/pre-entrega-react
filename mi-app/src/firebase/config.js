import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0FjlwL8zPsGUhNnvLL2Y69w7fyXgOejo",
  authDomain: "techstore-react.firebaseapp.com",
  projectId: "techstore-react",
  storageBucket: "techstore-react.firebasestorage.app",
  messagingSenderId: "22240572167",
  appId: "1:22240572167:web:7d88f50b41bf74fa424ba2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);