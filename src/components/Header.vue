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
      <Tasks :tasks="tasks" @remove_task="removeTask(id)"></Tasks>
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
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    this.tasks = [
      {
        name: "Do the dishes",
        time: "9 am",
        id: 1,
      },
      {
        name: "Do the car wash",
        time: "10 am",
        id: 2,
      },
    ];
  },
  components: {
    Tasks,
  },
  methods: {
    removeTask(id) {
      console.log(id);
      this.tasks = this.tasks.filter((task) => {
        task.id !== id;
      });
    },
  },
};
</script>
<style lang=""></style>
