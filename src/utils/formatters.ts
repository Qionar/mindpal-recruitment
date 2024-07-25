export const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  // @ts-ignore known TS version issue https://github.com/microsoft/TypeScript/issues/38266
  month: "short",
  day: "2-digit",
});
