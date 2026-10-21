import { useEffect, type ReactNode } from "react";
import { createFileRoute, getRouteApi, Link, notFound, stripSearchParams, useNavigate } from "@tanstack/react-router";
import { exams } from "../data/exams.js";
import { DEFAULT_SEARCH, cleanSearch, validateSearch } from "../lib/search.js";
import { PlanDetail } from "../components/app/plan-detail.jsx";
import { Button } from "../components/ui/button.jsx";
import { useWallet } from "../hooks/use-wallet.js";
import { useBodyClass } from "../hooks/use-body-class.js";

const examRouteApi = getRouteApi("/egzamin/$examId");

function ReturnToListButton() {
  return (
    <Button variant="default" size="sm" asChild>
      <Link to="/" search={DEFAULT_SEARCH} style={{ textDecoration: "none" }}>
        Wróć do listy
      </Link>
    </Button>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <section className="mt-6 bg-kartka border border-linia rounded-lg shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)] px-4 py-8 text-center sm:px-6">
      {children}
    </section>
  );
}

function ExamNotFound({ examId }: { examId?: string }) {
  return (
    <Card>
      <h2 className="m-0 text-lg font-semibold tracking-tight text-atrament">Nie znaleziono arkusza</h2>
      <p className="m-0 mt-2 text-sm leading-relaxed text-grafit">
        {examId ? (
          <>
            Arkusz o identyfikatorze <code className="font-mono text-[12px]">{examId}</code> nie występuje
            na liście. Sprawdź adres albo wróć do listy arkuszy.
          </>
        ) : (
          "W adresie nie ma identyfikatora arkusza. Wróć do listy."
        )}
      </p>
      <div className="mt-4">
        <ReturnToListButton />
      </div>
    </Card>
  );
}

function ExamPage() {
  const { examId } = examRouteApi.useParams();
  const search = examRouteApi.useSearch();
  const navigate = useNavigate();
  const exam = exams.find((e) => e.id === examId);

  // TRYB SKUPIENIA ze sklepu: chowa elementy otoczki oznaczone .hide-in-focus.
  const { flagActive } = useWallet();
  useBodyClass("focus-mode", flagActive("tryb-skupienia"));

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [examId]);

  if (!exam) {
    return <ExamNotFound examId={examId} />;
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
          title: exam
            ? `INF.04 — ${exam.session} ${exam.year} — arkusz egzaminacyjny CKE`
            : "Nie znaleziono arkusza — Arkusze INF.04",
        },
        ...(exam
          ? [
              {
                name: "description",
                content: `Arkusze egzaminu INF.04, ${exam.session} ${exam.year}: podgląd PDF, załączniki i kryteria oceniania R1–R4. ${exam.subtitle}`,
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
    <Card>
      <h2 className="m-0 text-lg font-semibold tracking-tight text-atrament">Nie udało się otworzyć strony</h2>
      <p className="m-0 mt-2 text-sm leading-relaxed text-grafit">
        Wystąpił błąd podczas otwierania arkusza. Szczegóły poniżej, po nich można wrócić do listy.
      </p>
      <p className="m-0 mt-2 break-words font-mono text-[12px] text-grafit">
        {String(error instanceof Error ? error.message : error)}
      </p>
      <div className="mt-4">
        <ReturnToListButton />
      </div>
    </Card>
  ),
  notFoundComponent: () => <ExamNotFound />,
});
