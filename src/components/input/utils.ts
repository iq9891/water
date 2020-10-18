/** @format */
import { CSSProperties } from 'vue';
import { hasOwn, getStyle } from '../../common/utils';
import { isObject, isNumber } from '../../common/typeof';

let hiddenTextarea: any;

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top: 0 !important;
  border: 1px solid #000 !important;
  right:0 !important;
  box-sizing: border-box !important;
`;

export const getMaxLengthValue = (
  value: string | number,
  maxLength: undefined | number,
) => {
  const newMax = Number(maxLength);
  return newMax > 0 ? String(value).slice(0, newMax) : value;
};

export const getTargetStyles = (el: any) => {
  return {
    minHeight: getStyle(el).minHeight,
    paddingTop: getStyle(el).paddingTop,
    paddingBottom: getStyle(el).paddingBottom,
    borderTopWidth: getStyle(el).borderTopWidth,
    borderBottomWidth: getStyle(el).borderBottomWidth,
    lineHeight: getStyle(el).lineHeight,
  };
};

export const getTeatAreaStyle = (
  targteNode: any,
  autoSize: any,
  inputOriginStyle: CSSProperties,
): any => {
  const inputStyle: CSSProperties = {};
  const {
    minHeight,
    paddingTop,
    paddingBottom,
    borderTopWidth,
    borderBottomWidth,
    lineHeight,
  } = inputOriginStyle;
  const singleHeight = parseInt(minHeight as any, 10);

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  hiddenTextarea.setAttribute(
    'style',
    `padding: ${paddingTop} 0 ${paddingBottom};line-height: ${lineHeight};${HIDDEN_STYLE}`,
  );
  hiddenTextarea.value = targteNode.value || '';

  let height =
    hiddenTextarea.scrollHeight +
    parseInt(borderTopWidth as any, 10) +
    parseInt(borderBottomWidth as any, 10);

  if (!autoSize && singleHeight > 0) {
    inputStyle.minHeight = minHeight;
  }

  if (isObject(autoSize) && singleHeight > 0) {
    const hasMinRows =
      hasOwn(autoSize, 'minRows') &&
      isNumber(autoSize.minRows) &&
      autoSize.minRows > 0;
    const hasMaxRows =
      hasOwn(autoSize, 'maxRows') &&
      isNumber(autoSize.maxRows) &&
      autoSize.maxRows > 0;
    if (hasMinRows) {
      const { minRows } = autoSize as any;
      const newMinHeight = singleHeight * minRows;
      inputStyle.minHeight = `${newMinHeight}px`;
      height = Math.max(newMinHeight, height);
    }
    if (hasMaxRows) {
      const { maxRows } = autoSize as any;
      const maxHeight = singleHeight * maxRows;
      height = Math.min(maxHeight, height);
      inputStyle.height = `${height}px`;
      inputStyle.maxHeight = `${maxHeight}px`;
    }
  }

  if (hiddenTextarea.parentNode) {
    hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  }
  hiddenTextarea = null;

  return inputStyle;
};
