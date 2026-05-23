import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Cockpit } from "./pages/Cockpit";
import { Lens } from "./pages/Lens";
import { Profile as ProfilePage } from "./pages/Profile";
import { Authority } from "./pages/Authority";
import { About } from "./pages/About";
import { AI_EXPERIENCE_OPTIONS, DOMAIN_OPTIONS, VIGNETTES } from "./data";
import { lastHalfHour } from "./lib/time";
import { loadState, saveDecision, saveProfile } from "./lib/api";
import { applyTheme, getInitialTheme, persistTheme, type Theme } from "./lib/theme";
import { PAGE_PATHS } from "./types";
import type { Decision, DecisionInput, DecisionMap, PageId, Profile } from "./types";

const PATH_TO_PAGE: Record<string, PageId> = {
  "/": "cockpit",
  "/inbox": "cockpit",
  "/recommendation-review": "lens",
  "/profile": "profile",
  "/decision-insights": "authority",
  "/about": "about",
};

const DEFAULT_PROFILE: Profile = {
  years: 7,
  domain: DOMAIN_OPTIONS[0],
  aiExp: AI_EXPERIENCE_OPTIONS[1],
};

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const page: PageId = PATH_TO_PAGE[location.pathname] ?? "cockpit";
  const [activeVignette, setActiveVignette] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<DecisionMap>({});
  const [navOpen, setNavOpen] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(() => lastHalfHour(new Date()));
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const profileHydrated = useRef(false);
  const profileSaveTimer = useRef<number | null>(null);

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  const toggleTheme = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    let cancelled = false;
    loadState()
      .then((state) => {
        if (cancelled) return;
        setDecisions(state.decisions);
        if (state.profile) setProfile(state.profile);
        profileHydrated.current = true;
      })
      .catch((err) => {
        console.error("Failed to load state from API:", err);
        profileHydrated.current = true;
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!profileHydrated.current) return;
    if (profileSaveTimer.current !== null) {
      window.clearTimeout(profileSaveTimer.current);
    }
    profileSaveTimer.current = window.setTimeout(() => {
      void saveProfile(profile).catch((err) =>
        console.error("Failed to save profile:", err),
      );
    }, 500);
    return () => {
      if (profileSaveTimer.current !== null) {
        window.clearTimeout(profileSaveTimer.current);
      }
    };
  }, [profile]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLastSync((prev) => {
        const next = lastHalfHour(new Date());
        return next.getTime() === prev.getTime() ? prev : next;
      });
    }, 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  const openLens = (vid: string) => {
    setActiveVignette(vid);
    navigate(PAGE_PATHS.lens);
  };

  const recordDecision = (vid: string, payload: DecisionInput) => {
    setDecisions((prev) => ({
      ...prev,
      [vid]: { ...payload, ts: Date.now() } as Decision,
    }));
    void saveDecision(vid, payload).catch((err) =>
      console.error("Failed to save decision:", err),
    );
  };

  const goCockpit = () => navigate(PAGE_PATHS.cockpit);

  const handleNav = (p: PageId) => {
    navigate(PAGE_PATHS[p]);
    setNavOpen(false);
  };

  return (
    <div className="min-h-screen md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] xl:grid-cols-[264px_1fr] fhd:grid-cols-[280px_1fr]">
      <MobileTopBar onMenuClick={() => setNavOpen(true)} />
      <Sidebar
        page={page}
        setPage={handleNav}
        decisions={decisions}
        mobileOpen={navOpen}
        onMobileClose={() => setNavOpen(false)}
        lastSync={lastSync}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-12 pt-4 sm:px-6 md:px-8 md:pb-20 md:pt-10 lg:px-12 xl:px-14 max-md:pt-16 fhd:max-w-[1440px]">
        <Routes>
          <Route
            path="/"
            element={<Cockpit decisions={decisions} openLens={openLens} lastSync={lastSync} />}
          />
          <Route
            path="/inbox"
            element={<Cockpit decisions={decisions} openLens={openLens} lastSync={lastSync} />}
          />
          <Route
            path="/recommendation-review"
            element={
              <Lens
                vignetteId={activeVignette ?? VIGNETTES[0].id}
                openVignette={setActiveVignette}
                decisions={decisions}
                recordDecision={recordDecision}
                backToCockpit={goCockpit}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProfilePage profile={profile} setProfile={setProfile} />}
          />
          <Route
            path="/decision-insights"
            element={
              <Authority
                decisions={decisions}
                profile={profile}
                openVignette={(vid) => {
                  setActiveVignette(vid);
                  navigate(PAGE_PATHS.lens);
                }}
              />
            }
          />
          <Route path="/about" element={<About goCockpit={goCockpit} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function MobileTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-[#0d1622] bg-dark px-4 text-white md:hidden">
      <div className="flex items-center gap-2.5">
        <span
          className="h-6 w-6 rounded-full ring-1 ring-inset ring-gold/40"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #d4a853 0%, #d4a853 35%, transparent 36%), conic-gradient(from 210deg, #0d1622, #2b3648, #0d1622)",
          }}
        />
        <span className="font-serif text-[15px] font-semibold tracking-tight">
          Decision Review
        </span>
      </div>
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#c5cad4] hover:bg-white/5 hover:text-white"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <line x1="3" y1="5" x2="17" y2="5" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="15" x2="17" y2="15" />
        </svg>
      </button>
    </header>
  );
}
