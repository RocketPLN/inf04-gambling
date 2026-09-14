import { useEffect } from "react";
import { createFileRoute, getRouteApi, Link, notFound, stripSearchParams, useNavigate } from "@tanstack/react-router";
import { exams } from "../data/exams.js";
import { DEFAULT_SEARCH, cleanSearch, validateSearch } from "../lib/search.js";
import { PlanDetail } from "../components/app/plan-detail.jsx";
import { Button } from "../components/ui/button.jsx";
import { Alert, AlertDescription } from "../components/ui/alert.jsx";

const examRouteApi = getRouteApi("/egzamin/$examId");

function ExamPage() {
  const { examId } = examRouteApi.useParams();
  const search = examRouteApi.useSearch();
  const navigate = useNavigate();
  const exam = exams.find((e) => e.id === examId);

  useEffect(() => {
    document.title = exam ? `${exam.title} – INF.04 Portal` : "Nie znaleziono arkusza – INF.04 Portal";
    window.scrollTo({ top: 0 });
  }, [examId, exam]);

  if (!exam) {
    return (
      <Alert className="mt-3.5 text-center">
        <AlertDescription>
          Nie znaleziono arkusza <b>{examId}</b>.
          <br />
          <Button variant="ink" size="sm" className="mt-3 inline-flex" asChild>
            <Link to="/" search={{}}>
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
          search: cleanSearch(search),
        })
      }
    />
  );
}

export const Route = createFileRoute("/egzamin/$examId")({
  component: ExamPage,
  validateSearch,
  search: {
    middlewares: [stripSearchParams(DEFAULT_SEARCH)],
  },
  loader: ({ params }) => {
    const exam = exams.find((e) => e.id === params.examId);
    if (!exam) throw notFound();
    return { examId: exam.id };
  },
  errorComponent: ({ error }) => (
    <Alert className="mt-3.5 text-center">
      <AlertDescription>
        Coś poszło nie tak przy wczytywaniu arkusza.
        <br />
        <span className="font-mono text-xs">{String(error?.message ?? error)}</span>
        <br />
        <Link to="/" search={{}} className="mt-3 inline-block underline">
          ← Wróć do listy
        </Link>
      </AlertDescription>
    </Alert>
  ),
  notFoundComponent: () => (
    <Alert className="mt-3.5 text-center">
      <AlertDescription>
        Nie znaleziono arkusza.
        <br />
        <Link to="/" search={{}} className="mt-3 inline-block underline">
          ← Wróć do listy
        </Link>
      </AlertDescription>
    </Alert>
  ),
});
