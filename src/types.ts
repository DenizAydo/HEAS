export interface Factor {
  name: string;
  contribution: string;
}

export interface Vignette {
  id: string;
  name: string;
  person: string;
  role: string;
  domain: string;
  setting: string;
  timing: string;
  headline: string;
  summary: string;
  fullSituation: string;
  recommendation: string;
  decisionLabel: string;
  confidence: number;
  recommendedCount: number;
  usualCount: number;
  countUnit: string;
  factors: Factor[];
  whatSystemKnows: string[];
  whatSystemDoesntKnow: string[];
}

export interface AcceptedDecision {
  kind: "accepted";
  ts: number;
  context: string;
  justification: string;
}

export interface OverrideDecision {
  kind: "override";
  tags: string[];
  reason: string;
  ts: number;
  context: string;
  justification: string;
}

export type Decision = AcceptedDecision | OverrideDecision;

/**
 * Distributive Omit - preserves discriminated unions so that
 * removing the `ts` field still keeps each branch's `kind` discriminator
 * tied to its other branch-specific fields.
 */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type DecisionInput = DistributiveOmit<Decision, "ts">;

export type DecisionMap = Record<string, Decision>;

export interface Profile {
  years: number;
  domain: string;
  aiExp: string;
}

export type PageId = "cockpit" | "lens" | "profile" | "authority" | "about";

export const PAGE_PATHS: Record<PageId, string> = {
  cockpit: "/inbox",
  lens: "/recommendation-review",
  profile: "/profile",
  authority: "/decision-insights",
  about: "/about",
};

export interface NavEntry {
  id: PageId;
  label: string;
  icon: IconName;
  num: string;
}

export type IconName =
  | "cockpit"
  | "lens"
  | "profile"
  | "map"
  | "info"
  | "arrow"
  | "back"
  | "check"
  | "x"
  | "alert"
  | "scope"
  | "lock"
  | "spark"
  | "doc"
  | "sun"
  | "moon";
