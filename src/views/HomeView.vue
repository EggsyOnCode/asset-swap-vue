<template>
  <div class="home bg-bg max-h-screen">
    <HomeBanner />
    <home-asset-repo-vue />
  </div>
</template>

<script lang="ts">
import AssetCardVue from "@/components/Home/AssetCard.vue";
import HomeAssetRepoVue from "@/components/Home/HomeAssetRepo.vue";
import HomeBanner from "@/components/Home/HomeBanner.vue";
import HomeNav from "@/components/Home/HomeNav.vue";
import { Options, Vue } from "vue-class-component";
@Options({
  components: {
    HomeNav,
    HomeBanner,
    HomeAssetRepoVue,
    AssetCardVue,
  },
})
export default class HomeView extends Vue {}
</script>
