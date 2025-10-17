/**
 * Portfolio JavaScript - Emir Beşir
 * Handles project filtering, animations, and interactions
 */

// ========================================
// Global State Variables
// ========================================
let activeCategory = 'all';
let activeTech = 'all';

// ========================================
// Project Filtering
// ========================================

/**
 * Filters projects based on active category and technology
 * Updates screen reader announcement with visible count
 */
function filterProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    let visibleCount = 0;

    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.trim());

        const categoryMatch = activeCategory === 'all' || category === activeCategory;
        const techMatch = activeTech === 'all' || techTags.includes(activeTech);

        if (categoryMatch && techMatch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    // Announce to screen readers
    const announcement = document.getElementById('filterAnnouncement');
    if (announcement) {
        announcement.textContent = `${visibleCount} proje gösteriliyor`;
    }
}

/**
 * Collects all unique technologies from project cards
 * @returns {Array} Sorted array of unique technology names
 */
function collectUniqueTechnologies() {
    const techSet = new Set();
    const techTags = document.querySelectorAll('.tech-tag');

    techTags.forEach(tag => {
        const tech = tag.textContent.trim();
        techSet.add(tech);
    });

    return Array.from(techSet).sort();
}

/**
 * Creates and populates the technology dropdown menu
 */
function createTechDropdown() {
    const techOptionsContainer = document.getElementById('techOptionsContainer');
    const technologies = collectUniqueTechnologies();

    // Add "Tümü" (All) option
    const allOption = document.createElement('div');
    allOption.className = 'tech-option selected';
    allOption.setAttribute('data-tech', 'all');
    allOption.textContent = 'Tümü';
    techOptionsContainer.appendChild(allOption);

    // Create option for each unique technology
    technologies.forEach(tech => {
        const option = document.createElement('div');
        option.className = 'tech-option';
        option.setAttribute('data-tech', tech);
        option.textContent = tech;
        techOptionsContainer.appendChild(option);
    });
}

// ========================================
// Dropdown Functionality
// ========================================

/**
 * Initializes the technology dropdown with all event listeners
 */
function initializeDropdown() {
    const dropdownToggle = document.getElementById('techDropdownToggle');
    const dropdownMenu = document.getElementById('techDropdownMenu');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const techSearchBox = document.getElementById('techSearchBox');
    const selectedTechText = document.getElementById('selectedTechText');

    if (!dropdownToggle || !dropdownMenu) return;

    // Toggle dropdown on button click
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = dropdownMenu.classList.toggle('show');
        dropdownToggle.setAttribute('aria-expanded', isExpanded);
        dropdownArrow.classList.toggle('rotated');
        dropdownToggle.classList.toggle('active');

        // Focus search box when opening
        if (dropdownMenu.classList.contains('show')) {
            setTimeout(() => techSearchBox.focus(), 100);
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
            dropdownToggle.setAttribute('aria-expanded', 'false');
            dropdownArrow.classList.remove('rotated');
            dropdownToggle.classList.remove('active');
        }
    });

    // Search functionality
    techSearchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const options = document.querySelectorAll('.tech-option');

        options.forEach(option => {
            const techName = option.textContent.toLowerCase();
            if (techName.includes(searchTerm)) {
                option.classList.remove('hidden');
            } else {
                option.classList.add('hidden');
            }
        });
    });

    // Prevent dropdown from closing when clicking inside
    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Technology selection handler
    document.getElementById('techOptionsContainer').addEventListener('click', (e) => {
        if (e.target.classList.contains('tech-option')) {
            // Remove selected from all options
            document.querySelectorAll('.tech-option').forEach(opt => {
                opt.classList.remove('selected');
            });

            // Add selected to clicked option
            e.target.classList.add('selected');
            activeTech = e.target.getAttribute('data-tech');

            // Update button text
            selectedTechText.textContent = e.target.textContent;

            // Close dropdown
            dropdownMenu.classList.remove('show');
            dropdownToggle.setAttribute('aria-expanded', 'false');
            dropdownArrow.classList.remove('rotated');
            dropdownToggle.classList.remove('active');

            // Clear search
            techSearchBox.value = '';
            document.querySelectorAll('.tech-option').forEach(opt => {
                opt.classList.remove('hidden');
            });

            filterProjects();
        }
    });
}

// ========================================
// Category Filter Buttons
// ========================================

/**
 * Handles category filter button clicks
 */
function initializeCategoryFilters() {
    document.getElementById('categoryFilters').addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Remove active from all category buttons
            document.querySelectorAll('#categoryFilters .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active to clicked button
            e.target.classList.add('active');
            activeCategory = e.target.getAttribute('data-category');

            filterProjects();
        }
    });
}

// ========================================
// Smooth Scrolling
// ========================================

/**
 * Enables smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========================================
// Scroll Animations
// ========================================

/**
 * Initializes intersection observer for scroll animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('hidden')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ========================================
// Back to Top Button
// ========================================

/**
 * Handles back to top button visibility and functionality
 */
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Initialization
// ========================================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    createTechDropdown();
    initializeDropdown();
    initializeCategoryFilters();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeBackToTop();
});
