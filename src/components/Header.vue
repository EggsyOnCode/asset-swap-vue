<template lang="html">
  <div class="border-2 border-black p-9">
    <div class="flex flex-row items-center justify-around mb-3">
      <h1 class="text-3xl font-extrabold">
        {{ title }}
      </h1>
      <button class="bg-slate-700 text-white font-bold p-3 rounded-xl">
        Add A Task
      </button>
    </div>
    <div>
      <Tasks :tasks="$store?.state.tasks"></Tasks>
    </div>
  </div>
</template>
<script>
import Tasks from "./Tasks.vue";
export default {
  name: "Header",
  props: {
    title: String,
  },
  components: {
    Tasks,
  },
};
</script>
<style lang=""></style>
