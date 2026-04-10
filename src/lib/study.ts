import type { Card, SessionCardState } from "../types/flashcards";

export const randomCardIndex = (max: number, currentIndex?: number): number => {
  if (max <= 1) return 0;

  let nextIndex = Math.floor(Math.random() * max);
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * max);
  }

  return nextIndex;
};

export const buildDefaultSessionByCard = (
  sourceCards: Card[],
): Record<string, SessionCardState> => {
  return sourceCards.reduce<Record<string, SessionCardState>>((acc, card) => {
    acc[card.id] = {
      cardId: card.id,
      seen: false,
      markedWrong: false,
      markedRight: false,
      inUnknownPool: false,
    };
    return acc;
  }, {});
};
