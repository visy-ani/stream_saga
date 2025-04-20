import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from 'react';
  import {
    User,
    onAuthStateChanged,
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
  import { auth } from '../firebase/config';
  
  interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    sendSignInLink: (email: string) => Promise<void>;
    completeSignInWithLink: (email: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    loginWithFacebook: () => Promise<void>;
    signInWithProvider: (provider: GoogleAuthProvider | FacebookAuthProvider) => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    const login = async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
    };
  
    const signup = async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password);
    };
  
    const logout = async () => {
      await signOut(auth);
    };
  
    const sendSignInLink = async (email: string) => {
      const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
    };
  
    const completeSignInWithLink = async (email: string) => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem('emailForSignIn');
      }
    };
  
    const loginWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error('Error during Google sign-in:', error);
        throw error;
      }
    };
  
    const loginWithFacebook = async () => {
      const provider = new FacebookAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error('Error during Facebook sign-in:', error);
        throw error;
      }
    };
  
    const signInWithProvider = async (
      provider: GoogleAuthProvider | FacebookAuthProvider
    ) => {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error('Error during provider sign-in:', error);
        throw error;
      }
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
  
      return unsubscribe;
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          user,
          login,
          signup,
          logout,
          sendSignInLink,
          completeSignInWithLink,
          loginWithGoogle,
          loginWithFacebook,
          signInWithProvider, 
        }}
      >
        {!loading && children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
  };
  