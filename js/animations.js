// Animation Handling

/**
 * Initialize animations throughout the site
 */
export function initAnimations() {
  // Handle animations that should trigger on scroll
  initScrollAnimations();
  
  // Handle any additional animations
  initMiscAnimations();
}

/**
 * Initialize animations triggered by scrolling
 */
function initScrollAnimations() {
  // Get all elements with data-aos attribute
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  if (animatedElements.length === 0) return;
  
  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }
  
  // Add .aos-animate class to elements in viewport
  function handleScroll() {
    animatedElements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('aos-animate');
      }
    });
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Trigger initial check
  handleScroll();
}

/**
 * Initialize miscellaneous animations
 */
function initMiscAnimations() {
  // Add any additional animation initializations here
  
  // Example: Add floating animation to specific elements
  const floatingElements = document.querySelectorAll('.feature-icon');
  floatingElements.forEach(element => {
    element.classList.add('float');
  });
  
  // Example: Stagger animations for service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
}