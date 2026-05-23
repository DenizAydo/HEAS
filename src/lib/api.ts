import { getParticipantId } from "./participant";
import type { DecisionInput, DecisionMap, Profile } from "../types";

interface StateResponse {
  decisions: DecisionMap;
  profile: Profile | null;
}

async function request(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(path, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-participant-id": getParticipantId(),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res;
}

export async function loadState(): Promise<StateResponse> {
  const res = await request("/api/state");
  return (await res.json()) as StateResponse;
}

export async function saveDecision(vid: string, input: DecisionInput): Promise<void> {
  await request(`/api/decisions/${encodeURIComponent(vid)}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function saveProfile(profile: Profile): Promise<void> {
  await request("/api/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
}
