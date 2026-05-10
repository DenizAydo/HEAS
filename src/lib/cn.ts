type ClassValue = string | number | false | null | undefined | ClassValue[];

export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  const visit = (v: ClassValue) => {
    if (!v && v !== 0) return;
    if (Array.isArray(v)) {
      v.forEach(visit);
    } else {
      out.push(String(v));
    }
  };
  values.forEach(visit);
  return out.join(" ");
}
