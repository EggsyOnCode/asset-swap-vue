<template lang="html">
  <hr class="border-bg" />
  <div
    class="w-full bg-primary text-white font-garamond px-6 pt-4 pb-8 text-2xl"
  >
    <p class="m-0">
      <span>{{ callToAction[0] }}</span>
    </p>
    <p class="m-0 pl-20">
      <span>{{ callToAction[1] }}</span>
    </p>
    <p class="m-0 pl-40">
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
