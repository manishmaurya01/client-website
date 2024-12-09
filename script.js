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

// Initialize variables
let currentIndex = 0;

// Add dots dynamically based on the number of testimonials
testimonialCards.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('slider-dot');
  if (index === currentIndex) dot.classList.add('active'); // Mark the first dot as active
  sliderDotsContainer.appendChild(dot);

  // Add click event to navigate to specific slides
  dot.addEventListener('click', () => {
    updateActiveTestimonial(index);
  });
});

// Append dots container to the testimonials section
testimonialsSection.appendChild(sliderDotsContainer);

// Function to update the active testimonial and dot
function updateActiveTestimonial(index) {
  testimonialCards[currentIndex].classList.remove('active');
  sliderDotsContainer.children[currentIndex].classList.remove('active');
  currentIndex = index;
  testimonialCards[currentIndex].classList.add('active');
  sliderDotsContainer.children[currentIndex].classList.add('active');
}

// Function to show the next testimonial (used for auto-slide)
function showNextTestimonial() {
  const nextIndex = (currentIndex + 1) % testimonialCards.length;
  updateActiveTestimonial(nextIndex);
}

// Auto-slide every 2 seconds
let autoSlide = setInterval(showNextTestimonial, 2000);

// Pause the auto-slide when hovering over the testimonials section
testimonialsSection.addEventListener('mouseenter', () => {
  clearInterval(autoSlide); // Stop the interval on hover
});

testimonialsSection.addEventListener('mouseleave', () => {
  autoSlide = setInterval(showNextTestimonial, 2000); // Restart the interval when mouse leaves
});

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
