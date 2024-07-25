import "./assets/reset.css";
import "./assets/style.css";
import "../node_modules/@tabler/icons-webfont/dist/tabler-icons.min.css";
import { initializeState } from "./core/state.ts";
import Templates from "./templates/index.ts";
import { CleanUpCallback, SetStateDispatcher, Template } from "./core/types.ts";
import { pickByKeys } from "./utils/objects.ts";
import { saveNotes } from "./core/persistent-state.ts";
let state = initializeState();

const kludge__focusFormOnReRender = () => {
  const searchBar = document.querySelector(
    ".searchbar > input",
  ) as HTMLInputElement;
  searchBar.focus();

  const oldValue = searchBar.value;
  searchBar.value = "";
  searchBar.value = oldValue;
};

const renderDOM = () => {
  const listeners = [];
  const listenerRemovers: CleanUpCallback[] = [];
  let template = "";

  const handleTemplateRender = (templateToRender: Template) => {
    if (templateToRender.registerListeners) {
      listeners.push(templateToRender.registerListeners);
    }

    template +=
      typeof templateToRender.render === "string"
        ? templateToRender.render
        : templateToRender.render(
            pickByKeys(state, templateToRender?.globalProps ?? []),
          );
  };

  const renderIf = (conditionCallback: () => void, templatePart: Template) =>
    conditionCallback() && handleTemplateRender(templatePart);

  // rethink to get it dynamically ( build components three? )
  handleTemplateRender(Templates.header);
  handleTemplateRender(Templates.searchbar);

  renderIf(() => state.notes.length > 0, Templates.addNoteButton);

  renderIf(() => state.isAddFormShown, Templates.addForm);

  renderIf(
    () => state.notes.length < 1 && !state.isAddFormShown,
    Templates.emptyState,
  );

  renderIf(() => state.notes.length > 0, Templates.notesList);

  document.querySelector<HTMLDivElement>("#app")!.innerHTML = template;

  const postRender = () =>
    listeners.forEach((listener) => listenerRemovers.push(listener(setState)));

  postRender();
  kludge__focusFormOnReRender();

  return listenerRemovers;
};

let cleanUpCallbacks: CleanUpCallback[] = [];

const setState: SetStateDispatcher = (newState) => {
  cleanUpCallbacks.forEach((callback) => callback());

  if (typeof newState === "function") {
    newState = newState(state);
  }

  if (newState.notes) {
    saveNotes(newState.notes);
  }

  state = {
    ...state,
    ...newState,
  };
  renderDOM();
};

renderDOM();
