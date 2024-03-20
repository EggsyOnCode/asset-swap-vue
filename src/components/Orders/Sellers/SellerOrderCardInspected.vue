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
          'bg-red text-black': state === 'seller has approved',
        }"
        title="Waiting for the buyer to deposit funds"
        v-text="
          state === 'buyer has deposited funds'
            ? 'Funds Deposited'
            : state === 'seller has approved'
            ? 'No Funds in Contract'
            : ''
        "
      ></button>

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
        @click="inspectOrder"
      >
        Inspect
      </button>
      <h1 v-if="state === 'seller has permitted inspection'" class="text-xl">
        Inspection under progress...
      </h1>
      <h1 v-if="state === 'buyer has completed inspection'" class="text-xl">
        Inspection Completed by buyer, waiting for confirmation...
      </h1>
      <button
        v-if="state === 'buyer has confirmed the order'"
        v-bind:class="{
          'bg-green':
            state === 'buyer has confirmed the order' ||
            state === 'seller has confirmed the order',
          'py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-red text-black':
            state !== 'buyer has confirmed the order',
        }"
        title="Will be enabled once the order has been confirmed by the buyer"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold"
        @click="confirmOrder"
      >
        Confirm the Order
      </button>
      <!-- <button
        v-if="state === 'seller has approved'"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-green"
        title="Will Cancel the Order, don't cancel during inspection"
        @click="cancelOrderBeforeDeposit"
      >
        Cancel the Order
      </button> -->

      <!-- <button
        v-if="state === 'buyer has confirmed the order'"
        class="py-1 px-4 rounded-[11px] flex-shrink-0 font-bold bg-green"
        title="Will Cancel the Order, don't cancel during inspection"
        @click="storeNft"
      >
        Store Nft to IPFS
      </button> -->
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
import { State } from "@/store/constants";
import axios from "axios";
import { endPoints } from "@/constants/apiEndpoints";
import store from "@/store";
import { defineComponent } from "vue";
import {
  deployCarNftContract,
  OrderManager,
  pkrToEth,
} from "@/utils/contractInteraction";
import { NftInfo } from "@/constants/interfaces";
export default defineComponent({
  props: {
    model: {
      type: String,
      required: true,
    },
    buyerId: {
      type: Number,
      required: true,
    },
    assetId: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    enginePower: String,
    buyer: String,
    mileage: String,
    location: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    //Manufacturing Date
    manDate: String,
    orderId: Number,
    buyerWalletAddress: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    orderManagerContractAddress: {
      type: String,
      required: true,
    },
    cryptoPrice: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      orderManagerAddress: "",
    };
  },
  computed: {
    isCancellationAllowed(): boolean {
      const notAllowedStates: string[] = [State.S_INSPECTED, State.S_APPROVED];
      return !notAllowedStates.includes(this.$props.state);
    },
  },
  methods: {
    async inspectOrder() {
      const data = {
        state: State.S_INSPECTED,
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
      const sellerAddr = await store.getters.getUserWallet;
      const buyerAddr = this.$props.buyerWalletAddress;

      const priceEth = await pkrToEth(this.$props.price);

      const nftContract = await deployCarNftContract(
        priceEth.toString(),
        this.$props.buyerWalletAddress,
        sellerAddr
      );
      const token = store.getters.getToken;
      const data = {
        nftContract: nftContract.contractAddress,
        state: State.S_CONFIRMED,
      };
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
        alert("nft contract couldn't be created");
      } else {
        alert("nft contract succesfully created!");
      }
      console.log(nftContract.contractAddress);

      await nftContract.mintNFT(buyerAddr, "hello World");
      await nftContract.resetOwner(buyerAddr);

      const orderAddrRes = await axios.get(
        `${endPoints.ordersUrl}/orders/${this.$props.orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (orderAddrRes.status !== 200) {
        alert("orderAddress data couldn't be fetched");
      } else {
        console.log(orderAddrRes.data.orderManagerContract);
        this.orderManagerAddress = orderAddrRes.data.orderManagerContract;
      }
      const orderManager = new OrderManager(
        this.orderManagerAddress,
        pkrToEth.toString()
      );
      await orderManager.withdraw();

      await this.storeNft(nftContract.contractAddress);
      const dataComplete = {
        state: State.COMPLETED,
      };
      const response = await axios.put(
        `${endPoints.ordersUrl}/orders/${this.$props.orderId}`,
        dataComplete,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        alert("order couldn't be completed");
      } else {
        alert("order succesfully completed!");
      }
    },
    async cancelOrder() {
      const orderManager = new OrderManager(
        this.$props.orderManagerContractAddress,
        this.$props.cryptoPrice
      );
      await orderManager.cancel();
      const data = {
        state: State.S_CANCELLED,
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
        alert("order couldn't be cancelled");
      } else {
        alert("order cancelled successfully!");
      }
    },
    async cancelOrderBeforeDeposit() {
      const data = {
        state: State.S_CANCELLED,
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
    async storeNft(nftAddr: string) {
      const priceEth = await pkrToEth(this.$props.price);
      const sellerAddr = await store.getters.getUserWallet;
      const nftInfo: NftInfo = {
        model: this.model,
        price: priceEth.toString(),
        imgUrl: this.imgUrl,
        location: this.location,
        buyerAddress: this.buyerWalletAddress,
        sellerAddress: sellerAddr,
        nftContractAddress: nftAddr,
      };
      const token = store.getters.getToken;
      const nftUploadRes = await axios.post(
        `${endPoints.assets}/storeNft`,
        nftInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const nftIpfsUrl = nftUploadRes.data.url;
      await this.assingUserAsset(nftIpfsUrl);
      if (nftUploadRes.status !== 201) {
        alert("nft couldn't be stored successfully");
      } else {
        alert("nft stored successfully!");
      }
    },
    async assingUserAsset(ipfsUrl: string) {
      const sellerId = await store.getters.getUserId;

      const data = {
        assetId: this.assetId,
        userId: this.buyerId,
        nftIpfsUrl: ipfsUrl,
        sellerId: sellerId,
      };
      const token = store.getters.getToken;
      const assignAsset = await axios.post(`${endPoints.userAssets}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (assignAsset.status !== 201) {
        alert("asset NOT assigned succesfully");
      } else {
        alert("asset assigned successfully!");
      }
    },
  },
});
</script>
<style lang=""></style>
