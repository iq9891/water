<template>
  <div>
    <w-title>h1. Water</w-title>
    <w-title :level="2">
      h2. Water
    </w-title>
    <w-title :level="3">
      h3. Water
    </w-title>
    <w-title :level="4">
      h4. Water
    </w-title>

    <w-title strong>
      Water
    </w-title>
    <w-title underline>
      Water
    </w-title>
    <w-title
      underline
      strong
    >
      Water
    </w-title>
    <w-title
      underline
      strong
      code
    >
      Water
    </w-title>
    <w-title
      underline
      strong
      mark
    >
      Water
    </w-title>
    <w-title
      underline
      strong
      mark
      mark-style="background-color: #ff4949;color:#fff;padding: 0 4px;"
    >
      Water
    </w-title>
    <w-title disabled>
      Water
    </w-title>
    <w-title delete>
      Water
    </w-title>
    <w-title>Water</w-title>
    <w-title type="secondary">
      Water
    </w-title>
    <w-title type="warning">
      Water
    </w-title>
    <w-title type="info">
      Water
    </w-title>
    <w-title type="danger">
      Water
    </w-title>
    <w-title type="success">
      Water
    </w-title>
    <w-title
      underline
      strong
      code
      mark
      mark-style="background-color: #ff4949;color:#0ff;padding: 0 4px;"
    >
      Water
    </w-title>
    <w-title
      underline
      underline-style="color:#ff4949;"
    >
      Water
    </w-title>
    <w-title
      delete
      delete-style="color:#ff4949;"
    >
      Water
    </w-title>
  </div>
</template>
<script>
import WTitle from '../components/title/Title.vue';

export default {
  components: {
    WTitle,
  },
};
</script>
