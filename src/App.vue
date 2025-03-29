<template>
  <div id="app">
    <nav>
      <h1>Cat-Ching</h1>
      <button v-if="user" @click="logout">Logout</button>
    </nav>

    <router-view>
      
    </router-view>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default {
  setup() {
    const user = ref(null);

    // Watch for authentication state changes
    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
      });
    });

    // Logout function
    const logout = async () => {
      try {
        await signOut(auth);
        user.value = null;
        console.log("User logged out.");
      } catch (error) {
        console.error("Logout Error:", error.message);
      }
    };

    const updateUser = (currentUser) => {
        user.value = currentUser;
      };

    onAuthStateChanged(auth, updateUser);


    return { user, logout };
  },
};
</script>

<style>
#app {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-top: 20px;
}

nav {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
}

button {
  padding: 8px 12px;
  background-color: #ff4a4a;
  border: none;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #ff3333;
}
</style>
