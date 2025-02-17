<template>
  <div class="auth-container">
    <h2>{{ isSignUp ? "Sign Up" : "Login" }}</h2>

    <!-- Email & Password Login -->
    <input v-model="email" placeholder="Email" type="email" />
    <input v-model="password" placeholder="Password" type="password" />
    <button @click="isSignUp ? register() : login()">
      {{ isSignUp ? "Sign Up" : "Login" }}
    </button>

    <p @click="isSignUp = !isSignUp">
      {{ isSignUp ? "Already have an account? Login" : "Don't have an account? Sign up" }}
    </p>

    <h3>OR</h3>

    <!-- Third-Party Logins -->
    <button @click="signInWithGoogle">Sign in with Google</button>
    <button @click="signInWithGitHub">Sign in with GitHub</button>
    <button @click="signInWithFacebook">Sign in with Facebook</button>

    <button @click="logout" v-if="user">Logout</button>

    <h3 v-if="user">Welcome, {{ user.displayName || user.email }}</h3>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth, db, googleProvider, githubProvider, facebookProvider } from "../firebase";
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, 
  onAuthStateChanged, signInWithPopup 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const isSignUp = ref(false);
    const user = ref(null);

    // Monitor user authentication state
    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
      });
    });

    // Email & Password Signup
    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const newUser = userCredential.user;

        // Store user in Firestore
        await setDoc(doc(db, "users", newUser.uid), {
          name: newUser.displayName || email.value.split("@")[0],
          email: newUser.email,
          createdAt: new Date(),
        });

        console.log("User Registered:", newUser);
      } catch (error) {
        console.error("Signup Error:", error.message);
      }
    };

    // Email & Password Login
    const login = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log("User Logged In:", userCredential.user);
      } catch (error) {
        console.error("Login Error:", error.message);
      }
    };

    // Google Login
    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        await saveUserToFirestore(result.user, "Google");
      } catch (error) {
        console.error("Google Login Error:", error.message);
      }
    };

    // GitHub Login
    const signInWithGitHub = async () => {
      try {
        const result = await signInWithPopup(auth, githubProvider);
        await saveUserToFirestore(result.user, "GitHub");
      } catch (error) {
        console.error("GitHub Login Error:", error.message);
      }
    };

    // Facebook Login
    const signInWithFacebook = async () => {
      try {
        const result = await signInWithPopup(auth, facebookProvider);
        await saveUserToFirestore(result.user, "Facebook");
      } catch (error) {
        console.error("Facebook Login Error:", error.message);
      }
    };

    // Store user data in Firestore
    const saveUserToFirestore = async (user, provider) => {
      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);

      if (!docSnap.exists()) {
        await setDoc(userDoc, {
          name: user.displayName || user.email.split("@")[0],
          email: user.email,
          photoURL: user.photoURL,
          provider,
          createdAt: new Date(),
        });
      }
    };

    // Logout Function
    const logout = async () => {
      try {
        await signOut(auth);
        user.value = null;
        console.log("User logged out.");
      } catch (error) {
        console.error("Logout Error:", error.message);
      }
    };

    return { email, password, isSignUp, register, login, signInWithGoogle, signInWithGitHub, signInWithFacebook, logout, user };
  },
};
</script>

<style>
.auth-container {
  text-align: center;
  max-width: 400px;
  margin: auto;
}
button {
  display: block;
  margin: 10px auto;
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  cursor: pointer;
  width: 200px;
  font-size: 16px;
}
</style>
