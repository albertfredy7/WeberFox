import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA6XUjZ9aFyRrQJxDf4tUdOri_u7InlE8o",
    authDomain: "fir-auth-2e187.firebaseapp.com",
    projectId: "fir-auth-2e187",
    storageBucket: "fir-auth-2e187.appspot.com",
    messagingSenderId: "791228055944",
    appId: "1:791228055944:web:4802aba7dfbf77fe6d3a3d",
    measurementId: "G-B2SRS1W1QR"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

