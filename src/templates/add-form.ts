import { SetStateDispatcher, Template } from "../core/types.ts";
import Form from "./components/form.ts";

import { generateId } from "../utils/strings.ts";

const { render: renderForm } = Form;

const formId = "add-notes-form";

const AddForm: Template = {
  render: () => {
    const formTemplate =
      typeof renderForm !== "string"
        ? renderForm({
            id: formId,
          })
        : renderForm;

    return `
  <p class="add-form-header">
    <span>Add new note</span>
  
    <button class="btn link close-add-form">Cancel</button>
  </p>
  ${formTemplate}

  `;
  },

  registerListeners: (setState: SetStateDispatcher) => {
    const handler = (setState: SetStateDispatcher) => (e: Event) => {
      setState({ isAddFormShown: false });
    };

    const inputElement = document.querySelector(".close-add-form");
    inputElement?.addEventListener("click", handler(setState));

    const formElement = document.forms[formId];
    const formHandler = (e) => {
      e.preventDefault();

      const { title, description } = Object.fromEntries(new FormData(e.target));

      if (title.length < 1) {
        return;
      }

      setState((state) => ({
        notes: [
          ...state.notes,
          {
            id: generateId(16),
            title: title as string,
            description: description as string,
            createdAt: new Date(),
          },
        ],
      }));
    };

    formElement.addEventListener("submit", formHandler);

    return () => {
      inputElement?.removeEventListener("click", handler(setState));
    };
  },
};

export default AddForm;
