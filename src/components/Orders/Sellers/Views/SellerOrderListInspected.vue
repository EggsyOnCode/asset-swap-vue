<template lang="html">
  <div class="w-full mt-6 flex flex-col items-center">
    <SellerOrderCardInspectedVue
      @card-updated="fetchData()"
      v-for="(asset, index) in sellerOrders"
      :key="index"
      :price="asset.asset.price"
      :mileage="asset.asset.mileage"
      :manufacturing-date="asset.asset.manufacturingDate"
      :model="asset.asset.model"
      :location="asset.asset.location"
      :engine-power="asset.asset.enginePower"
      :buyer="asset.buyer.username"
      :orderId="asset.orderId"
      :state="asset.asset.state"
      :buyerWalletAddress="asset.buyer.walletAddress"
      :imgUrl="asset.asset.imgUrl"
      :buyerId="asset.buyer.id"
      :assetId="asset.asset.id"
      :orderManagerContractAddress="asset.orderManager"
      :cryptoPrice="asset.cryptoPrice"
    />
  </div>
</template>
<script lang="ts">
import SellerOrderCardInspectedVue from "../SellerOrderCardInspected.vue";
import axios from "axios";
import store from "@/store";
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { endPoints } from "@/constants/apiEndpoints";
interface SellerOrder {
  asset: any;
  buyer: any;
  orderId: number;
  orderManager: string;
  nftContractAddress: string;
  cryptoPrice: string;
}
export default defineComponent({
  components: {
    SellerOrderCardInspectedVue,
  },
  data() {
    return {
      sellerOrders: [] as SellerOrder[],
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
          buyer: item.buyer,
          orderId: item.orderId,
          orderManager: item.orderManager,
          nftContract: item.nftContract,
          cryptoPrice: item.cryptoPrice,
        };
      });
      this.sellerOrders = transformedOrders;
    },
    fetchData() {
      const token = store.getters.getToken;
      axios
        .get(
          `${endPoints.ordersUrl}/orders/seller/inspected/${store.getters.getUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const orders = response.data;
          console.log(orders);
          this.transformResponseData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
});
</script>
<style lang=""></style>
