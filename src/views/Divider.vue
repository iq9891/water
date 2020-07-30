<template>
  <div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <WDivider />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <WDivider dashed />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <WDivider :style="{ borderWidth: 2, borderColor: '#7cb305' }" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <WDivider
      style="borderColor: #f00"
      dashed
    />
    <div>
      Text
      <WDivider type="vertical" />
      <a href="#">Link</a>
      <WDivider type="vertical" />
      <a href="#">Link</a>
    </div>
    <WDivider
      :style="[dividerStyle]"
      dashed
    />
    <div>
      Text
      <WDivider
        type="vertical"
        :style="{ borderWidth: 2, borderColor: '#7cb305' }"
      />
      <a href="#">Link</a>
      <WDivider
        type="vertical"
        style="borderColor: #f00"
        dashed
      />
      <a href="#">Link</a>
      <WDivider
        type="vertical"
        :style="[dividerStyle]"
        dashed
      />
      <a href="#">Link</a>
    </div>
    <WDivider>Text</WDivider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <WDivider placement="left">
      Left Text
    </WDivider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <WDivider placement="right">
      Right Text
    </WDivider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <WDivider plain>
      Text
    </WDivider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <WDivider
      placement="left"
      plain
    >
      Left Text
    </WDivider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <WDivider
      placement="right"
      plain
    >
      Right Text
    </WDivider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </div>
</template>

<script>
import WDivider from '../components/divider/Divider.vue';

export default {
  components: {
    WDivider,
  },
  data() {
    return {
      dividerStyle: {
        borderColor: '#f0f',
      }
    } 
  },
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  line-height: 1;
}
</style>
