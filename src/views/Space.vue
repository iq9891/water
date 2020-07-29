<template>
  <div>
    <WSpace>
      center
      <button>Primary</button>
      <span>Block</span>
    </WSpace>
    <hr>
    <WSpace :size="48">
      center
      <button>Primary</button>
      <span>Block</span>
    </WSpace>
    <hr>
    <WSpace direction="vertical">
      center
      <button>Primary</button>
      <span>Block</span>
    </WSpace>
    <hr>
    <div class="space-align-container">
      <div class="space-align-block">
        <WSpace align="center">
          center
          <WText>Primary</WText>
          <span class="mock-block">Block</span>
        </WSpace>
      </div>
      <div class="space-align-block">
        <WSpace align="start">
          start
          <button type="primary">
            Primary
          </button>
          <span class="mock-block">Block</span>
        </WSpace>
      </div>
      <div class="space-align-block">
        <WSpace align="end">
          <WText type="danger">
            end
          </WText>
          <button type="primary">
            Primary
          </button>
          <span class="mock-block">Block</span>
        </WSpace>
      </div>
      <div class="space-align-block">
        <WSpace align="baseline">
          baseline
          <button type="primary">
            Primary
          </button>
          <span class="mock-block">Block</span>
        </WSpace>
      </div>
    </div>
  </div>
</template>

<script>
import WSpace from '../components/space/space.vue';
import WText from '../components/text/text.vue';

export default {
  components: {
    WSpace,
    WText,
  }
}
</script>

<style lang="scss">
.space-align-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.space-align-block {
  margin: 8px 4px;
  border: 1px solid #40a9ff;
  padding: 4px;
  flex: none;
}
.space-align-block .mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, 0.2);
}
</style>
