import { Note } from "./types.ts";

export const getPersistNotes = (): Note[] => {
  const state = localStorage.getItem("notes");

  if (!state) {
    return [];
  }

  return JSON.parse(state);
};

export const saveNotes = (notes: Note[]) =>
  localStorage.setItem("notes", JSON.stringify(notes));
