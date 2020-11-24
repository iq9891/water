/** @format */

import { isUndefined } from '../../common/typeof';
import { getStyle, hasOwn } from '../../common/utils';

export const getScroll = (target: any, top?: boolean): number => {
  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';

  let ret = target[prop];

  if (typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }

  return ret;
};

export const setLeftFn = (
  self: any,
  render: Element,
  disabled: boolean,
  before = () => {},
  after = () => {},
) => {
  if (!render) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  before();
  return new Promise((resolve) => {
    self.$nextTick(() => {
      const {
        x: offsetLeft,
        right,
        width,
      }: any = render.getBoundingClientRect();
      const { popElem = { offsetWidth: 0 } } = self.$refs;
      const tooltipWidth = popElem.offsetWidth;
      let posX = disabled ? -1 : offsetLeft + getScroll(window);
      const leftX = posX - tooltipWidth - self.interval;
      const rightX = posX + width + self.interval;
      const verRightX = right - tooltipWidth;
      let isOutside = '';
      const isHorLeftOutside = posX + tooltipWidth > window.innerWidth;
      const isHorRightOutside = verRightX < 0;

      after();
      // top left right bottom
      // topLeft topRight bottomLeft bottomRight
      // leftTop leftBottom rightTop rightBottom
      if (self.isVerCenter) {
        // top bottom
        const centerX = posX + width / 2 - tooltipWidth / 2;
        if (centerX < 0) {
          // 左边出界了
          isOutside = 'left';
        } else if (isHorLeftOutside) {
          isOutside = 'right';
          console.log(verRightX, right, tooltipWidth, 'verRightX');
          posX = verRightX;
        } else {
          isOutside = 'center';
          posX = centerX;
        }
      } else if (self.isVerLeft) {
        console.log(leftX, 'leftX');
        // leftTop left leftBottom
        const isLeftOutside = leftX < 0;
        isOutside = isLeftOutside ? 'right' : 'left';
        posX = isLeftOutside ? rightX : leftX;
      } else if (self.isVerEndRight) {
        // topRight bottomRight
        isOutside = isHorRightOutside ? 'left' : 'right';
        posX = isHorRightOutside ? posX : verRightX;
      } else if (self.isVerRight) {
        // rightTop right rightBottom
        const isRightOutside = rightX + tooltipWidth > window.innerWidth;
        isOutside = isRightOutside ? 'left' : 'right';
        posX = isRightOutside ? leftX : rightX;
      } else {
        // topLeft bottomLeft
        isOutside = isHorLeftOutside ? 'right' : 'left';
        posX = isHorLeftOutside ? verRightX : posX;
      }

      resolve({
        left: posX,
        isOutside,
      });
    });
  });
}; // end setLeftFn

export const setTopFn = (
  self: any,
  render: Element,
  disabled: boolean,
  before = () => {},
  after = () => {},
  options: any,
) => {
  if (!render) {
    return new Promise((resolve) => {
      resolve();
    });
  }
  before();

  return new Promise((resolve) => {
    self.$nextTick(() => {
      const { y: offsetTop, height }: any = render.getBoundingClientRect();
      const { popElem = { offsetHeight: 0 } } = self.$refs;
      const tooltipHeight = popElem.offsetHeight;
      let posY = disabled ? -1 : offsetTop + getScroll(window, true);
      const defPadding = options.paddingBottom || 0;
      const topY = posY - tooltipHeight - self.interval - defPadding;
      const bottomY = posY + height + self.interval;
      let isOutside = '';
      const horBottomY = posY + height - tooltipHeight;
      const isVerTopOutside = posY + tooltipHeight > window.innerHeight;
      const verBottomY = offsetTop - tooltipHeight + height;

      after();
      // top left right bottom
      // topLeft topRight bottomLeft bottomRight
      // leftTop leftBottom rightTop rightBottom
      if (self.isHorCenter) {
        // left right
        const centerY = posY + height / 2 - tooltipHeight / 2;
        console.log(centerY, isVerTopOutside, 'centerY');
        if (centerY < 0) {
          // 上边出界了
          isOutside = 'top';
        } else if (isVerTopOutside) {
          isOutside = 'bottom';
          posY = verBottomY;
        } else {
          isOutside = 'center';
          posY = centerY;
        }
      } else if (self.isHorEndBottom) {
        // leftBottom rightBottom
        const isBottomOutside = horBottomY < 0;
        isOutside = isBottomOutside ? 'top' : 'bottom';
        posY = isBottomOutside ? posY : horBottomY;
      } else if (self.isHorTop) {
        // top topLeft topRight
        const isTopOutside = topY < 0;
        isOutside = isTopOutside ? 'bottom' : 'top';
        posY = isTopOutside ? bottomY : topY;
      } else if (self.isHorBottom) {
        // bottom bottomLeft bottomRight
        const isBottom3Outside = bottomY > window.innerHeight;
        isOutside = isBottom3Outside ? 'top' : 'bottom';
        posY = isBottom3Outside ? topY : bottomY;
      } else {
        // rightTop leftTop
        isOutside = isVerTopOutside ? 'bottom' : 'top';
        posY = isVerTopOutside ? verBottomY : posY;
      }

      resolve({
        top: posY,
        isOutside,
      });
    });
  });
}; // end setTopFn

export const setPostion = (
  self: any,
  refElement: Element,
  disabled: boolean,
  leftAfter: Function,
  rightAfter: Function,
  options: any,
) => {
  const { popElem } = self.$refs;
  if (hasOwn(self.$refs, 'popElem') && refElement && !disabled) {
    setLeftFn(self, refElement, disabled).then((params: any) => {
      const { left } = params;
      if (!isUndefined(left)) {
        popElem.style.left = `${left}px`;
        leftAfter(params);
      } else {
        popElem.style.left = '';
      }
    });
    setTopFn(
      self,
      refElement,
      disabled,
      () => {},
      () => {},
      options,
    ).then((params: any) => {
      const { top } = params;
      if (!isUndefined(top)) {
        popElem.style.top = `${top}px`;
        rightAfter(params);
      } else {
        popElem.style.top = '';
      }
    });
  }
};

export const getRefByTarget = (instance: any, $key: any, refName: any): any => {
  if (instance[$key].$refs[refName]) {
    return instance[$key].$refs[refName];
  }

  if (instance[$key]) {
    return getRefByTarget(instance[$key], $key, refName);
  }

  return null;
};

export const getEventType = (type: string) => {
  if (type === 'mouseenter' || type === 'mouseleave') {
    return 'hover';
  }
  return type;
};
