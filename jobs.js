// Sample job data - Replace with your actual job data
const jobs = [
    {
        title: 'Robotics Engineer',
        company: 'Tech Dynamics',
        location: 'San Francisco, CA',
        remote: false,
        tags: ['robotics', 'hardware'],
        description: 'Looking for a robotics engineer to join our R&D team...'
    },
    {
        title: 'Software Developer',
        company: 'Remote Robotics',
        location: 'Remote',
        remote: true,
        tags: ['software', 'robotics'],
        description: 'Developing control systems for autonomous robots...'
    },
    {
        title: 'Mechatronics Intern',
        company: 'Innovation Labs',
        location: 'Boston, MA',
        remote: false,
        tags: ['internship', 'hardware', 'software'],
        description: 'Summer internship opportunity in our robotics division...'
    },
    {
        title: 'Control Systems Engineer',
        company: 'Virtual Mechanics',
        location: 'Remote',
        remote: true,
        tags: ['software', 'hardware'],
        description: 'Design and implement control systems for industrial robots...'
    }
];

// State
let activeFilters = new Set();
let remoteOnly = false;

// DOM Elements
const jobsList = document.getElementById('jobsList');
const tagButtons = document.querySelectorAll('.tag-btn');
const remoteToggle = document.getElementById('remoteToggle');

// Functions
function createJobCard(job) {
    return `
        <div class="job-card">
            <h3>${job.title}</h3>
            <h4>${job.company}</h4>
            <p class="location">${job.location}</p>
            <div class="tags">
                ${job.tags.map(tag => `<span class="tag">${tag.toUpperCase()}</span>`).join('')}
            </div>
            <p class="description">${job.description}</p>
            <a href="#" class="apply-btn">APPLY NOW</a>
        </div>
    `;
}

function filterJobs() {
    const filteredJobs = jobs.filter(job => {
        if (remoteOnly && !job.remote) return false;
        if (activeFilters.size === 0) return true;
        return job.tags.some(tag => activeFilters.has(tag));
    });

    jobsList.innerHTML = filteredJobs.map(createJobCard).join('');
}

// Event Listeners
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
        filterJobs();
    });
});

remoteToggle.addEventListener('change', () => {
    remoteOnly = remoteToggle.checked;
    filterJobs();
});

// Initial render
filterJobs();