
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCRCisAnhxN5ZJ3iX1Y2Css7HVjHJtn86k",
  authDomain: "crud-parcial-6f84f.firebaseapp.com",
  projectId: "crud-parcial-6f84f",
  storageBucket: "crud-parcial-6f84f.appspot.com",
  messagingSenderId: "589358013422",
  appId: "1:589358013422:web:4d32e257f58cb943b70cff"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db