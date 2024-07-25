import { Note, SetStateDispatcher, Template } from "../../core/types.ts";
import { dateFormatter } from "../../utils/formatters.ts";

const Note: Template = {
  render({ note }: { note: Note }) {
    return `
        <div class="note">
           <div class="note__header">
              <b>
                ${note.title}
              </b>  
              <div class="note__header-actions">
                 <button class="btn note__header-edit-button">
                     <i class="ti ti-edit"></i>
                 </button>
                 <button class="btn note__header-delete-button" data-id="${note.id}">
                    <i class="ti ti-trash"></i>
                 </button>
              </div>
           </div>
           <div class="note__body">
              ${note.description}
           </div>
           <div class="note__footer">
          
                ${dateFormatter.format(new Date(note.createdAt))}
            </div>
        </div>
        
        <div class="kludge__workaround-to-listen-delete" data-id="${note.id}"></div>
  `;
  },

  registerListeners: (setState: SetStateDispatcher) => {
    return () => {};
  },
};

export default Note;
