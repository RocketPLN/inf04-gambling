import type { ExamSession } from "../data/exams.js";

export type YearFilter = string;
export type SessionFilter = ExamSession | "all";

export interface ExamSearch {
  q: string;
  year: YearFilter;
  session: SessionFilter;
}

export const DEFAULT_SEARCH: ExamSearch = {
  q: "",
  year: "all",
  session: "all",
};

export function validateSearch(search: Record<string, unknown>): ExamSearch {
  const q = typeof search.q === "string" ? search.q : DEFAULT_SEARCH.q;
  const year = typeof search.year === "string" ? search.year : DEFAULT_SEARCH.year;
  const session =
    search.session === "styczeń" || search.session === "czerwiec"
      ? search.session
      : DEFAULT_SEARCH.session;
  return { q, year, session };
}

export function isDefaultSearch(search: Partial<ExamSearch>): boolean {
  return (
    (search.q ?? DEFAULT_SEARCH.q) === DEFAULT_SEARCH.q &&
    (search.year ?? DEFAULT_SEARCH.year) === DEFAULT_SEARCH.year &&
    (search.session ?? DEFAULT_SEARCH.session) === DEFAULT_SEARCH.session
  );
}

// Zwraca pełny obiekt search z domyślnymi uzupełnionymi. Middleware
// stripSearchParams(DEFAULT_SEARCH) na routach i tak wycina domyślne z URL,
// więc efekt jest identyczny jak "tylko zmienione parametry", a typ Link/navigate
// wymaga pełnego ExamSearch (Partial ani {} nie przechodzą).
export function cleanSearch(search: Partial<ExamSearch>): ExamSearch {
  const q = search.q ?? DEFAULT_SEARCH.q;
  const year = search.year ?? DEFAULT_SEARCH.year;
  const session = search.session ?? DEFAULT_SEARCH.session;
  const out: ExamSearch = { ...DEFAULT_SEARCH };
  if (q !== DEFAULT_SEARCH.q) out.q = q;
  if (String(year) !== String(DEFAULT_SEARCH.year)) out.year = String(year);
  if (session !== DEFAULT_SEARCH.session) out.session = session;
  return out;
}
