export type ConfidenceBucket = "high" | "med" | "low";

export function confidenceBucket(c: number): ConfidenceBucket {
  if (c >= 75) return "high";
  if (c >= 55) return "med";
  return "low";
}

export function confidenceLabel(c: number): string {
  const b = confidenceBucket(c);
  return b === "high" ? "high" : b === "med" ? "medium" : "low";
}

const tokenColor: Record<ConfidenceBucket, string> = {
  high: "#4f7a4a",
  med: "#b8862e",
  low: "#a8503e",
};

export function confidenceColor(c: number): string {
  return tokenColor[confidenceBucket(c)];
}

const pillTone: Record<ConfidenceBucket, "green" | "amber" | "red"> = {
  high: "green",
  med: "amber",
  low: "red",
};

export function confidencePillTone(c: number) {
  return pillTone[confidenceBucket(c)];
}
