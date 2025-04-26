// Community member data
const communityMembers = [
  {
    name: 'TechLabs Manila',
    category: 'COMPANIES',
    website: 'https://techlabs.ph',
    email: 'contact@techlabs.ph',
    phone: '+63 2 8123 4567',
    facebook: 'https://facebook.com/techlabsmanila',
    tags: ['company', 'robotics', 'software'],
    profileImage: '/assets/images/placeholders/Stealth_No_Image.png',
    location: {
      lat: 14.5547,
      lng: 120.9947,
      address: 'Makati City, Philippines'
    }
  },
  {
    name: 'RoboCore Solutions',
    category: 'COMPANIES',
    website: 'https://robocore.ph',
    email: 'info@robocore.ph',
    phone: '+63 2 8234 5678',
    facebook: 'https://facebook.com/robocore',
    tags: ['company', 'robotics', 'hardware'],
    profileImage: '/assets/images/placeholders/Stealth_No_Image.png',
    location: {
      lat: 14.5580,
      lng: 120.9890,
      address: 'BGC, Taguig City, Philippines'
    }
  },
  {
    name: 'De La Salle University',
    category: 'EDUCATIONAL INSTITUTIONS',
    website: 'https://dlsu.edu.ph',
    email: 'info@dlsu.edu.ph',
    phone: '+63 2 8524 4611',
    facebook: 'https://facebook.com/dlsu',
    tags: ['education', 'robotics', 'research'],
    profileImage: 'https://placehold.co/80x80/252525/white?text=DLSU',
    location: {
      lat: 14.5648,
      lng: 120.9932,
      address: '2401 Taft Avenue, Manila'
    }
  },
  {
    name: 'Mapua University',
    category: 'EDUCATIONAL INSTITUTIONS',
    website: 'https://mapua.edu.ph',
    email: 'info@mapua.edu.ph',
    phone: '+63 2 8247 5000',
    facebook: 'https://facebook.com/mapua',
    tags: ['education', 'robotics', 'engineering'],
    profileImage: 'https://placehold.co/80x80/252525/white?text=MU',
    location: {
      lat: 14.5907,
      lng: 120.9748,
      address: 'Intramuros, Manila'
    }
  },
  {
    name: 'Jon Prado',
    category: 'INDIVIDUALS',
    website: 'https://jonprado.com',
    email: 'jon@example.com',
    phone: '+63 917 123 4567',
    facebook: 'https://facebook.com/jonprado',
    tags: ['individual', 'hardware', 'software'],
    profileImage: 'https://placehold.co/80x80/252525/white?text=JP',
    location: {
      lat: 14.5695,
      lng: 120.9822,
      address: 'Manila, Philippines'
    }
  },
  {
    name: 'Maria Santos',
    category: 'INDIVIDUALS',
    website: 'https://mariasantos.dev',
    email: 'maria@example.com',
    phone: '+63 918 234 5678',
    facebook: 'https://facebook.com/mariasantos',
    tags: ['individual', 'robotics', 'software'],
    profileImage: 'https://placehold.co/80x80/252525/white?text=MS',
    location: {
      lat: 14.5542,
      lng: 120.9965,
      address: 'Makati City, Philippines'
    }
  }
];

// Initialize map
const map = L.map('communityMap').setView([14.5995, 120.9842], 12);
const markers = new Map(); // Store markers by member name

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers for members with locations
communityMembers.forEach(member => {
  if (member.location) {
    const marker = L.marker([member.location.lat, member.location.lng])
      .bindPopup(`
        <strong>${member.name}</strong><br>
        ${member.location.address}
      `)
      .addTo(map);
    
    markers.set(member.name, marker);
    
    marker.on('click', () => {
      highlightMember(member.name);
    });
  }
});

// Search and filter functionality
const searchInput = document.getElementById('searchInput');
const tagButtons = document.querySelectorAll('.tag-btn');
let activeFilters = new Set();

function createMemberCard(member) {
  return `
    <div class="member-card" data-member="${member.name}" data-tags="${member.tags.join(' ')}">
      <div class="member-header">
        <img src="${member.profileImage}" alt="${member.name}" class="member-profile-image">
        <div class="member-title-info">
          <h3>${member.name}</h3>
          ${member.location ? `<p class="member-location">${member.location.address}</p>` : ''}
        </div>
      </div>
      <div class="member-info">
        ${member.website ? `<p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>` : ''}
        ${member.email ? `<p>Email: <a href="mailto:${member.email}">${member.email}</a></p>` : ''}
        ${member.phone ? `<p>Phone: <a href="tel:${member.phone}">${member.phone}</a></p>` : ''}
        ${member.facebook ? `<p>Facebook: <a href="${member.facebook}" target="_blank">${member.facebook.replace('https://facebook.com/', '@')}</a></p>` : ''}
      </div>
      <div class="member-tags">
        ${member.tags.map(tag => `<span class="tag">${tag.toUpperCase()}</span>`).join('')}
      </div>
    </div>
  `;
}

function highlightMember(memberName) {
  // Remove previous selection
  document.querySelectorAll('.member-card.selected').forEach(card => {
    card.classList.remove('selected');
  });
  
  // Add selection to new card
  const memberCard = document.querySelector(`.member-card[data-member="${memberName}"]`);
  if (memberCard) {
    memberCard.classList.add('selected');
    memberCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  // Update marker
  const marker = markers.get(memberName);
  if (marker) {
    marker.openPopup();
  }
}

function updateDirectory() {
  const searchTerm = searchInput.value.toLowerCase();
  
  // Clear existing content
  document.querySelectorAll('.member-grid').forEach(grid => {
    grid.innerHTML = '';
  });

  // Filter and display members
  communityMembers.forEach(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm) ||
                         member.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    const matchesFilters = activeFilters.size === 0 || 
                          member.tags.some(tag => activeFilters.has(tag));

    if (matchesSearch && matchesFilters) {
      const categoryDiv = Array.from(document.querySelectorAll('.directory-category')).find(
        categoryDiv => categoryDiv.querySelector('h2').textContent === member.category
      );
      if (categoryDiv) {
        const memberGrid = categoryDiv.querySelector('.member-grid');
        memberGrid.insertAdjacentHTML('beforeend', createMemberCard(member));
      }
    }
  });

  // Add click handlers to member cards
  document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', () => {
      const memberName = card.dataset.member;
      highlightMember(memberName);
    });
  });
}

// Category collapse functionality
document.querySelectorAll('.directory-category h2').forEach(header => {
  header.addEventListener('click', () => {
    const category = header.closest('.directory-category');
    category.classList.toggle('collapsed');
  });
});

// Event listeners
searchInput.addEventListener('input', updateDirectory);

tagButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tag = button.dataset.tag;
    if (activeFilters.has(tag)) {
      activeFilters.delete(tag);
      button.classList.remove('active');
    } else {
      activeFilters.add(tag);
      button.classList.add('active');
    }
    updateDirectory();
  });
});

// Initial render
updateDirectory();
