// Check for saved theme preference
const getStoredTheme = () => localStorage.getItem('theme') || 'light';

// Update theme
const updateTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update button icon
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');
  const icon = document.getElementById('icon');

  if (theme === "dark") {
    document.body.style.backgroundColor = "#000000";
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    sunIcon.setAttribute('stroke', '#000000'); // Make sun icon black in dark mode
    document.getElementById('themeToggle').setAttribute("aria-label", "Switch to light mode");
  } else {
    document.body.style.backgroundColor = "#fff";
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
    moonIcon.setAttribute('stroke', '#ffffff'); // Make moon icon white in light mode
    document.getElementById('themeToggle').setAttribute("aria-label", "Switch to dark mode");
  }
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  menuToggle.classList.toggle('active');
  mainNav.classList.toggle('active');
};

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  const mainNav = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (mainNav.classList.contains('active') && 
      !event.target.closest('.main-nav') && 
      !event.target.closest('.menu-toggle')) {
    mainNav.classList.remove('active');
    menuToggle.classList.remove('active');
  }
};

// Set active navigation link based on current page
const setActiveNavLink = () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

// Initialize theme and navigation
document.addEventListener('DOMContentLoaded', () => {
  const storedTheme = getStoredTheme();
  updateTheme(storedTheme);
  
  // Add theme toggle button listener
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateTheme(newTheme);
  });

  // Add mobile menu toggle listener
  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle.addEventListener('click', toggleMobileMenu);

  // Add click outside listener
  document.addEventListener('click', handleClickOutside);

  // Set active navigation link
  setActiveNavLink();
});