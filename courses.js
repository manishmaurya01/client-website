// document.getElementById("searchBtn").addEventListener("click", () => {
//     const searchQuery = document.getElementById("searchInput").value.toLowerCase();
//     console.log("Search for:", searchQuery); // Placeholder for search functionality
//   });
  
//   // Dropdown functionality for profile
//   document.getElementById("profile-btn").addEventListener("click", () => {
//     document.getElementById("profile-menu").classList.toggle("show");
//   });
  
//   // Filters functionality
//   document.getElementById("category").addEventListener("change", (e) => {
//     const selectedCategory = e.target.value;
//     console.log("Filter by category:", selectedCategory); // Placeholder
//   });
  
//   document.getElementById("price").addEventListener("change", (e) => {
//     const selectedPrice = e.target.value;
//     console.log("Filter by price:", selectedPrice); // Placeholder
//   });

  // Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Testimonial Slider Logic
const testimonialCards = document.querySelectorAll('.testimonial-card');
const sliderDotsContainer = document.createElement('div');
sliderDotsContainer.classList.add('slider-dots');
const testimonialsSection = document.querySelector('.testimonials');

  
// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for stored dark mode preference and apply it
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change the icon to the sun
} else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Default to moon icon
}

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save dark mode preference in localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change the icon to the sun
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change the icon to the moon
    }
});


// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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


// Firestore imports
import { getFirestore, doc, getDocs, setDoc, collection } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const db = getFirestore(app);

// Default courses
const defaultCourses = [
  {
    title: "Introduction to Programming",
    description: "Learn the basics of programming with this beginner-friendly course.",
    category: "programming",
    price: "free",
    image: "https://codethedream.org/wp-content/uploads/2023/12/Intro-to-Programming-1024x1024.png"
  },
  {
    title: "Graphic Design Fundamentals",
    description: "Explore the principles of graphic design and start creating.",
    category: "design",
    price: "paid",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/09/Graphic-Design-BCG-Banner.png"
  },
  {
    title: "Digital Marketing Basics",
    description: "Master the essentials of digital marketing.",
    category: "marketing",
    price: "free",
    image: "https://fueler.io/storage/users/timeline_image/1659279686-jy2p84ykvimsekzsjsx3.png"
  },
  {
    title: "Business Strategy 101",
    description: "Learn to develop effective business strategies.",
    category: "business",
    price: "free",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20240223125319/Business-Strategy-copy.webp"
  },
  {
    title: "Advanced JavaScript",
    description: "Take your JavaScript skills to the next level.",
    category: "programming",
    price: "paid",
    image: "https://i.ytimg.com/vi/8g_CbydoWBo/maxresdefault.jpg"
  }
];

// Function to initialize courses
async function initializeCourses() {
  const coursesRef = collection(db, "courses");
  const snapshot = await getDocs(coursesRef);

  if (snapshot.empty) {
    // Add default courses to Firestore
    for (const course of defaultCourses) {
      const courseRef = doc(coursesRef);
      await setDoc(courseRef, course);
    }
    console.log("Default courses added.");
  } else {
    console.log("Courses already exist in Firestore.");
  }

  // List all courses
  listCourses();
}

// Function to list all courses
async function listCourses() {
  const coursesRef = collection(db, "courses");
  const snapshot = await getDocs(coursesRef);
  const coursesContainer = document.querySelector(".courses-container");

  // Clear existing courses from the container
  coursesContainer.innerHTML = "";

  snapshot.forEach((doc) => {
    const course = doc.data();
    const courseCard = `
      <div class="course-card">
        <img src="${course.image}" alt="Course Image">
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
    `;
    coursesContainer.innerHTML += courseCard;
  });
}

// Initialize courses on page load
initializeCourses();
