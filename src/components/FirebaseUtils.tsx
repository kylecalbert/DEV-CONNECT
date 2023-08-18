import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore';

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

// Function to save user availability to Firestore
export async function saveUserAvailability(
  uid: string,
  availabilityData: string[]
): Promise<void> {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { availability: availabilityData });
  } catch (error) {
    console.error('Error saving availability:', error);
    throw error;
  }
}

// Function to fetch all users from Firestore
export async function fetchAllUsers(): Promise<any[]> {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function fetchUserAvailability(uid: string): Promise<string[]> {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return userData.availability || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching user availability:', error);
    throw error;
  }
}
