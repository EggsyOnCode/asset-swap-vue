<template lang="html">
  <div class="w-9/12 flex flex-row bg-secondary rounded-lg my-2">
    <img
      v-if="imgUrl"
      :src="imgUrl"
      alt="free-img-api"
      class="w-1/3 m-3 rounded-lg"
    />
    <img
      v-else
      src="../../../assets/wallpaper.jpg"
      alt="free-img-api"
      class="w-1/3 m-3 rounded-lg"
    />

    <div
      class="flex flex-col items-start justify-around w-1/3 text-black text-xl"
    >
      <h1 class="mt-3">{{ model }}</h1>
      <h1>Manufacturing Date: {{ manDate }}</h1>
      <h1>Engine Power: {{ enginePower }}</h1>
      <h1>Mileage: {{ mileage }}</h1>
      <h1>Location: {{ location }}</h1>
      <div class="card-item"><strong>Seller:</strong> {{ seller }}</div>
      <v-chip
        elevated
        color="black"
        theme="light"
        class="bg-accent rounded-xl mb-3"
      >
        <v-icon icon="mdi-cash"></v-icon>
        <h1 class="text-xl">{{ price }}</h1>
      </v-chip>
    </div>
    <div class="flex flex-col justify-center items-center w-1/3">
      <button
        class="py-1 px-4 rounded-[11px] bg-green flex-shrink-0 font-bold"
        title="Waiting for approval from the seller"
      >
        Order Completed!
      </button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    model: String,
    price: String,
    enginePower: String,
    seller: String,
    mileage: String,
    location: String,
    //Manufacturing Date
    manDate: String,
    orderId: Number,
    imgUrl: String,
  },
};
</script>
<style lang=""></style>
