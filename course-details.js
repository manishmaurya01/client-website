// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

const loginSignupBtn = document.querySelector('.btn-login');
const logoutBtn = document.getElementById('logout-btn');

// Check if the user is logged in by looking at localStorage
if (localStorage.getItem('user')) {
  // If user is logged in, show the logout button and hide the login button
  loginSignupBtn.style.display = 'none';
  logoutBtn.style.display = 'block';
} else {
  // If user is not logged in, show the login button
  loginSignupBtn.style.display = 'block';
  logoutBtn.style.display = 'none';
}


// Logout Functionality
logoutBtn.addEventListener('click', () => {
  // Log out from Firebase using the modular SDK
  signOut(auth).then(() => {
    // Clear user data from localStorage
    localStorage.removeItem('user');

    // Hide the logout button and show the login/signup button again
    loginSignupBtn.style.display = 'block';
    logoutBtn.style.display = 'none';

    // Optionally, redirect to the login/signup page after logout
    window.location.href = 'Auth.html'; // Redirect to Auth page
  }).catch((error) => {
    // Handle errors during sign out
    console.error('Error signing out: ', error);
  });
});

// Function to get course details by ID
async function getCourseDetails(courseId) {
  const courseRef = doc(db, "courses", courseId);

  try {
    const docSnap = await getDoc(courseRef);

    if (docSnap.exists()) {
      const courseData = docSnap.data();
      document.getElementById("courseImage").src = courseData.image;
      document.getElementById("courseTitle").textContent = courseData.title;
      document.getElementById("courseDescription").textContent = courseData.description;
      document.getElementById("coursePrice").textContent = courseData.price;
      document.getElementById("courseCategory").textContent = courseData.category;
    } else {
      console.log("No such document!");
      alert("Course not found.");   
    }
  } catch (error) {
    console.error("Error fetching course details:", error);
    alert("Error fetching course details.");
  }
}

// Function to handle the course enrollment
function handleEnrollment(courseTitle) {
  const studentName = document.getElementById("studentName").value;
  const studentEmail = document.getElementById("studentEmail").value;

  if (!studentName || !studentEmail) {
    alert("Please fill in all fields.");
    return;  // Return if required fields are missing
  }

  // Handle the enrollment process (e.g., save enrollment to Firestore or another logic)
  alert(`Enrolled in ${courseTitle} as ${studentName}`);
}

// Function to get the course ID from URL and initialize
function initializePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('courseId');

  // Debugging the courseId
  console.log("Course ID:", courseId);

  if (!courseId) {
    console.error("Course ID is missing or invalid.");
    alert("Course ID is missing or invalid.");
    return;
  }

  // Fetch course details on page load
  getCourseDetails(courseId);

  // Set up the form submission handler
  document.getElementById("enrollForm").addEventListener("submit", (event) => {
    event.preventDefault();
    handleEnrollment(document.getElementById("courseTitle").textContent);
  });
}

// Call the initializePage function when the page loads
initializePage();
