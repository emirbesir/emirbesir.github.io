/**
 * Unity Developer Portfolio - Main JavaScript
 * Handles JSON fetching, dynamic rendering, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    fetchProjects();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-triggered fade-in animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections and elements with fade-in class
    document.querySelectorAll('section, .fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Fetch and render projects from JSON
 */
async function fetchProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        renderProjectsError();
    }
}

/**
 * Render project cards to the DOM
 */
function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');

    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        grid.appendChild(card);
    });

    // Re-observe new cards for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Create a single project card element
 */
function createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;

    if (project.featured) {
        card.classList.add('featured');
    }

    const tagsHTML = project.tags
        .map(tag => `<span class="project-tag">${tag}</span>`)
        .join('');

    const linksHTML = generateProjectLinks(project.links);

    card.innerHTML = `
        <div class="project-image">
            <img src="${project.thumbnail}" alt="${project.title} thumbnail" 
                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22><rect fill=%22%231a1a2e%22 width=%22400%22 height=%22225%22/><text x=%22200%22 y=%22120%22 fill=%22%2300d4ff%22 font-family=%22sans-serif%22 font-size=%2220%22 text-anchor=%22middle%22>${project.title}</text></svg>'">
            ${project.featured ? '<span class="featured-badge"><i class="fas fa-star"></i> Featured</span>' : ''}
        </div>
        <div class="project-content">
            <div class="project-tags">${tagsHTML}</div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-links">${linksHTML}</div>
        </div>
    `;

    return card;
}

/**
 * Generate link buttons for a project
 */
function generateProjectLinks(links) {
    const linkConfigs = [
        { key: 'play', icon: 'fas fa-play', label: 'Oyna' },
        { key: 'code', icon: 'fab fa-github', label: 'Kod' },
        { key: 'video', icon: 'fab fa-youtube', label: 'Video' }
    ];

    return linkConfigs
        .filter(config => links[config.key])
        .map(config => `
            <a href="${links[config.key]}" target="_blank" rel="noopener" 
               class="project-link project-link--${config.key}">
                <i class="${config.icon}"></i>
                <span>${config.label}</span>
            </a>
        `)
        .join('');
}

/**
 * Display error message if projects fail to load
 */
function renderProjectsError() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = `
        <div class="projects-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unable to load projects. Please try again later.</p>
        </div>
    `;
}
