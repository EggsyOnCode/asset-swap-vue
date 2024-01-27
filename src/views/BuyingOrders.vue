<template lang="html">
  <div class="flex flex-col items-center mt-10 font-garamond">
    <SearchBarVue />
    <ChipStatesVue />
    <BuyingOrderListVue />
  </div>
</template>
<script lang="ts">
import SearchBarVue from "@/components/Orders/SearchBar.vue";
import ChipStatesVue from "@/components/Orders/ChipStates.vue";
import BuyingOrderListVue from "@/components/Orders/BuyingOrderList.vue";

export default {
  components: {
    SearchBarVue,
    ChipStatesVue,
    BuyingOrderListVue,
  },
};
</script>
<style lang=""></style>
