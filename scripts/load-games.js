/**
 * Games Loader - Dynamically loads games from games.json
 */

/**
 * Fetches games data from JSON file
 * @returns {Promise<object>} Games data
 */
async function fetchGames() {
    try {
        const response = await fetch('data/games.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching games:', error);
        return { games: [] };
    }
}

/**
 * Creates a project card HTML element
 * @param {object} game - Game object
 * @returns {string} HTML string for project card
 */
function createProjectCard(game) {
    const platformIcons = [];
    if (game.platforms.windows) platformIcons.push('🪟');
    if (game.platforms.mac) platformIcons.push('🍎');
    if (game.platforms.linux) platformIcons.push('🐧');
    if (game.platforms.android) platformIcons.push('📱');
    
    const platformText = platformIcons.length > 0 
        ? platformIcons.join(' ') 
        : 'Web';
    
    const techTags = game.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    
    return `
        <div class="project-card">
            <div class="project-image">
                ${game.coverUrl 
                    ? `<img src="${game.coverUrl}" alt="${game.title}" loading="lazy">` 
                    : `<div style="font-size: 4rem; padding: 2rem;">🎮</div>`
                }
            </div>
            <div class="project-content">
                <h3>${game.title}</h3>
                <div class="project-platform">
                    <a href="${game.url}" target="_blank" rel="noopener noreferrer">
                        ${platformText} Itch.io'da Görüntüle
                    </a>
                </div>
                <p>${game.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
                ${game.stats.downloads > 0 || game.stats.views > 0 ? `
                    <div class="project-stats" style="margin-top: 1rem; font-size: 0.9rem; color: var(--gray);">
                        ${game.stats.downloads > 0 ? `📥 ${game.stats.downloads} indirme` : ''}
                        ${game.stats.downloads > 0 && game.stats.views > 0 ? ' • ' : ''}
                        ${game.stats.views > 0 ? `👁️ ${game.stats.views} görüntülenme` : ''}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Renders all games to the projects grid
 * @param {Array} games - Array of game objects
 */
function renderGames(games) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) {
        console.error('Projects grid element not found');
        return;
    }
    
    if (games.length === 0) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="font-size: 1.2rem; color: var(--gray);">
                    Henüz oyun yüklenmedi. Lütfen daha sonra tekrar kontrol edin.
                </p>
            </div>
        `;
        return;
    }
    
    const cardsHTML = games.map(game => createProjectCard(game)).join('');
    projectsGrid.innerHTML = cardsHTML;
    
    // Reinitialize scroll animations for new cards
    if (typeof initializeScrollAnimations === 'function') {
        initializeScrollAnimations();
    }
    
    // Reinitialize image loading for new images
    if (typeof initializeImageLoading === 'function') {
        initializeImageLoading();
    }
    
    console.log(`✅ Rendered ${games.length} games`);
}

/**
 * Updates the last updated timestamp in the UI
 * @param {string} timestamp - ISO timestamp
 */
function updateLastUpdatedTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const formattedDate = date.toLocaleDateString('tr-TR', options);
    
    // You can add this to your HTML if you want to display it
    console.log(`📅 Games last updated: ${formattedDate}`);
}

/**
 * Initializes the games loader
 */
async function initializeGamesLoader() {
    const data = await fetchGames();
    
    if (data.lastUpdated) {
        updateLastUpdatedTimestamp(data.lastUpdated);
    }
    
    // Sort games by view count (highest first)
    const sortedGames = (data.games || []).sort((a, b) => b.stats.views - a.stats.views);
    
    renderGames(sortedGames);
}

// Load games when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGamesLoader);
} else {
    initializeGamesLoader();
}
