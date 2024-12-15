import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyCqsvc4K4QRjxomcQLqsCWa24VyXhnOitA",
  authDomain: "learnandearn-b1e1b.firebaseapp.com",
  projectId: "learnandearn-b1e1b",
  storageBucket: "learnandearn-b1e1b.appspot.com",
  messagingSenderId: "124073364458",
  appId: "1:124073364458:web:8d48bd8ccb8b7de2ac0093",
  measurementId: "G-08Z866X7V2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Login/Logout Button Logic
const loginSignupBtn = document.querySelector(".btn-login");
const logoutBtn = document.getElementById("logout-btn");

if (localStorage.getItem("user")) {
  loginSignupBtn.style.display = "none";
  logoutBtn.style.display = "block";
} else {
  loginSignupBtn.style.display = "block";
  logoutBtn.style.display = "none";
}

// Check if the user is logged in
const currentUser = JSON.parse(localStorage.getItem("user"));
const courseListDiv = document.getElementById("course-list");

// Fetch the enrolled courses for the current user
async function fetchEnrolledCourses() {
  if (!currentUser) {
    alert("You need to be logged in to view your enrolled courses.");
    window.location.href = "Auth.html"; // Redirect to login page if not logged in
    return;
  }

  // Reference to the courses collection
  const coursesRef = collection(db, "courses");

  // Query to find courses where the enrolled-users array contains the current user's email
  const q = query(coursesRef, where("enrolled-users", "array-contains", currentUser.email));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      courseListDiv.innerHTML = "<p>You are not enrolled in any courses.</p>";
    } else {
      querySnapshot.forEach((doc) => {
        const courseData = doc.data();
        displayCourse(courseData);
      });
    }
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
  }
}
// Display course on the page with card layout
function displayCourse(courseData) {
    const courseCard = `
      <div class="course-card">
        <img src="${courseData.image}" alt="${courseData.title}">
        
        <div class="course-info">
          <h3>${courseData.title}</h3>
          
          <!-- Course Price and Category -->
          <p class="course-price">${courseData.price === 'free' ? 'Free' : '$' + courseData.price}</p>
          <p class="course-category">${courseData.category.charAt(0).toUpperCase() + courseData.category.slice(1)}</p>
  
          <!-- Ratings -->
          <p class="course-ratings">
            Rating: ${courseData.ratings ? `${courseData.ratings.average} / 5` : "No ratings yet"} 
            (${courseData.ratings ? courseData.ratings.reviewCount : 0} reviews)
          </p>
        </div>
        
        <!-- See More Button -->
        <button class="btn btn-primary seemore-btn" data-id="${courseData.id}">See Details</button>
      </div>
    `;
  
    courseListDiv.innerHTML += courseCard;  // Append the course card to the list
  }
  
// Fetch the enrolled courses on page load
fetchEnrolledCourses();
// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});



// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check for stored dark mode preference and apply it
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});