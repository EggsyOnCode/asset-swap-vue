<template lang="html">
  <div class="w-8/12 flex flex-row bg-secondary rounded-lg my-2">
    <img
      v-if="imgUrl"
      :src="imgUrl"
      alt="asset image"
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
      <h1>Bought At: {{ boughtAt }}</h1>
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
        @click="copyURL"
        class="py-1 px-4 mb-5 rounded-[11px] bg-green flex-shrink-0 font-bold"
      >
        Copy NFT IPFS link
      </button>
      <button
        @click="addToMetaMask"
        class="py-1 px-4 rounded-[11px] bg-green flex-shrink-0 font-bold"
      >
        Add NFT to your MetaMask Wallet!
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { addTokenToMetamask } from "@/utils/contractInteraction";
export default defineComponent({
  props: {
    model: String,
    price: String,
    enginePower: String,
    seller: String,
    mileage: String,
    location: String,
    //Manufacturing Date
    manDate: String,
    imgUrl: {
      type: String,
      required: true,
    },
    nftIpfsUrl: {
      type: String,
      required: true,
    },
    boughtAt: Date,
    nftContract: {
      type: String,
      required: true,
    },
  },
  methods: {
    async copyURL() {
      try {
        await navigator.clipboard.writeText(this.nftIpfsUrl);
        alert("paste the copied url in Brave Browser");
      } catch ($e) {
        alert("Couldn't copy");
      }
    },
    async addToMetaMask() {
      try {
        addTokenToMetamask(this.$props.imgUrl, this.$props.nftContract);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
<style lang=""></style>
