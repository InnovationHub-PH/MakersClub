// Gallery Logic

/**
 * Initialize the gallery functionality
 */
export function initGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  // const modal = document.getElementById('galleryModal');
  // const modalImg = document.getElementById('modalImage');
  // const modalCaption = document.getElementById('modalCaption');
  // const closeModal = document.querySelector('.modal-close');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // Gallery items data
  const galleryItems = [
    {
      id: 1,
      category: 'sedan',
      image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Luxury Sedan with Premium Ceramic Tint'
    },
    {
      id: 2,
      category: 'suv',
      image: 'https://images.pexels.com/photos/12766657/pexels-photo-12766657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'SUV with Full Window Tinting'
    },
    {
      id: 3,
      category: 'luxury',
      image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Premium Sports Car with Nano-Ceramic Film'
    },
    {
      id: 4,
      category: 'sedan',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Sedan with Dark Smoke Tint'
    },
    {
      id: 5,
      category: 'luxury',
      image: 'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Luxury Vehicle with Heat Rejection Tint'
    },
    {
      id: 6,
      category: 'suv',
      image: 'https://images.pexels.com/photos/2127025/pexels-photo-2127025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'SUV with Privacy Window Film'
    }
  ];
  
  // Populate gallery
  function populateGallery(items) {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    items.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.dataset.category = item.category;
      
      galleryItem.innerHTML = `
        <img src="${item.image}" alt="${item.caption}" class="gallery-img">
        <div class="gallery-overlay">
          <div class="gallery-caption">${item.caption}</div>
        </div>
      `;
      
      // Commented out modal functionality
      /*
      galleryItem.addEventListener('click', () => {
        openModal(item.image, item.caption);
      });
      */
      
      galleryGrid.appendChild(galleryItem);
    });
  }
  
  // Filter gallery
  function filterGallery(category) {
    const filteredItems = category === 'all' 
      ? galleryItems 
      : galleryItems.filter(item => item.category === category);
    
    populateGallery(filteredItems);
  }
  
  // Commented out modal functions
  /*
  // Open modal
  function openModal(src, caption) {
    modal.style.display = 'flex';
    modalImg.src = src;
    modalCaption.textContent = caption;
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  // Close modal
  function closeModalFunc() {
    modal.style.display = 'none';
    
    // Re-enable body scrolling
    document.body.style.overflow = '';
  }
  
  // Add click event to close button
  closeModal.addEventListener('click', closeModalFunc);
  
  // Close modal when clicking outside the image
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModalFunc();
    }
  });
  
  // Close modal with ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      closeModalFunc();
    }
  });
  */
  
  // Filter button events
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter gallery
      const category = button.dataset.filter;
      filterGallery(category);
    });
  });
  
  // Initial gallery population
  populateGallery(galleryItems);
}