<template>
  <div class="home">
    <Header title="Task Scheduler" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue"; // @ is an alias to /src
import Tasks from "@/components/Tasks.vue"; // @ is an alias to /src

@Options({
  components: {
    Header,
    Tasks,
  },
})
export default class HomeView extends Vue {}
</script>
