// Firebase Authentication import
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase Firestore import
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqsvc4K4QRjxomcQLqsCWa24VyXhnOitA",
  authDomain: "learnandearn-b1e1b.firebaseapp.com",
  projectId: "learnandearn-b1e1b",
  storageBucket: "learnandearn-b1e1b.firebaseapp.com",
  messagingSenderId: "124073364458",
  appId: "1:124073364458:web:8d48bd8ccb8b7de2ac0093",
  measurementId: "G-08Z866X7V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
document.querySelector("#main-content").style.display = "none"

// Function to check if the logged-in user has admin role
async function checkAdminRole(userEmail) {
  try {
    const usersCollection = collection(db, "users");

    // Create a query to find the user with the matching email
    const q = query(usersCollection, where("email", "==", userEmail));

    // Get the query snapshot
    const querySnapshot = await getDocs(q);

    let isAdmin = false;

    // If a document is found, check the role
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      console.log(userData.email);
      
      if (userData.email === userEmail && userData.role === "admin") {
        isAdmin = true;
        document.querySelector("#main-content").style.display = "block"
        document.querySelector("#checking-message").style.display = "none"
      }
    });

    return isAdmin;
  } catch (error) {
    console.error("Error checking admin role:", error);
    return false;
  }
}

// Handle user authentication and role validation based on email and role
onAuthStateChanged(auth, async (user) => {
  if (user) {
    window.loggedInUser = user;
    const userEmail = user.email;
    console.log(userEmail);
    const isAdmin = await checkAdminRole(userEmail);

    if (isAdmin) {
      document.getElementById("welcome-message").textContent = `Welcome, Admin ${user.displayName || user.email}`;
    } else {
      alert("Access denied. You do not have permission to view this page. Only for admin use");
      window.location.href = "index.html"; // Redirect to previous page or login page
    }
  } else {
    window.loggedInUser = null;
    window.location.href = "Auth.html"; // Redirect to login page if not logged in
  }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "Auth.html"; // Redirect to login page after logout
  });
});

// Show Add Course Popup
document.getElementById("add-course-btn").addEventListener("click", () => {
  document.getElementById("add-course-popup").style.display = "flex"; // Show the popup
});

// Close Add Course Popup
document.getElementById("close-popup-btn").addEventListener("click", () => {
  document.getElementById("add-course-popup").style.display = "none"; // Hide the popup
});

// Function to add course to Firestore
document.getElementById("add-course-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const course = {
    title: document.getElementById("course-title").value,
    description: document.getElementById("course-description").value,
    price: document.getElementById("course-price").value,
    category: document.getElementById("course-category").value,
    instructor: document.getElementById("course-instructor").value,
    duration: document.getElementById("course-duration").value,
    difficulty: document.getElementById("course-difficulty").value,
    prerequisites: document.getElementById("course-prerequisites").value,
    certification: document.getElementById("course-certification").value,
    content: document.getElementById("course-modules").value.split(','), // Split modules into an array
    tags: document.getElementById("course-tags").value.split(','), // Split tags into an array
    link: document.getElementById("course-link").value,
    image: document.getElementById("course-image").value
  };

  const coursesRef = collection(db, "courses");
  await addDoc(coursesRef, course);
  alert("Course added successfully!");

  // Close the popup and clear form
  document.getElementById("add-course-popup").style.display = "none";
  document.getElementById("add-course-form").reset();
});
