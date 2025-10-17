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
            updateFilterBadge();
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
            updateFilterBadge();
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
// Image Loading States
// ========================================

/**
 * Adds loading states to project images
 */
function initializeImageLoading() {
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        const container = img.parentElement;
        
        // Add loading class
        container.classList.add('loading');
        
        // Remove loading class when image loads
        if (img.complete) {
            container.classList.remove('loading');
        } else {
            img.addEventListener('load', () => {
                container.classList.remove('loading');
            });
            
            img.addEventListener('error', () => {
                container.classList.remove('loading');
            });
        }
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
// Active Navigation Section Highlighting
// ========================================

/**
 * Highlights the active navigation link based on scroll position
 */
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const observerOptions = {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current section link
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ========================================
// Mobile Navigation
// ========================================

/**
 * Initializes mobile hamburger menu functionality
 */
function initializeMobileMenu() {
    const nav = document.querySelector('nav');
    const navUl = nav.querySelector('ul');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menüyü aç');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    nav.insertBefore(hamburger, navUl);
    
    // Toggle menu
    hamburger.addEventListener('click', () => {
        const isOpen = navUl.classList.toggle('mobile-open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu when link is clicked
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('mobile-open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Menüyü aç');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navUl.classList.contains('mobile-open')) {
            navUl.classList.remove('mobile-open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Menüyü aç');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// Theme Switcher
// ========================================

/**
 * Initializes theme switcher functionality
 */
function initializeThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const themeDropdown = document.getElementById('themeDropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Load saved theme from localStorage (with fallback for old theme names)
    let savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    // Handle legacy theme names (red, blue, green -> dark)
    if (['red', 'blue', 'green'].includes(savedTheme)) {
        savedTheme = 'dark';
    }
    applyTheme(savedTheme);
    
    // Toggle dropdown
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = themeDropdown.classList.toggle('show');
        themeToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!document.getElementById('themeSwitcher').contains(e.target)) {
            themeDropdown.classList.remove('show');
            themeToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            applyTheme(theme);
            
            // Update active state
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Close dropdown
            themeDropdown.classList.remove('show');
            themeToggle.setAttribute('aria-expanded', 'false');
            
            // Save to localStorage
            localStorage.setItem('portfolio-theme', theme);
        });
        
        // Keyboard navigation
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                option.click();
            }
        });
    });
}

/**
 * Applies the selected theme
 * @param {string} theme - Theme name (dark, light)
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Update active state in dropdown
    document.querySelectorAll('.theme-option').forEach(option => {
        if (option.getAttribute('data-theme') === theme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// ========================================
// Filter Counter Badge
// ========================================

/**
 * Updates the filter counter badge showing active filters
 */
function updateFilterBadge() {
    let activeFiltersCount = 0;
    let filterText = '';
    
    if (activeCategory !== 'all') {
        activeFiltersCount++;
        const categoryBtn = document.querySelector(`[data-category="${activeCategory}"]`);
        filterText = categoryBtn ? categoryBtn.textContent : activeCategory;
    }
    
    if (activeTech !== 'all') {
        activeFiltersCount++;
        if (filterText) filterText += ', ';
        filterText += activeTech;
    }
    
    let badge = document.getElementById('filterBadge');
    
    if (activeFiltersCount > 0) {
        if (!badge) {
            badge = document.createElement('div');
            badge.id = 'filterBadge';
            badge.className = 'filter-badge';
            document.querySelector('.filter-section').prepend(badge);
        }
        badge.innerHTML = `
            <span class="filter-badge-icon">🔍</span>
            <span class="filter-badge-text">${activeFiltersCount} filtre aktif: ${filterText}</span>
            <button class="filter-badge-clear" aria-label="Tüm filtreleri temizle">✕</button>
        `;
        
        // Add clear button functionality
        badge.querySelector('.filter-badge-clear').addEventListener('click', clearAllFilters);
    } else if (badge) {
        badge.remove();
    }
}

/**
 * Clears all active filters
 */
function clearAllFilters() {
    // Reset category
    activeCategory = 'all';
    document.querySelectorAll('#categoryFilters .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-category="all"]').classList.add('active');
    
    // Reset technology
    activeTech = 'all';
    document.getElementById('selectedTechText').textContent = 'Tümü';
    document.querySelectorAll('.tech-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.querySelector('[data-tech="all"]').classList.add('selected');
    
    // Update display
    filterProjects();
    updateFilterBadge();
}

// ========================================
// Project Card Animations
// ========================================

/**
 * Adds staggered animation delays to project cards
 */
function initializeProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ========================================
// Initialization
// ========================================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeSwitcher();
    createTechDropdown();
    initializeDropdown();
    initializeCategoryFilters();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeBackToTop();
    initializeScrollSpy();
    initializeMobileMenu();
    initializeImageLoading();
    updateFilterBadge();
    initializeProjectCardAnimations();
});
