// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.sm\\:hidden button');
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'sm:hidden hidden';
    mobileMenu.innerHTML = `
        <div class="pt-2 pb-3 space-y-1">
            <a href="#" class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Home</a>
            <a href="#clubs" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Clubs</a>
            <a href="#events" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Events</a>
            <a href="#about" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">About</a>
            <div class="mt-4 pl-3">
                <button onclick="openModal('login-modal')" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">Login</button>
            </div>
        </div>
    `;
    
    // Insert mobile menu after the navigation
    document.querySelector('nav').insertAdjacentElement('afterend', mobileMenu);
    
    mobileMenuButton.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal functionality
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Re-enable scrolling
    };

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    });

    // Enhanced event details function
    window.showEventDetails = function(eventId) {
        const eventData = {
            'codestorm': {
                title: 'CodeStorm 2025',
                description: 'A 24-hour coding sprint featuring challenges across multiple domains including web development, AI, and blockchain. Perfect for beginners and experts alike!',
                date: 'January 15-16, 2025',
                time: '9:00 AM to 9:00 AM (24 hours)',
                location: 'Tech Innovation Center, Room 101',
                requirements: 'Bring your laptop, charger, and creativity! Food and drinks will be provided.',
                contact: 'codingclub@campusbuzz.edu'
            },
            'code-battles': {
                title: 'Weekly Code Battles',
                description: 'Competitive problem-solving sessions where you can test your skills against peers. Problems range from easy to hard, covering data structures and algorithms.',
                date: 'Every Wednesday',
                time: '4:00 PM - 6:00 PM',
                location: 'Computer Lab 3',
                requirements: 'Basic programming knowledge recommended',
                contact: 'prof.smith@campusbuzz.edu'
            },
            'football-league': {
                title: 'Intra-College Football League',
                description: 'Inter-departmental football competition with exciting prizes for the winning team. All skill levels welcome!',
                date: 'Starting February 1, 2025',
                time: '3:00 PM - 6:00 PM (Weekdays)',
                location: 'College Sports Ground',
                requirements: 'Sports attire and shoes required',
                contact: 'sportsclub@campusbuzz.edu'
            }
        };

        const event = eventData[eventId] || {
            title: 'Event Details',
            description: 'Details for this event will be available soon!'
        };

        // Create or update modal
        let modal = document.getElementById('event-details-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'event-details-modal';
            modal.className = 'modal fixed inset-0 z-50 hidden bg-gray-800 bg-opacity-50';
            modal.innerHTML = `
                <div class="flex items-center justify-center h-full">
                    <div class="bg-white rounded-lg p-6 w-11/12 md:w-96 max-h-[90vh] overflow-y-auto">
                        <div class="flex justify-between items-start">
                            <h2 class="text-lg font-bold mb-4">${event.title}</h2>
                            <button onclick="closeModal('event-details-modal')" class="text-gray-500 hover:text-gray-700">&times;</button>
                        </div>
                        <div class="event-content">
                            <p class="mb-4">${event.description}</p>
                            ${event.date ? `<p><strong>Date:</strong> ${event.date}</p>` : ''}
                            ${event.time ? `<p><strong>Time:</strong> ${event.time}</p>` : ''}
                            ${event.location ? `<p><strong>Location:</strong> ${event.location}</p>` : ''}
                            ${event.requirements ? `<p><strong>Requirements:</strong> ${event.requirements}</p>` : ''}
                            ${event.contact ? `<p class="mt-4"><strong>Contact:</strong> ${event.contact}</p>` : ''}
                        </div>
                        <div class="mt-6 text-center">
                            <button onclick="closeModal('event-details-modal')" class="bg-indigo-600 text-white px-4 py-2 rounded-md">Close</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        } else {
            modal.querySelector('h2').textContent = event.title;
            modal.querySelector('.event-content').innerHTML = `
                <p class="mb-4">${event.description}</p>
                ${event.date ? `<p><strong>Date:</strong> ${event.date}</p>` : ''}
                ${event.time ? `<p><strong>Time:</strong> ${event.time}</p>` : ''}
                ${event.location ? `<p><strong>Location:</strong> ${event.location}</p>` : ''}
                ${event.requirements ? `<p><strong>Requirements:</strong> ${event.requirements}</p>` : ''}
                ${event.contact ? `<p class="mt-4"><strong>Contact:</strong> ${event.contact}</p>` : ''}
            `;
        }

        openModal('event-details-modal');
    };

    // Responsive adjustments
    function handleResize() {
        // Adjust card layout for smaller screens
        if (window.innerWidth < 640) {
            document.querySelectorAll('.club-card').forEach(card => {
                card.style.minHeight = 'auto';
            });
        } else {
            document.querySelectorAll('.club-card').forEach(card => {
                card.style.minHeight = '380px';
            });
        }
    }

    // Initial call and event listener for resize
    handleResize();
    window.addEventListener('resize', handleResize);
});