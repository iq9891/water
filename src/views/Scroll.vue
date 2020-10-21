<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    1. 新增 pulled 属性
    2. 加载更多不在获取 ref 调用组件内置发方法，而是用 pulled 控制是否拉取完成，当拉取完成 设置 pulled 为 true 组件自动处理
    3. 修复向下修改更多，再触发向上加载更多，向上加载更多完成没处理，导致的向下加载更多无效的问题， 修改 openPull 属性和使用，从之前的 Boolean 变成 String
    pulling 属性替换为 onPulling
    pulling emit 方法 替换为 on-pulling
    scroll 属性替换为 onScroll
    scroll emit 方法 替换为 on-scroll
  </pre> -->
  <w-space type="vertical">
    <WScroll
      :ref="(el) => (pullScroll2 = el)"
      class="demo-scroll-h"
      type="horizontal"
      open-pull="next"
      :on-pulling="pulling2"
      :edge-is-prevent-default="false"
      :pulled="pulled2"
    >
      <div class="demo-scroll-h-i2">
        <p v-for="(text, index) in texts3" :key="index" class="demo-desc-h">
          {{ text }}
        </p>
      </div>
    </WScroll>
    <hr />
    <WScroll
      :ref="(el) => (pullScroll1 = el)"
      class="demo-scroll"
      open-pull="next"
      :loading="loading1"
      :on-pulling="pulling1"
      :edge-is-prevent-default="false"
      :pulled="pulled1"
    >
      <p v-for="(text, index) in texts2" :key="index">{{ text }}</p>
    </WScroll>
    <hr />
    <WScroll class="demo-scroll" prevent-default>
      <p v-for="(text, index) in texts" :key="index">{{ text }}</p>
    </WScroll>
    <hr />
    <WScroll class="demo-scroll-h" type="horizontal" prevent-default>
      <div class="demo-scroll-h-i">
        <p v-for="(text, index) in texts1" :key="index" class="demo-desc-h">
          {{ text }}
        </p>
      </div>
    </WScroll>
  </w-space>
</template>

<script lang="ts">
  import {
    ref,
    nextTick,
    onUpdated,
    onMounted,
    defineAsyncComponent,
  } from 'vue';

  const WScroll = defineAsyncComponent(() =>
    import('../components/scroll/Scroll.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WScroll,
      WSpace,
    },
    data() {
      return {
        texts: [],
        texts1: [],
        texts2: [],
        texts3: [],
        pulled1: false,
        pulled2: false,
        loading1: false,
      };
    },
    created() {
      this.initDate();
    },
    methods: {
      initDate() {
        for (let i = 1; i < 100; i++) {
          (this.texts as any).push(`这是一段文字++${i}`);
        }
        for (let i = 1; i < 100; i++) {
          (this.texts1 as any).push(`这是一段文字++${i}`);
        }
        for (let i = 1; i < 10; i++) {
          (this.texts2 as any).push(`这是一段文字++${i}`);
        }
        for (let i = 1; i < 30; i++) {
          (this.texts3 as any).push(`这是一段文字++${i}`);
        }
      },
      pulling1(params: any) {
        if (params.dir === 'next') {
          const len = this.texts2.length;
          this.pulled1 = false;
          this.loading1 = true;
          setTimeout(() => {
            for (let i = len + 1; i < len + 11; i++) {
              (this.texts2 as any).push(`这是一段文字++${i}`);
            }

            nextTick(() => {
              this.loading1 = false;
              this.pulled1 = true;
            });
          }, 1000);
        }
      },
      pulling2() {
        const len = this.texts3.length;
        this.pulled2 = false;

        for (let i = len + 1; i < len + 11; i++) {
          (this.texts3 as any).push(`这是一段文字++${i}`);
        }

        nextTick(() => {
          this.pulled2 = true;
        });
      },
    },
  };
</script>

<style lang="scss">
  .demo-scroll {
    height: 200px;

    & p {
      margin: 0;
      padding: 10px 0;
    }
  }

  .demo-scroll-h {
    width: 400px;
    height: 200px;

    &-i {
      width: 11980px;
    }

    &-i2 {
      white-space: nowrap;
    }

    & p {
      margin: 0;
    }
  }

  .demo-desc-h {
    display: inline-block;
    height: 200px;
    width: 120px;
    border-right: 1px solid #000;
  }
</style>
