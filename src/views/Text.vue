<template>
  <w-text>Water</w-text>
  <w-text strong>
    Water
  </w-text>
  <w-text underline>
    Water
  </w-text>
  <w-text
    underline
    strong
  >
    Water
  </w-text>
  <w-text
    underline
    strong
    code
  >
    Water
  </w-text>
  <w-text
    underline
    strong
    mark
  >
    Water
  </w-text>
  <w-text
    underline
    strong
    mark
    mark-style="background-color: #ff4949;color:#fff;padding: 0 4px;"
  >
    Water
  </w-text>
  <w-text disabled>
    Water
  </w-text>
  <w-text delete>
    Water
  </w-text>
  <w-text>Water</w-text>
  <w-text type="secondary">
    Water
  </w-text>
  <w-text type="warning">
    Water
  </w-text>
  <w-text type="info">
    Water
  </w-text>
  <w-text type="danger">
    Water
  </w-text>
  <w-text type="success">
    Water
  </w-text>
  <w-text
    underline
    strong
    code
    mark
    mark-style="background-color: #ff4949;color:#0ff;padding: 0 4px;"
  >
    Water
  </w-text>
  <w-text
    underline
    underline-style="color:#ff4949;"
  >
    Water
  </w-text>
  <w-text
    delete
    delete-style="color:#ff4949;"
  >
    Water
  </w-text>
</template>

<script>
/** @format */

import WText from '../components/text/Text.vue';

export default {
  components: {
    WText,
  },
};
</script>
