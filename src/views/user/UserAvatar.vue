<template>
  <div v-for="(item, index) in list" :key="index">
    <img :src="item.image" alt="" />
    <p>{{ item.id }}</p>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const list = ref("");
    onMounted(() => {
      axios.get("/api/getRandom").then((res) => {
        console.log(res);
        let lis = res.data.list;
        console.log((list.value = lis));
      });
    });

    return {
      list,
    };
  },
};
</script>
