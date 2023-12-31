<template lang="html">
  <div class="flex flex-col items-center mt-10">
    <SearchBarVue />
    <ChipStatesVue />
  </div>
</template>
<script lang="ts">
import SearchBarVue from "@/components/Orders/SearchBar.vue";
import ChipStatesVue from "@/components/Orders/ChipStates.vue";

export default {
  components: {
    SearchBarVue,
    ChipStatesVue,
  },
};
</script>
<style lang=""></style>
