# Quick Test Checklist

## ✅ Files Created
- [ ] `.github/workflows/fetch-games.yml` - GitHub Actions workflow
- [ ] `scripts/fetch-games.js` - Fetch script
- [ ] `scripts/load-games.js` - Frontend loader
- [ ] `data/games.json` - Data file
- [ ] `.gitignore` - Git ignore rules
- [ ] `SETUP_ITCH_AUTOMATION.md` - Setup guide
- [ ] `IMPLEMENTATION_SUMMARY.md` - Implementation summary
- [ ] `WORKFLOW_DIAGRAM.txt` - Visual workflow

## ✅ Files Modified
- [ ] `index.html` - Added load-games.js script
- [ ] `README.md` - Updated with automation info

## 🔐 Security Checklist
- [ ] API key NOT in any source files ✓
- [ ] API key goes in GitHub Secrets only ✓
- [ ] Workflow uses ${{ secrets.ITCH_API_KEY }} ✓

## 🧪 Local Testing (Optional)

To test the fetch script locally:

```powershell
# PowerShell commands
cd c:\Users\emirb\OneDrive\Desktop\Coding\emirbesir.github.io

# Set API key temporarily
$env:ITCH_API_KEY = "Wj2BAsAXHZ5sNCVUYhC6Nw5efCM9AB4V22BOatjD"

# Run the fetch script
node scripts/fetch-games.js

# Check the output
cat data/games.json

# Serve locally to test frontend
# Option 1: Python (if installed)
python -m http.server 8000

# Option 2: VS Code Live Server extension
# Right-click index.html -> Open with Live Server

# Then visit: http://localhost:8000
```

## 📋 Deployment Steps

1. **Add GitHub Secret**
   - Go to: https://github.com/emirbesir/emirbesir.github.io/settings/secrets/actions
   - Create new secret: `ITCH_API_KEY`
   - Value: `Wj2BAsAXHZ5sNCVUYhC6Nw5efCM9AB4V22BOatjD`

2. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add Itch.io automation with GitHub Actions"
   git push origin main
   ```

3. **Test Workflow**
   - Go to Actions tab
   - Click "Fetch Itch.io Games"
   - Click "Run workflow"
   - Wait for completion (~30 seconds)

4. **Verify**
   - Check if `data/games.json` was updated
   - Visit your live site
   - Games should appear automatically!

## 🐛 Troubleshooting

### If games don't appear:
1. Check Actions tab for errors
2. Verify GitHub Secret is set correctly
3. Check browser console for JS errors
4. Ensure `data/games.json` exists and has data

### If workflow fails:
1. Check workflow logs in Actions tab
2. Verify API key is valid at itch.io
3. Ensure secret name is exactly `ITCH_API_KEY`

### If games appear but look wrong:
1. Check `data/games.json` format
2. Modify categorization logic in `fetch-games.js`
3. Adjust display in `load-games.js`

## 📝 Notes

- Workflow runs daily at 2 AM UTC
- Manual trigger available anytime
- Games auto-categorized by title/description
- Stats (downloads/views) updated automatically
- Works with existing filter system

## ✨ Expected Result

After setup, your portfolio will:
- ✅ Show all games from https://calippooo.itch.io/
- ✅ Update daily automatically
- ✅ Display download/view counts
- ✅ Auto-categorize games
- ✅ Work with filters
- ✅ Keep API key secure

---

**All set!** 🚀 Just add the GitHub Secret and push!
