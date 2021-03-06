/** @format */

import { ApiEntity } from '@/views/entity/demoentity';

const base: ApiEntity = {
  title: '左右偏移',
  desc:
    '使用 <code>offset</code> 可以将列向右侧偏。例如，<code>:offset="4"</code> 将元素向右侧偏移了 4 个列（column）的宽度。',
  code: `<w-row>
  <w-col :span="18" :push="6">
    <div class="demo-grid-box">col-18 col-push-6</div>
  </w-col>
  <w-col :span="6" :pull="18">
    <div class="demo-grid-box">col-6 col-pull-18</div>
  </w-col>
</w-row>`,
};

export default base;
