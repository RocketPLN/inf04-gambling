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
