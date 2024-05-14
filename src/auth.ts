import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);

export const signInWithGoogle = () => {
   const provider = new GoogleAuthProvider();
   signInWithPopup(auth, provider);
};

export { auth };
