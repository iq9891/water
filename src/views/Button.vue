<!-- @format -->

<template>
  <pre style="color: red">
    重构组件
    1. 不在支持 icon 组件
    2. 统一使用 @ant-design/icons-vue 中的 icon
    3. slot 外面必须 template 的具名，不然不起作用
    4. size 属性不再支持自定义字号
    5. loading 的 icon 替换 @ant-design/icons-vue 中的 LoadingOutlined
    6. 支持 icon 在内容区域自定义位置
    7. 修改了部分样式
    8. 去掉 stop click
    9. 去掉 组合 按钮
    10. 新增 shape 属性，可圆角
  </pre>
  <w-space type="vertical">
    <w-space>
      <!-- <w-button @click="size = 'large'">大</w-button>
      <w-button type="info" @click="size = ''">中</w-button>
      <w-button type="border" @click="size = 'small'">小</w-button> -->
      <w-radio-group
        v-model="size"
        :loading="loading"
        :disabled="disabled"
        :options="options"
        type="button"
        button-style="solid"
      ></w-radio-group>
      <w-button type="dashed" @click="loading = !loading"
        >加载{{ loading ? '中' : '' }}</w-button
      >
      <w-button type="danger" @click="disabled = !disabled"
        >禁用{{ disabled ? '中' : '' }}</w-button
      >
    </w-space>
    <w-divider />
    <w-space>
      <w-button :size="size" :disabled="disabled" :loading="loading"
        ><fire-filled /> Default</w-button
      >
      <w-button :size="size" :disabled="disabled" :loading="loading" type="info"
        >Info <fire-filled
      /></w-button>
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="border"
        >Border<img
          src="https://static2.evente.cn/static/img/icon.jpg"
          alt="水滴"
      /></w-button>
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="dashed"
        >a <fire-filled /> icon</w-button
      >
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="danger"
        >Danger <fire-filled
      /></w-button>
    </w-space>
    <w-space>
      <w-button :size="size" :disabled="disabled" :loading="loading"
        >Default</w-button
      >
      <w-button :size="size" :disabled="disabled" :loading="loading" type="info"
        >Info</w-button
      >
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="border"
        >Border</w-button
      >
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="dashed"
        >Dashed</w-button
      >
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="danger"
        >Danger</w-button
      >
    </w-space>
    <div class="button-ghost">
      <w-space>
        <w-button :size="size" :disabled="disabled" :loading="loading" ghost
          >Default</w-button
        >
        <w-button
          :size="size"
          :disabled="disabled"
          :loading="loading"
          ghost
          type="info"
          >Info</w-button
        >
        <w-button
          :size="size"
          :disabled="disabled"
          :loading="loading"
          ghost
          type="border"
          >Border</w-button
        >
        <w-button
          :size="size"
          :disabled="disabled"
          :loading="loading"
          ghost
          type="dashed"
          >Dashed</w-button
        >
        <w-button
          :size="size"
          :disabled="disabled"
          :loading="loading"
          ghost
          type="danger"
          >Danger</w-button
        >
      </w-space>
    </div>
    <w-space>
      <w-button :size="size" :disabled="disabled" :loading="loading">
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="info"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="border"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="dashed"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="danger"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button :size="size" :disabled="disabled" :loading="loading">
        Default1
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="info"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
        Info
      </w-button>
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="border"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
        Border
      </w-button>
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="dashed"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
        Dashed
      </w-button>
      <w-button
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="danger"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
        Danger
      </w-button>
    </w-space>
    <w-space>
      <w-button
        shape="circle"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        shape="circle"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="info"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        shape="circle"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="border"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        shape="circle"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="dashed"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        shape="circle"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="danger"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        shape="round"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        shape="round"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="info"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        shape="round"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="border"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        shape="round"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="dashed"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        shape="round"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="danger"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
      </w-button>
      <w-button
        shape="round"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
        按钮
      </w-button>
      <w-button
        shape="round"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="info"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
        按钮
      </w-button>
      <w-button
        shape="round"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="border"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
        按钮
      </w-button>
      <w-button
        shape="round"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="dashed"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
        按钮
      </w-button>
      <w-button
        shape="round"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        type="danger"
      >
        <template #icon>
          <img src="https://static2.evente.cn/static/img/icon.jpg" alt="水滴" />
        </template>
        按钮
      </w-button>
    </w-space>
  </w-space>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { FireFilled } from '@ant-design/icons-vue';

  const WButton = defineAsyncComponent(() =>
    import('../components/button/Button.tsx'),
  );

  const WSpace = defineAsyncComponent(() =>
    import('../components/space/Space.vue'),
  );

  const WDivider = defineAsyncComponent(() =>
    import('../components/divider/Divider.vue'),
  );

  const WRadioGroup = defineAsyncComponent(() =>
    import('../components/radio-group/radio-group'),
  );

  const options = [
    { label: 'small', value: 'Small' },
    { label: '', value: 'Default' },
    { label: 'large', value: 'Large' },
  ];

  export default {
    components: {
      WButton,
      FireFilled,
      WSpace,
      WDivider,
      WRadioGroup,
    },
    data() {
      return {
        loading: false,
        disabled: false,
        size: '',
        options,
      };
    },
  };
</script>

<style lang="scss">
  @import '../components/radio-button/radio-button';
  @import '../components/button/button.scss';

  .button-ghost {
    padding: 8px;
    background: rgb(190, 200, 200);
  }
</style>
