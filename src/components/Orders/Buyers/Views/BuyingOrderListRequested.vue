<template lang="html">
  <div class="mt-6 flex flex-col items-center">
    <BuyingOrdersCardRequestedVue
      :price="'98.89'"
      :seller="'Toyota'"
      :mileage="'10000'"
      :manufacturing-date="'2022-09-01'"
      :model="'Buggati 2'"
      :location="'Gosal\'s Home'"
      :engine-power="'1500cc'"
    />
  </div>
</template>
<script lang="ts">
import BuyingOrdersCardRequestedVue from "../BuyingOrdersCardRequested.vue";

export default {
  components: {
    BuyingOrdersCardRequestedVue,
  },
};
</script>
<style lang=""></style>
