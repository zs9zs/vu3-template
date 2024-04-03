<script setup>
import router from "@/router/index.ts";

let handleLogin = () => {
  router.push({ name: "home" });
};
</script>

<template>
  <div class="login">
    <button @click="handleLogin">登录</button>
  </div>
</template>

<style lang="scss" scoped></style>
