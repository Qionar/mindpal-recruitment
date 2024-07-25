import { getPersistNotes } from "./persistent-state.ts";
import { Note, State } from "./types.ts";

export const initializeState = (): State => {
  const notes = getPersistNotes();
  const search = "";
  const isAddFormShown = false;

  return {
    notes,
    search,
    isAddFormShown,
  };
};
