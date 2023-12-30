<template lang="html">
  <div class="w-full bg-primary text-white font-garamond px-6 py-4 text-2xl">
    <p class="m-0">
      <span>{{ callToAction[0] }}</span>
    </p>
    <p class="m-0 pl-16">
      <span>{{ callToAction[1] }}</span>
    </p>
    <p class="m-0 pl-36">
      <span>{{ callToAction[2] }}</span>
    </p>
  </div>
</template>
<script lang="ts">
import { CTA } from "@/constants/navList";
export default {
  data() {
    return {
      callToAction: CTA,
    };
  },
};
</script>
<style lang=""></style>
