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
    <BuyingOrderListRequestedVue v-if="chipState == 'requested'" />
    <BuyingOrdersListInspectedVue v-if="chipState == 'inspected'" />
    <BuyingOrdersListCompletedVue v-if="chipState == 'completed'" />
    <BuyingOrdersListCancelledVueVue v-if="chipState == 'cancelled'" />
  </div>
</template>
<script lang="ts">
import SearchBarVue from "@/components/Orders/SearchBar.vue";
import { StatesOrder } from "@/store/constants";
import { defineComponent } from "vue";
import ChipVue from "@/components/Orders/Chip.vue";
import BuyingOrderListRequestedVue from "@/components/Orders/Buyers/Views/BuyingOrderListRequested.vue";
import BuyingOrdersListInspectedVue from "@/components/Orders/Buyers/Views/BuyingOrdersListInspected.vue";
import BuyingOrdersListCompletedVue from "@/components/Orders/Buyers/Views/BuyingOrdersListCompleted.vue";
import BuyingOrdersListCancelledVueVue from "@/components/Orders/Buyers/BuyingOrdersListCancelledVue.vue";
export default defineComponent({
  components: {
    SearchBarVue,
    ChipVue,
    BuyingOrderListRequestedVue,
    BuyingOrdersListInspectedVue,
    BuyingOrdersListCompletedVue,
    BuyingOrdersListCancelledVueVue,
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
