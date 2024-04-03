<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="layout">
    <div class="asider">asider</div>
    <div class="main">
      <div class="header"></div>
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
}
.asider {
  box-sizing: border-box;
  height: 100vh;
  width: 40px;
  border: 1px solid;
}
.header {
  box-sizing: border-box;
  height: 40px;
  width: calc(100vw - 40px);
  border: 1px solid;
}
.content {
  box-sizing: border-box;
  margin: 20px;
  height: calc(100vh - 80px);
  border: 1px solid;
}
</style>
