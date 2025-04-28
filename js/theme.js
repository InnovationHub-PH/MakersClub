// Check for saved theme preference
const getStoredTheme = () => localStorage.getItem('theme') || 'light';

// Update theme
const updateTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  
  if (theme === "dark") {
    themeIcon.textContent = '[DARK]\n[○|●]';
    document.getElementById('themeToggle').setAttribute("aria-label", "Switch to light mode");
  } else {
    themeIcon.textContent = '[LIGHT]\n[●|○]';
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