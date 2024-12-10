// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
// Function to render courses
function renderCourses(courses) {
  const coursesContainer = document.querySelector(".courses-container");
  coursesContainer.innerHTML = ""; // Clear previous courses

  if (courses.length === 0) {
    coursesContainer.innerHTML = `
      <div class="no-data-message">
        <p>No courses available at the moment. Please check back later!</p>
      </div>
    `;
    return;
  }

  courses.forEach((course) => {
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


// Event listener for search and filters
function setupEventListeners(courses) {
  document.getElementById("searchBtn").addEventListener("click", () => {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery)
    );
    renderCourses(filteredCourses);
  });

  document.getElementById("category").addEventListener("change", () => {
    const filteredCourses = applyFilters(courses);
    renderCourses(filteredCourses);
  });

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
      console.log("Firestore is empty. Using default courses.");
      courses = defaultCourses;
    } else {
      snapshot.forEach((doc) => {
        courses.push(doc.data());
      });
    }
  } catch (error) {
    console.error("Error fetching courses from Firestore. Falling back to default courses.", error);
    courses = defaultCourses;
  }

  // Render and set up event listeners
  renderCourses(courses);
  setupEventListeners(courses);
}

// Initialize courses on page load
initializeCourses();
