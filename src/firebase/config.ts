import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore'

const FIREBASE_APIKEY = process.env.NEXT_PUBLIC_FIREBASE_APIKEY as string
const FIREBASE_AUTH_DOMAIN = process.env
  .NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string
const FIREBASE_PROJECT_ID = process.env
  .NEXT_PUBLIC_FIREBASE_PROJECT_ID as string
const FIREBASE_STORAGE = process.env.NEXT_PUBLIC_FIREBASE_STORAGE as string
const FIREBASE_MESSAGING = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING as string
const FIREBASE_APPID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string
const FIREBASE_MEASUREMENT = process.env
  .NEXT_PUBLIC_FIREBASE_MEASUREMENT as string

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE,
  messagingSenderId: FIREBASE_MESSAGING,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENT,
}

// Verificar si ya existe una app antes de inicializar
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

export {
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayRemove,
  arrayUnion,
}
