<template>
  <div class="home">
    <HomeNav />
  </div>
</template>

<script lang="ts">
import HomeNav from "@/components/HomeNav.vue";
import { Options, Vue } from "vue-class-component";
@Options({
  components: {
    HomeNav,
  },
})
export default class HomeView extends Vue {}
</script>
