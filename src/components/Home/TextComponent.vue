<template lang="html">
  <h1 class="p-2 font-normal text-black">{{ text }}</h1>
</template>
<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang=""></style>
