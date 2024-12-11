
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
document.getElementById("darkModeToggle").addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme); // Save theme preference
});

// Apply saved theme preference on load
const savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);


// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, writeBatch } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Default courses in case Firestore is unavailable
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

// Function to render courses
function renderCourses(courses) {
  const coursesContainer = document.querySelector(".courses-container");
  coursesContainer.innerHTML = ""; // Clear previous courses

  if (courses.length === 0) {
    coursesContainer.innerHTML = `<p>No courses available at the moment.</p>`;
    return;
  }

  courses.forEach((course) => {
    const courseCard = `
      <div class="course-card">
        <img src="${course.image}" alt="${course.title}">
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
    `;
    coursesContainer.innerHTML += courseCard;
  });
}

// Function to apply filters
function applyFilters(courses) {
  const selectedCategory = document.getElementById("category").value;
  const selectedPrice = document.getElementById("price").value;

  return courses.filter((course) => {
    const categoryMatch = selectedCategory === "all" || course.category === selectedCategory;
    const priceMatch = selectedPrice === "all" || course.price === selectedPrice;
    return categoryMatch && priceMatch;
  });
}

// Event listener setup
function setupEventListeners(courses) {
  // Live search
  document.getElementById("searchInput").addEventListener("input", () => {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery)
    );
    renderCourses(filteredCourses);
  });

  // Category filter
  document.getElementById("category").addEventListener("change", () => {
    const filteredCourses = applyFilters(courses);
    renderCourses(filteredCourses);
  });

  // Price filter
  document.getElementById("price").addEventListener("change", () => {
    const filteredCourses = applyFilters(courses);
    renderCourses(filteredCourses);
  });
}

// Function to initialize courses
async function initializeCourses() {
  const coursesRef = collection(db, "courses");
  let courses = [];

  try {
    const snapshot = await getDocs(coursesRef);
    if (snapshot.empty) {
      console.log("Firestore is empty. Adding default courses.");

      const batch = writeBatch(db); // Create a batch object

      defaultCourses.forEach((course) => {
        const courseRef = doc(coursesRef); // Create a new document reference for each course
        batch.set(courseRef, course); // Add the set operation to the batch
      });

      await batch.commit(); // Commit the batch operation
      console.log("Default courses have been added to Firestore.");

      courses = defaultCourses; // Use default courses for rendering
    } else {
      snapshot.forEach((doc) => {
        courses.push(doc.data());
      });
    }
  } catch (error) {
    console.error("Error fetching courses from Firestore. Falling back to default courses.", error);
    courses = defaultCourses; // Fallback to default courses in case of error
  }

  renderCourses(courses);
  setupEventListeners(courses);
}

// Initialize courses when the page loads
initializeCourses();