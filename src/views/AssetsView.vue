<template lang="html">
  <div class="mt-6 flex flex-col items-center">
    <h1 class="text-4xl font-semibold pb-6">~Your Assets~</h1>
    <UserAssetCard
      v-for="item in items"
      :key="item.id"
      :price="item.asset.price"
      :seller="item.seller.username"
      :mileage="item.asset.mileage"
      :model="item.asset.model"
      :location="item.asset.location"
      :engine-power="item.asset.enginePower"
      :assetId="item.assetId"
      :sellerId="item.seller.id"
      :nftIpfsUrl="item.nftIpfsUrl"
      :boughtAt="item.boughtAt"
      :imgUrl="item.asset.imgUrl"
    />
  </div>
</template>
<script lang="ts">
import { endPoints } from "@/constants/apiEndpoints";
import axios from "axios";
import store from "@/store";
import UserAssetCard from "@/components/UserAssetCard.vue";

// interface items {
//   price: string,
//   sellerUsername: string,
//   mileage: string
//   manufacturingDate: string,
//   model: string,
//   location: string,
//   enginePower: string,
// }

export default {
  components: {
    UserAssetCard,
  },
  data() {
    return {
      items: [], // Store the data from the API response
    };
  },
  async mounted() {
    try {
      const token = store.getters.getToken;
      axios
        .get(`${endPoints.userAssets}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.items = response.data;
          console.log(this.items);
        })
        .catch((error) => {
          console.error("Error fetching assets:", error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};
</script>
<style lang=""></style>
