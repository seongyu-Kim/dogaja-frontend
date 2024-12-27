// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaS975TdsG_u9yMYKDiXgrOUK5I_id66c",
  authDomain: "elice-frontend-firebase-3b862.firebaseapp.com",
  projectId: "elice-frontend-firebase-3b862",
  storageBucket: "elice-frontend-firebase-3b862.appspot.com",
  messagingSenderId: "559993163739",
  appId: "1:559993163739:web:49623caf7cf295c96961fe",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// Initialize Firebase
export { storage };
