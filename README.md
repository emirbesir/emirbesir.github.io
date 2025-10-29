<div align="center">

# Emir Beşir - Personal Portfolio Website

This repository contains the source code for my personal portfolio website.

You can view the live portfolio at: **[emirbesir.github.io](https://emirbesir.github.io)**

</div>

---

## 🎮 Features

- **Automated Game Updates**: Portfolio automatically fetches games from Itch.io daily via GitHub Actions
- **Dynamic Filtering**: Filter games by category and technology
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Theme Switcher**: Dark and Light theme options
- **Accessibility**: WCAG compliant with screen reader support

## 🔄 Automatic Updates

This portfolio uses GitHub Actions to automatically fetch and update game information from [Itch.io](https://calippooo.itch.io/) every day at 2 AM UTC.

For setup instructions, see [SETUP_ITCH_AUTOMATION.md](SETUP_ITCH_AUTOMATION.md)

## 📁 Project Structure

```
emirbesir.github.io/
├── .github/
│   └── workflows/
│       └── fetch-games.yml          # GitHub Actions workflow
├── data/
│   └── games.json                   # Auto-generated games data
├── scripts/
│   ├── fetch-games.js               # Itch.io API integration
│   └── load-games.js                # Dynamic game loader
├── docs/
│   ├── img/                         # Game images
│   └── Emir_Beşir_CV.pdf           # Resume
├── index.html                       # Main portfolio page
├── styles.css                       # Styling
├── script.js                        # Interactive features
└── README.md
```

## 🚀 Technologies Used

- HTML5, CSS3, JavaScript (Vanilla)
- GitHub Actions for automation
- Itch.io API integration
- Responsive Design

---
