import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../../firebase';

// Define the shape of the user object
interface AppUser {
  email: string | null;
  displayName: string | null;
  uid: string | null;
  firstName: string | null;
  lastName: string | null;
  photoURL: string | null;
}

// Define the shape of the AuthContext
interface AuthContextType {
  googleSignIn: () => Promise<UserCredential | null>;
  logOut: () => void;
  user: AppUser | null;
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  googleSignIn: () => Promise.resolve(null),
  logOut: () => {},
  user: null,
  setUser: () => {},
});

// Define the props for AuthContextProvider
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);

  // Function to log out the user
  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { email, displayName, uid, photoURL } = currentUser;
        // Parse the display name into first and last name (assuming they are space-separated)
        const [firstName, lastName] = displayName?.split(' ') || [null, null];
        setUser({ email, displayName, uid, firstName, lastName, photoURL });
      } else {
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Function to sign in with Google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile'); // Add the "profile" scope to access first and last name
    return signInWithPopup(auth, provider); // Return the promise returned by signInWithPopup
  };

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// export the useAuthContext which literally contains everything such as the googleSignIn, googleSign out etc...
///so that we can extract those and set up on click functionalities
export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext);
};
