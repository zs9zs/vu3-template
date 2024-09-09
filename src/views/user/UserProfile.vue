<template>
  <div></div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const nc = ref("");
    onMounted(() => {
      axios.get("/api/getUserInfo").then((res) => {
        console.log(res);
        nc.value = res.data.menusList[0].title;
        console.log(nc.value);
      });
    });
    return { nc };
  },
};
</script>
