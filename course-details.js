import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Get selected course ID from localStorage
const courseId = localStorage.getItem("selectedCourseId");

async function fetchCourseDetails(courseId) {
  if (!courseId) {
    alert("No course selected!");
    window.location.href = "index.html";
    return;
  }

  try {
    // Get the course document from Firestore
    const courseRef = doc(db, "courses", courseId);
    const courseSnapshot = await getDoc(courseRef);

    if (!courseSnapshot.exists()) {
      alert("Course not found!");
      return;
    }

    const course = courseSnapshot.data();
    renderCourseDetails(course);
  } catch (error) {
    console.error("Error fetching course details:", error);
    alert("Failed to load course details.");
  }
}

function renderCourseDetails(course) {
  document.getElementById("course-title").textContent = course.title;
  document.getElementById("course-image").src = course.image || "default-image.png";
  document.getElementById("course-description").textContent = course.description;

  const enrollButton = document.getElementById("enroll-button");
  enrollButton.addEventListener("click", () => {
    alert(`You are now enrolled in ${course.title}!`);
    // Optionally, save enrollment details in Firestore
  });
}

// Load the course details on page load
fetchCourseDetails(courseId);
