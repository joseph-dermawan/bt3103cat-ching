import { signUpUser, signInUser } from '../js/auth.js';

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login"); 


registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

const signUpForm = document.querySelector(".sign-up form");
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = signUpForm.querySelector('input[placeholder="Name"]').value;
  const email = signUpForm.querySelector('input[placeholder="Email"]').value;
  const password = signUpForm.querySelector('input[placeholder="Password"]').value;

  try {
    // firebase signup
    const userCredential = await signUpUser(name, email, password);
    console.log("Sign-up successful:", userCredential.user);
    
    alert("Sign-up successful! Now you can sign in.");
    
  } catch (err) {
    console.error("Sign-up error:", err);
    alert(err.message);
  }
});

const signInForm = document.querySelector(".sign-in form");
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm.querySelector('input[placeholder="Email"]').value;
  const password = signInForm.querySelector('input[placeholder="Password"]').value;

  try {
    // firebase signin
    const userCredential = await signInUser(email, password);
    console.log("Sign-in successful:", userCredential.user);

    alert(`Welcome back, ${userCredential.user.displayName || "User"}!`);

  } catch (err) {
    console.error("Sign-in error:", err);
    alert(err.message);
  }
});
