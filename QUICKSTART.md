# 🚀 Quick Start Guide

Get your automated Itch.io portfolio up and running in 5 minutes!

## Step 1: Add GitHub Secret (REQUIRED!)

1. Visit: https://github.com/emirbesir/emirbesir.github.io/settings/secrets/actions
2. Click **"New repository secret"**
3. Enter:
   - **Name:** `ITCH_API_KEY`
   - **Secret:** `Wj2BAsAXHZ5sNCVUYhC6Nw5efCM9AB4V22BOatjD`
4. Click **"Add secret"**

## Step 2: Commit & Push Changes

```bash
git add .
git commit -m "Add Itch.io automation with GitHub Actions"
git push origin main
```

## Step 3: Trigger First Run

1. Go to: https://github.com/emirbesir/emirbesir.github.io/actions
2. Click **"Fetch Itch.io Games"** workflow
3. Click **"Run workflow"** button
4. Select branch: `main`
5. Click green **"Run workflow"** button

## Step 4: Verify It Works

Wait ~30 seconds, then:

1. Refresh the Actions page
2. You should see a green checkmark ✅
3. Go to your repository: https://github.com/emirbesir/emirbesir.github.io
4. Check that `data/games.json` has been updated (click on it to view)
5. Visit your live site: https://emirbesir.github.io
6. Your games should appear automatically! 🎉

## That's It! 🎮

Your portfolio now automatically:
- ✅ Fetches games from Itch.io daily at 2 AM UTC
- ✅ Shows latest download/view stats
- ✅ Auto-categorizes your games
- ✅ Updates without any manual work
- ✅ Keeps your API key secure

---

## Need Help?

- **Workflow Failed?** Check `TEST_CHECKLIST.md` for troubleshooting
- **Want to Customize?** See `SETUP_ITCH_AUTOMATION.md` for details
- **Understanding Flow?** Read `WORKFLOW_DIAGRAM.txt`

## Manual Updates

To update games manually anytime:
1. Go to Actions tab
2. Click "Fetch Itch.io Games"
3. Click "Run workflow"

---

**Enjoy your automated portfolio!** 🚀
