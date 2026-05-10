import { Icon } from "./Icon";
import { cn } from "../lib/cn";
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
}

export function Sidebar({ page, setPage, decisions }: SidebarProps) {
  const decided = Object.keys(decisions).length;

  return (
    <aside className="sticky top-0 flex h-screen flex-col gap-1.5 border-r border-[#0d1622] bg-dark px-[18px] py-7 text-[#e8eaef]">
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

      <div className="mt-auto border-t border-white/10 px-2.5 pt-3 text-[11px] leading-[1.55] text-[#6b758a]">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#7ec47b] shadow-[0_0_0_3px_rgba(126,196,123,0.18)]" />
          <strong className="font-medium text-[#c5cad4]">Models online</strong>
        </div>
        <div className="text-[10.5px] leading-[1.55]">
          Recommendation v3.4 - Calibration v1.2
          <br />
          Last sync - today, 07:42
        </div>
      </div>
    </aside>
  );
}
