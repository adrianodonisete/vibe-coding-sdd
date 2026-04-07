# Software Specification: Spanish Flashcards Web App

## 1. Overview

Build a personal-use flashcards web app to learn Spanish vocabulary. The app will use TypeScript, React (Vite), and Tailwind CSS.

Core learning loop:

- Show a Spanish word
- Flip to reveal English translation
- Self-assess answer as right or wrong
- Track wrong cards for session-only redo
- Provide one quiz mode (multiple choice)
- Show simple current-session statistics

## 2. Goals

- Keep the learning workflow simple and fast
- Support single-word Spanish vocabulary memorization
- Allow quick redo of unknown cards during the same session
- Track basic progress in the current session
- Persist state in browser storage with no backend

## 3. Non-Goals (Out of Scope for v1)

- Multi-user accounts or authentication
- Card CRUD features (create/edit/delete/import)
- Phrase or sentence cards
- Spaced repetition algorithms
- Advanced analytics
- Backend/database/cloud sync

## 4. Tech Stack

- Frontend: React + TypeScript (Vite)
- Styling: Tailwind CSS
- Persistence: localStorage
- Runtime: Browser-based responsive web app

## 5. Data Model

### 5.1 Card

```ts
type Card = {
    id: string;
    spanish: string;
    english: string;
};
```

### 5.2 Session Card State

```ts
type SessionCardState = {
    cardId: string;
    seen: boolean;
    markedWrong: boolean;
    markedRight: boolean;
    inUnknownPool: boolean;
};
```

### 5.3 Session Stats

```ts
type SessionStats = {
    studiedCount: number;
    correctCount: number;
    incorrectCount: number;
};
```

## 6. Functional Requirements

### 6.1 Study Mode (Flashcards)

1. Show one random card at a time with Spanish first.
2. User flips card to reveal English translation.
3. After flip, show two buttons: Right and Wrong.
4. On Wrong:
    - Mark card incorrect for the session.
    - Add card to the unknown pool.
5. On Right:
    - Mark card correct for the session.
    - If in unknown pool, remove it immediately.
6. Move to next random card after each answer.

### 6.2 Redo Unknown Cards (Session Only)

1. Provide a Redo Unknown Cards action.
2. Start a filtered review using only cards in current unknown pool.
3. Unknown pool is session-based.
4. A single correct answer removes a card from unknown pool.

### 6.3 Quiz Mode (v1: Multiple Choice Only)

1. Use Spanish word as prompt.
2. Show multiple English options.
3. User selects one option.
4. Evaluate correctness from selected option.
5. Update session stats with quiz outcomes.

Note: Tolerance for close variants/typos is a future-friendly requirement and can be incorporated in later fill-in mode.

### 6.4 Statistics Page (Current Session Only)

Display only:

- Cards studied
- Correct answers
- Incorrect answers

### 6.5 Persistence

Persist using localStorage:

- Session progress
- Unknown pool membership
- Session statistics
- Last relevant mode state

### 6.6 Card Ordering

- Card presentation should be random.
- Avoid obvious immediate repetition where feasible.

## 7. UI/UX Requirements

### 7.1 Main Screens

1. Study Screen
2. Unknown Redo Flow
3. Quiz Screen (multiple choice)
4. Statistics Screen

### 7.2 Interaction Rules

- Right/Wrong buttons appear only after card flip.
- Navigation between Study, Quiz, Unknown Redo, and Stats is simple and clear.
- UI supports responsive browser layouts.

### 7.3 Styling

- Use Tailwind CSS utility classes.
- Keep interface minimal and focused.

## 8. Validation and Logic Rules

- Cards are single-word Spanish to English pairs.
- Right/Wrong scoring in study mode is self-assessed.
- Unknown pool logic:
    - Add on Wrong
    - Remove on first Right
- Stats update immediately after each answer.

## 9. Error Handling

- If no cards exist, show a friendly empty state and disable study/quiz actions.
- If localStorage read fails, start with default fresh session.
- If localStorage write fails, continue in-memory (optional non-blocking warning).

## 10. Performance Requirements

- Fast initial load for small-to-medium card sets.
- Immediate-feeling interactions for flip, answer, next-card flow.
- localStorage usage should not noticeably block UI.

## 11. Testing Requirements (v1)

- Study mode flip and Right/Wrong flow
- Unknown pool add/remove behavior
- Unknown-only redo filtering
- Quiz correctness handling
- Session stats updates from both study and quiz
- localStorage persistence across refresh
- Responsive checks on mobile and desktop widths

## 12. Acceptance Criteria

v1 is complete when:

1. Random Spanish single-word flashcards are studyable.
2. Card flip reveals English translation.
3. Right/Wrong self-assessment works.
4. Wrong cards are tracked and redoable in session.
5. A card leaves unknown pool after one correct answer.
6. Multiple-choice quiz mode is functional.
7. Stats page shows studied/correct/incorrect for current session.
8. Session data persists via localStorage.
9. UI uses Tailwind and is responsive in browser.
