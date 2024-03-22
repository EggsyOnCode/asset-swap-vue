<template lang="html">
  <div
    v-if="!closeComp"
    class="w-9/12 flex flex-row bg-secondary rounded-lg my-2"
  >
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
    <div class="flex flex-col justify-center items-center w-1/3">
      <button
        @click="createOrderContract"
        class="py-1 px-4 rounded-[11px] bg-green flex-shrink-0 font-bold"
      >
        Approve
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import {
  deployOrderManagerContract,
  pkrToEth,
} from "@/utils/contractInteraction";
import axios from "axios";
import { endPoints } from "@/constants/apiEndpoints";
import { defineComponent } from "vue";
import { State } from "@/store/constants";

export default defineComponent({
  props: {
    model: String,
    price: {
      type: String,
      required: true,
    },
    enginePower: String,
    buyer: String,
    mileage: String,
    location: String,
    //Manufacturing Date
    manDate: String,
    orderId: Number,
    buyerWalletAddress: String || undefined,
    imgUrl: String,
  },
  data() {
    return {
      closeComp: false,
    };
  },
  methods: {
    onClose() {
      this.closeComp = true;
    },
    async createOrderContract() {
      const sellerAddr = await store.getters.getUserWallet;
      console.log(sellerAddr);

      const priceEth = await pkrToEth(this.$props.price);

      console.log(
        "the price of the ordermanger contract is",
        priceEth.toString()
      );
      const orderManager = await deployOrderManagerContract(
        this.$props.buyerWalletAddress,
        sellerAddr,
        priceEth.toString()
      );

      const token = store.getters.getToken;
      const data = {
        state: State.S_APPROVED,
        orderManagerContract: orderManager.contractAddress,
      };
      const res = await axios.put(
        `${endPoints.ordersUrlSeller}${this.$props.orderId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status !== 200) {
        alert("order contract couldn't be created");
      } else {
        alert("Order contract succesfully created!");
        const data = {
          cryptoPrice: priceEth.toString(),
        };

        const res1 = await axios.put(
          `${endPoints.ordersUrlSeller}${this.$props.orderId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res1.status !== 200) {
          alert("crypto price couldn't be updated");
        } else {
          alert("crypto price updated successfully!");
          this.$emit("card-updated");
        }
        this.onClose();
      }
    },
  },
});
</script>
<style lang=""></style>
