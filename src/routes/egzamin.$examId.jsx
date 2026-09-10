import { useEffect } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { exams } from "../data/exams.js";
import { DEFAULT_SEARCH, validateSearch } from "../lib/search.js";
import { PlanDetail } from "../components/app/plan-detail.jsx";
import { Button } from "../components/ui/button.jsx";
import { Alert, AlertDescription } from "../components/ui/alert.jsx";

function ExamPage() {
  const { examId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const exam = exams.find((e) => e.id === examId);

  useEffect(() => {
    if (exam) {
      document.title = `${exam.title} – INF.04 Portal`;
    } else {
      document.title = "Nie znaleziono arkusza – INF.04 Portal";
    }
    window.scrollTo({ top: 0 });
  }, [examId, exam]);

  if (!exam) {
    return (
      <Alert className="mt-3.5 text-center">
        <AlertDescription>
          Nie znaleziono arkusza <b>{examId}</b>.
          <br />
          <Button variant="ink" size="sm" className="mt-3 inline-flex" asChild>
            <Link to="/" search={{ ...DEFAULT_SEARCH }} style={{ textDecoration: "none" }}>
              ← Wróć do listy
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <PlanDetail
      exam={exam}
      onBack={() =>
        navigate({
          to: "/",
          search: {
            q: search.q ?? DEFAULT_SEARCH.q,
            year: search.year ?? DEFAULT_SEARCH.year,
            session: search.session ?? DEFAULT_SEARCH.session,
          },
        })
      }
    />
  );
}

export const Route = createFileRoute("/egzamin/$examId")({
  component: ExamPage,
  validateSearch,
  loader: ({ params }) => {
    const exam = exams.find((e) => e.id === params.examId);
    if (!exam) throw notFound();
    return { examId: exam.id };
  },
  notFoundComponent: () => (
    <Alert className="mt-3.5 text-center">
      <AlertDescription>
        Nie znaleziono arkusza.
        <br />
        <Link to="/" search={{ ...DEFAULT_SEARCH }} className="mt-3 inline-block underline">
          ← Wróć do listy
        </Link>
      </AlertDescription>
    </Alert>
  ),
});
