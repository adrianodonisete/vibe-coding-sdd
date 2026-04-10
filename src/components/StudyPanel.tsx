import type { Card } from "../types/flashcards";

type StudyPanelProps = {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
  onAnswer: () => void;
};

const StudyPanel = ({ card, isFlipped, onFlip, onAnswer }: StudyPanelProps) => (
  <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-900">Study</h2>
    <p className="mt-4 text-sm text-slate-500">Spanish word</p>
    <p className="mt-1 text-3xl font-bold tracking-wide text-slate-900">{card.spanish}</p>

    <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4">
      {isFlipped ? (
        <>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">English</p>
          <p className="mt-1 text-2xl font-semibold text-slate-800">{card.english}</p>
        </>
      ) : (
        <p className="text-sm text-slate-600">Flip the card to reveal the English translation.</p>
      )}
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      {!isFlipped ? (
        <button
          type="button"
          onClick={onFlip}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Flip Card
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={onAnswer}
            className="rounded-md border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Right
          </button>
          <button
            type="button"
            onClick={onAnswer}
            className="rounded-md border border-rose-600 bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
          >
            Wrong
          </button>
        </>
      )}
    </div>
  </section>
);

export default StudyPanel;
