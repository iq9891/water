/** @format */

import { ApiEntity } from '@/views/entity/demoentity';
import { codeCommon } from '@/views/code/inputnumber/base';

const base: ApiEntity = {
  title: '舞动的数字',
  desc: '添加 <code>animate</code> 属性即可。',
  code: codeCommon({ attr: 'animate :step="10"' }),
};

export default base;
