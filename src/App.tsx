import { useEffect, useMemo, useState } from "react";
import { cards } from "./data/cards";
import { readStorage, writeStorage } from "./lib/sessionStorage";
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

function App() {
  const [mode, setMode] = useState<AppMode>(() =>
    readStorage<AppMode>(MODE_STORAGE_KEY, "study"),
  );
  const [stats] = useState<SessionStats>(defaultStats);
  const [sessionByCard] = useState<Record<string, SessionCardState>>(defaultSessionByCard);

  useEffect(() => {
    writeStorage(MODE_STORAGE_KEY, mode);
  }, [mode]);

  const hasCards = cards.length > 0;
  const activeModeLabel = useMemo(
    () => NAV_ITEMS.find((item) => item.key === mode)?.label ?? "Study",
    [mode],
  );

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

        {!hasCards ? <EmptyState /> : <PlaceholderPanel mode={mode} />}

        <section className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
          <p>Session stats placeholders: studied {stats.studiedCount}</p>
          <p>Tracked cards in session map: {Object.keys(sessionByCard).length}</p>
        </section>
      </div>
    </main>
  );
}

export default App;
