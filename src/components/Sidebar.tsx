import { Icon } from "./Icon";
import { cn } from "../lib/cn";
import { formatClockTime } from "../lib/time";
import type { Theme } from "../lib/theme";
import type { DecisionMap, NavEntry, PageId } from "../types";

const NAV: NavEntry[] = [
  { id: "cockpit", label: "Inbox", icon: "cockpit", num: "01" },
  { id: "lens", label: "Recommendation Review", icon: "lens", num: "02" },
  { id: "profile", label: "Profile & Context", icon: "profile", num: "03" },
  { id: "authority", label: "Decision Insights", icon: "map", num: "04" },
  { id: "about", label: "How it works", icon: "info", num: "05" },
];

interface SidebarProps {
  page: PageId;
  setPage: (p: PageId) => void;
  decisions: DecisionMap;
  mobileOpen: boolean;
  onMobileClose: () => void;
  lastSync: Date;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Sidebar({
  page,
  setPage,
  decisions,
  mobileOpen,
  onMobileClose,
  lastSync,
  theme,
  onToggleTheme,
}: SidebarProps) {
  const decided = Object.keys(decisions).length;

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 animate-fadeIn bg-ink/55 backdrop-blur-[2px] md:hidden"
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-[280px] max-w-[85vw] flex-col gap-1.5",
          "border-r border-[#0d1622] bg-dark px-[18px] py-7 text-[#e8eaef]",
          "transition-transform duration-200 ease-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:sticky md:top-0 md:z-auto md:w-auto md:max-w-none md:translate-x-0",
        )}
      >
        <button
          type="button"
          onClick={onMobileClose}
          aria-label="Close menu"
          className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-md text-[#8d97a8] hover:bg-white/5 hover:text-white md:hidden"
        >
          <Icon name="x" size={18} />
        </button>
        <div className="mb-4 border-b border-white/10 px-2.5 pb-[22px]">
        <div className="mb-2.5 inline-flex items-center gap-2.5">
          <span
            className="h-7 w-7 rounded-full ring-1 ring-inset ring-gold/40"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #d4a853 0%, #d4a853 35%, transparent 36%), conic-gradient(from 210deg, #0d1622, #2b3648, #0d1622)",
            }}
          />
          <div>
            <div className="font-serif text-base font-semibold leading-tight tracking-tight">
              Decision Review
            </div>
            <div className="mt-0.5 text-[10.5px] uppercase tracking-[0.08em] text-[#8d97a8]">
              Hybrid Manager - AI Co-Pilot
            </div>
          </div>
        </div>
      </div>

      <div className="px-2.5 pb-1.5 pt-3.5 text-[10px] uppercase tracking-[0.14em] text-[#6b758a]">
        Workspace
      </div>

      {NAV.map((n) => {
        const active = page === n.id;
        return (
          <button
            key={n.id}
            onClick={() => setPage(n.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13.5px] transition-colors duration-100",
              active
                ? "bg-gold/[0.14] text-gold"
                : "text-[#c5cad4] hover:bg-white/5 hover:text-white",
            )}
          >
            <span
              className={cn(
                "inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border font-mono text-[10.5px]",
                active ? "border-gold text-gold" : "border-[#4a5568] text-[#8d97a8]",
              )}
            >
              {n.num}
            </span>
            <Icon name={n.icon} size={16} stroke={1.6} />
            <span>{n.label}</span>
            {n.id === "authority" && decided > 0 && (
              <span className="ml-auto font-mono text-[11px] text-gold">{decided}</span>
            )}
          </button>
        );
      })}

      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="mt-auto flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[12.5px] text-[#c5cad4] transition-colors hover:bg-white/5 hover:text-white"
      >
        <span className="inline-flex h-5 w-5 flex-none items-center justify-center text-[#8d97a8]">
          <Icon name={theme === "dark" ? "sun" : "moon"} size={15} stroke={1.7} />
        </span>
        <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
      </button>

      <div className="border-t border-white/10 px-2.5 pt-3 text-[11px] leading-[1.55] text-[#6b758a]">
        <div className="font-medium text-[#c5cad4]">Last sync {formatClockTime(lastSync)}</div>
        <div className="mt-0.5 text-[10.5px]">Auto-sync every 30 min</div>
      </div>
      </aside>
    </>
  );
}
