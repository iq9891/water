<!-- @format -->

<template>
  <!-- <pre style="color: red">
    新增组件
    内容只能有一个元素，并且这个元素不能有 margin ， padding
  </pre> -->
  <w-space type="vertical">
    <div>
      <button @click="change1Fn">Collapse.vue-{{ status1 }}</button>
      <w-transition-fold>
        <div v-if="status1">
          <div class="w-collapse-item">
            <template v-for="(f, fIdx) in 10" :key="fIdx">
              <h1>内{{ fIdx }}容</h1>
              <p>
                <template v-for="(g, gIdx) in 100"> 内{{ gIdx }}容 </template>
              </p>
            </template>
          </div>
          <div>1</div>
        </div>
      </w-transition-fold>
    </div>
    <div>
      <button @click="change4Fn">Collapse.vue-{{ status4 }}</button>
      <w-transition-fold>
        <div v-if="status4">
          <div class="w-collapse-item2">
            <template v-for="(c, cIdx) in 10" :key="cIdx">
              <h1>内{{ cIdx }}容</h1>
              <p>
                <template v-for="(e, eIdx) in 100"> 内{{ eIdx }}容 </template>
              </p>
            </template>
          </div>
          <div>1</div>
        </div>
      </w-transition-fold>
    </div>
    <div>
      <button @click="change2Fn">Collapse.vue-{{ status2 }}</button>
      <w-transition-fold>
        <div v-if="status2">
          <div class="w-collapse-item">
            <p v-for="(b, bIdx) in 20" :key="bIdx">内{{ bIdx }}容</p>
          </div>
          <div>1</div>
        </div>
      </w-transition-fold>
    </div>
    <div>
      <button @click="change3Fn">Collapse.vue-{{ status3 }}</button>
      <w-transition-fold>
        <div v-if="status3">
          <div>
            <p v-for="(a, aIdx) in 10" :key="aIdx">内{{ aIdx }}容</p>
          </div>
          <div>1</div>
        </div>
      </w-transition-fold>
    </div>
    <div>123</div>
  </w-space>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';
  import { mapState } from 'vuex';

  const WTransitionFold = defineAsyncComponent(() =>
    import('../components/transition-fold/TransitionFold.vue'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  export default {
    components: {
      WTransitionFold,
      WSpace,
    },
    data() {
      return {
        status1: false,
        status2: false,
        status3: false,
        status4: false,
      };
    },
    methods: {
      change1Fn() {
        this.status1 = !this.status1;
      },
      change2Fn() {
        this.status2 = !this.status2;
      },
      change3Fn() {
        this.status3 = !this.status3;
      },
      change4Fn() {
        this.status4 = !this.status4;
      },
    },
  };
</script>

<style lang="scss">
  .w-collapse {
    &-item {
      height: 100px;
      overflow: auto;
      padding: 20px;
      margin: 12px;
      border: 1px solid;
    }
    &-item2 {
      border: 1px solid;
    }
  }
</style>
