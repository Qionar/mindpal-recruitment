import { SetStateDispatcher, Template } from "../core/types.ts";

const EmptyState: Template = {
  render: `
    <div class="empty-result">
        <div class="empty-result__icon">
            <i class="ti ti-alert-circle"></i>
        </div>
    
        <p class="empty-result__title">No notes yet</p>
    
        <p class="empty-result__description">
            Add a note to keep track of your learnings.
        </p>
    
        <button class="add-note-btn btn secondary">
            <i class="ti ti-file-plus"></i>
            Add Note
        </button>
    </div>
`,
  registerListeners: (setState: SetStateDispatcher) => {
    const handler = (setState: SetStateDispatcher) => (e: Event) => {
      setState({ isAddFormShown: true });
    };

    const inputElement = document.querySelector(
      ".empty-result > .add-note-btn",
    );

    inputElement?.addEventListener("click", handler(setState));

    return () => {
      inputElement?.removeEventListener("click", handler(setState));
    };
  },
};

export default EmptyState;
