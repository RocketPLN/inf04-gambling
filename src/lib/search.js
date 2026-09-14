export const DEFAULT_SEARCH = {
  q: "",
  year: "all",
  session: "all",
};

export function validateSearch(search) {
  const q = typeof search.q === "string" ? search.q : DEFAULT_SEARCH.q;
  const year = typeof search.year === "string" ? search.year : DEFAULT_SEARCH.year;
  const session =
    search.session === "styczeń" || search.session === "czerwiec"
      ? search.session
      : DEFAULT_SEARCH.session;
  return { q, year, session };
}

export function isDefaultSearch(search) {
  return (
    (search.q ?? DEFAULT_SEARCH.q) === DEFAULT_SEARCH.q &&
    (search.year ?? DEFAULT_SEARCH.year) === DEFAULT_SEARCH.year &&
    (search.session ?? DEFAULT_SEARCH.session) === DEFAULT_SEARCH.session
  );
}

// Zwraca tylko zmienione parametry. Gdy filtry są domyślne -> {} (czysty URL bez ?q=&year=all...).
// Używane w filtrach i Linkach do egzaminu, żeby nie doklejać parametrów na siłę.
export function cleanSearch(search) {
  const out = {};
  const q = search.q ?? DEFAULT_SEARCH.q;
  const year = search.year ?? DEFAULT_SEARCH.year;
  const session = search.session ?? DEFAULT_SEARCH.session;
  if (q !== DEFAULT_SEARCH.q) out.q = q;
  if (String(year) !== String(DEFAULT_SEARCH.year)) out.year = String(year);
  if (session !== DEFAULT_SEARCH.session) out.session = session;
  return out;
}
