// 组件
import WIcon from './icon/index';
import { WButton, WButtonGroup } from './button/index';
import WLink from './link/index';
import WLoadbar from './loadbar/index';
import { WCol, WRow } from './grid/index';
import WAffix from './affix/index';
import { WBreadcrumb, WBreadcrumbItem } from './breadcrumb/index';
import WRate from './rate/index';
import WSwitch from './switch/index';
import { WTag, WCheckTag } from './tag/index';
import { WRadio, WRadioGroup } from './radio/index';
import WInput from './form/index';

const waterCpt = {
  WIcon,
  WButton,
  WButtonGroup,
  WLink,
  WLoadbar,
  WCol,
  WRow,
  WAffix,
  WBreadcrumb,
  WBreadcrumbItem,
  WRate,
  WSwitch,
  WRadio,
  WRadioGroup,
  WInput,
  WTag,
  WCheckTag,
};

const install = (Vue) => {
  if (install.installed) return;

  Object.keys(waterCpt).forEach((key) => {
    Vue.component(key, waterCpt[key]);
  });


  if (!Vue.prototype.$WLoadbar) {
    Object.defineProperties(Vue.prototype, {
      $WLoadbar: {
        get() {
          return WLoadbar;
        },
      },
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  WLoadbar,
  install,
};
