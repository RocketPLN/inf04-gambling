import { useEffect } from "react";
import { createFileRoute, getRouteApi, Link, notFound, stripSearchParams, useNavigate } from "@tanstack/react-router";
import { exams } from "../data/exams.js";
import { DEFAULT_SEARCH, cleanSearch, validateSearch } from "../lib/search.js";
import { PlanDetail } from "../components/app/plan-detail.jsx";
import { Button } from "../components/ui/button.jsx";
import { Alert, AlertDescription } from "../components/ui/alert.jsx";
import { useWallet } from "../hooks/use-wallet.js";
import { useBodyClass } from "../hooks/use-body-class.js";

const examRouteApi = getRouteApi("/egzamin/$examId");

function ExamPage() {
  const { examId } = examRouteApi.useParams();
  const search = examRouteApi.useSearch();
  const navigate = useNavigate();
  const exam = exams.find((e) => e.id === examId);

  // TRYB SKUPIENIA ze sklepu: na stronie arkusza chowa całe kasyno (CSS).
  const { flagActive } = useWallet();
  useBodyClass("focus-mode", flagActive("tryb-skupienia"));

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [examId]);

  if (!exam) {
    return (
      <Alert className="mt-3.5 text-center">
        <AlertDescription>
          Nie znaleziono arkusza <b>{examId}</b>.
          <br />
          <Button variant="ink" size="sm" className="mt-3 inline-flex" asChild>
            <Link to="/" search={DEFAULT_SEARCH}>
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
  head: ({ params }: { params: { examId: string } }) => {
    const exam = exams.find((e) => e.id === params.examId);
    return {
      meta: [
        {
          title: exam ? `${exam.title} – INF.04 Portal` : "Nie znaleziono arkusza – INF.04 Portal",
        },
        ...(exam
          ? [
              {
                name: "description",
                content: `${exam.title} (${exam.year}, ${exam.session}) – podgląd arkusza PDF i punktacja CKE. ${exam.subtitle}`,
              },
            ]
          : []),
      ],
    };
  },
  search: {
    middlewares: [stripSearchParams(DEFAULT_SEARCH)],
  },
  loader: ({ params }: { params: { examId: string } }) => {
    const exam = exams.find((e) => e.id === params.examId);
    if (!exam) throw notFound();
    return { examId: exam.id };
  },
  errorComponent: ({ error }: { error: unknown }) => (
    <Alert className="mt-3.5 text-center">
      <AlertDescription>
        Coś poszło nie tak przy wczytywaniu arkusza.
        <br />
        <span className="font-mono text-xs">{String(error instanceof Error ? error.message : error)}</span>
        <br />
        <Link to="/" search={DEFAULT_SEARCH} className="mt-3 inline-block underline">
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
        <Link to="/" search={DEFAULT_SEARCH} className="mt-3 inline-block underline">
          ← Wróć do listy
        </Link>
      </AlertDescription>
    </Alert>
  ),
});
