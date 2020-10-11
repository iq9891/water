/** @format */

import { isUndefined } from '../../common/typeof';
import { hasOwn } from '../../common/utils';

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
  const { x: offsetLeft, width }: any = render.getBoundingClientRect();

  before();
  return new Promise((resolve) => {
    self.$nextTick(() => {
      const { popElem = { offsetWidth: 0 } } = self.$refs;
      const tooltipWidth = popElem.offsetWidth;
      let posX = disabled ? -1 : offsetLeft;
      after();
      // top left right bottom
      // topLeft topRight bottomLeft bottomRight
      // leftTop leftBottom rightTop rightBottom
      if (self.isVerCenter) {
        // top bottom
        posX = posX + width / 2 - tooltipWidth / 2;
      } else if (self.isVerLeft) {
        // leftTop left leftBottom
        posX = posX - tooltipWidth - self.interval;
      } else if (self.isVerEndRight) {
        // topRight bottomRight
        posX = posX + width - tooltipWidth;
      } else if (self.isVerRight) {
        // rightTop right rightBottom
        posX = posX + width + self.interval;
      }
      resolve(posX + getScroll(window));
    });
  });
}; // end setLeftFn

export const setTopFn = (
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
  const { y: offsetTop, height }: any = render.getBoundingClientRect();
  before();

  return new Promise((resolve) => {
    self.$nextTick(() => {
      const { popElem = { offsetHeight: 0 } } = self.$refs;
      const tooltipHeight = popElem.offsetHeight;
      let posY = disabled ? -1 : offsetTop;
      after();
      // top left right bottom
      // topLeft topRight bottomLeft bottomRight
      // leftTop leftBottom rightTop rightBottom
      if (self.isHorCenter) {
        // left right
        posY = posY + height / 2 - tooltipHeight / 2;
      } else if (self.isHorEndBottom) {
        // leftBottom rightBottom
        posY = posY + height - tooltipHeight;
      } else if (self.isHorTop) {
        // top topLeft topRight
        posY = posY - tooltipHeight - self.interval;
      } else if (self.isHorBottom) {
        // bottom bottomLeft bottomRight
        posY = posY + height + self.interval;
      }
      resolve(posY + getScroll(window, true));
    });
  });
}; // end setTopFn

export const setPostion = (
  self: any,
  refElement: Element,
  disabled: boolean,
) => {
  const { popElem } = self.$refs;
  if (hasOwn(self.$refs, 'popElem') && refElement) {
    setLeftFn(self, refElement, disabled).then((left) => {
      if (!isUndefined(left)) {
        popElem.style.left = `${left}px`;
      }
    });
    setTopFn(self, refElement, disabled).then((top) => {
      if (!isUndefined(top)) {
        popElem.style.top = `${top}px`;
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
