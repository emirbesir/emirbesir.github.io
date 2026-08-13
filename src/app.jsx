/* ============================================================
   Portfolio - app root
   ------------------------------------------------------------
   Look is locked to the chosen design (wall hero, Space +
   Hanken fonts, purple accent). Visitors can toggle dark/light
   theme and EN/TR language; both persist in localStorage.
   ============================================================ */
const { useState, useEffect } = React;

/* locked design choices */
const ACCENT = "#8b7cf6";
const HERO_STYLE = "wall";
const FONT = { display: '"Space Grotesk", sans-serif', body: '"Hanken Grotesk", sans-serif' };

/* light/dark token sets */
const THEMES = {
  dark: {
    "--bg": "#0b0d13", "--bg-2": "#10131c", "--card": "#141824", "--card-2": "#1a1f2e",
    "--border": "rgba(255,255,255,0.09)", "--border-strong": "rgba(255,255,255,0.16)",
    "--text": "#eef0f6", "--muted": "#98a0b3", "--faint": "#5c6478",
    "--shadow": "0 24px 60px -20px rgba(0,0,0,0.6)", "--accent-ink": "#0b0d13",
  },
  light: {
    "--bg": "#f7f7fb", "--bg-2": "#ffffff", "--card": "#ffffff", "--card-2": "#f1f2f7",
    "--border": "rgba(15,18,30,0.10)", "--border-strong": "rgba(15,18,30,0.18)",
    "--text": "#161a26", "--muted": "#5a6175", "--faint": "#9aa1b4",
    "--shadow": "0 24px 50px -24px rgba(20,24,40,0.28)", "--accent-ink": "#ffffff",
  },
};

function hexToSoft(hex, a) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0,2),16), g = parseInt(m.slice(2,4),16), b = parseInt(m.slice(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

function applyTokens(theme) {
  const root = document.documentElement;
  const th = THEMES[theme] || THEMES.dark;
  Object.entries(th).forEach(([k, v]) => root.style.setProperty(k, v));
  root.style.setProperty("--accent", ACCENT);
  root.style.setProperty("--accent-soft", hexToSoft(ACCENT, theme === "light" ? 0.12 : 0.16));
  root.style.setProperty("--accent-ink", theme === "light" ? "#ffffff" : "#0b0d13");
  root.style.setProperty("--font-display", FONT.display);
  root.style.setProperty("--font-body", FONT.body);
  root.setAttribute("data-theme", theme);
}

/* localStorage helpers (guarded for private-mode failures) */
function readPref(key, fallback) {
  try { const v = localStorage.getItem(key); return v == null ? fallback : v; }
  catch (e) { return fallback; }
}
function writePref(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
}

/* scroll reveal, re-bind whenever content (language) changes */
function useReveal(dep) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95) el.classList.add("in");
      else obs.observe(el);
    });
    return () => obs.disconnect();
  }, [dep]);
}

function App() {
  const [theme, setTheme] = useState(() => (readPref("theme", "dark") === "light" ? "light" : "dark"));
  const [lang, setLang] = useState(() => (readPref("lang", "en") === "tr" ? "tr" : "en"));

  useEffect(() => { applyTokens(theme); writePref("theme", theme); }, [theme]);
  useEffect(() => { writePref("lang", lang); document.documentElement.setAttribute("lang", lang); }, [lang]);

  const content = resolveContent(lang);
  useReveal(lang);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((l) => (l === "en" ? "tr" : "en"));

  return (
    <React.Fragment>
      <Nav content={content} theme={theme} lang={lang} onToggleTheme={toggleTheme} onToggleLang={toggleLang} />
      <main>
        <Hero content={content} heroStyle={HERO_STYLE} />
        <About content={content} />
        <Projects content={content} />
        <Contact content={content} />
      </main>
    </React.Fragment>
  );
}

// initial paint before React mounts (avoid flash)
applyTokens(readPref("theme", "dark") === "light" ? "light" : "dark");

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
