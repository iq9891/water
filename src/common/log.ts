/** @format */

let warnFn = (msg: String): void => {};

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined';
  warnFn = (msg: String): void => {
    if (hasConsole) {
      console.warn(`[water warn]: ${msg}`);
    }
  };
}

export const warn = warnFn;
