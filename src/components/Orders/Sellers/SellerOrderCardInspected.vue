<template lang="html">
  <div class="w-7/12 flex flex-row bg-secondary rounded-lg my-2">
    <img
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
      <div class="card-item"><strong>Buyer:</strong> {{ buyer }}</div>
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
    <div class="flex flex-col justify-around items-center w-1/3">
      <button
        v-if="
          state === 'buyer has deposited funds' ||
          state === 'seller has approved'
        "
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold"
        v-bind:class="{
          'bg-green': state === 'buyer has deposited funds',
          'py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-red text-black':
            state === 'seller has approved',
        }"
        title="Waiting for the buyer to deposit funds"
      >
        No Funds in Contract
      </button>
      <button
        v-if="
          state === 'buyer has deposited funds' ||
          state === 'seller has approved'
        "
        v-bind:class="{
          'bg-green': state === 'buyer has deposited funds',
          'py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-red text-black':
            state === 'seller has approved',
        }"
        title="Waiting for the buyer to deposit funds"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold"
      >
        Inspect
      </button>
      <h1 v-if="state === 'seller has permitted inspection'" class="text-xl">
        Inspection under progress...
      </h1>
      <button
        v-bind:class="{
          'bg-green':
            state === 'buyer has confirmed the order' ||
            state === 'seller has confirmed the order',
          'py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-red text-black':
            state !== 'buyer has confirmed the order',
        }"
        title="Will be enabled once the order has been confirmed by the buyer"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold"
      >
        Confirm the Order
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
    buyer: String,
    mileage: String,
    location: String,
    //Manufacturing Date
    manDate: String,
    orderId: Number,
  },
  data() {
    return {
      state: "seller has approved",
    };
  },
};
</script>
<style lang=""></style>
