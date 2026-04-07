# Flashcards Implementation TODO (Easy -> Hard)

Use this checklist to ship one feature at a time from the specification.

## Project Technology

- **Frontend:** React
- **Language:** TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **Persistence:** `localStorage`
- **Runtime:** Responsive browser web app

## Phase 1 - Foundation (Easiest)

- [x] Set up the project with React, TypeScript, Vite, and Tailwind CSS.
  - **Acceptance criteria:**
  - App runs as a React application using Vite.
  - TypeScript is configured and used across the project.
  - Tailwind CSS is installed and styles can be applied in the UI.
  - Project structure is ready for browser-based development.

- [x] Set up core types and card source data (`Card`, `SessionCardState`, `SessionStats`).
    - **Acceptance criteria:**
    - TypeScript types exist and are used in app state.
    - Card data contains `id`, `spanish`, and `english`.
    - App compiles with no type errors for these models.

- [x] Set up browser persistence utilities with `localStorage`.
  - **Acceptance criteria:**
  - App has a clear utility or service for reading from `localStorage`.
  - App has a clear utility or service for writing to `localStorage`.
  - Persistence logic is isolated from UI components where practical.

- [x] Build base app shell with clear navigation for Study, Quiz, Unknown Redo, and Stats.
    - **Acceptance criteria:**
    - User can switch between all 4 screens with visible controls.
    - Active screen is obvious to the user.
    - Layout works on both mobile and desktop widths.

- [x] Add empty state when no cards exist.
    - **Acceptance criteria:**
    - Friendly empty-state message is shown when card list is empty.
    - Study and Quiz actions are disabled in empty state.

## Phase 2 - Core Study Flow

- [ ] Implement random card presentation in Study mode (Spanish shown first).
    - **Acceptance criteria:**
    - Study screen renders one Spanish word at a time.
    - Next card selection is random.
    - Immediate repetition is avoided where feasible.

- [ ] Implement card flip interaction to reveal English translation.
    - **Acceptance criteria:**
    - Front shows Spanish only before flip.
    - Flip action reveals English translation.
    - Flip interaction feels immediate.

- [ ] Show Right/Wrong buttons only after card is flipped.
    - **Acceptance criteria:**
    - Right/Wrong controls are hidden before flip.
    - Right/Wrong controls appear only after flip.
    - After answer, app advances to next card.

## Phase 3 - Session Scoring and Unknown Pool

- [ ] Implement Right/Wrong scoring updates for current session.
    - **Acceptance criteria:**
    - Right increments correct count.
    - Wrong increments incorrect count.
    - Studied count updates immediately after each answer.

- [ ] Implement unknown pool logic (add on Wrong, remove on first Right).
    - **Acceptance criteria:**
    - Wrong answer adds card to unknown pool.
    - First subsequent Right removes that card from unknown pool.
    - Unknown membership is not duplicated for the same card.

- [ ] Implement "Redo Unknown Cards" filtered flow.
    - **Acceptance criteria:**
    - Redo flow only serves cards currently in unknown pool.
    - If unknown pool is empty, user sees clear message/action.
    - Correct answers during redo remove cards from unknown pool immediately.

## Phase 4 - Quiz Mode (Multiple Choice)

- [ ] Build quiz question generation using Spanish prompt with English options.
    - **Acceptance criteria:**
    - Quiz shows Spanish prompt and multiple English choices.
    - Exactly one option is correct.
    - Incorrect options come from other cards.

- [ ] Implement quiz answer evaluation and feedback flow.
    - **Acceptance criteria:**
    - Selected option is evaluated as correct/incorrect.
    - User gets immediate correctness feedback.
    - App moves cleanly to next quiz prompt.

- [ ] Integrate quiz outcomes into session statistics.
    - **Acceptance criteria:**
    - Correct quiz answers increment correct count.
    - Incorrect quiz answers increment incorrect count.
    - Studied count includes quiz attempts.

## Phase 5 - Persistence and Recovery

- [ ] Persist session state in `localStorage` (stats, unknown pool, progress, last mode state).
    - **Acceptance criteria:**
    - Session stats survive browser refresh.
    - Unknown pool membership survives browser refresh.
    - Last relevant mode/session state is restored on reload.

- [ ] Add safe read/write handling for `localStorage` failures.
    - **Acceptance criteria:**
    - If read fails, app starts with a fresh default session.
    - If write fails, app continues in memory without crashing.
    - Optional warning is non-blocking to user flow.

## Phase 6 - Stats Page, QA, and Polish (Hardest)

- [ ] Build Stats screen for current session only.
    - **Acceptance criteria:**
    - Stats page shows: Cards studied, Correct answers, Incorrect answers.
    - Values reflect updates from both Study and Quiz modes.
    - Stats reset behavior is consistent with session scope.

- [ ] Validate responsive UI and interaction clarity.
    - **Acceptance criteria:**
    - Main flows are usable on mobile and desktop breakpoints.
    - Navigation and primary actions remain clear and accessible.
    - Tailwind styling remains minimal and focused.

- [ ] Run v1 acceptance pass against the specification.
    - **Acceptance criteria:**
    - Study mode, flip, Right/Wrong loop all work end to end.
    - Unknown pool add/remove and redo behavior pass manual checks.
    - Quiz mode, stats tracking, and persistence pass manual checks.
    - App meets all v1 acceptance criteria in the spec.
