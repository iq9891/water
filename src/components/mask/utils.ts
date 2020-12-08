/** @format */

import { css } from '../../common/dom';

let bodyStyleCache = {};

let cached: number | undefined;

export const getScrollBarSize = (fresh?: boolean) => {
  if (fresh || cached === undefined) {
    const inner = document.createElement('div');

    css(inner, {
      width: '100%',
      height: '200px',
    });

    const outer = document.createElement('div');

    css(outer, {
      position: 'absolute',
      top: '0',
      left: '0',
      pointerEvents: 'none',
      visibility: 'hidden',
      width: '200px',
      height: '150px',
      overflow: 'hidden',
    });

    outer.appendChild(inner);
    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;

    css(outer, {
      overflow: 'scroll',
    });

    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached;
};

export const switchScrollingEffect = (close?: boolean) => {
  const bodyIsOverflowing =
    document.body.scrollHeight >
      (window.innerHeight || document.documentElement.clientHeight) &&
    window.innerWidth > document.body.offsetWidth;

  if (!bodyIsOverflowing) {
    return;
  }

  const scrollBarSize = getScrollBarSize();

  if (!close && scrollBarSize) {
    bodyStyleCache = css(document.body, {
      position: 'relative',
      width: `calc(100% - ${scrollBarSize}px)`,
    });
    return;
  }

  if (close) {
    css(document.body, bodyStyleCache);
  }
};
