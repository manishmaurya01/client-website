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

// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, writeBatch } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqsvc4K4QRjxomcQLqsCWa24VyXhnOitA",
  authDomain: "learnandearn-b1e1b.firebaseapp.com",
  projectId: "learnandearn-b1e1b",
  storageBucket: "learnandearn-b1e1b.firebaseapp.com",
  messagingSenderId: "124073364458",
  appId: "1:124073364458:web:8d48bd8ccb8b7de2ac0093",
  measurementId: "G-08Z866X7V2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Default Courses
const defaultCourses = [
  {
    title: "Introduction to Programming",
    description: "Learn the basics of programming with this beginner-friendly course. Understand core concepts like variables, loops, and functions, and gain hands-on experience with practical coding exercises.",
    category: "programming",
    price: "free",
    image: "https://codethedream.org/wp-content/uploads/2023/12/Intro-to-Programming-1024x1024.png",
    instructor: "Jane Smith",
    duration: "4 weeks",
    difficulty: "Beginner",
    prerequisites: "No prior experience required",
    certification: "Certificate of Completion",
    ratings: {
      average: 4.7,
      reviewCount: 120,
    },
    modules: [
      "Module 1: Introduction to Programming",
      "Module 2: Variables and Data Types",
      "Module 3: Functions and Loops",
      "Module 4: Conditional Statements",
    ],
    tags: ["Programming", "JavaScript", "Beginner", "Coding"],
    courseLink: "https://www.example.com/courses/intro-to-programming"
  },
  {
    title: "Graphic Design Fundamentals",
    description: "Explore the principles of graphic design, including typography, color theory, and layout. Start creating professional-level designs for print and digital media.",
    category: "design",
    price: "6500",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/09/Graphic-Design-BCG-Banner.png",
    instructor: "John Doe",
    duration: "6 weeks",
    difficulty: "Beginner to Intermediate",
    prerequisites: "Basic understanding of design principles",
    certification: "Certificate of Completion",
    ratings: {
      average: 4.5,
      reviewCount: 75,
    },
    modules: [
      "Module 1: Introduction to Graphic Design",
      "Module 2: Typography Basics",
      "Module 3: Color Theory and Layout",
      "Module 4: Branding and Logo Design",
    ],
    tags: ["Graphic Design", "Visual Arts", "Typography", "Creativity"],
    courseLink: "https://www.example.com/courses/graphic-design-fundamentals"
  },
  {
    title: "Digital Marketing Basics",
    description: "Master the essentials of digital marketing, including SEO, social media, email marketing, and content strategies. This course prepares you to create effective online marketing campaigns.",
    category: "marketing",
    price: "free",
    image: "https://fueler.io/storage/users/timeline_image/1659279686-jy2p84ykvimsekzsjsx3.png",
    instructor: "Emily Brown",
    duration: "4 weeks",
    difficulty: "Beginner",
    prerequisites: "No prior marketing knowledge required",
    certification: "Certificate of Completion",
    ratings: {
      average: 4.8,
      reviewCount: 200,
    },
    modules: [
      "Module 1: Introduction to Digital Marketing",
      "Module 2: SEO Essentials",
      "Module 3: Social Media Marketing",
      "Module 4: Email Marketing Campaigns",
    ],
    tags: ["Marketing", "Digital Marketing", "SEO", "Social Media"],
    courseLink: "https://www.example.com/courses/digital-marketing-basics"
  },
  {
    title: "Business Strategy 101",
    description: "Learn how to develop effective business strategies, from market analysis to execution. This course will teach you how to make data-driven decisions and grow your business.",
    category: "business",
    price: "free",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20240223125319/Business-Strategy-copy.webp",
    instructor: "Mark Johnson",
    duration: "8 weeks",
    difficulty: "Intermediate",
    prerequisites: "Basic knowledge of business concepts",
    certification: "Certificate of Completion",
    ratings: {
      average: 4.6,
      reviewCount: 95,
    },
    modules: [
      "Module 1: Introduction to Business Strategy",
      "Module 2: Market Research and Analysis",
      "Module 3: Strategic Planning",
      "Module 4: Execution and Monitoring",
    ],
    tags: ["Business", "Strategy", "Entrepreneurship", "Leadership"],
    courseLink: "https://www.example.com/courses/business-strategy-101"
  },
  {
    title: "Advanced JavaScript",
    description: "Take your JavaScript skills to the next level. Learn about advanced concepts such as asynchronous programming, closures, and design patterns to write efficient and scalable JavaScript code.",
    category: "programming",
    price: "3400",
    image: "https://i.ytimg.com/vi/8g_CbydoWBo/maxresdefault.jpg",
    instructor: "Sara Lee",
    duration: "6 weeks",
    difficulty: "Advanced",
    prerequisites: "Basic knowledge of JavaScript",
    certification: "Certificate of Completion",
    ratings: {
      average: 4.9,
      reviewCount: 180,
    },
    modules: [
      "Module 1: Advanced Functions in JavaScript",
      "Module 2: Promises and Asynchronous Programming",
      "Module 3: Closures and IIFEs",
      "Module 4: JavaScript Design Patterns",
    ],
    tags: ["JavaScript", "Advanced", "Programming", "Web Development"],
    courseLink: "https://www.example.com/courses/advanced-javascript"
  }
];
// Render Courses
function renderCourses(courses) {
  const coursesContainer = document.querySelector(".courses-container");
  coursesContainer.innerHTML = "";

  if (courses.length === 0) {
    coursesContainer.innerHTML = `<p>No courses available at the moment.</p>`;
    return;
  }

  courses.forEach((course) => {
    const courseCard = `
      <div class="course-card">
        <img src="${course.image}" alt="${course.title}">
        
        <div class="course-info">
          <h3>${course.title}</h3>
          
          <!-- Course Price and Category -->
          <p class="course-price">${course.price === 'free' ? 'Free' : '$' + course.price}</p>
          <p class="course-category">${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</p>

          <!-- Ratings -->
          <p class="course-ratings">
            Rating: ${course.ratings ? `${course.ratings.average} / 5` : "No ratings yet"} 
            (${course.ratings ? course.ratings.reviewCount : 0} reviews)
          </p>
        </div>
        
        <!-- See More Button -->
        <button class="btn btn-primary seemore-btn" data-id="${course.id}">See Details</button>
      </div>
    `;
    coursesContainer.innerHTML += courseCard;
  });

  // Adding event listener to the "See More" buttons
  const seeMoreButtons = document.querySelectorAll(".seemore-btn");
  seeMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedCourseId = this.getAttribute("data-id");
      localStorage.setItem("selectedCourseId", selectedCourseId);
      document.querySelector(".booking-container").style.display = "block";
      document.querySelector(".courses-con").style.display = "none";
      renderSelectedCourseDetails();  // Ensure course details are rendered
    });
  });
}
// Apply Filters
function applyFilters(courses) {
  const selectedCategory = document.getElementById("category").value;
  const selectedPrice = document.getElementById("price").value;

  return courses.filter((course) => {
    const categoryMatch = selectedCategory === "all" || course.category === selectedCategory;

    // Handle price filters
    let priceMatch = false;
    if (selectedPrice === "all") {
      priceMatch = true;
    } else if (selectedPrice === "free" && course.price === "free") {
      priceMatch = true;
    } else if (selectedPrice === "paid" && course.price !== "free") {
      priceMatch = true;
    } else if (selectedPrice === "less-than-2000" && parseFloat(course.price) < 2000) {
      priceMatch = true;
    } else if (selectedPrice === "less-than-5000" && parseFloat(course.price) < 5000) {
      priceMatch = true;
    } else if (selectedPrice === "less-than-10000" && parseFloat(course.price) < 10000) {
      priceMatch = true;
    } else if (selectedPrice === "above-10000" && parseFloat(course.price) >= 10000) {
      priceMatch = true;
    }

    return categoryMatch && priceMatch;
  });
}

// Event Listeners for Search and Filters
function setupEventListeners(courses) {
  document.getElementById("searchInput").addEventListener("input", () => {
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

// Initialize Courses
async function initializeCourses() {
  const coursesRef = collection(db, "courses");
  let courses = [];

  try {
    const snapshot = await getDocs(coursesRef);
    if (snapshot.empty) {
      console.log("Firestore is empty. Adding default courses.");

      const batch = writeBatch(db);

      defaultCourses.forEach((course) => {
        const courseRef = doc(coursesRef);
        batch.set(courseRef, course);
      });

      await batch.commit();
      console.log("Default courses have been added to Firestore.");
      courses = defaultCourses.map((course, index) => ({
        ...course,
        id: `default-${index}`,
      }));
    } else {
      snapshot.forEach((doc) => {
        courses.push({ ...doc.data(), id: doc.id });
      });
    }
  } catch (error) {
    console.error("Error fetching courses from Firestore. Falling back to default courses.", error);
    courses = defaultCourses.map((course, index) => ({
      ...course,
      id: `default-${index}`,
    }));
  }

  renderCourses(courses);
  setupEventListeners(courses);
}

initializeCourses();

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




async function renderSelectedCourseDetails() {
  const selectedCourseId = localStorage.getItem("selectedCourseId");

  if (!selectedCourseId) {
    console.error("No course selected.");
    return;
  }

  // Fetch course data from Firestore based on the selected ID
  const courseRef = doc(db, "courses", selectedCourseId);

  try {
    const courseSnapshot = await getDoc(courseRef);

    if (courseSnapshot.exists()) {
      const course = courseSnapshot.data();

      // Update the booking-container dynamically
      const bookingContainer = document.querySelector(".booking-container");
      bookingContainer.innerHTML = `
        <div class="course-details">
          <div class="navigation-controls">
            <!-- Go Back Button -->
            <button id="goBackBtn" class="btn btn-primary">
              <i class="fas fa-arrow-left"></i> Go Back
            </button>
          </div>

          <div class="course-content">
            <!-- Left Side: Image -->
            <div class="thumbnail-container">
              <img src="${course.image}" alt="${course.title}">
            </div>

            <!-- Right Side: Course Information -->
            <div class="course-infoo">
              <h2 class="course-title">${course.title}</h2>
              <div class="course-meta">
                <p class="category">Category: <span>${course.category}</span></p>
                <p class="price">Price: <span>${course.price}</span></p>
                <div class="rating">
                  ${generateRatingStars(course.ratings ? course.ratings.average : 0)}
                </div>
              </div>

              <!-- Book Now Button -->
              <button class="btn btn-primary" id="booking">Book Now</button>

              <!-- Course Description -->
              <div class="course-description">
                <h3>Description</h3>
                <p>${course.description}</p>
              </div>
            </div>
          </div>

          <!-- Optional Additional Section -->
          <div class="additional-info">
            <p>Additional information or features can go here!</p>
          </div>
        </div>
      `;

      // Add event listener for Go Back button
      document.querySelector("#goBackBtn").addEventListener("click", () => {
        
        document.querySelector(".booking-container").style.display = "none";
        document.querySelector(".courses-con").style.display = "block";
      });

      
// Add event listener for "Book Now" button
document.getElementById('booking').addEventListener('click', async () => {
  if (!window.loggedInUser) {
    alert('You must be logged in to enroll in a course!');
    return;
  }

  const userRef = doc(db, 'users', window.loggedInUser.uid); // Assuming user data is stored in Firestore under "users" collection
  const courseRef = doc(db, 'courses', selectedCourseId);

  try {
    // Update the user's enrolled courses in Firestore
    await updateDoc(userRef, {
      enrolledCourses: arrayUnion(courseRef)
    });
    alert('You have successfully enrolled in this course!');
  } catch (error) {
    console.error("Error enrolling in course:", error);
    alert('Failed to enroll. Please try again later.');
  }
});



      // Show the booking container and hide the courses container
      document.querySelector(".courses-con").style.display = "none";
      document.querySelector(".booking-container").style.display = "block";
    } else {
      console.error("No course found with the provided ID.");
    }
  } catch (error) {
    console.error("Error fetching course details:", error);
  }
}
 

// Helper function to generate star rating
function generateRatingStars(rating) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = totalStars - fullStars;
  let starsHtml = '';

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<span class="star">&#9733;</span>';
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<span class="star">&#9734;</span>';
  }

  return starsHtml;
}



// Firebase Authentication import
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase Firestore import
import { updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Get the current Firebase Auth instance
const auth = getAuth();

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, store user info globally if needed
    window.loggedInUser = user;
  } else {
    // User is signed out, make sure to clear any user info if necessary
    window.loggedInUser = null;
  }
});

