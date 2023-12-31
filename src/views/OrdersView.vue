<template lang="html">
  <div class="flex flex-col items-center mt-10 font-garamond">
    <SearchBarVue />
    <ChipStatesVue />
    <OrderListVue />
  </div>
</template>
<script lang="ts">
import SearchBarVue from "@/components/Orders/SearchBar.vue";
import ChipStatesVue from "@/components/Orders/ChipStates.vue";
import OrderListVue from "@/components/Orders/OrderList.vue";

export default {
  components: {
    SearchBarVue,
    ChipStatesVue,
    OrderListVue,
  },
};
</script>
<style lang=""></style>
