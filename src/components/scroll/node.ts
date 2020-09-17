/** @format */

import { keys } from '../../common/utils';

export const preventDefaultExceptionFn = (
  el: any,
  exceptions: {
    tagName?: RegExp;
    className?: RegExp;
    [key: string]: any;
  },
): boolean => {
  let result = false;

  keys(exceptions).forEach((excItem: string) => {
    if (exceptions[excItem].test(el[excItem])) {
      result = true;
    }
  });

  return result;
};
