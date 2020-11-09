<!-- @format -->

<template>
  <!-- <pre style="color: red">
    重构组件
    新增 dot slot 自定义icon
  </pre> -->
  <w-space type="vertical">
    <w-timeline mode="right">
      <w-timeline-item timestamp="2019-10-10" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
      </w-timeline-item>
      <w-timeline-item timestamp="2019-10-10" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
      </w-timeline-item>
    </w-timeline>
    <w-timeline mode="alternate">
      <w-timeline-item1 timestamp="2019-10-10" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
      </w-timeline-item1>
      123
      <!-- <div></div> -->
      <!-- sss -->
      <div>111</div>
      <w-timeline-item timestamp="2019-10-10" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
      </w-timeline-item>
    </w-timeline>
    <w-timeline mode="alternate">
      <w-timeline-item timestamp="2019-10-10">1111</w-timeline-item>
      <w-timeline-item timestamp="2019-10-10" color="#52c41a">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div></w-timeline-item
      >
      <w-timeline-item timestamp="2019-10-10" color="#1890ff">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
      </w-timeline-item>
      <w-timeline-item timestamp="2015-09-01" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
      </w-timeline-item>
    </w-timeline>
    <w-timeline>
      <w-timeline-item timestamp="2019-10-10">1111</w-timeline-item>
      <w-timeline-item timestamp="2019-10-10" color="#52c41a"
        >1111</w-timeline-item
      >
      <w-timeline-item timestamp="2019-10-10" color="#1890ff"
        >1111</w-timeline-item
      >
      <w-timeline-item timestamp="2015-09-01" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
      </w-timeline-item>
    </w-timeline>
    <w-timeline>
      <w-timeline-item>1111</w-timeline-item>
      <w-timeline-item color="#52c41a">1111</w-timeline-item>
      <w-timeline-item color="#1890ff">1111</w-timeline-item>
      <w-timeline-item color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
      </w-timeline-item>
    </w-timeline>
    <w-timeline>
      <w-timeline-item timestamp="2019-10-10"></w-timeline-item>
      <w-timeline-item timestamp="2019-10-10" color="#52c41a"></w-timeline-item>
      <w-timeline-item timestamp="2019-10-10" color="#1890ff"></w-timeline-item>
      <w-timeline-item timestamp="2015-09-01" color="#f5222d"></w-timeline-item>
    </w-timeline>
    <w-timeline>
      <w-timeline-item timestamp="2019-10-10" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
        <template #dot>
          <fire-filled />
        </template>
      </w-timeline-item>
      <w-timeline-item timestamp="2019-10-10" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
        <template #dot>
          <fire-filled />
        </template>
      </w-timeline-item>
    </w-timeline>
    <w-timeline mode="right">
      <w-timeline-item timestamp="2019-10-10" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
        <template #dot>
          <fire-filled />
        </template>
      </w-timeline-item>
      <w-timeline-item timestamp="2019-10-10" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
        <template #dot>
          <fire-filled style="font-size: 20px; color: green;" />
        </template>
      </w-timeline-item>
    </w-timeline>
    <w-timeline mode="alternate">
      <w-timeline-item timestamp="2019-10-10" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
        <template #dot>
          <fire-filled />
        </template>
      </w-timeline-item>
      <w-timeline-item timestamp="2019-10-10" color="#f5222d">
        <div>Solve initial network problems 1</div>
        <div>Solve initial network problems 2</div>
        <div>Solve initial network problems 3</div>
        <template #dot>
          <fire-filled style="font-size: 20px; color: green;" />
        </template>
      </w-timeline-item>
    </w-timeline>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';
  import { mapState } from 'vuex';
  import WTimelineItem1 from '../components/timeline-item/TimelineItem.vue';

  const WTimeline = defineAsyncComponent(() =>
    import('../components/timeline/timeline'),
  );

  const WTimelineItem = defineAsyncComponent(() =>
    import('../components/timeline-item/TimelineItem.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WTimeline,
      WTimelineItem1,
      WTimelineItem,
      WSpace,
      FireFilled,
    },
    data() {
      return {
        val1: 'test1',
      };
    },
    computed: {
      ...mapState(['direction']),
    },
    methods: {},
  };
</script>

<style lang="scss">
  @import '../components/radio-button/radio-button';
</style>
