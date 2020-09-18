<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    1. 新增 ltr 支持
  </pre> -->
  <w-space type="vertical">
    <w-countdown v-model="value1" :direction="direction" :finish="finish" />
    <w-countdown
      v-model="value1"
      :direction="direction"
      title="倒计时"
      format="HH:mm:ss:SSS"
    />
    <w-countdown
      v-model="value3"
      :direction="direction"
      format="D 天 HH:mm:ss:SSS"
      value-style="color: red"
    />
    <w-countdown
      v-model="value3"
      :direction="direction"
      title="国安主场夺冠"
      value-style="color: red"
    >
      <template #prefix>
        <span style="padding-bottom: 2px; display: block;color: green"
          >预计<fire-filled
        /></span>
      </template>
      <template #suffix>之后开始</template>
    </w-countdown>
  </w-space>
</template>

<script lang="ts">
  import dayjs from 'dayjs';
  import { defineAsyncComponent, h } from 'vue';
  import { mapState } from 'vuex';
  import { FireFilled } from '@ant-design/icons-vue';

  const WCountdown = defineAsyncComponent(() =>
    import('../components/countdown/Countdown.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WCountdown,
      WSpace,
      FireFilled,
    },
    data() {
      return {
        value1: Date.now() + 1000 * 5,
        value2: dayjs().add(5, 'second'),
        value3: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {
      finish() {
        console.log(1, 'end');
      },
    },
  };
</script>
