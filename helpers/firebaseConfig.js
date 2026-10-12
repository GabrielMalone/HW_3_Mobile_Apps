// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB32z-9cnHmfO6lQwKFPhEGj04a9qpeLA8",
  authDomain: "mobiledevhw3.firebaseapp.com",
  projectId: "mobiledevhw3",
  storageBucket: "mobiledevhw3.firebasestorage.app",
  messagingSenderId: "226152461750",
  appId: "1:226152461750:web:fa5f04f99ced446cfc3d17",
  measurementId: "G-15MQX0LHFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get the firestore db assocaited with my app
// will use db to read and write data
export const db = getFirestore(app);

export const auth = initializeAuth(app, {
    // saves authentication information locally on device
    persistence: getReactNativePersistence(AsyncStorage)
});
