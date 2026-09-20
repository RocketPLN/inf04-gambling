import type { Exam } from "../data/exams.js";

export type ExamKind = "mobilna" | "desktopowa" | "webowa";
export type ExamKindFilter = ExamKind | "all";

export interface ExamKindMeta {
  id: ExamKindFilter;
  label: string;
  hint: string;
}

export const EXAM_KINDS: ExamKindMeta[] = [
  { id: "all", label: "Wszystkie", hint: "losuj z całej puli" },
  { id: "mobilna", label: "Mobilna", hint: "MAUI / Android" },
  { id: "desktopowa", label: "Desktopowa", hint: "WPF / WinForms" },
  { id: "webowa", label: "Webowa", hint: "React / Angular" },
];

function haystack(exam: Exam): string {
  const groups = exam.scoring.map((g) => `${g.grupa} ${g.kryteria.map((k) => k.opis).join(" ")}`).join(" ");
  return `${exam.tech.join(" ")} ${exam.subtitle} ${exam.plan.opis} ${groups}`.toLowerCase();
}

export function getExamKind(exam: Exam): ExamKind {
  const tech = exam.tech.join(" ").toLowerCase();
  if (tech.includes("react") || tech.includes("angular") || tech.includes("bootstrap")) {
    return "webowa";
  }
  if (tech.includes("wpf") || tech.includes("winforms") || tech.includes("desktop")) {
    return "desktopowa";
  }
  if (tech.includes("maui") || tech.includes("android")) {
    return "mobilna";
  }
  const hay = haystack(exam);
  if (hay.includes("web")) return "webowa";
  if (hay.includes("desktop")) return "desktopowa";
  if (hay.includes("mobil")) return "mobilna";
  return "mobilna";
}

export function filterByKind(list: Exam[], kind: ExamKindFilter): Exam[] {
  if (kind === "all") return list;
  return list.filter((e) => getExamKind(e) === kind);
}

export function countByKind(list: Exam[]): Record<ExamKind, number> {
  const out: Record<ExamKind, number> = { mobilna: 0, desktopowa: 0, webowa: 0 };
  for (const e of list) {
    out[getExamKind(e)] += 1;
  }
  return out;
}

export function drawRandom(list: Exam[], excludeId?: string): Exam | null {
  const pool = excludeId ? list.filter((e) => e.id !== excludeId) : list;
  if (pool.length === 0) return list.length > 0 ? list[0] : null;
  return pool[Math.floor(Math.random() * pool.length)];
}
