<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <br>
  <router-link :to="{ name: 'Home'}">
    首页
  </router-link> |
  <router-link :to="{ name: 'Text'}">
    文字
  </router-link>
  <br>
  <router-view />
</template>

<script>
/** @format */

export default {
  name: 'App',
};
</script>
