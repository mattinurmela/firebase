import {initializeApp} from 'firebase/app';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    authDomain: "chat-45554.firebaseapp.com",
    projectId: "chat-45554",
    storageBucket: "chat-45554.appspot.com",
    messagingSenderId: "504941610363",
    appId: "1:504941610363:web:98c0c24aa644670fc7a9de"
  }

  
  initializeApp(firebaseConfig)
  
  const firestore = getFirestore()
  
  const MESSAGES = 'messages'

export { 
    firestore,
    collection,
    addDoc,
    MESSAGES,
    query,
    onSnapshot,
    orderBy,
    serverTimestamp,
    getAuth,
    signInWithEmailAndPassword
}
