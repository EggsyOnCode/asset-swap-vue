<template lang="html">
  <div class="flex justify-center">
    <div
      class="bg-secondary w-[80%] grid grid-cols-3 gap-4 p-5 rounded-xl absolute top-[23.5%]"
    >
      <AssetCardVue
        v-for="item in items"
        :key="item.id"
        :price="item.asset.price"
        :seller="item.user.username"
        :mileage="item.asset.mileage"
        :manufacturingDate="item.asset.manufacturingDate"
        :model="item.asset.model"
        :location="item.asset.location"
        :engine-power="item.asset.enginePower"
        :assetId="item.assetId"
        :sellerId="item.userId"
      />
    </div>
  </div>
</template>
<script lang="js">
import { endPoints } from "@/constants/apiEndpoints";
import AssetCardVue from "./AssetCard.vue";
import axios from "axios";

// interface items {
//   price: string,
//   sellerUsername: string,
//   mileage: string,
//   manufacturingDate: string,
//   model: string,
//   location: string,
//   enginePower: string,
// }

export default {
  components: {
    AssetCardVue,
  },
  data() {
    return {
      items: [], // Store the data from the API response
    };
  },
  async mounted() {
  try {
    const response = await axios.get(endPoints.advertizedAssets);
    // Update the 'items' data with the received results
    this.items = response.data.items;
    console.log(this.items);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
},
};
</script>
<style lang=""></style>
