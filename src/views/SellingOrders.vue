<template lang="html">
  <div class="flex flex-col items-center mt-10 font-garamond">
    <SearchBarVue />
    <div class="w-8/12 flex flex-row justify-around mt-6">
      <ChipVue
        :color="'bg-primary'"
        @click="setRequested"
        :text="'Requested'"
      />
      <ChipVue
        :color="'bg-secondary'"
        :text="'Inspection'"
        @click="setInspected"
      />
      <ChipVue :color="'bg-green'" :text="'Completed'" @click="setCompleted" />
      <ChipVue :color="'bg-green'" :text="'Cancelled'" @click="setCancelled" />
    </div>
    <SellerOrdersListRequestedVue v-if="chipState == 'requested'" />
    <SellerOrderListInspectedVue v-if="chipState == 'inspected'" />
    <SellerOrderListCompletedVue v-if="chipState == 'completed'" />
    <SellerOrdersListCancelledVue v-if="chipState == 'cancelled'" />
  </div>
</template>
<script lang="ts">
import SearchBarVue from "@/components/Orders/SearchBar.vue";
import { defineComponent } from "vue";
import { StatesOrder } from "@/store/constants";
import ChipVue from "@/components/Orders/Chip.vue";
import SellerOrderListInspectedVue from "@/components/Orders/Sellers/Views/SellerOrderListInspected.vue";
import SellerOrdersListRequestedVue from "@/components/Orders/Sellers/Views/SellerOrdersListRequested.vue";
import SellerOrderListCompletedVue from "@/components/Orders/Sellers/Views/SellerOrderListCompleted.vue";
import SellerOrdersListCancelledVue from "@/components/Orders/Sellers/Views/SellerOrdersListCancelled.vue";

export default defineComponent({
  components: {
    SearchBarVue,
    SellerOrderListCompletedVue,
    SellerOrdersListRequestedVue,
    SellerOrderListInspectedVue,
    SellerOrdersListCancelledVue,
    ChipVue,
  },
  data() {
    return {
      chipState: StatesOrder.REQUESTED,
    };
  },
  methods: {
    setRequested() {
      this.chipState = StatesOrder.REQUESTED;
    },
    setInspected() {
      this.chipState = StatesOrder.INSPECTED;
    },
    setCompleted() {
      this.chipState = StatesOrder.COMPLETED;
    },
    setCancelled() {
      this.chipState = StatesOrder.CANCELLED;
    },
  },
});
</script>
<style lang=""></style>
