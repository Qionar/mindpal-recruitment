import { SetStateDispatcher, Template } from "../core/types.ts";

const AddNoteButton: Template = {
  render: `
    <div class="add-new-note-container">
        <button class="add-note-btn btn primary">
            Add New
        </button>  
    </div>
`,
  registerListeners: (setState: SetStateDispatcher) => {
    const handler = (setState: SetStateDispatcher) => (e: Event) => {
      setState({ isAddFormShown: true });
    };

    const inputElement = document.querySelector(".add-note-btn.primary");

    inputElement?.addEventListener("click", handler(setState));

    return () => {
      inputElement?.removeEventListener("click", handler(setState));
    };
  },
};

export default AddNoteButton;
