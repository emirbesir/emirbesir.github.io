const https = require('https');
const fs = require('fs');
const path = require('path');

// Get API key from environment variable
const API_KEY = process.env.ITCH_API_KEY;

if (!API_KEY) {
    console.error('❌ ITCH_API_KEY environment variable is not set');
    process.exit(1);
}

const API_URL = `https://itch.io/api/1/${API_KEY}/my-games`;
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'games.json');

/**
 * Makes an HTTPS GET request
 * @param {string} url - The URL to fetch
 * @returns {Promise<object>} The parsed JSON response
 */
function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (error) {
                        reject(new Error(`Failed to parse JSON: ${error.message}`));
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

/**
 * Categorizes a game based on its title and tags
 * @param {object} game - The game object from itch.io
 * @returns {string} Category: 'published', 'course', 'gamejam', 'clone', or 'prototype'
 */
function categorizeGame(game) {
    const title = game.title.toLowerCase();
    const shortText = (game.short_text || '').toLowerCase();
    
    // Check for game jam games
    if (title.includes('jam') || shortText.includes('game jam')) {
        return 'gamejam';
    }
    
    // Check for course games
    if (title.includes('course') || shortText.includes('course')) {
        return 'course';
    }
    
    // Check for clones
    if (title.includes('clone') || shortText.includes('clone')) {
        return 'clone';
    }
    
    // Check for prototypes/tools
    if (title.includes('prototype') || title.includes('tool') || 
        shortText.includes('prototype') || shortText.includes('tool')) {
        return 'prototype';
    }
    
    // Default to published if it has significant downloads/views
    if (game.downloads_count > 10 || game.views_count > 100) {
        return 'published';
    }
    
    return 'prototype';
}

/**
 * Extracts technologies used from game description/tags
 * @param {object} game - The game object from itch.io
 * @returns {Array<string>} Array of technology names
 */
function extractTechnologies(game) {
    const technologies = new Set(['Unity', 'C#']); // Default technologies
    
    const text = `${game.title} ${game.short_text || ''}`.toLowerCase();
    
    // Common game development technologies
    const techKeywords = {
        '2d': '2D',
        '3d': '3D',
        'multiplayer': 'Multiplayer',
        'ai': 'AI',
        'procedural': 'Procedural Generation',
        'physics': 'Physics',
        'vr': 'VR',
        'mobile': 'Mobile',
        'web': 'WebGL',
        'shader': 'Shaders',
        'networked': 'Networking',
        'pixel': 'Pixel Art'
    };
    
    for (const [keyword, tech] of Object.entries(techKeywords)) {
        if (text.includes(keyword)) {
            technologies.add(tech);
        }
    }
    
    return Array.from(technologies);
}

/**
 * Transforms itch.io game data to portfolio format
 * @param {object} game - Raw game object from itch.io
 * @returns {object} Formatted game object for portfolio
 */
function transformGame(game) {
    return {
        id: game.id,
        title: game.title,
        description: game.short_text || 'No description available',
        url: game.url,
        coverUrl: game.cover_url,
        category: categorizeGame(game),
        technologies: extractTechnologies(game),
        platforms: {
            windows: game.p_windows || false,
            mac: game.p_osx || false,
            linux: game.p_linux || false,
            android: game.p_android || false
        },
        stats: {
            downloads: game.downloads_count || 0,
            views: game.views_count || 0
        },
        published: game.published,
        publishedAt: game.published_at,
        createdAt: game.created_at,
        minPrice: game.min_price || 0
    };
}

/**
 * Main function to fetch and save games
 */
async function main() {
    try {
        console.log('🎮 Fetching games from Itch.io...');
        
        const response = await fetchData(API_URL);
        
        if (response.errors) {
            console.error('❌ API Error:', response.errors);
            process.exit(1);
        }
        
        if (!response.games || response.games.length === 0) {
            console.log('⚠️  No games found');
            process.exit(0);
        }
        
        console.log(`✅ Found ${response.games.length} games`);
        
        // Transform games to portfolio format
        const transformedGames = response.games
            .filter(game => game.published) // Only include published games
            .map(transformGame);
        
        // Create data directory if it doesn't exist
        const dataDir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        // Save games data
        const output = {
            lastUpdated: new Date().toISOString(),
            totalGames: transformedGames.length,
            games: transformedGames
        };
        
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
        
        console.log(`✅ Saved ${transformedGames.length} games to ${OUTPUT_FILE}`);
        
        // Print summary
        const categoryCounts = {};
        transformedGames.forEach(game => {
            categoryCounts[game.category] = (categoryCounts[game.category] || 0) + 1;
        });
        
        console.log('\n📊 Summary:');
        Object.entries(categoryCounts).forEach(([category, count]) => {
            console.log(`   ${category}: ${count}`);
        });
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
