export type Note = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export type State = {
  notes: Note[];
  search: string;
  isAddFormShown: boolean;
};

export type UnknownArgs<T = string> = (...args: any[]) => string;

export type Props = keyof State;

export type SetStateDispatcher = (
  newState: Partial<State> | ((state: State) => Partial<State>),
) => void;

export type CleanUpCallback = () => void;

export type Template = {
  render: string | UnknownArgs;
  registerListeners?: (
    setState: SetStateDispatcher,
    parentCallback?: () => CleanUpCallback,
  ) => CleanUpCallback;
  globalProps?: Props[];
};
