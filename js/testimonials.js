// Testimonials Slider Logic

/**
 * Initialize testimonials functionality
 */
export function initTestimonials() {
  const testimonialSlider = document.getElementById('testimonialSlider');
  const sliderDots = document.getElementById('sliderDots');
  const prevButton = document.getElementById('prevSlide');
  const nextButton = document.getElementById('nextSlide');
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "Five Star Tinting did an amazing job on my Tesla. Their ceramic tint keeps the car much cooler and the UV protection is great for our hot climate. Highly recommend their services!",
      author: "Michael R.",
      rating: 5
    },
    {
      id: 2,
      quote: "I had my SUV's windows tinted here and couldn't be happier with the results. The staff was professional, the installation was flawless, and the pricing was competitive.",
      author: "Sarah J.",
      rating: 5
    },
    {
      id: 3,
      quote: "After getting quotes from multiple shops, I chose Five Star and they delivered beyond my expectations. Clean installation and excellent customer service from start to finish.",
      author: "David T.",
      rating: 5
    },
    {
      id: 4,
      quote: "The quality of work here is exceptional. They took the time to explain all the different film options and helped me choose the right one for my needs. Very satisfied customer!",
      author: "Jennifer M.",
      rating: 5
    }
  ];
  
  let currentSlide = 0;
  let autoPlayTimer = null;
  
  // Create testimonial slides
  function createTestimonials() {
    // Clear slider
    testimonialSlider.innerHTML = '';
    sliderDots.innerHTML = '';
    
    // Create testimonial slides
    testimonials.forEach((testimonial, index) => {
      // Create testimonial slide
      const slide = document.createElement('div');
      slide.className = `testimonial-slide ${index === 0 ? 'active' : ''}`;
      
      // Generate stars based on rating
      const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
      
      slide.innerHTML = `
        <div class="testimonial-quote">${testimonial.quote}</div>
        <div class="testimonial-author">${testimonial.author}</div>
        <div class="testimonial-rating">${stars}</div>
      `;
      
      testimonialSlider.appendChild(slide);
      
      // Create dot for this slide
      const dot = document.createElement('span');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(index));
      sliderDots.appendChild(dot);
    });
  }
  
  // Go to specific slide
  function goToSlide(index) {
    // Reset auto-play timer
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    }
    
    // Update slide classes
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    const dots = sliderDots.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    // Handle loop
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  // Next slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  // Previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  // Start auto-play
  function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
  
  // Add event listeners to buttons
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);
  
  // Create testimonials
  createTestimonials();
  
  // Start auto-play
  startAutoPlay();
  
  // Commented out mouseenter/mouseleave event listeners
  /*
  // Pause auto-play when hovering over slider
  testimonialSlider.addEventListener('mouseenter', () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  });
  
  // Resume auto-play when mouse leaves slider
  testimonialSlider.addEventListener('mouseleave', () => {
    if (!autoPlayTimer) {
      startAutoPlay();
    }
  });
  */
}