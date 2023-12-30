<template>
  <div class="home bg-bg h-screen">
    <HomeNav />
    <HomeBanner />
    <AssetCardVue
      :name="'Test Card'"
      :price="23.98"
      :supplier="'Gosal Jutts'"
    />
  </div>
</template>

<script lang="ts">
import AssetCardVue from "@/components/Home/AssetCard.vue";
import HomeBanner from "@/components/Home/HomeBanner.vue";
import HomeNav from "@/components/Home/HomeNav.vue";
import { Options, Vue } from "vue-class-component";
@Options({
  components: {
    HomeNav,
    HomeBanner,
    AssetCardVue,
  },
})
export default class HomeView extends Vue {}
</script>
