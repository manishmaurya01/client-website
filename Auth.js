// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqsvc4K4QRjxomcQLqsCWa24VyXhnOitA",
  authDomain: "learnandearn-b1e1b.firebaseapp.com",
  projectId: "learnandearn-b1e1b",
  storageBucket: "learnandearn-b1e1b.firebasestorage.app",
  messagingSenderId: "124073364458",
  appId: "1:124073364458:web:8d48bd8ccb8b7de2ac0093",
  measurementId: "G-08Z866X7V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// DOM elements
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const googleLoginBtn = document.getElementById("google-login-btn");

// Check if the user is already logged in and redirect them to the index page
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If user is logged in, redirect to index.html
    window.location.href = "index.html";
  }
});

// Toggle Tabs
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
});

// Toggle Password Visibility
const passwordToggles = document.querySelectorAll(".password-toggle");

passwordToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    const passwordInput = toggle.previousElementSibling;
    const isPasswordVisible = passwordInput.type === "text";

    passwordInput.type = isPasswordVisible ? "password" : "text";
    toggle.textContent = isPasswordVisible ? "👁️" : "🙈";
  });
});

// Google Login
const provider = new GoogleAuthProvider();

googleLoginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      // alert("Google login successful! Welcome, " + user.displayName);

      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        role: "student" // Default role, you can modify this logic as per your need
      }));

      // Redirect to index.html after Google login
      window.location.href = "index.html"; // Redirect to the home page
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error during Google login: " + errorMessage);
    });
});
signOut(auth).then(() => {
  console.log('User signed out.');
  window.location.href = "auth.html"; // Redirect to the auth page after sign-out
}).catch((error) => {
  const errorMessage = error.message;
  alert("Error during sign out: " + errorMessage);
});

googleLoginBtn.addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});

// After the redirect, handle the result:
getRedirectResult(auth)
  .then((result) => {
    if (result) {
      const user = result.user;
      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        role: "student" // Default role
      }));

      // Redirect to index.html after Google login
      window.location.href = "index.html"; // Redirect to the home page
    }
  })
  .catch((error) => {
    const errorMessage = error.message;
    alert("Error during Google login: " + errorMessage);
  });

  // Check if the user is already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is already signed in, you can handle this case by redirecting to the home page
    window.location.href = "index.html";
  }
});


// Sign-up logic (remains the same)
signupButton.addEventListener("click", (event) => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    event.preventDefault(); // Prevent form submission
    alert("Passwords do not match. Please confirm your password.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // alert("Sign-up successful! Welcome, " + user.email);

      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        uid: user.uid,
        role: document.getElementById("signup-role").value // Save the selected role
      }));

      // Redirect to index.html after sign-up
      window.location.href = "index.html"; // Redirect to the home page
    })
    .catch((error) => {
      const errorMessage = error.message;
      // Log the error to the console for debugging purposes
      console.error("Error details: ", error);

      // Inform the user in a more detailed manner
      alert("Error during sign-up: " + errorMessage);
    });
});

// Login logic (remains the same)
loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // alert("Login successful! Welcome, " + user.email);

      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        uid: user.uid,
        role: document.getElementById("user-role").value // Save the selected role
      }));

      // Redirect to index.html after login
      window.location.href = "index.html"; // Redirect to the home page
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error during login: " + errorMessage);
    });
});

// To log out and clear user data from localStorage
function logout() {
  localStorage.removeItem('user');
  window.location.href = "auth.html"; // Redirect to the auth page after logout
}
