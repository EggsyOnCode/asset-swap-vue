<template lang="html">
  <div
    class="p-2 w-1/12 font-garamond text-black rounded-[15px] hover:cursor-pointer shadow-lg"
    :class="color"
  >
    {{ text }}
  </div>
</template>
<script lang="ts">
export default {
  props: {
    color: String,
    text: String,
  },
};
</script>
<style lang=""></style>
