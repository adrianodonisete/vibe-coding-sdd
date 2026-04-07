export type Card = {
  id: string;
  spanish: string;
  english: string;
};

export type SessionCardState = {
  cardId: string;
  seen: boolean;
  markedWrong: boolean;
  markedRight: boolean;
  inUnknownPool: boolean;
};

export type SessionStats = {
  studiedCount: number;
  correctCount: number;
  incorrectCount: number;
};

export type AppMode = "study" | "quiz" | "unknownRedo" | "stats";
