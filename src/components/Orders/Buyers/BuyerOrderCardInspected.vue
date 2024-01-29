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
    <div class="flex flex-col justify-around items-center w-1/3">
      <button
        v-if="state === 'seller has approved'"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-green"
        title="Deposit funds in the contract equivalent to the price of the asset"
      >
        Deposit Funds
      </button>
      <button
        v-if="state === 'buyer has deposited funds'"
        title="Request for inspection of the asset"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-green"
      >
        Inspect
      </button>
      <h1 v-if="state === 'seller has permitted inspection'" class="text-xl">
        Inspection under progress...
      </h1>
      <button
        v-if="state === 'seller has permitted inspection'"
        title="Request for inspection of the asset"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-green"
      >
        Completed Inspection
      </button>
      <button
        v-if="state === 'buyer has completed inspection'"
        v-bind:class="{
          'bg-green': state === 'buyer has completed inspection',
          'py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-red text-black':
            state !== 'buyer has completed inspection',
        }"
        title="Will be enabled once the order has been inspected by the buyer"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold"
      >
        Confirm the Order
      </button>
      <button
        v-bind:class="{
          'bg-green': state === 'buyer has completed inspection',
          'py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-red text-black':
            state !== 'buyer has completed inspection',
        }"
        title="Will be enabled once the order has been inspected by the buyer"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold"
      >
        Cancel the Order
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
  },
  data() {
    return {
      state: "buyer has completed inspection",
    };
  },
};
</script>
<style lang=""></style>
