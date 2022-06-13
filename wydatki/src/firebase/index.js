import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD0lmfPzaxKopdSwkxSfcoxZVJRcZefgFo",
  authDomain: "vue-project1-10785.firebaseapp.com",
  projectId: "vue-project1-10785",
  storageBucket: "vue-project1-10785.appspot.com",
  messagingSenderId: "472551540297",
  appId: "1:472551540297:web:8f67cda2945a37e5ec6198"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db= getFirestore(app);

const billsColl = collection(db, 'bills');


export { auth }

export { billsColl};