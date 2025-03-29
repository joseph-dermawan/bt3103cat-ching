<template>
    <div class="login-container">
      <h2>Login</h2>
      <input v-model="email" placeholder="Email" type="email" />
      <input v-model="password" placeholder="Password" type="password" />
      <button @click="login">Sign In</button>
  
      <p @click="$router.push('/register')">Don't have an account? Sign up</p>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { auth } from "../firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";
  
  export default {
    setup() {
      const email = ref("");
      const password = ref("");
  
      const login = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
          console.log("User Logged In:", userCredential.user);
        } catch (error) {
          console.error("Login Error:", error.message);
        }
      };
  
      return { email, password, login };
    },
  };
  </script>
  
  <style>
  .login-container {
    text-align: center;
    max-width: 400px;
    margin: auto;
  }
  </style>
  