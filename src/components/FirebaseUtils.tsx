// firebaseUtils.ts
import { doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';
import { UserCredential } from 'firebase/auth';

// Function to check if the user exists in the Firestore database
export async function userExistsInDatabase(uid: string): Promise<boolean> {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.exists();
  } catch (error) {
    console.log('Error checking user existence:', error);
    return false;
  }
}

// Function to save the user profile to Firestore
export async function saveUserProfile(
  userCredential: UserCredential
): Promise<void> {
  const { displayName, email, uid } = userCredential.user;
  const db = getFirestore();
  const userRef = doc(db, 'users', uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const [firstName, lastName] = displayName?.split(' ') || [null, null];

    // Save the user profile to Firestore
    await setDoc(userRef, {
      email,
      displayName,
      firstName,
      lastName,
      // Add any other additional profile information you need
    });
  }
}
