import type { Vignette } from "./types";

export const VIGNETTES: Vignette[] = [
  {
    id: "mira",
    name: "Pizzeria",
    person: "Pizzeria",
    role: "Shift Manager - Delivery Service",
    domain: "Gastronomy - Delivery Service",
    setting: "Pizzeria with delivery service - regular 5 drivers",
    timing: "Weekly planning",
    headline: "Friday, June 13 - two additional drivers",
    summary:
      "The algorithmic scheduling system has issued a recommendation for Friday, June 13: schedule two additional drivers (7 instead of the usual 5) at 80% confidence.",
    fullSituation:
      "Friday is shaping up to be a busy night. Based on the coming week's data, the system has reviewed the driver schedule for Friday and prepared a recommendation for your review. Below you'll find the suggested number of drivers, the factors behind it, and the limits of what the system can account for. The final decision is yours to make.",
    recommendation: "Friday, June 13 - two additional drivers",
    decisionLabel: "Driver Scheduling",
    confidence: 80,
    recommendedCount: 7,
    usualCount: 5,
    countUnit: "Drivers",
    factors: [
      { name: "Forecasted order volume", contribution: "+48% vs. normal Friday" },
      { name: "Weather forecast", contribution: "Rain from 6:00 PM - elevated delivery demand" },
      { name: "Comparable Fridays (last 8 weeks)", contribution: "Avg. 6.8 drivers required" },
      { name: "Average delivery time", contribution: "Currently within normal range" },
    ],
    whatSystemKnows: [
      "Order history from recent months",
      "Weather forecast for Friday",
      "Average delivery times",
      "Seasonal demand patterns",
    ],
    whatSystemDoesntKnow: [
      "How well drivers work together under pressure",
      "Personal circumstances affecting a driver's performance",
      "Informal arrangements within the team",
      "Whether tonight calls for a more experienced lineup",
    ],
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
