import { auth, db } from '../js/firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

//  handle firebase error messages
function getCustomErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email is already taken, please use another one.";
    case "auth/invalid-email":
      return "Invalid email format. Please enter a valid email.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export async function signUpUser(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });

    await addDoc(collection(db, 'users'), {
      uid: userCredential.user.uid,
      name: name,
      email: email
    });

    return userCredential;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw new Error(getCustomErrorMessage(error.code)); 
  }
}

export async function signInUser(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Sign-in error:", error);
    throw new Error(getCustomErrorMessage(error.code));
  }
}
