<template lang="html">
  <div
    class="w-full bg-blue-500 p-3 flex flex-row justify-between items-start mb-3 text-white rounded-lg"
  >
    <div class="flex flex-col items-start">
      <h1>{{ task.name }}</h1>
      <h1>{{ task.time }}</h1>
    </div>
    <div>
      <button
        class="text-black bg-pink-50 p-2 rounded-lg"
        @click="$store.commit('removeTask', task.id)"
      >
        Remove Task
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "TaskComp",
  props: {
    task: Object,
  },
};
</script>
<style lang=""></style>
