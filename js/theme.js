// Check for saved theme preference
const getStoredTheme = () => localStorage.getItem('theme') || 'light';

// Update theme
const updateTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update button icon
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');

  if (theme === "dark") {
    document.body.style.backgroundColor = "#222";
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    document.getElementById('themeToggle').setAttribute("aria-label", "Switch to light mode");
  } else {
    document.body.style.backgroundColor = "#fff";
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
    document.getElementById('themeToggle').setAttribute("aria-label", "Switch to dark mode");
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

  // Set active navigation link
  setActiveNavLink();
});