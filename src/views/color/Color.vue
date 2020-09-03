<!-- @format -->

<template>
  <div>
    <pre style="color: red">
      新增 UI
    </pre>
    <div v-for="(color, index) in colorConf" :key="index" class="color-item">
      <div class="color-title">{{ color.en }} / {{ color.zh }}</div>
      <div class="color-desc">{{ color.desc }}</div>
      <div ref="blue" class="color-body">
        <color-slip :type="color.name" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./color.ts"></script>

<style lang="scss" src="./color.scss"></style>
