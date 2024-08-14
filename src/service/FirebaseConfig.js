// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC2RtcCJrYS46JcJX6JJQgFX9_z8HwDSds',
  authDomain: 'ai-trip-planner-fd885.firebaseapp.com',
  projectId: 'ai-trip-planner-fd885',
  storageBucket: 'ai-trip-planner-fd885.appspot.com',
  messagingSenderId: '1021235425036',
  appId: '1:1021235425036:web:30cb14aca39a22d0026329',
  measurementId: 'G-1HZMC084LC',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
// const analytics = getAnalytics(app)
