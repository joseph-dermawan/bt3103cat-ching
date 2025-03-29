import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAfHpoQWA2VFGDhUsHEz0FpdSsJraNqsGg",
  authDomain: "bt3103-cat-ching.firebaseapp.com",
  projectId: "bt3103-cat-ching",
  storageBucket: "bt3103-cat-ching.firebasestorage.app",
  messagingSenderId: "741798900207",
  appId: "1:741798900207:web:aac7b14de3d61d57abc61a",
  measurementId: "G-SFYNJS2QZD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db};
