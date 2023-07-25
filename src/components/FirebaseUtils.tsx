// FirebaseUtils.tsx
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
  uid: string,
  profileData: any // Replace 'any' with the specific type of profile data you want to save
): Promise<void> {
  const db = getFirestore();
  const userRef = doc(db, 'users', uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    // Save the user profile to Firestore
    await setDoc(userRef, profileData);
  }
}
