import { Props } from "../core/types.ts";

type OriginalObject = {
  [key: string]: unknown;
};

export const pickByKeys = (
  original: OriginalObject,
  picks: string[],
): OriginalObject => {
  return picks.reduce((result, key) => {
    if (key in original) {
      result[key] = original[key];
    }

    return result;
  }, {});
};
