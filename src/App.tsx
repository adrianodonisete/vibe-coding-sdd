import { useEffect, useMemo, useState } from "react";
import EmptyState from "./components/EmptyState";
import PlaceholderPanel from "./components/PlaceholderPanel";
import StudyPanel from "./components/StudyPanel";
import { cards } from "./data/cards";
import { readStorage, writeStorage } from "./lib/sessionStorage";
import { buildDefaultSessionByCard, randomCardIndex } from "./lib/study";
import type { AppMode, SessionCardState, SessionStats } from "./types/flashcards";

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

const defaultSessionByCard: Record<string, SessionCardState> = buildDefaultSessionByCard(cards);

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
          <PlaceholderPanel mode={mode} modeLabel={activeModeLabel} />
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
