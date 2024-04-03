<script setup>
// import router from "@/router/index.ts";

// let toPage = (name) => {
//   router.push({ name });
// };
</script>

<template>
  <div class="home">
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>

    <button @click="toPage('demo')">goDemo</button>
    <button @click="toPage('login')">goLogin</button>
  </div>
</template>

<style lang="scss" scoped></style>
