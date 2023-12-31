<template lang="html">
  <div class="w-8/12 flex flex-row justify-around mt-6">
    <ChipVue :color="'bg-primary'" :text="'Requested'" />
    <ChipVue :color="'bg-secondary'" :text="'Inspection'" />
    <ChipVue :color="'bg-accent'" :text="'Completed'" />
  </div>
</template>
<script lang="ts">
import ChipVue from "./Chip.vue";
export default {
  components: {
    ChipVue,
  },
};
</script>
<style lang=""></style>
