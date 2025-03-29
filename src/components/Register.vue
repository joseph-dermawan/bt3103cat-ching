<template>
    <div class="register-container">
      <h2>Create Account</h2>
      <input v-model="name" placeholder="Name" type="text" />
      <input v-model="email" placeholder="Email" type="email" />
      <input v-model="password" placeholder="Password" type="password" />
      <button @click="register">Sign Up</button>
  
      <p @click="$router.push('/auth')">Already have an account? Login</p>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { auth, db } from "../firebase";
  import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
  import { collection, addDoc } from "firebase/firestore";
  
  export default {
    setup() {
      const name = ref("");
      const email = ref("");
      const password = ref("");
  
      const register = async () => {
        try {
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
  
      return { name, email, password, register };
    },
  };
  </script>
  
  <style>
  .register-container {
    text-align: center;
    max-width: 400px;
    margin: auto;
  }
  </style>
  