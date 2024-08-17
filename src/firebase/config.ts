// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayRemove,
  arrayUnion
} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDPZ9IiIkvDAArgaW27NoMMcgrgzs4DwPA',
  authDomain: 'portfolio-web-71501.firebaseapp.com',
  projectId: 'portfolio-web-71501',
  storageBucket: 'portfolio-web-71501.appspot.com',
  messagingSenderId: '1042206839990',
  appId: '1:1042206839990:web:40ec9099f1e17c78410217',
  measurementId: 'G-9MF50X1T5L',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
// const analytics = getAnalytics(app)

export { db, doc, getDoc, setDoc, updateDoc, increment, arrayRemove, arrayUnion }
