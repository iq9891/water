/** @format */

export const rgbToHex = (rgbString: String) => {
  const rgb = rgbString.match(/\d+/g) as RegExpMatchArray;
  let r = parseInt(rgb[0], 10).toString(16);
  let g = parseInt(rgb[1], 10).toString(16);
  let b = parseInt(rgb[2], 10).toString(16);
  r = r.length === 1 ? `0${r}` : r;
  g = g.length === 1 ? `0${g}` : g;
  b = b.length === 1 ? `0${b}` : b;
  return `#${r}${g}${b}`;
};
