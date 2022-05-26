import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyABpnDLuuyq7g6g44gIVpSjn5F--kjnF3w",
  authDomain: "repasando-con-react.firebaseapp.com",
  projectId: "repasando-con-react",
  storageBucket: "repasando-con-react.appspot.com",
  messagingSenderId: "923175316760",
  appId: "1:923175316760:web:e5c0b89b3d5dd5ec6c826d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { auth, db }