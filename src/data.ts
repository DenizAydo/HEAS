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
  {
    id: "tom",
    name: "North District Branch",
    person: "Tom",
    role: "Drugstore Branch Manager",
    domain: "Retail",
    setting: "Drugstore branch, 22 employees",
    headline: "Early-Shift Reduction at Neighborhood Branch",
    summary:
      "AI recommends reducing the early shift by 1.5 positions. Three weeks ago a new care home opened nearby, and residents are increasingly visiting in the morning.",
    fullSituation:
      "Tom manages a drugstore branch with 22 employees in a neighborhood undergoing demographic change. It is Monday morning and he is planning staffing for the coming week. The AI suggests reducing the early shift. Tom knows, however, that a new care home opened in the neighborhood three weeks ago. Since then, residents have come into the branch every morning, often in groups and often with specific questions. Tom has observed this himself but has not yet had time to report it.",
    recommendation: "Reduce the early shift next week by 1.5 positions",
    decisionLabel: "Staff Planning",
    confidence: 76,
    caveat:
      "Reliability decreases when recent changes in the catchment area are not yet visible in the 12-month data.",
    caveatSubgroup: "new structural changes in the catchment area",
    features: [
      { key: "Early-shift sales (12 mo.)", value: "-22% vs. branch average", flag: "low", weight: 35 },
      { key: "Morning footfall sensors", value: "-31% visits", flag: "low", weight: 30 },
      { key: "Planned promotions / deliveries", value: "none", flag: "ok", weight: 20 },
      { key: "Weather forecast", value: "no special events", flag: "ok", weight: 15 },
    ],
    notConsidered: [
      "Neighborhood changes outside the 12-month data window",
      "New openings (care homes, schools, practices, construction projects)",
      "Personal observations by branch management in day-to-day operations",
      "Qualitative customer interactions (advice conversations, group purchases)",
    ],
    scopeTag: "Applies only to branches with a stable catchment area",
    comparableCases: 8420,
    lastCalibrated: "Today, 06:30",
    trainingData: "8,420 weekly schedules across 142 drugstore branches (2021-2025)",
    modelType: "Gradient-boosted regressor with seasonality decomposition",
    featureInputs: "POS sales, footfall sensors, promotion calendars, regional weather data",
    notIncluded: "neighborhood changes outside the 12-month data window, branch-manager observations, qualitative customer interactions",
  },
  {
    id: "jens",
    name: "Line 4 - Configuration B",
    person: "Jens",
    role: "Production Line Shift Lead",
    domain: "Mechanical Engineering",
    setting: "Production line, 14 employees",
    headline: "Speed Change to 1,850 rpm",
    summary:
      "AI optimized Configuration B overnight: +8% daily output. From 12 years of experience, Jens knows that an older lathe vibrates at this speed, but this is undocumented.",
    fullSituation:
      "Jens is the shift lead on a production line with 14 employees at a mid-sized mechanical engineering company. It is 6:15 a.m., just before the shift begins. Overnight, the AI optimized the machine configuration for today's early shift and proposes a speed that, according to the forecast, would increase daily output by eight percent. Jens has known the line for twelve years. He knows that one of the older lathes starts to vibrate at exactly this speed sometime during the morning, and then scrap increases noticeably. He has never documented this observation.",
    recommendation: "Use machine Configuration B (speed 1,850 rpm) for today's early shift",
    decisionLabel: "Machine Configuration",
    confidence: 81,
    caveat:
      "Reliability decreases for machines with special behavior not captured by installed sensors.",
    caveatSubgroup: "machines with uncaptured special behavior",
    features: [
      { key: "Order mix matches Config B", value: "comparable to 90 d", flag: "ok", weight: 30 },
      { key: "Sensor values across machines", value: "within normal range", flag: "ok", weight: 25 },
      { key: "Last maintenance", value: "18 days ago, no open tickets", flag: "ok", weight: 25 },
      { key: "Forecast productivity gain", value: "+8% vs. Config A", flag: "ok", weight: 20 },
    ],
    notConsidered: [
      "Machine behavior outside the installed sensor coverage",
      "Shift lead experience with individual machines",
      "Acoustic / haptic signals during live operation",
      "Historical observations from before sensor rollout",
    ],
    scopeTag: "Applies only to machines without documented special behavior in the last 24 months",
    comparableCases: 6150,
    lastCalibrated: "Tonight, 02:18",
    trainingData: "6,150 production runs across 9 lines (2020-2025)",
    modelType: "Constrained reinforcement-learning policy with simulator pre-training",
    featureInputs: "machine sensor telemetry, order specifications, maintenance logs, throughput history",
    notIncluded: "machine behavior outside sensor coverage, shift-lead tacit experience, acoustic and haptic signals",
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
