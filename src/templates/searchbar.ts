import { SetStateDispatcher, Template } from "../core/types.ts";

const SearchBarComponent: Template = {
  render: ({ search }: { search: string }) => {
    return `
    <nav class="navbar">
        <div class="input-text searchbar">
          <i class="ti ti-search searchbar__icon"></i>
          <input
           
            type="text"
            class="input-text__input"
            placeholder="Search notes..."
            value="${search}"
          />
        </div>
    </nav>
  `;
  },

  registerListeners: (setState: SetStateDispatcher) => {
    const searchListener = (setState: SetStateDispatcher) => (e: Event) => {
      const target = e.target as HTMLInputElement;

      setState({ search: target.value });
    };

    const inputElement = document.querySelector(".input-text__input");

    inputElement?.addEventListener("input", searchListener(setState));

    return () => {
      inputElement?.removeEventListener("input", searchListener(setState));
    };
  },

  globalProps: ["search"],
};

export default SearchBarComponent;
