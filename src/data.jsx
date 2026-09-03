/* ============================================================
   Portfolio - content data (bilingual EN / TR)
   ------------------------------------------------------------
   This is the single source of truth for all site copy.
   Translatable fields are written as { en, tr }; everything
   else (links, images, years, ids) is shared across languages.
   resolveContent(lang) flattens it for the section components.
   ============================================================ */

const PROFILE = {
    name: "Emir Beşir",
    email: "emirbesirx@gmail.com",
    cv: {
        en: "https://emirbesir.github.io/assets/Emir_Besir_CV_EN.pdf",
        // Turkish CV filename contains "ş" (U+015F) - URL-encoded for GitHub Pages.
        tr: "https://emirbesir.github.io/assets/Emir_Be%C5%9Fir_CV.pdf",
    },
    location: "İstanbul, Türkiye",
    links: {
        github: "https://github.com/emirbesir",
        linkedin: "https://linkedin.com/in/emirbesir",
        itch: "https://calippooo.itch.io",
    },
    roles: {
        en: ["Unity Game Developer", "Gameplay Programmer", "C# Developer"],
        tr: ["Unity Oyun Geliştiricisi", "Oynanış Programcısı", "C# Geliştiricisi"],
    },
    tagline: {
        en: "I build gameplay systems in C# & Unity",
        tr: "C# ve Unity ile oynanış sistemleri geliştiriyorum",
    },
};

const TECH = [
    { name: "Unity", note: { en: "Game Engine", tr: "Oyun Motoru" } },
    { name: "C#", note: { en: "Programming Language", tr: "Programlama Dili" } },
    { name: "Zenject", note: { en: "DI framework", tr: "DI Framework" } },
    { name: "DOTween", note: { en: "Animation", tr: "Animasyon" } },
    { name: "UniTask", note: { en: "Async Programming", tr: "Async Programlama" } },
    { name: "R3 Reactive Extensions", note: { en: "Reactive Programming", tr: "Reactive Programlama" } },
    { name: "Git & GitHub", note: { en: "Version control", tr: "Versiyon kontrolü" } },
];

// Thumbnails live in assets/images (shared with the repo).
const GAMES = [
    {
        id: "ufc-ko",
        title: "UFC: KO (Arvis Games)",
        year: "2026",
        tagline: {
            en: `Create your fighter, master real UFC moves, and fight your way to the top, live on the App Store.`,
            tr: `Dövüşçünü yarat, gerçek UFC hareketlerinde ustalaş ve dövüşerek zirveye çık, App Store'da yayında.`,
        },
        description: {
            en: `A licensed UFC fighting game for iOS, published by Rollic Games and built in Unity 6. Co-developed the core combat engine, built the fight animation system, helped develop the meta game (move management, progression, reward flows), and extended the seeded simulator used for balancing.`,
            tr: `Rollic Games tarafından yayınlanan ve Unity 6 ile geliştirilen lisanslı bir UFC dövüş oyunu. Temel dövüş motorunun geliştirilmesinde birlikte çalıştım, dövüş animasyon sistemini geliştirdim; meta oyunun (move yönetimi, ilerleyiş, ödül akışları) geliştirilmesine yardımcı oldum ve balancing için kullanılan seeded simülatörü genişlettim.`,
        },
        role: { en: "Gameplay & UI engineering", tr: "Oynanış ve UI geliştirme" },
        genre: { en: "Sports / Fighting", tr: "Spor / Dövüş" },
        team: "Arvis Games",
        event: null,
        platforms: ["iOS"],
        status: "Released",
        badge: null,
        image: "assets/images/app_icon_ios.png",
        link: "https://apps.apple.com/us/app/ufc-ko/id6781219228",
        code: null,
        trailer: null,
        featured: true,
        accentTag: { en: "Fighting", tr: "Dövüş" },
    },
    {
        id: "check-and-defend",
        title: "Check & Defend",
        year: "2026",
        tagline: {
            en: `A chess tower-defense where every wave randomly flips you between defender and attacker.`,
            tr: `Her dalgada savunmacı ve saldırgan arasında sizi rastgele değiştiren bir satranç kule savunması.`,
        },
        description: {
            en: `A chessboard, a timer, and a side that keeps switching under you. One wave you defend your own king; the next you're storming the enemy's - and which role you play is decided at random each round.`,
            tr: `Bir satranç tahtası, bir sayaç ve sürekli değişen bir taraf. Önce kendi şahınızı savunuyorsunuz; bir sonrakinde düşmanınkine saldırıyorsunuz - ve hangi rolü oynayacağınız her turda rastgele belirleniyor.`,
        },
        role: { en: "Gameplay systems & turn logic", tr: "Oynanış sistemleri ve tur mantığı" },
        genre: { en: "Strategy", tr: "Strateji" },
        team: "Team FlowRate",
        event: "Yıldız Jam 2026",
        platforms: ["PC"],
        status: "Released",
        badge: { en: "1st Place", tr: "1.lik" },
        image: "assets/images/check_and_defend_thumb.png",
        link: "https://yunusturna.itch.io/checkanddefend",
        code: null,
        trailer: "https://www.youtube.com/watch?v=a3mRolhcuOs",
        featured: true,
        accentTag: { en: "Strategy", tr: "Strateji" },
    },
    {
        id: "less-is-more",
        title: "Less is More",
        year: "2025",
        tagline: {
            en: `Every death leaves your corpse behind as a solid platform to climb on.`,
            tr: `Her ölümünüz cesedinizi tırmanabileceğiniz sağlam bir platform olarak geride bırakır.`,
        },
        description: {
            en: `A 2D platformer built in 24 hours for the BTK Akademi Advanced Unity Bootcamp Game Jam. Every time you die, your corpse stays in the scene as a permanent, solid platform - so progress is literally built on your own failures. Won 1st place.`,
            tr: `BTK Akademi İleri Seviye Unity Bootcamp Game Jam için 24 saatte geliştirilen bir 2D platform oyunu. Her öldüğünüzde cesediniz sahnede kalıcı, sağlam bir platform olarak kalır - yani ilerleme kelimenin tam anlamıyla kendi başarısızlıklarınızın üzerine inşa edilir. 1.lik ödülünü kazandı.`,
        },
        role: { en: "Gameplay & level design", tr: "Oynanış ve seviye tasarımı" },
        genre: { en: "2D Puzzle Platformer", tr: "2D Bulmaca Platformer" },
        team: "Team NULL",
        event: "BTK Akademi Unity Bootcamp Jam",
        platforms: ["PC", "Mobile"],
        status: "Released",
        badge: { en: "1st Place", tr: "1.lik" },
        image: "assets/images/less_is_more_thumb.jpg",
        link: "https://calippooo.itch.io/less-is-more",
        code: "https://github.com/emirbesir/less-is-more",
        trailer: "https://www.youtube.com/watch?v=4ptHAemZCW4",
        featured: false,
        accentTag: { en: "2D Puzzle Platformer", tr: "2D Bulmaca Platformer" },
    },
    {
        id: "raze-maze",
        title: "Raze Maze",
        year: "2025",
        tagline: {
            en: `A rat in a pitch-black maze, using a sonar-like sniff to glimpse the way forward.`,
            tr: `Zifiri karanlık bir labirentteki bir fare, ilerideki yolu görmek için sonar benzeri bir koklama kullanır.`,
        },
        description: {
            en: `A 3D puzzle-platformer built in 48 hours for StartGate Jam 2025. You play as a rat lost in a pitch-black maze, using a sonar-like "sniff" ability to briefly light up your surroundings and find a path through. Placed top 20 out of 255 teams.`,
            tr: `StartGate Jam 2025 için 48 saatte geliştirilen bir 3D bulmaca-platform oyunu. Zifiri karanlık bir labirentte kaybolmuş bir fare olarak oynuyor, çevrenizi kısa süreliğine aydınlatıp bir yol bulmak için sonar benzeri bir "koklama" yeteneği kullanıyorsunuz. 255 takım arasından ilk 20'ye girdi.`,
        },
        role: { en: "Gameplay programming", tr: "Oynanış programlama" },
        genre: { en: "Puzzle Platformer", tr: "Bulmaca Platform" },
        team: "Team NULL",
        event: "StartGate Jam 2025",
        platforms: ["PC"],
        status: "Released",
        badge: { en: "Top 20 / 255", tr: "İlk 20 / 255" },
        image: "assets/images/raze_maze_thumb.jpg",
        link: "https://calippooo.itch.io/raze-maze",
        code: "https://github.com/emirbesir/raze-maze",
        trailer: "https://www.youtube.com/watch?v=SFIbsuxqi8E",
        featured: false,
        accentTag: { en: "3D Puzzle Platformer", tr: "3D Bulmaca Platformer" },
    },
    {
        id: "the-last-jack",
        title: "The Last Jack",
        year: "2025",
        tagline: {
            en: `Manage a dying flame to survive a haunted Halloween world.`,
            tr: `Korkunç bir Cadılar Bayramı dünyasında hayatta kalmak için sönmekte olan bir alevi yönetin.`,
        },
        description: {
            en: `A 3D platformer built solo for the GameDev.tv Halloween Jam 2025. You nurse a steadily-depleting flame as you navigate a haunted Halloween world, balancing exploration against the light running out. Placed #10 in the Mechanics category out of 286 entries.`,
            tr: `GameDev.tv Cadılar Bayramı Jam 2025 için tek başıma geliştirdiğim bir 3D platform oyunu. Korkunç bir Cadılar Bayramı dünyasında ilerlerken sürekli azalan bir alevi besliyor, keşfi ışığın tükenmesine karşı dengeliyorsunuz. 286 oyun arasından Mekanikler kategorisinde 10. oldu.`,
        },
        role: { en: "Solo developer", tr: "Tek geliştirici" },
        genre: { en: "3D Platformer", tr: "3D Platformer" },
        team: "Solo",
        event: "GameDev.tv Halloween Jam 2025",
        platforms: ["PC"],
        status: "Released",
        badge: { en: "Top 10 in Mechanics", tr: "Mekanikler kategorisinde 10.luk" },
        image: "assets/images/the_last_jack_thumb.jpg",
        link: "https://calippooo.itch.io/the-last-jack",
        code: "https://github.com/emirbesir/the-last-jack",
        trailer: null,
        featured: false,
        accentTag: { en: "3D Platformer", tr: "3D Platformer" },
    },
    {
        id: "collapsed-universe",
        title: "Collapsed Universe",
        year: "2025",
        tagline: {
            en: `Slip through portals between two parallel universes to find your way.`,
            tr: `Yolunu bulmak için iki paralel evren arasında portallardan geç.`,
        },
        description: {
            en: `A 2D platformer where you travel through portals between two parallel universes, using the differences between them to progress. Built in just 3 days for the Google AI & Technology Academy 2025 Game Jam.`,
            tr: `İki paralel evren arasında portallar aracılığıyla seyahat ettiğiniz, ilerlemek için aralarındaki farkları kullandığınız bir 2D platform oyunu. Google Yapay Zekâ ve Teknoloji Akademisi 2025 Game Jam'i için yalnızca 3 günde geliştirildi.`,
        },
        role: { en: "Gameplay programming", tr: "Oynanış programlama" },
        genre: { en: "2D Platformer", tr: "2D Platformer" },
        team: "Team NULL",
        event: "Google AI & Tech Academy Jam 2025",
        platforms: ["PC"],
        status: "Released",
        badge: null,
        image: "assets/images/collapsed_universe_thumb.jpg",
        link: "https://calippooo.itch.io/collapsed-universe",
        code: "https://github.com/emirbesir/collapsed-universe",
        trailer: "https://www.youtube.com/watch?v=8obRY19qgFE",
        featured: false,
        accentTag: { en: "2D Platformer", tr: "2D Platformer" },
    },
];

/* ---------- interface strings ---------- */
const UI = {
    en: {
        nav: {
            home: "Home", about: "About", projects: "Projects", contact: "Contact",
            cv: "Résumé", toggleTheme: "Toggle light / dark", toggleLang: "Switch to Turkish",
        },
        hero: {
            greeting: "Hi, I'm",
            ctaPrimary: "See my games",
            ctaSecondary: "Get in touch",
        },
        about: {
            eyebrow: "About",
            title: ``,
            p1: `I'm a <span class="hl">Unity Game Developer</span> at Arvis Games, working on the gameplay systems for the licensed iOS game <span class="hl">UFC: KO</span>, published by Rollic Games.`,
            p2: `I graduated from Istanbul Aydın University's <span class="hl">Software Engineering</span> department with a 3.37 GPA.`,
            meta: [
                { k: "Role", v: "Unity Game Developer" },
                { k: "Studio", v: "Arvis Games", accent: true },
                { k: "Education", v: "Software Eng. · Istanbul Aydın Uni." },
                { k: "Based in", v: "İstanbul, Türkiye" },
                { k: "Focus", v: "Gameplay systems · C# architecture · Clean Code" },
            ],
            stack: "~/ stack",
            downloadCv: "Download Résumé",
        },
        projects: {
            eyebrow: "Projects",
            title: "Games I've worked on",
            lead: "",
            playItch: "Play on Itch.io",
            playAppStore: "View on the App Store",
            watchTrailer: "Watch trailer",
            code: "Code",
            play: "Play",
            watch: "Watch",
        },
        contact: {
            eyebrow: "Contact",
            title: "Want to get in touch?",
            lead: "I'm always up for a fun collaboration or a chat about game development.",
            cv: "Résumé",
        },
        footer: {
            text: "© 2026 Emir Beşir",
            top: "Top ↑",
        },
    },
    tr: {
        nav: {
            home: "Ana Sayfa", about: "Hakkımda", projects: "Projeler", contact: "İletişim",
            cv: "CV", toggleTheme: "Açık / koyu tema", toggleLang: "İngilizceye geç",
        },
        hero: {
            greeting: "Merhaba, ben",
            ctaPrimary: "Oyunlarımı gör",
            ctaSecondary: "İletişime geç",
        },
        about: {
            eyebrow: "Hakkımda",
            title: ``,
            p1: `<span class="hl">Arvis Games'te Unity Oyun Geliştiricisi</span> olarak, Rollic Games tarafından yayınlanan lisanslı iOS oyunu <span class="hl">UFC: KO</span>'nun oynanış sistemleri üzerinde çalışıyorum.`,
            p2: `İstanbul Aydın Üniversitesi <span class="hl">Yazılım Mühendisliği</span> bölümünden 3.37 ortalama ile mezun oldum.`,
            meta: [
                { k: "Rol", v: "Unity Oyun Geliştiricisi" },
                { k: "Stüdyo", v: "Arvis Games", accent: true },
                { k: "Okul", v: "Yazılım Müh. - İstanbul Aydın Üni." },
                { k: "Konum", v: "İstanbul, Türkiye" },
                { k: "Odak", v: "Oynanış sistemleri - C# mimarisi - Temiz Kod" },
            ],
            stack: "~/ stack",
            downloadCv: "CV İndir",
        },
        projects: {
            eyebrow: "Projeler",
            title: "Üzerinde çalıştığım oyunlar",
            lead: "",
            playItch: "Itch.io'da oyna",
            playAppStore: "App Store'da gör",
            watchTrailer: "Oynanışı izle",
            code: "Kod",
            play: "Oyna",
            watch: "İzle",
        },
        contact: {
            eyebrow: "İletişim",
            title: "İletişime geçmek ister misiniz?",
            lead: "Eğlenceli bir iş birliğine ya da oyun geliştirme sohbetine her zaman varım.",
            cv: "CV",
        },
        footer: {
            text: "© 2026 Emir Beşir",
            top: "Yukarı ↑",
        },
    },
};

/* ---------- resolver ---------- */
function pick(v, lang) {
    // { en, tr } -> string for the active language; everything else passes through
    if (v && typeof v === "object" && !Array.isArray(v) && ("en" in v || "tr" in v)) {
        return v[lang] != null ? v[lang] : v.en;
    }
    return v;
}

function resolveContent(lang) {
    const L = UI[lang] ? lang : "en";
    return {
        lang: L,
        PROFILE: {
            ...PROFILE,
            roles: PROFILE.roles[L] || PROFILE.roles.en,
            tagline: pick(PROFILE.tagline, L),
            cv: pick(PROFILE.cv, L),
        },
        TECH: TECH.map((t) => ({ name: t.name, note: pick(t.note, L) })),
        GAMES: GAMES.map((g) => ({
            ...g,
            tagline: pick(g.tagline, L),
            description: pick(g.description, L),
            role: pick(g.role, L),
            genre: pick(g.genre, L),
            badge: pick(g.badge, L),
            accentTag: pick(g.accentTag, L),
        })),
        UI: UI[L] || UI.en,
    };
}

Object.assign(window, { PROFILE, TECH, GAMES, UI, resolveContent });
