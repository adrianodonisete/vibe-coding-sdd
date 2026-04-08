import { useEffect, useMemo, useState } from "react";
import { cards } from "./data/cards";
import { readStorage, writeStorage } from "./lib/sessionStorage";
import type { AppMode, Card, SessionCardState, SessionStats } from "./types/flashcards";

const NAV_ITEMS: Array<{ key: AppMode; label: string }> = [
  { key: "study", label: "Study" },
  { key: "quiz", label: "Quiz" },
  { key: "unknownRedo", label: "Unknown Redo" },
  { key: "stats", label: "Stats" },
];

const MODE_STORAGE_KEY = "flashcards:lastMode";

const defaultStats: SessionStats = {
  studiedCount: 0,
  correctCount: 0,
  incorrectCount: 0,
};

const defaultSessionByCard: Record<string, SessionCardState> = {};

for (const card of cards) {
  defaultSessionByCard[card.id] = {
    cardId: card.id,
    seen: false,
    markedWrong: false,
    markedRight: false,
    inUnknownPool: false,
  };
}

const randomCardIndex = (max: number, currentIndex?: number): number => {
  if (max <= 1) return 0;

  let nextIndex = Math.floor(Math.random() * max);
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * max);
  }

  return nextIndex;
};

const EmptyState = () => (
  <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-900">No cards available yet</h2>
    <p className="mt-2 text-sm text-slate-600">
      Add Spanish to English cards to start studying. Study and quiz actions are disabled
      until cards exist.
    </p>
  </section>
);

const PlaceholderPanel = ({ mode }: { mode: AppMode }) => (
  <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-900">
      {NAV_ITEMS.find((item) => item.key === mode)?.label}
    </h2>
    <p className="mt-2 text-sm text-slate-600">
      Phase 1 complete: navigation shell and typed state are ready for this screen.
    </p>
  </section>
);

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

function App() {
  const [mode, setMode] = useState<AppMode>(() =>
    readStorage<AppMode>(MODE_STORAGE_KEY, "study"),
  );
  const [stats] = useState<SessionStats>(defaultStats);
  const [sessionByCard] = useState<Record<string, SessionCardState>>(defaultSessionByCard);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(() =>
    randomCardIndex(cards.length),
  );
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    writeStorage(MODE_STORAGE_KEY, mode);
  }, [mode]);

  const hasCards = cards.length > 0;
  const activeCard = hasCards ? cards[activeCardIndex] : null;
  const activeModeLabel = useMemo(
    () => NAV_ITEMS.find((item) => item.key === mode)?.label ?? "Study",
    [mode],
  );

  const moveToNextCard = () => {
    setActiveCardIndex((currentIndex) => randomCardIndex(cards.length, currentIndex));
    setIsFlipped(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4 sm:p-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Spanish Flashcards</h1>
          <p className="text-sm text-slate-600">Current screen: {activeModeLabel}</p>
        </header>

        <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {NAV_ITEMS.map((item) => {
            const isActive = mode === item.key;
            const isDisabled = !hasCards && (item.key === "study" || item.key === "quiz");

            return (
              <button
                key={item.key}
                type="button"
                disabled={isDisabled}
                onClick={() => setMode(item.key)}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {!hasCards ? (
          <EmptyState />
        ) : mode === "study" && activeCard ? (
          <StudyPanel
            card={activeCard}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(true)}
            onAnswer={moveToNextCard}
          />
        ) : (
          <PlaceholderPanel mode={mode} />
        )}

        <section className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
          <p>Session stats placeholders: studied {stats.studiedCount}</p>
          <p>Tracked cards in session map: {Object.keys(sessionByCard).length}</p>
        </section>
      </div>
    </main>
  );
}

export default App;
