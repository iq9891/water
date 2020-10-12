/** @format */

import { sizeValidator, placementValidator } from './validator';

export const getEventType = (type: string) => {
  if (type === 'mouseenter' || type === 'mouseleave') {
    return 'hover';
  }
  return type;
};

export const poperBaseProps = {
  placement: {
    type: String,
    default: 'bottom',
    validator: placementValidator,
  },
  interval: {
    type: Number,
    default: 4,
  },
};

export const poperProps = {
  size: {
    type: String,
    default: '',
    validator: sizeValidator,
  },
  placeholder: {
    type: String,
    default: '',
  },
  ...poperBaseProps,
  zIndex: Number,
  before: {
    type: Function,
    default() {
      return new Promise((resolve) => {
        (this as any).$nextTick(() => {
          resolve();
        });
      });
    },
  },
  getContainer: Function,
  change: {
    type: Function,
    default: () => {},
  },
  focus: {
    type: Function,
    default: () => {},
  },
  blur: {
    type: Function,
    default: () => {},
  },
};

export const poperComputed = {
  // 纵向( Ver )，设置左边的判断 start
  isVerCenter(): boolean {
    return /\b(top|bottom)\b/g.test((this as any).placement);
  },
  // topRight bottomRight
  isVerEndRight(): boolean {
    return /Right/g.test((this as any).placement);
  },
  // topLeft bottomLeft
  isVerEndLeft(): boolean {
    return /Left/g.test((this as any).placement);
  },
  // leftTop left leftBottom
  isVerLeft(): boolean {
    return /left/g.test((this as any).placement);
  },
  // rightTop right rightBottom
  isVerRight(): boolean {
    return /right/g.test((this as any).placement);
  },
  // 纵向( Ver )，设置左边的判断 end

  // 横向( Hor )，设置左边的判断 start
  // left right
  isHorCenter(): boolean {
    return /\b(left|right)\b/g.test((this as any).placement);
  },
  // leftBottom rightBottom
  isHorEndBottom(): boolean {
    return /Bottom/g.test((this as any).placement);
  },
  // topTop bottomTop
  isVerEndTop(): boolean {
    return /Top/g.test((this as any).placement);
  },
  // top topLeft topRight
  isHorTop(): boolean {
    return /top/g.test((this as any).placement);
  },
  // bottom bottomLeft bottomRight
  isHorBottom(): boolean {
    return /bottom/g.test((this as any).placement);
  },
  // 横向( Hor )，设置左边的判断 end
};
