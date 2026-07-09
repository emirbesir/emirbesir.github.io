/* ============================================================
   Portfolio — section components
   ------------------------------------------------------------
   Components receive a resolved `content` object (see
   resolveContent in data.jsx) so all copy follows the active
   language. Hero visual variants are kept for reference; only
   the locked "wall" hero renders on the live site.
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---------- ICONS (inline, minimal stroke set) ---------- */
const Icon = {
    github: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>),
    linkedin: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>),
    itch: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><path d="M3 6.5 5 3h14l2 3.5" /><path d="M3 6.5v2.2c0 1.3 1 2.3 2.2 2.3 1.1 0 2-1 2-2.2 0 1.2.9 2.2 2 2.2s2-1 2-2.2c0 1.2.9 2.2 2 2.2s2-1 2-2.2c0 1.2.9 2.2 2 2.2 1.2 0 2.2-1 2.2-2.3V6.5" /><path d="M5 11v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" /><path d="M9.5 14h5" /></svg>),
    apple: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><path fill="currentColor" stroke="none" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.031 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>),
    mail: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 6 10 7 10-7" /></svg>),
    download: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>),
    arrow: (p) => (<svg viewBox="0 0 24 24" className={"ico ico-sm arrow " + (p.cls || "")}><path d="M7 17 17 7M9 7h8v8" /></svg>),
    play: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" /></svg>),
    sun: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>),
    moon: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>),
    code: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>),
    arrowDown: (p) => (<svg viewBox="0 0 24 24" className={"ico " + (p.cls || "")}><path d="M12 5v14m0 0 6-6m-6 6-6-6" /></svg>),
};

/* ---------- typewriter hook ---------- */
function useTypewriter(words, { type = 70, del = 38, hold = 1600 } = {}) {
    const [txt, setTxt] = useState("");
    const [i, setI] = useState(0);
    const [del_, setDel] = useState(false);
    useEffect(() => {
        const w = words[i % words.length];
        let t;
        if (!del_ && txt === w) {
            t = setTimeout(() => setDel(true), hold);
        } else if (del_ && txt === "") {
            setDel(false); setI((x) => x + 1);
        } else {
            t = setTimeout(() => {
                setTxt(del_ ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1));
            }, del_ ? del : type);
        }
        return () => clearTimeout(t);
    }, [txt, del_, i, words, type, del, hold]);
    return txt;
}

/* ---------- NAV ---------- */
function Nav({ content, theme, lang, onToggleTheme, onToggleLang }) {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("home");
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => {
        const ids = ["home", "about", "projects", "contact"];
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
            { rootMargin: "-45% 0px -50% 0px" }
        );
        ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, []);
    const U = content.UI.nav;
    const P = content.PROFILE;
    const links = [["home", U.home], ["about", U.about], ["projects", U.projects], ["contact", U.contact]];
    return (
        <nav className={"nav" + (scrolled ? " scrolled" : "")}>
            <div className="wrap nav-inner">
                <a className="logo" href="#home" aria-label="Home">
                    <span className="br">&lt;</span>Emir<span className="br">/&gt;</span>
                </a>
                <ul className="nav-links">
                    {links.map(([id, label], n) => (
                        <li key={id}>
                            <a className={active === id ? "active" : ""} href={"#" + id}>
                                <span className="idx">0{n + 1}</span>{label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="nav-right">
                    <button className="icon-btn" onClick={onToggleLang} aria-label={U.toggleLang} title={U.toggleLang}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", fontWeight: 600, letterSpacing: "0.02em" }}>
                            {lang === "en" ? "TR" : "EN"}
                        </span>
                    </button>
                    <button className="icon-btn" onClick={onToggleTheme} aria-label={U.toggleTheme} title={U.toggleTheme}>
                        {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
                    </button>
                    <a className="btn btn-ghost" href={P.cv} target="_blank" rel="noopener">
                        <Icon.download cls="ico-sm" /><span className="nav-cv-text">{U.cv}</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}

/* ---------- HERO ---------- */
function Hero({ content, heroStyle }) {
    const P = content.PROFILE;
    const U = content.UI.hero;
    const typed = useTypewriter(P.roles);
    const twoCol = ["terminal", "showcase", "wall", "playground"].includes(heroStyle);
    const arcade = heroStyle === "arcade";
    return (
        <header className={"hero hero-" + heroStyle} id="home">
            {heroStyle === "spotlight" && <HeroSpotlightBg />}
            {heroStyle === "coderain" && <HeroCodeRain />}
            <div className="hero-grid-bg" />
            <div className="hero-glow" />
            <div className="wrap hero-inner">
                <div className={twoCol ? "hero-two" : ""}>
                    <div className="hero-text">
                        {arcade
                            ? <div className="arcade-credit">▸ INSERT COIN — PRESS START</div>
                            : <div className="hero-hi"><span className="wave">👋</span> {U.greeting}</div>}
                        <h1 className={"hero-name" + (arcade ? " arcade-title" : "")} data-text="Emir Beşir">Emir<br />Beşir</h1>
                        <div className="hero-role">
                            <span className="prefix">{"// "}</span>
                            <span className="typed">{typed}</span><span className="cursor" />
                        </div>
                        <p className="hero-tag">{P.tagline}</p>
                        <div className="hero-cta">
                            <a className="btn btn-primary" href="#projects">
                                <Icon.play cls="ico-sm" /> {U.ctaPrimary}
                            </a>
                            <a className="btn btn-ghost" href="#contact">{U.ctaSecondary}</a>
                            <div className="hero-socials">
                                <a className="icon-btn" href={P.links.github} target="_blank" rel="noopener" aria-label="GitHub"><Icon.github /></a>
                                <a className="icon-btn" href={P.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><Icon.linkedin /></a>
                                <a className="icon-btn" href={P.links.itch} target="_blank" rel="noopener" aria-label="itch.io"><Icon.itch /></a>
                            </div>
                        </div>
                    </div>

                    {heroStyle === "terminal" && <HeroTerminal />}
                    {heroStyle === "showcase" && <HeroCollage />}
                    {heroStyle === "wall" && <HeroWall />}
                    {heroStyle === "playground" && <HeroPlayground />}
                </div>
            </div>
            {arcade && <HeroArcadeFX />}
        </header>
    );
}

function HeroWall() {
    const imgs = GAMES.map((g) => ({ src: g.image, title: g.title }));
    const colA = [...imgs, ...imgs];
    const colB = [...imgs.slice().reverse(), ...imgs.slice().reverse()];
    return (
        <div className="wall" aria-hidden="true">
            <div className="wall-col up">
                {colA.map((g, i) => (
                    <div className="wall-card" key={"a" + i}><img src={g.src} alt="" loading="lazy" /></div>
                ))}
            </div>
            <div className="wall-col down">
                {colB.map((g, i) => (
                    <div className="wall-card" key={"b" + i}><img src={g.src} alt="" loading="lazy" /></div>
                ))}
            </div>
        </div>
    );
}

function HeroSpotlightBg() {
    return (
        <div className="spotlight-bg" aria-hidden="true">
            <img src={GAMES[0].image} alt="" />
            <div className="spotlight-veil" />
        </div>
    );
}

function HeroTerminal() {
    return (
        <div className="terminal" aria-hidden="true">
            <div className="terminal-bar">
                <span className="dot r" /><span className="dot y" /><span className="dot g" />
                <span className="terminal-title">PlayerController.cs</span>
            </div>
            <div className="terminal-body">
                <div className="t-line"><span className="t-com">// shipped 6 games · 2 jam awards</span></div>
                <div className="t-line"><span className="t-key">public class</span> <span className="t-prop">Developer</span> : <span className="t-prop">MonoBehaviour</span></div>
                <div className="t-line">{"{"}</div>
                <div className="t-line">{"  "}<span className="t-key">string</span> name = <span className="t-str">"Emir Beşir"</span>;</div>
                <div className="t-line">{"  "}<span className="t-key">string</span> role = <span className="t-str">"Unity Developer"</span>;</div>
                <div className="t-line">{"  "}<span className="t-key">int</span>{"    "}shipped = <span className="t-num">6</span>;</div>
                <div className="t-line">{"  "}<span className="t-key">string[]</span> stack = {"{ "}<span className="t-str">"C#"</span>, <span className="t-str">"Zenject"</span>, <span className="t-str">"DOTween"</span> {"}"};</div>
                <div className="t-line">{"  "}<span className="t-key">bool</span>{"   "}openToWork = <span className="t-num">false</span>;<span className="t-blink" /></div>
                <div className="t-line">{"}"}</div>
            </div>
        </div>
    );
}

function HeroCollage() {
    const feat = GAMES.filter((g) => ["check-and-defend", "less-is-more", "the-last-jack"].includes(g.id));
    return (
        <div className="collage" aria-hidden="true">
            <div className="badge-float">🏆 1st Place Jam</div>
            {feat.map((g, i) => (
                <div className={"collage-card c" + (i + 1)} key={g.id}>
                    <img src={g.image} alt="" loading="lazy" />
                </div>
            ))}
        </div>
    );
}

/* ---------- CRAZY HERO: Arcade CRT ---------- */
function HeroArcadeFX() {
    const titles = [...GAMES, ...GAMES];
    return (
        <React.Fragment>
            <div className="crt-scan" aria-hidden="true" />
            <div className="crt-glare" aria-hidden="true" />
            <div className="crt-vignette" aria-hidden="true" />
            <div className="arcade-ticker" aria-hidden="true">
                <div className="arcade-ticker-track">
                    {titles.map((g, i) => (
                        <span className="arcade-tick" key={i}>★ {g.title.toUpperCase()}</span>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

/* ---------- CRAZY HERO: Code rain ---------- */
function hexToRGBA(hex, a) {
    let h = (hex || "").trim().replace("#", "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    if (h.length < 6) return `rgba(11,13,19,${a})`;
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
}
function HeroCodeRain() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        const css = getComputedStyle(document.documentElement);
        const glyphs = "01<>{}();=+-*/#".split("");
        const words = ["void", "C#", "Unity", "new", "if", "=>", "i++", "null", "true", "GameObject", "Update()", "vec3", "await", "<T>", "&&", "this", "yield", "Awake()", "transform", "prefab", "[SerializeField]"];
        const pool = glyphs.concat(words);
        const fs = 17;
        let w = 0, h = 0, cols = 0, drops = [], raf = 0;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        function resize() {
            const r = canvas.parentElement.getBoundingClientRect();
            w = r.width; h = r.height;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = `600 ${fs}px ui-monospace, "JetBrains Mono", monospace`;
            ctx.textBaseline = "top";
            cols = Math.ceil(w / (fs * 0.78));
            drops = Array.from({ length: cols }, () => Math.random() * -60);
        }
        resize();
        const onResize = () => resize();
        window.addEventListener("resize", onResize);
        function frame() {
            const bg = css.getPropertyValue("--bg").trim();
            const accent = css.getPropertyValue("--accent").trim() || "#8b7cf6";
            const lead = css.getPropertyValue("--text").trim() || "#fff";
            ctx.fillStyle = hexToRGBA(bg, 0.11);
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < cols; i++) {
                const x = i * fs * 0.78;
                const y = drops[i] * fs;
                const tok = pool[(Math.random() * pool.length) | 0];
                const isLead = Math.random() > 0.972;
                ctx.fillStyle = isLead ? lead : hexToRGBA(accent, 0.62);
                ctx.fillText(tok, x, y);
                if (y > h && Math.random() > 0.972) drops[i] = Math.random() * -24;
                drops[i] += 0.55 + Math.random() * 0.5;
            }
            raf = requestAnimationFrame(frame);
        }
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) { frame(); cancelAnimationFrame(raf); } else { raf = requestAnimationFrame(frame); }
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
    }, []);
    return <canvas ref={ref} className="coderain-canvas" aria-hidden="true" />;
}

/* ---------- CRAZY HERO: Playground (drag & throw physics) ---------- */
function HeroPlayground() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let w = 0, h = 0, raf = 0;
        const bodies = [];
        let drag = null, dragOff = { x: 0, y: 0 }, last = { x: 0, y: 0, t: 0 }, vel = { x: 0, y: 0 };
        const G = 0.55, REST = 0.5, FRICT = 0.985;

        function resize() {
            const r = canvas.parentElement.getBoundingClientRect();
            w = r.width; h = Math.max(r.height, 320);
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            bodies.forEach((b) => { b.x = Math.min(Math.max(b.x, b.w / 2), w - b.w / 2); });
        }

        const sources = GAMES.map((g) => g.image);
        let loaded = 0;
        sources.forEach((src, i) => {
            const im = new Image();
            im.onload = () => {
                loaded++;
                const tw = Math.min(w * 0.42, 200);
                const th = tw * (im.height / im.width || 0.625);
                bodies.push({
                    img: im, w: tw, h: th,
                    x: w * (0.2 + Math.random() * 0.6),
                    y: -th - Math.random() * 200 - i * 60,
                    vx: (Math.random() - 0.5) * 2, vy: 0,
                    a: (Math.random() - 0.5) * 0.4, va: (Math.random() - 0.5) * 0.05,
                    r: Math.min(tw, th) * 0.46,
                });
                if (loaded === 1 && !raf) loop();
            };
            im.src = src;
        });

        function bodyAt(px, py) {
            for (let i = bodies.length - 1; i >= 0; i--) {
                const b = bodies[i];
                if (px > b.x - b.w / 2 && px < b.x + b.w / 2 && py > b.y - b.h / 2 && py < b.y + b.h / 2) return b;
            }
            return null;
        }
        function toLocal(e) {
            const r = canvas.getBoundingClientRect();
            const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
            const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
            return { x: cx, y: cy };
        }
        function down(e) {
            const p = toLocal(e);
            const b = bodyAt(p.x, p.y);
            if (b) {
                drag = b;
                bodies.splice(bodies.indexOf(b), 1); bodies.push(b);
                dragOff = { x: p.x - b.x, y: p.y - b.y };
                last = { x: p.x, y: p.y, t: performance.now() };
                vel = { x: 0, y: 0 };
                e.preventDefault();
            }
        }
        function move(e) {
            if (!drag) return;
            const p = toLocal(e);
            const now = performance.now();
            const dt = Math.max(now - last.t, 8);
            vel = { x: (p.x - last.x) / dt * 16, y: (p.y - last.y) / dt * 16 };
            drag.x = p.x - dragOff.x; drag.y = p.y - dragOff.y;
            drag.vx = 0; drag.vy = 0;
            last = { x: p.x, y: p.y, t: now };
            e.preventDefault();
        }
        function up() {
            if (drag) {
                drag.vx = Math.max(Math.min(vel.x, 40), -40);
                drag.vy = Math.max(Math.min(vel.y, 40), -40);
                drag.va = (Math.random() - 0.5) * 0.1;
                drag = null;
            }
        }

        function step() {
            for (const b of bodies) {
                if (b === drag) continue;
                b.vy += G; b.x += b.vx; b.y += b.vy;
                b.vx *= FRICT; b.a += b.va; b.va *= 0.97;
                if (b.x - b.w / 2 < 0) { b.x = b.w / 2; b.vx = Math.abs(b.vx) * REST; }
                if (b.x + b.w / 2 > w) { b.x = w - b.w / 2; b.vx = -Math.abs(b.vx) * REST; }
                if (b.y + b.h / 2 > h) { b.y = h - b.h / 2; b.vy = -Math.abs(b.vy) * REST; b.vx *= 0.9; b.va *= 0.8; }
                if (b.y - b.h / 2 < -400) { b.y = -400; b.vy = 0; }
            }
            // light circle separation so they pile
            for (let i = 0; i < bodies.length; i++) {
                for (let j = i + 1; j < bodies.length; j++) {
                    const a = bodies[i], c = bodies[j];
                    const dx = c.x - a.x, dy = c.y - a.y;
                    const d = Math.hypot(dx, dy) || 0.01;
                    const min = a.r + c.r;
                    if (d < min) {
                        const push = (min - d) / 2;
                        const nx = dx / d, ny = dy / d;
                        if (a !== drag) { a.x -= nx * push; a.y -= ny * push; }
                        if (c !== drag) { c.x += nx * push; c.y += ny * push; }
                    }
                }
            }
        }
        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (const b of bodies) {
                ctx.save();
                ctx.translate(b.x, b.y); ctx.rotate(b.a);
                ctx.shadowColor = "rgba(0,0,0,0.45)"; ctx.shadowBlur = 22; ctx.shadowOffsetY = 10;
                const rad = 12;
                const x = -b.w / 2, y = -b.h / 2;
                ctx.beginPath();
                ctx.moveTo(x + rad, y);
                ctx.arcTo(x + b.w, y, x + b.w, y + b.h, rad);
                ctx.arcTo(x + b.w, y + b.h, x, y + b.h, rad);
                ctx.arcTo(x, y + b.h, x, y, rad);
                ctx.arcTo(x, y, x + b.w, y, rad);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(b.img, x, y, b.w, b.h);
                ctx.restore();
            }
        }
        function loop() { step(); draw(); raf = requestAnimationFrame(loop); }

        resize();
        const onResize = () => resize();
        window.addEventListener("resize", onResize);
        canvas.addEventListener("mousedown", down);
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
        canvas.addEventListener("touchstart", down, { passive: false });
        window.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("touchend", up);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            canvas.removeEventListener("mousedown", down);
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
            canvas.removeEventListener("touchstart", down);
            window.removeEventListener("touchmove", move);
            window.removeEventListener("touchend", up);
        };
    }, []);
    return (
        <div className="playground">
            <canvas ref={ref} className="playground-canvas" />
            <div className="playground-hint">drag &amp; throw the covers ↗</div>
        </div>
    );
}

/* ---------- ABOUT ---------- */
function About({ content }) {
    const U = content.UI.about;
    return (
        <section className="section" id="about">
            <div className="wrap">
                <div className="section-head reveal">
                    <span className="eyebrow"><span className="slashes">//</span> {U.eyebrow}</span>
                    <h2 className="section-title" dangerouslySetInnerHTML={{ __html: U.title }} />
                </div>
                <div className="about-grid">
                    <div className="about-body reveal">
                        <p dangerouslySetInnerHTML={{ __html: U.p1 }} />
                        <p dangerouslySetInnerHTML={{ __html: U.p2 }} />
                        <div className="about-meta">
                            {U.meta.map((m, i) => (
                                <div className="meta-row" key={i}>
                                    <span className="k">{m.k}</span>
                                    <span className={"v" + (m.accent ? " accent" : "")}>{m.v}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <a className="btn btn-ghost" href={content.PROFILE.cv} target="_blank" rel="noopener">
                                <Icon.download cls="ico-sm" /> {U.downloadCv}
                            </a>
                        </div>
                    </div>
                    <div className="tech-panel reveal">
                        <h3>{U.stack}</h3>
                        <div className="tech-list">
                            {content.TECH.map((t) => (
                                <div className="tech-item" key={t.name}>
                                    <span className="tech-name">{t.name}</span>
                                    <span className="tech-note">{t.note}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------- PROJECTS ---------- */
function ProjectCard({ g, ui }) {
    const open = () => window.open(g.link, "_blank", "noopener");
    const isAppStore = (g.link || "").includes("apps.apple.com");
    return (
        <article className={"card reveal" + (g.featured ? " featured" : "")} onClick={open}
            role="link" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") open(); }}>
            <div className="card-media">
                <span className="card-tag">{g.accentTag}</span>
                {g.badge && <span className="card-badge">🏆 {g.badge}</span>}
                <img src={g.image} alt={g.title + " — game art"} loading="lazy" />
            </div>
            <div className="card-body">
                <div className="card-meta-top">
                    <span className="yr">{g.year}</span><span>·</span><span>{g.genre}</span>
                </div>
                <h3 className="card-title">{g.title}</h3>
                <p className="card-tagline">{g.tagline}</p>
                {g.featured && <p className="card-desc">{g.description}</p>}
                {g.featured ? (
                    <div className="featured-actions">
                        <a className="btn btn-primary" href={g.link} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                            {isAppStore ? <Icon.apple cls="ico-sm" /> : <Icon.itch cls="ico-sm" />} {isAppStore ? ui.playAppStore : ui.playItch}
                        </a>
                        {g.trailer && (
                            <a className="btn btn-ghost" href={g.trailer} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                                <Icon.play cls="ico-sm" /> {ui.watchTrailer}
                            </a>
                        )}
                        {g.code && (
                            <a className="btn btn-ghost" href={g.code} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                                <Icon.code cls="ico-sm" /> {ui.code}
                            </a>
                        )}
                    </div>
                ) : (
                    <div className="card-foot">
                        <div className="platforms">
                            {g.platforms.map((p) => <span className="platform" key={p}>{p}</span>)}
                        </div>
                        {g.code && (
                            <a className="card-icon-link" href={g.code} target="_blank" rel="noopener"
                                onClick={(e) => e.stopPropagation()} aria-label="View source on GitHub" title="Source">
                                <Icon.github cls="ico-sm" />
                            </a>
                        )}
                        {g.trailer && (
                            <a className="card-link card-link-watch" href={g.trailer} target="_blank" rel="noopener"
                                onClick={(e) => e.stopPropagation()} aria-label={ui.watchTrailer}>
                                <Icon.play cls="ico-sm" /> {ui.watch}
                            </a>
                        )}
                        <span className="card-link">{ui.play} <Icon.arrow /></span>
                    </div>
                )}
            </div>
        </article>
    );
}

function Projects({ content }) {
    const U = content.UI.projects;
    return (
        <section className="section" id="projects">
            <div className="wrap">
                <div className="section-head reveal">
                    <span className="eyebrow"><span className="slashes">//</span> {U.eyebrow}</span>
                    <h2 className="section-title">{U.title}</h2>
                    <p className="section-lead">{U.lead}</p>
                </div>
                <div className="proj-grid">
                    {content.GAMES.map((g) => <ProjectCard key={g.id} g={g} ui={U} />)}
                </div>
            </div>
        </section>
    );
}

/* ---------- CONTACT ---------- */
function Contact({ content }) {
    const P = content.PROFILE;
    const U = content.UI.contact;
    const F = content.UI.footer;
    return (
        <section className="section contact" id="contact">
            <div className="wrap">
                <div className="contact-card reveal">
                    <span className="eyebrow"><span className="slashes">//</span> {U.eyebrow}</span>
                    <h2 style={{ marginTop: 16 }}>{U.title}</h2>
                    <p className="contact-lead">{U.lead}</p>
                    <div className="contact-cta">
                        <a className="btn btn-primary" href={"mailto:" + P.email}>
                            <Icon.mail cls="ico-sm" /> {P.email}
                        </a>
                        <a className="btn btn-ghost" href={P.cv} target="_blank" rel="noopener">
                            <Icon.download cls="ico-sm" /> {U.cv}
                        </a>
                    </div>
                    <div className="contact-socials">
                        <a className="social-link" href={P.links.github} target="_blank" rel="noopener"><Icon.github cls="ico-sm" /> GitHub</a>
                        <a className="social-link" href={P.links.linkedin} target="_blank" rel="noopener"><Icon.linkedin cls="ico-sm" /> LinkedIn</a>
                        <a className="social-link" href={P.links.itch} target="_blank" rel="noopener"><Icon.itch cls="ico-sm" /> itch.io</a>
                    </div>
                </div>
                <footer className="footer">
                    <span>{F.text}</span>
                    <div className="footer-links">
                        <a href="#home">{F.top}</a>
                        <a href={P.links.github} target="_blank" rel="noopener">GitHub</a>
                        <a href={P.links.itch} target="_blank" rel="noopener">itch.io</a>
                    </div>
                </footer>
            </div>
        </section>
    );
}

Object.assign(window, { Icon, Nav, Hero, About, Projects, Contact, useTypewriter });
