/**
 * Unity Developer Portfolio - Main JavaScript
 * Handles JSON fetching, dynamic rendering, i18n, and UI interactions
 */

let translations = {};

document.addEventListener('DOMContentLoaded', async () => {
    await fetchTranslations();
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initThemeToggle();
    initLanguageToggle();
    fetchProjects();
});

/**
 * Fetch translations from config file
 */
async function fetchTranslations() {
    try {
        const response = await fetch('data/translations.json');
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

/**
 * Get current language
 */
function getCurrentLang() {
    return localStorage.getItem('lang') || 'en';
}

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
    grid.innerHTML = '';

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

    const lang = getCurrentLang();
    const t = translations[lang] || {};
    const description = lang === 'tr' && project.description_tr
        ? project.description_tr
        : project.description;
    const featuredLabel = t['projects.featured'] || 'Featured';

    const tagsHTML = project.tags
        .map(tag => `<span class="project-tag">${tag}</span>`)
        .join('');

    const linksHTML = generateProjectLinks(project.links);

    card.innerHTML = `
        <div class="project-image">
            <img src="${project.thumbnail}" alt="${project.title} thumbnail"
                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22><rect fill=%22%231a1a2e%22 width=%22400%22 height=%22225%22/><text x=%22200%22 y=%22120%22 fill=%22%2300d4ff%22 font-family=%22sans-serif%22 font-size=%2220%22 text-anchor=%22middle%22>${project.title}</text></svg>'">
            ${project.featured ? `<span class="featured-badge"><i class="fas fa-star"></i> ${featuredLabel}</span>` : ''}
        </div>
        <div class="project-content">
            <div class="project-tags">${tagsHTML}</div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${description}</p>
            <div class="project-links">${linksHTML}</div>
        </div>
    `;

    return card;
}

/**
 * Generate link buttons for a project
 */
function generateProjectLinks(links) {
    const lang = getCurrentLang();
    const t = translations[lang] || {};

    const linkConfigs = [
        { key: 'play', icon: 'fas fa-play', label: t['projects.play'] || 'Play' },
        { key: 'code', icon: 'fab fa-github', label: t['projects.code'] || 'Code' },
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

/**
 * Theme toggle functionality
 */
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const icon = toggle.querySelector('i');

    // Update icon based on current theme
    function updateIcon() {
        const isLight = document.documentElement.classList.contains('light-theme');
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Initialize icon on load
    updateIcon();

    // Handle toggle click
    toggle.addEventListener('click', () => {
        // Add transition class for smooth animation
        document.body.classList.add('theme-transitioning');

        // Toggle theme
        document.documentElement.classList.toggle('light-theme');

        // Save preference
        const isLight = document.documentElement.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');

        // Update icon
        updateIcon();

        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    });
}

/**
 * Language toggle functionality
 */
function initLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    const label = toggle.querySelector('.lang-label');

    function updateLabel() {
        // Show the OTHER language (what you'd switch to)
        label.textContent = getCurrentLang() === 'en' ? 'TR' : 'EN';
    }

    function applyTranslations(lang) {
        document.documentElement.lang = lang;
        const t = translations[lang];
        if (!t) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.textContent = t[key];
        });

        // Swap CV download link
        const cvLink = document.getElementById('cvLink');
        if (cvLink) {
            cvLink.href = lang === 'tr'
                ? 'assets/Emir_Beşir_CV.pdf'
                : 'assets/Emir_Besir_CV_EN.pdf';
        }
    }

    // Initialize
    const lang = getCurrentLang();
    applyTranslations(lang);
    updateLabel();

    // Handle toggle click
    toggle.addEventListener('click', () => {
        const newLang = getCurrentLang() === 'en' ? 'tr' : 'en';
        localStorage.setItem('lang', newLang);
        applyTranslations(newLang);
        updateLabel();
        // Re-render projects with new language descriptions
        fetchProjects();
    });
}
