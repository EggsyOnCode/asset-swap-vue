<template lang="html">
  <div class="w-7/12 flex flex-row bg-primary rounded-lg">
    <img
      src="../Orders/../../assets/wallpaper.jpg"
      alt="free-img-api"
      class="p-3 w-1/3 rounded-[11px]"
    />
    <div class="flex flex-col items-start justify-around w-1/3">
      <h1>{{ name }}</h1>
      <h1>{{ supplier }}</h1>
      <h1>{{ price }}</h1>
    </div>
    <div class="flex flex-col justify-center items-center w-1/3">
      <button class="py-1 px-4 rounded-[11px] bg-green flex-shrink-0">
        Inspect
      </button>
      <h1 class="m-3">Or</h1>
      <button class="py-1 px-4 rounded-[11px] bg-green flex-shrink-0">
        Complete
      </button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    name: String,
    price: String,
    supplier: String,
  },
};
</script>
<style lang=""></style>
