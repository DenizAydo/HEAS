export type FeatureFlag = "ok" | "low";

export interface Feature {
  key: string;
  value: string;
  flag: FeatureFlag;
  weight: number;
}

export interface Vignette {
  id: string;
  name: string;
  person: string;
  role: string;
  domain: string;
  setting: string;
  headline: string;
  summary: string;
  fullSituation: string;
  recommendation: string;
  decisionLabel: string;
  confidence: number;
  caveat: string;
  caveatSubgroup: string;
  features: Feature[];
  notConsidered: string[];
  scopeTag: string;
  comparableCases: number;
  lastCalibrated: string;
  trainingData: string;
  modelType: string;
  featureInputs: string;
  notIncluded: string;
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
  | "doc";
