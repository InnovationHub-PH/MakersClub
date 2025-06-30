// Contact Form Handling

/**
 * Initialize the contact form functionality
 */
export function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  /**
   * Handle form submission
   * @param {Event} event - The form submit event
   */
  function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // Simple validation
    if (!validateForm(formValues)) {
      return;
    }
    
    // In a real application, you would send this data to a backend
    // For this demo, we'll simulate a successful form submission
    showSubmissionFeedback(true);
    
    // Reset the form
    contactForm.reset();
  }
  
  /**
   * Validate form fields
   * @param {Object} formValues - The form values to validate
   * @returns {boolean} Whether the form is valid
   */
  function validateForm(formValues) {
    let isValid = true;
    
    // Remove any existing error messages
    const existingErrors = contactForm.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Required fields validation
    if (!formValues.name.trim()) {
      addErrorMessage(contactForm.querySelector('[name="name"]'), 'Please enter your name');
      isValid = false;
    }
    
    if (!formValues.email.trim()) {
      addErrorMessage(contactForm.querySelector('[name="email"]'), 'Please enter your email');
      isValid = false;
    } else if (!isValidEmail(formValues.email)) {
      addErrorMessage(contactForm.querySelector('[name="email"]'), 'Please enter a valid email address');
      isValid = false;
    }
    
    return isValid;
  }
  
  /**
   * Add error message below a form field
   * @param {HTMLElement} field - The form field
   * @param {string} message - The error message
   */
  function addErrorMessage(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.fontSize = 'var(--fs-xxs)';
    errorElement.style.marginTop = '4px';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
    field.style.borderColor = 'var(--color-error)';
    
    // Remove error styling on input
    field.addEventListener('input', () => {
      field.style.borderColor = '';
      const error = field.parentNode.querySelector('.error-message');
      if (error) {
        error.remove();
      }
    });
  }
  
  /**
   * Validate email format
   * @param {string} email - The email to validate
   * @returns {boolean} Whether the email is valid
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Show form submission feedback
   * @param {boolean} success - Whether the submission was successful
   */
  function showSubmissionFeedback(success) {
    // Check if feedback already exists and remove it
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
      existingFeedback.remove();
    }
    
    // Create feedback element
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'form-feedback';
    
    if (success) {
      feedbackElement.textContent = 'Thank you for your message! We will get back to you soon.';
      feedbackElement.style.backgroundColor = 'var(--color-success)';
    } else {
      feedbackElement.textContent = 'There was an error sending your message. Please try again.';
      feedbackElement.style.backgroundColor = 'var(--color-error)';
    }
    
    // Style the feedback
    feedbackElement.style.color = 'white';
    feedbackElement.style.padding = 'var(--spacing-sm)';
    feedbackElement.style.borderRadius = 'var(--border-radius-md)';
    feedbackElement.style.marginTop = 'var(--spacing-md)';
    
    // Add to the DOM before the form
    contactForm.parentNode.insertBefore(feedbackElement, contactForm);
    
    // Remove the feedback after 5 seconds
    setTimeout(() => {
      feedbackElement.style.opacity = '0';
      feedbackElement.style.transition = 'opacity 0.5s';
      
      setTimeout(() => {
        feedbackElement.remove();
      }, 500);
    }, 5000);
  }
}