import { auth } from '../firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// Authentication functions
export const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signup = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  await signOut(auth);
};

export const sendSignInLink = async (email: string) => {
  const actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem('emailForSignIn', email);
};

export const completeSignInWithLink = async (email: string) => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    await signInWithEmailLink(auth, email, window.location.href);
    window.localStorage.removeItem('emailForSignIn');
  }
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

export const loginWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error during Facebook sign-in:', error);
    throw error;
  }
};

export const signInWithProvider = async (
  provider: GoogleAuthProvider | FacebookAuthProvider
) => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error during provider sign-in:', error);
    throw error;
  }
};
