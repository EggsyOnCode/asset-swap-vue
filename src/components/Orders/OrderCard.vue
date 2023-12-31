<template lang="html">
  <div class="w-7/12 flex flex-row bg-secondary rounded-lg my-2">
    <img
      src="../Orders/../../assets/wallpaper.jpg"
      alt="free-img-api"
      class="w-1/3 m-3 rounded-lg"
    />
    <div
      class="flex flex-col items-start justify-around w-1/3 text-black text-xl"
    >
      <h1>{{ name }}</h1>
      <h1>{{ supplier }}</h1>
      <v-chip elevated color="black" theme="light" class="bg-accent rounded-xl">
        <v-icon icon="mdi-cash"></v-icon>
        <h1 class="text-xl">{{ price }}</h1>
      </v-chip>
    </div>
    <div class="flex flex-col justify-center items-center w-1/3">
      <button class="py-1 px-4 rounded-[11px] bg-green flex-shrink-0 font-bold">
        Inspect
      </button>
      <h1 class="m-3">Or</h1>
      <button class="py-1 px-4 rounded-[11px] bg-green flex-shrink-0 font-bold">
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
