/** @format */

import { h, defineComponent, VNode, Comment } from 'vue';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import validator from '../../common/validator';
import { isString } from '../../common/typeof';
import { hasOwn, hyphenate } from '../../common/utils';

const bothSidesRender = defineComponent({
  components: {
    CloseCircleFilled,
  },
  props: {
    type: {
      type: String,
      default: 'prefix',
      validator(value: string) {
        const typeList = [
          'prefix',
          'suffix',
          'addonBefore',
          'addonAfter',
          'limit',
          'clear',
        ];
        return validator(typeList, value);
      },
    },
    onlySlots: Boolean,
    clear: Boolean,
    showCount: Boolean,
    instance: {
      type: Object,
      default() {},
    },
    className: {
      type: [Object, Array, String],
      default: '',
    },
    direction: {
      type: String,
      default: 'ltr',
    },
  },
  emits: ['on-clear'],
  render() {
    let content: string = '';
    let clearNode: string | VNode = '';
    let limitNode: string | VNode = '';

    if (
      !this.onlySlots &&
      hasOwn(this.instance, this.type) &&
      this.instance[this.type]
    ) {
      content = this.instance[this.type];
    }

    if (this.instance.$slots[this.type]) {
      content = this.instance.$slots[this.type]();
    }

    if (this.clear) {
      clearNode = h(CloseCircleFilled, {
        class: [
          'w-input-clear-inner',
          `w-input-clear-inner-${this.direction}`,
          this.className,
        ],
        onClick: (ev: MouseEvent) => {
          this.$emit('on-clear', ev);
        },
      });
    }

    if (this.showCount) {
      limitNode = h(
        'span',
        {
          class: 'w-input-limit-inner',
        },
        `${this.instance.modelValue.length} / ${this.instance.maxLength}`,
      );
    }

    return h(
      'div',
      {
        class: [
          `w-input-${hyphenate(this.type)}`,
          {
            // 如果没有内容就没有间距
            [`w-input-${hyphenate(this.type)}-${this.direction}`]:
              !!clearNode ||
              !!limitNode ||
              (isString(content) && content.length > 0) ||
              (content as any).filter((cItem: any) => cItem.type !== Comment)
                .length > 0,
          },
        ],
      },
      [clearNode, limitNode, content],
    );
  },
});

export default bothSidesRender;
