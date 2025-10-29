# Itch.io Games Automation Setup Guide

This portfolio automatically fetches your games from Itch.io daily using GitHub Actions.

## Setup Instructions

### 1. Add Your Itch.io API Key to GitHub Secrets

**IMPORTANT:** Your API key is stored securely in GitHub Secrets and will NOT be exposed in the source code.

1. Go to your GitHub repository: https://github.com/emirbesir/emirbesir.github.io
2. Click on **Settings** (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Set:
   - **Name:** `ITCH_API_KEY`
   - **Secret:** `Wj2BAsAXHZ5sNCVUYhC6Nw5efCM9AB4V22BOatjD`
6. Click **Add secret**

### 2. How It Works

The automation works in three steps:

1. **GitHub Actions Workflow** (`.github/workflows/fetch-games.yml`)
   - Runs daily at 2 AM UTC
   - Can also be triggered manually
   - Fetches your games from Itch.io using the API

2. **Fetch Script** (`scripts/fetch-games.js`)
   - Connects to Itch.io API using your secret key
   - Fetches all your published games
   - Automatically categorizes them (published, course, gamejam, clone, prototype)
   - Saves data to `data/games.json`

3. **Display Script** (`scripts/load-games.js`)
   - Loads games from `data/games.json`
   - Dynamically creates project cards
   - Works with your existing filter system

### 3. Manual Trigger

To manually fetch games immediately:

1. Go to **Actions** tab in your repository
2. Click on **Fetch Itch.io Games** workflow
3. Click **Run workflow** button
4. Wait a few seconds for it to complete

### 4. Customizing Game Categorization

The script automatically categorizes games based on titles and descriptions. You can customize this in `scripts/fetch-games.js` in the `categorizeGame()` function.

Current logic:
- **gamejam**: Title/description contains "jam"
- **course**: Title/description contains "course"
- **clone**: Title/description contains "clone"
- **prototype**: Title/description contains "prototype" or "tool"
- **published**: Games with significant downloads/views (>10 downloads or >100 views)

### 5. Data Structure

Games are stored in `data/games.json` with the following structure:

```json
{
  "lastUpdated": "2025-01-28T02:00:00.000Z",
  "totalGames": 5,
  "games": [
    {
      "id": 123,
      "title": "Game Title",
      "description": "Game description",
      "url": "https://calippooo.itch.io/game-title",
      "coverUrl": "https://img.itch.zone/...",
      "category": "gamejam",
      "technologies": ["Unity", "C#", "2D"],
      "platforms": {
        "windows": true,
        "mac": false,
        "linux": false,
        "android": false
      },
      "stats": {
        "downloads": 50,
        "views": 200
      },
      "published": true,
      "publishedAt": "2024-10-15 12:00:00",
      "createdAt": "2024-10-10 10:00:00",
      "minPrice": 0
    }
  ]
}
```

### 6. Troubleshooting

#### Games not showing up?
1. Check that the workflow ran successfully in the **Actions** tab
2. Check `data/games.json` to see if it has data
3. Check browser console for any JavaScript errors

#### API errors?
1. Verify the secret is set correctly in GitHub Settings
2. Check that your API key is still valid at https://itch.io/api-keys
3. Look at the workflow logs in the **Actions** tab

#### Want to keep some manual games?
The current hardcoded games have been moved to a hidden section. You can:
1. Keep them in the hidden `manual-projects-grid` div
2. Or manually add them back to `data/games.json`
3. Or modify `scripts/load-games.js` to merge both sources

### 7. Testing Locally

To test the fetch script locally:

```bash
# Set your API key as environment variable
$env:ITCH_API_KEY = "Wj2BAsAXHZ5sNCVUYhC6Nw5efCM9AB4V22BOatjD"

# Run the script
node scripts/fetch-games.js
```

This will create/update `data/games.json` with your games.

---

## Security Notes

✅ Your API key is stored securely in GitHub Secrets
✅ The key is never committed to the repository
✅ The key is only accessible to GitHub Actions workflows
✅ The workflow only has read access to the Itch.io API

## Next Steps

After setting up the secret, the automation will:
- ✅ Fetch games daily at 2 AM UTC
- ✅ Update your portfolio automatically
- ✅ Show latest game stats (downloads, views)
- ✅ Work with your existing filter system

Enjoy your automated portfolio! 🎮
