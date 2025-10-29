/**
 * Games Loader - Dynamically loads games from games.json
 */

/**
 * Fetches games data from JSON file with retry logic
 * @param {number} retries - Number of retry attempts
 * @returns {Promise<object>} Games data
 */
async function fetchGamesWithRetry(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch('data/games.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Validate data structure
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid data format');
            }
            
            return data;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            
            // If this was the last retry, throw the error
            if (i === retries - 1) {
                throw error;
            }
            
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

/**
 * Legacy function for backward compatibility
 * @returns {Promise<object>} Games data
 */
async function fetchGames() {
    try {
        return await fetchGamesWithRetry();
    } catch (error) {
        console.error('Error fetching games:', error);
        return { 
            games: [], 
            error: true,
            errorMessage: error.message 
        };
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
                <p>${game.description}</p>
                ${game.stats.downloads > 0 || game.stats.views > 0 ? `
                    <div class="project-stats" aria-label="Oyun istatistikleri" style="margin-top: 1rem; font-size: 0.9rem; color: var(--gray);">
                        ${platformText}
                        ${(game.stats.downloads > 0 || game.stats.views > 0) && platformIcons.length > 0 ? ' • ' : ''}
                        ${game.stats.downloads > 0 ? `<span aria-label="${game.stats.downloads} indirme">📥 ${game.stats.downloads} indirme</span>` : ''}
                        ${game.stats.downloads > 0 && game.stats.views > 0 ? ' • ' : ''}
                        ${game.stats.views > 0 ? `<span aria-label="${game.stats.views} görüntülenme">👁️ ${game.stats.views} görüntülenme</span>` : ''}
                    </div>
                ` : ''}
                <a href="${game.url}" class="btn" target="_blank" rel="noopener noreferrer">Oyna (Itch.io)</a>
            </div>
        </div>
    `;
}

/**
 * Renders all games to the projects grid
 * @param {Array} games - Array of game objects
 * @param {boolean} hasError - Whether there was an error loading games
 */
function renderGames(games, hasError = false) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) {
        console.error('Projects grid element not found');
        return;
    }
    
    if (hasError) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="font-size: 1.2rem; color: var(--red); margin-bottom: 1rem;">
                    ⚠️ Oyunlar yüklenirken bir hata oluştu
                </p>
                <p style="font-size: 1rem; color: var(--gray); margin-bottom: 1.5rem;">
                    Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
                </p>
                <button onclick="location.reload()" class="btn" style="cursor: pointer;">
                    🔄 Sayfayı Yenile
                </button>
            </div>
        `;
        return;
    }
    
    if (games.length === 0) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="font-size: 1.2rem; color: var(--gray);">
                    📦 Henüz oyun yüklenmedi. Lütfen daha sonra tekrar kontrol edin.
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
    
    // Check for errors
    if (data.error) {
        renderGames([], true);
        return;
    }
    
    if (data.lastUpdated) {
        updateLastUpdatedTimestamp(data.lastUpdated);
    }
    
    // Sort games by view count (highest first)
    const sortedGames = (data.games || []).sort((a, b) => b.stats.views - a.stats.views);
    
    renderGames(sortedGames, false);
}

// Load games when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGamesLoader);
} else {
    initializeGamesLoader();
}
