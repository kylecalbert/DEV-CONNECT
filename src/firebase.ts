// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB93YLL0WzaUfCPP0JDyQr4R3mmdjWMy0I',
  authDomain: 'andi-connect.firebaseapp.com',
  projectId: 'andi-connect',
  storageBucket: 'andi-connect.appspot.com',
  messagingSenderId: '346581092142',
  appId: '1:346581092142:web:f5e0384ccebfb5ec5c5cbf',
  measurementId: 'G-JFY3FES6R6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
