<template>
  <div class="auth-container">
    <h2>{{ isSignUp ? "Sign Up" : "Login" }}</h2>

    <input v-model="name" v-if="isSignUp" placeholder="Name" type="text" />
    <input v-model="email" placeholder="Email" type="email" />
    <input v-model="password" placeholder="Password" type="password" />
    <button @click="isSignUp ? register() : login()">
      {{ isSignUp ? "Sign Up" : "Login" }}
    </button>

    <p @click="isSignUp = !isSignUp">
      {{ isSignUp ? "Already have an account? Login" : "Don't have an account? Sign up" }}
    </p>

    <h3>OR</h3>

    <button @click="signInWithGoogle">Sign in with Google</button>
    <button @click="signInWithGitHub">Sign in with GitHub</button>

    <button @click="logout" v-if="user">Logout</button>

    <h3 v-if="user">Welcome, {{ user.displayName || user.email }}</h3>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth, db, googleProvider, githubProvider } from "../firebase";
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, 
  onAuthStateChanged, signInWithPopup, updateProfile 
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const isSignUp = ref(false);
    const user = ref(null);

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
      });
    });

    const register = async () => {
      try {
        user.value = userCredential.user;
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        await updateProfile(userCredential.user, { displayName: name.value });

        await addDoc(collection(db, "users"), {
          uid: userCredential.user.uid,
          name: name.value,
          email: email.value,
        });

        console.log("User Registered:", userCredential.user);
      } catch (error) {
        console.error("Signup Error:", error.message);
      }
    };

    const login = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log("User Logged In:", userCredential.user);
      } catch (error) {
        console.error("Login Error:", error.message);
      }
    };

    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Google Login Error:", error.message);
      }
    };

    const signInWithGitHub = async () => {
      try {
        await signInWithPopup(auth, githubProvider);
      } catch (error) {
        console.error("GitHub Login Error:", error.message);
      }
    };

    const logout = async () => {
      try {
        await signOut(auth);
        user.value = null;
      } catch (error) {
        console.error("Logout Error:", error.message);
      }
    };

    return { name, email, password, isSignUp, register, login, signInWithGoogle, signInWithGitHub, logout, user };
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
