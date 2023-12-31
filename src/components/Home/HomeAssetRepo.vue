<template lang="html">
  <div class="flex justify-center">
    <div
      class="bg-secondary w-[80%] grid grid-cols-3 gap-4 p-5 rounded-xl absolute top-[23.5%]"
    >
      <AssetCardVue :price="'45.09'" :name="'BMW'" :supplier="'Ferrari'" />
      <AssetCardVue :price="'45.09'" :name="'BMW'" :supplier="'Ferrari'" />
      <AssetCardVue :price="'45.09'" :name="'BMW'" :supplier="'Ferrari'" />
      <AssetCardVue :price="'45.09'" :name="'BMW'" :supplier="'Ferrari'" />
      <AssetCardVue :price="'45.09'" :name="'BMW'" :supplier="'Ferrari'" />
      <AssetCardVue :price="'45.09'" :name="'BMW'" :supplier="'Ferrari'" />
      <AssetCardVue :price="'45.09'" :name="'BMW'" :supplier="'Ferrari'" />
      <AssetCardVue :price="'45.09'" :name="'BMW'" :supplier="'Ferrari'" />
      <AssetCardVue :price="'45.09'" :name="'BMW'" :supplier="'Ferrari'" />
    </div>
  </div>
</template>
<script lang="js">
import AssetCardVue from "./AssetCard.vue";
export default {
  components: {
    AssetCardVue,
  },
};
</script>
<style lang=""></style>
