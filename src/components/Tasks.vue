<template>
  <div class="">
    <!-- Wrap the content inside a parent element -->
    <div v-for="task in tasks" :key="task.id">
      <Task @remove_task="$emit('remove_task', task.id)" :task="task"></Task>
    </div>
  </div>
</template>

<script lang="ts">
import Task from "./Task.vue";
interface task {
  name: string;
  id: number;
  time: string;
}
export default {
  name: "Tasks",
  props: {
    tasks: Array as () => Array<task>,
  },
  components: {
    Task,
  },
  emits: ["remove_task"],
};
</script>
