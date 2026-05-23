import type { Vignette } from "./types";

export const VIGNETTES: Vignette[] = [
  {
    id: "mira",
    name: "Sara",
    person: "Mira",
    role: "Care Ward Lead",
    domain: "Care",
    setting: "Care ward planning",
    headline: "Saturday Late-Shift Staffing",
    summary:
      "One team member is missing for Saturday's late shift. Sara is qualified for the shift, but two weeks ago an older patient died during her shift.",
    fullSituation:
      "Mira leads a care ward. It is Thursday morning and she is planning the late shift for the coming weekend. One person is still missing. Mira is considering Sara, one of her nurses. Sara is good at the job and has been on the team for two years. Two weeks ago, however, an older patient died during Sara's shift. Since then, Sara has told Mira twice that she is sleeping poorly. Mira has to decide whether to schedule Sara for Saturday's late shift or find someone else, which would mean Mira covering the shift herself.",
    recommendation: "Assign Sara to the late shift on Saturday",
    decisionLabel: "Shift Assignment",
    confidence: 84,
    caveat:
      "Reliability decreases for employees with critical incidents in the last 30 days.",
    caveatSubgroup: "critical incidents in the last 30 days",
    features: [
      { key: "Qualification", value: "covers all duties", flag: "ok", weight: 30 },
      { key: "Saturday availability", value: "released", flag: "ok", weight: 25 },
      { key: "Workload index (4 weeks)", value: "3.1 / 5", flag: "ok", weight: 20 },
      { key: "Open vacation/sick notices", value: "none", flag: "ok", weight: 15 },
      { key: "Time on this team", value: "24 months", flag: "ok", weight: 10 },
    ],
    notConsidered: [
      "Personal conversations between employee and manager",
      "Informal observations during shift work",
      "Events that are not documented in the system",
      "Subjective stress beyond the workload index",
    ],
    scopeTag: "Applies only to employees who have worked on this team for at least 6 months",
    comparableCases: 14280,
    lastCalibrated: "Today, 07:42",
    trainingData: "14,280 shift assignments across 12 care wards (2022-2025)",
    modelType: "Gradient-boosted classifier with constraint optimization layer",
    featureInputs: "HR records, shift logs, skill certifications, absence history, patient acuity scores",
    notIncluded: "informal conversations, emotional state, unreported incidents",
  },
];

export const OVERRIDE_TAGS = [
  "Personal observation",
  "Ethical concern",
  "Team dynamics",
  "Current context not in data",
  "Experience / tacit knowledge",
  "Timing factor",
  "Other",
];

export const DOMAIN_OPTIONS = [
  "Care / Health",
  "Retail",
  "Mechanical Engineering / Production",
  "Logistics",
  "Administration / Public Sector",
  "Other",
];

export const AI_EXPERIENCE_OPTIONS = [
  "No experience",
  "Used occasionally",
  "Used regularly at work",
  "Daily work with AI recommendations",
];
