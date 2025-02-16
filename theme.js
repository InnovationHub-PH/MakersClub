// Check for saved theme preference
const getStoredTheme = () => localStorage.getItem('theme') || 'light';

// Update theme
const updateTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update button icon
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');

  
  /* if (theme === 'dark') {
    icon.className = 'fas fa-sun';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    icon.className = 'fas fa-moon';
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  } --> */

    if (theme === "dark") {
            document.body.style.backgroundColor = "#222"; // Dark mode
            moonIcon.style.display = "none";
            sunIcon.style.display = "block";
            themeToggle.setAttribute("aria-label", "Switch to light mode");} 
    else {
            document.body.style.backgroundColor = "#fff"; // Light mode
            sunIcon.style.display = "none";
            moonIcon.style.display = "block";
            themeToggle.setAttribute("aria-label", "Switch to dark mode");
        }
};

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
  const storedTheme = getStoredTheme();
  updateTheme(storedTheme);
  
  // Add theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateTheme(newTheme);
  });
});