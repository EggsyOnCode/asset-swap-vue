<template lang="html">
  <div
    class="p-1 bg-accent flex flex-row flex-grow justify-between items-center w-4/12 rounded-[15px] text-black font-garamond"
  >
    <input
      class="p-1 bg-accent flex-1 placeholder:text-black"
      type="text"
      placeholder="Search Orders"
    />
    <circle-outline class="hover:cursor-pointer" />
  </div>
</template>
<script lang="ts">
import CircleOutline from "vue-material-design-icons/CircleOutline.vue";

export default {
  components: {
    CircleOutline,
  },
};
</script>
<style lang=""></style>
