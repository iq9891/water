/** @format */

import { DirectiveBinding, VNode } from 'vue';
import { once, on } from '../common/dom';

export default {
  beforeMount(el: HTMLInputElement, binding: DirectiveBinding<any>) {
    let interval: any = null;
    let startTime: number;
    const handler = () => binding.value.apply();
    const clear = () => {
      if (Date.now() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };

    on(el, 'mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return;
      startTime = Date.now();
      once(document, 'mouseup', clear);
      clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  },
};
