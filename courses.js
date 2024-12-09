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
