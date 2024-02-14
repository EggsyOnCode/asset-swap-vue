<template lang="html">
  <div class="w-7/12 flex flex-row bg-secondary rounded-lg my-2">
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
    <div class="flex flex-col justify-around items-center w-1/3">
      <button
        v-if="state === 'seller has approved'"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-green"
        title="Deposit funds in the contract equivalent to the price of the asset"
        @click="depositFunds"
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
        @click="inspectOrder"
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
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold"
        @click="confirmOrder"
      >
        Confirm the Order
      </button>
      <h1 v-if="state === 'buyer has confirmed the order'" class="text-xl">
        Waiting for seller to confirm the order and mint CarNFT....
      </h1>
      <button
        v-if="state === 'seller has approved'"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-green"
        title="Will Cancel the Order, don't cancel during inspection"
        @click="cancelOrderBeforeDeposit"
      >
        Cancel the Order
      </button>

      <button
        v-if="isCancellationAllowed"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-green"
        title="Will Cancel the Order, don't cancel during inspection"
        @click="cancelOrder"
      >
        Cancel the Order
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { endPoints } from "@/constants/apiEndpoints";
import store from "@/store";
import { State } from "@/store/constants";
import { OrderManager, pkrToEth } from "@/utils/contractInteraction";
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    model: String,
    price: {
      type: String,
      required: true,
    },
    enginePower: String,
    seller: String,
    state: {
      type: String,
      required: true,
    },
    mileage: String,
    location: String,
    //Manufacturing Date
    manDate: String,
    orderId: Number,
    imgUrl: String,
    orderManagerContractAddress: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    isCancellationAllowed(): boolean {
      const notAllowedStates: string[] = [
        State.S_INSPECTED,
        State.B_CONFIRMED,
        State.S_APPROVED,
      ];
      return !notAllowedStates.includes(this.$props.state);
    },
  },

  mounted() {
    console.log(this.$props.orderManagerContractAddress);
  },
  methods: {
    async depositFunds() {
      const orderManager = new OrderManager(
        this.$props.orderManagerContractAddress,
        this.$props.price
      );
      await orderManager.deposit();
      const data = {
        state: State.B_DEPOSITED,
      };

      const token = store.getters.getToken;
      const res = await axios.put(
        `${endPoints.ordersUrl}/orders/${this.$props.orderId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status !== 200) {
        alert("funds couldn't be deposited");
      } else {
        alert("funds deposited successfully!");
      }
    },
    async inspectOrder() {
      const data = {
        state: State.B_INSPECTED,
      };

      const token = store.getters.getToken;
      const res = await axios.put(
        `${endPoints.ordersUrl}/orders/${this.$props.orderId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status !== 200) {
        alert("order couldn't be marked inspected");
      } else {
        alert("order marked inspected successfully!");
      }
    },
    async confirmOrder() {
      const data = {
        state: State.B_CONFIRMED,
      };

      const token = store.getters.getToken;
      const res = await axios.put(
        `${endPoints.ordersUrl}/orders/${this.$props.orderId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status !== 200) {
        alert("order couldn't be confirmed");
      } else {
        alert("order marked confirmed from buyer successfully!");
      }
    },
    async cancelOrder() {
      const priceEth = await pkrToEth(this.$props.price);
      const orderManager = new OrderManager(
        this.$props.orderManagerContractAddress,
        priceEth.toString()
      );
      await orderManager.cancel();
      const data = {
        state: State.B_CANCELLED,
      };

      const token = store.getters.getToken;
      const res = await axios.put(
        `${endPoints.ordersUrl}/orders/${this.$props.orderId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status !== 200) {
        alert("order couldn't be cancelled successfully");
      } else {
        alert("order cancelled successfully!");
      }
    },
    async cancelOrderBeforeDeposit() {
      const data = {
        state: State.B_CANCELLED,
      };

      const token = store.getters.getToken;
      const res = await axios.put(
        `${endPoints.ordersUrl}/orders/${this.$props.orderId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status !== 200) {
        alert("order couldn't be cancelled successfully");
      } else {
        alert("order cancelled successfully!");
      }
    },
  },
});
</script>
<style lang=""></style>
