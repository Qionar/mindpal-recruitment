import { Note as TNote, Template } from "../core/types.ts";
import Note from "./components/note.ts";

const { render: renderNote, registerListeners: registerNoteListeners } = Note;

const NotesList: Template = {
  render: ({ notes, search }: { notes: TNote[]; search: string }) => {
    if (!renderNote) {
      throw new Error(
        "Render error: Child render function cannot be undefined",
      );
    }

    const renderedNotes = notes.reduce((result, note) => {
      if (search.length > 0 && !note.title.includes(search)) {
        return result;
      }

      result +=
        typeof renderNote !== "string"
          ? renderNote({
              note,
            })
          : renderNote;

      return result;
    }, "");

    return `
        <div class="notes-list">
            ${renderedNotes}
        </div>
  `;
  },

  registerListeners: (setState) => {
    // architecture problem to clean up listeners for iterable children
    // const cleanUp = registerNoteListeners?.(setState);

    return () => {
      // cleanUp?.();
    };
  },

  globalProps: ["notes", "search"],
};

export default NotesList;
