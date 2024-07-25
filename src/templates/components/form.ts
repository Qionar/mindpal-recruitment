import { SetStateDispatcher, Template } from "../../core/types.ts";

export type FormProps = {
  title?: string;
  description?: string;
  id: string;
};

// would be nice to disable button in empty form case

const Form: Template = {
  render: ({ title = "", description = "", id = "" }: FormProps = {}) => {
    return `
      <form class="form" id="${id}">
        <div class="input-text">
          <input
            type="text"
            class="input-text__input"
            placeholder="Untitle note"
            value="${title}"
            name="title"
          />
        </div>

        <div class="input-text float-button">
          <textarea
            placeholder="Your note..."
            class="input-text__input"
            cols="30"
            rows="10"
            name="description"
          >${description}</textarea>

          <button class="btn primary" type="submit">Add</button>
        </div>
      </form>
    `;
  },

  registerListeners: (setState: SetStateDispatcher, parentCallback) => {
    const cleanUp = parentCallback();

    return () => {
      cleanUp();
    };
  },
};

export default Form;
