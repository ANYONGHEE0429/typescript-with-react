// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   //    apiKey: process.env.REACT_APP_apiKey,
   //    authDomain: process.env.REACT_APP_authDomain,
   //    databaseURL: process.env.REACT_APP_databaseURL,
   //    projectId: process.env.REACT_APP_projectId,
   //    storageBucket: process.env.REACT_APP_storageBucket,
   //    messagingSenderId: process.env.REACT_APP_messagingSenderId,
   //    appId: process.env.REACT_APP_appId,
   //    measurementId: process.env.REACT_APP_measurementId,
   apiKey: 'AIzaSyC6Eqavfn3atWNOP0ATJ3hEo0IAdxsAO88',
   authDomain: 'todoconnection.firebaseapp.com',
   databaseURL: 'https://todoconnection-default-rtdb.firebaseio.com',
   projectId: 'todoconnection',
   storageBucket: 'todoconnection.appspot.com',
   messagingSenderId: '826663818357',
   appId: '1:826663818357:web:1a708eabe5589bb65e143c',
   measurementId: 'G-B53NNE9DHF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };

export const signInWithGoogle = () => {
   const provider = new GoogleAuthProvider();
   signInWithPopup(auth, provider);
};
