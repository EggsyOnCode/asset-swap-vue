<template>
  <div class="home">
    <HomeNav />
    <HomeBanner />
  </div>
</template>

<script lang="ts">
import HomeBanner from "@/components/Home/HomeBanner.vue";
import HomeNav from "@/components/Home/HomeNav.vue";
import { Options, Vue } from "vue-class-component";
@Options({
  components: {
    HomeNav,
    HomeBanner,
  },
})
export default class HomeView extends Vue {}
</script>
