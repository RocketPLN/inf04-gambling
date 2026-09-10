import { useEffect } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { exams } from "../data/exams.js";
import PlanView from "../components/PlanView.jsx";

function ExamPage() {
  const { examId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
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
      <div className="empty-state">
        Nie znaleziono arkusza <b>{examId}</b>.
        <br />
        <Link to="/" search={{ q: "", year: "all", session: "all" }} className="btn-hard btn-hard--small btn-hard--ink" style={{ marginTop: 12, display: "inline-block" }}>
          ← Wróć do listy
        </Link>
      </div>
    );
  }

  return (
    <PlanView
      exam={exam}
      onBack={() => navigate({ to: "/", search: { q: search.q ?? "", year: search.year ?? "all", session: search.session ?? "all" } })}
    />
  );
}

export const Route = createFileRoute("/egzamin/$examId")({
  loader: ({ params }) => {
    const exam = exams.find((e) => e.id === params.examId);
    if (!exam) throw notFound();
    return { examId: exam.id };
  },
  notFoundComponent: () => (
    <div className="empty-state">
      Nie znaleziono arkusza.
      <br />
      <Link to="/" search={{ q: "", year: "all", session: "all" }} style={{ marginTop: 12, display: "inline-block" }}>
        ← Wróć do listy
      </Link>
    </div>
  ),
  component: ExamPage,
});
