// AuthUtils.tsx
import { useAuthContext } from './context/AuthContext';
import { UserCredential } from 'firebase/auth';
import { userExistsInDatabase, saveUserProfile } from './FirebaseUtils';

export function useAuthentication() {
  const authContext = useAuthContext();
  const { googleSignIn, user, setUser, logOut } = authContext;

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        const userCredential: UserCredential = result;
        const { uid } = userCredential.user;

        // Check if the user already exists in Firestore
        const existsInDatabase = await userExistsInDatabase(uid);

        if (!existsInDatabase) {
          // If the user does not exist in Firestore, return a flag indicating that the profile needs to be created
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }

    // If the user exists in Firestore or there was an error, return false
    return false;
  };

  const handleGoogleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return { user, handleGoogleSignIn, handleGoogleSignOut };
}
