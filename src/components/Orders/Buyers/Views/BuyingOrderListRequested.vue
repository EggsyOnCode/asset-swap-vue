<template lang="html">
  <div class="w-full mt-6 flex flex-col items-center">
    <BuyingOrdersCardRequestedVue
      v-for="(asset, index) in sellerOrders"
      :key="index"
      :price="asset.asset.price"
      :mileage="asset.asset.mileage"
      :manufacturing-date="asset.asset.manufacturingDate"
      :model="asset.asset.model"
      :location="asset.asset.location"
      :engine-power="asset.asset.enginePower"
      :seller="asset.seller.username"
      :orderId="asset.orderId"
      :imgUrl="asset.asset.imgUrl"
    />
  </div>
</template>
<script lang="ts">
import BuyingOrdersCardRequestedVue from "../BuyingOrdersCardRequested.vue";
import axios from "axios";
import store from "@/store";
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { endPoints } from "@/constants/apiEndpoints";
interface BuyerOrder {
  asset: any;
  seller: any;
  orderId: number;
}
export default defineComponent({
  components: {
    BuyingOrdersCardRequestedVue,
  },
  data() {
    return {
      sellerOrders: [] as BuyerOrder[],
    };
  },
  computed: {
    getJwt() {
      const store = useStore();
      return store.getters.getToken;
    },
    getUser() {
      const store = useStore();
      return store.getters.getUserId;
    },
  },
  methods: {
    transformResponseData(responseData: any) {
      const transformedOrders = responseData.assets.map((item: any) => {
        return {
          asset: item.asset,
          seller: item.seller,
          orderId: item.orderId,
        };
      });
      this.sellerOrders = transformedOrders;
    },
  },
  mounted() {
    // Replace 'yourBearerToken' with the actual bearer token
    const token = store.getters.getToken;
    axios
      .get(
        `${endPoints.ordersUrl}/orders/buyer/requested/${store.getters.getUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle the response data and render order cards
        // For example, if the response data is an array of orders
        // you can loop through the orders and render them as cards
        const orders = response.data;
        console.log(orders);
        this.transformResponseData(response.data);
        // Render the order cards here
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  },
});
</script>
<style lang=""></style>
