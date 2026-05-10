import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Cockpit } from "./pages/Cockpit";
import { Lens } from "./pages/Lens";
import { Profile as ProfilePage } from "./pages/Profile";
import { Authority } from "./pages/Authority";
import { About } from "./pages/About";
import { AI_EXPERIENCE_OPTIONS, DOMAIN_OPTIONS, VIGNETTES } from "./data";
import type { Decision, DecisionInput, DecisionMap, PageId, Profile } from "./types";

export function App() {
  const [page, setPage] = useState<PageId>("about");
  const [activeVignette, setActiveVignette] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<DecisionMap>({});
  const [profile, setProfile] = useState<Profile>({
    years: 7,
    domain: DOMAIN_OPTIONS[0],
    aiExp: AI_EXPERIENCE_OPTIONS[1],
  });

  const openLens = (vid: string) => {
    setActiveVignette(vid);
    setPage("lens");
  };

  const recordDecision = (vid: string, payload: DecisionInput) => {
    setDecisions((prev) => ({
      ...prev,
      [vid]: { ...payload, ts: Date.now() } as Decision,
    }));
  };

  const goCockpit = () => setPage("cockpit");

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[264px_1fr]">
      <Sidebar page={page} setPage={setPage} decisions={decisions} />
      <main className="mx-auto w-full max-w-[1200px] px-14 pb-20 pt-10 max-md:px-6">
        {page === "cockpit" && <Cockpit decisions={decisions} openLens={openLens} />}
        {page === "lens" && (
          <Lens
            vignetteId={activeVignette ?? VIGNETTES[0].id}
            openVignette={setActiveVignette}
            decisions={decisions}
            recordDecision={recordDecision}
            backToCockpit={goCockpit}
          />
        )}
        {page === "profile" && <ProfilePage profile={profile} setProfile={setProfile} />}
        {page === "authority" && (
          <Authority
            decisions={decisions}
            profile={profile}
            openVignette={(vid) => {
              setActiveVignette(vid);
              setPage("lens");
            }}
          />
        )}
        {page === "about" && <About goCockpit={goCockpit} />}
      </main>
    </div>
  );
}
