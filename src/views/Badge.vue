<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    1. status 只支持 success processing default error warning
    2. 新增 color 设置 小圆点的颜色
    3. 新增 offset 属性，可以控制状态点位置
    4. 新增 size 属性，控制状态点大小
    5. 新增 className 属性
    6. 新增 direction 属性
    7. 新增 缎带 组件
  </pre> -->
  <w-space type="vertical">
    <w-space>
      <w-badge v-model="val1" :direction="direction">
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
      </w-badge>
      <w-badge :direction="direction" show-zero>
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
      </w-badge>
      <w-badge :direction="direction">
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
        <template #count>
          <fire-filled />
        </template>
      </w-badge>
    </w-space>
    <w-space>
      <w-badge :direction="direction" :model-value="99"></w-badge>
      <w-badge :direction="direction" :model-value="111"></w-badge>
      <w-badge
        :direction="direction"
        size="small"
        :model-value="20"
        :overflow-count="10"
      ></w-badge>
      <w-badge
        :direction="direction"
        :model-value="100111"
        :overflow-count="999"
      ></w-badge>
    </w-space>
    <w-space>
      <w-badge
        :direction="direction"
        :model-value="5"
        class-name="abc"
      ></w-badge>
      <w-badge
        :direction="direction"
        :model-value="22"
        style="line-height: 18px; background: #fff; border: 1px solid #dcdcdc; color: #999; box-shadow: 0 0 0 1px #d9d9d9 inset"
      ></w-badge>
      <w-badge
        :direction="direction"
        :model-value="19"
        style="background: #52c41a"
      ></w-badge>
    </w-space>
    <w-space>
      <a href="#">
        <w-badge v-model="val1" :direction="direction">
          <a
            href="#"
            style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
          ></a>
        </w-badge>
      </a>
    </w-space>
    <w-space>
      <w-badge
        v-model="badgeNumber"
        :direction="direction"
        style="margin-right: 8px;"
      ></w-badge>
      <w-badge v-model="badgeNumber" :direction="direction">
        <a
          href="javascript:;"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
      </w-badge>
      <br />
      <br />
      <button size="small" @click="jiaFn">加</button>
      <button size="small" @click="shaoFn">减</button>
    </w-space>
    <w-space>
      <w-badge
        :direction="direction"
        dot
        :model-value="1"
        style="margin-right: 16px;"
      >
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
      </w-badge>
      <w-badge
        :direction="direction"
        dot
        :model-value="1"
        style="margin-right: 16px;"
      >
        <fire-filled />
      </w-badge>
      <w-badge
        :direction="direction"
        dot
        :model-value="1"
        style="margin-right: 16px;"
      >
        <a href="#">Link something</a>
      </w-badge>
    </w-space>
    <w-space>
      <w-badge :direction="direction" status="success"></w-badge>
      <w-badge :direction="direction" status="error"></w-badge>
      <w-badge :direction="direction" status="default"></w-badge>
      <w-badge :direction="direction" status="processing"></w-badge>
      <w-badge :direction="direction" status="warning"></w-badge>

      <w-badge :direction="direction" status="success" text="成功"></w-badge>
      <w-badge :direction="direction" status="error" text="报错"></w-badge>
      <w-badge :direction="direction" status="default" text="默认"></w-badge>
      <w-badge
        :direction="direction"
        status="processing"
        text="进行中"
      ></w-badge>
      <w-badge :direction="direction" status="warning" text="提醒"></w-badge>
    </w-space>
    <w-space>
      <w-badge :direction="direction" color="#00f"></w-badge>
    </w-space>
    <w-badge :direction="direction" color="#00f" text="自定义"></w-badge>
    <w-space>
      <w-badge :direction="direction" :model-value="1">
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
      </w-badge>
      <w-badge :direction="direction" :model-value="789">
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
      </w-badge>
      <w-badge :direction="direction" size="small" :model-value="1">
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
      </w-badge>
      <w-badge :direction="direction" size="small" :model-value="67890">
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
      </w-badge>
    </w-space>
    <w-space>
      <w-badge :direction="direction">
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
        <template #count>
          <div style="background: green; color: yellow">
            67890
          </div>
        </template>
      </w-badge>
    </w-space>
    <w-space>
      <w-badge :direction="direction" :model-value="5" :offset="[10]">
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
      </w-badge>
      <w-badge :direction="direction" :model-value="5" dot :offset="[10, 10]">
        <a
          href="#"
          style="width: 42px; height: 42px; border-radius: 4px; background: #eee; display: inline-block;"
        ></a>
      </w-badge>
      <w-badge
        :direction="direction"
        status="success"
        :offset="[10, 10]"
        text="成功"
      ></w-badge>
      <w-badge
        :direction="direction"
        :model-value="1"
        :offset="[10, 10]"
      ></w-badge>
    </w-space>
    <w-space>
      <w-badge-ribbon text="Pushes open the window" :direction="direction">
        <div style="padding: 24px;border: 1px solid; width: 400px;">
          And raises the spyglass.
        </div>
      </w-badge-ribbon>
      <w-badge-ribbon
        text="Pushes open the window"
        :direction="direction"
        color="#f0f"
      >
        <div style="padding: 24px;border: 1px solid; width: 400px;">
          And raises the spyglass.
        </div>
      </w-badge-ribbon>
    </w-space>
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { mapState } from 'vuex';
  import { FireFilled } from '@ant-design/icons-vue';

  const WBadge = defineAsyncComponent(() =>
    import('../components/badge/Badge.vue'),
  );

  const WBadgeRibbon = defineAsyncComponent(() =>
    import('../components/badge-ribbon/BadgeRibbon.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WBadge,
      WBadgeRibbon,
      WSpace,
      FireFilled,
    },
    data() {
      return {
        val1: 6,
        badgeNumber: 16,
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {
      changeHandle(step) {
        this.badgeNumber += step;
      },
      jiaFn() {
        this.changeHandle(1);
      },
      shaoFn() {
        this.changeHandle(-1);
      },
    },
  };
</script>

<style lang="scss">
  @import '../components/button/button.scss';
</style>
