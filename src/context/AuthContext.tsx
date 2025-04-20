import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { login, signup, logout, sendSignInLink, completeSignInWithLink, loginWithGoogle, loginWithFacebook, signInWithProvider } from '../utils/authFunctions';  
import { User, GoogleAuthProvider, FacebookAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';

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
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]); 

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
