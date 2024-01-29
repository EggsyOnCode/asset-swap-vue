<template lang="html">
  <div class="mt-6 flex flex-col items-center">
    <SellerOrderCardRequestedVue
      :price="'98.89'"
      :mileage="'10000'"
      :manufacturing-date="'2022-09-01'"
      :model="'Buggati 2'"
      :location="'Gosal\'s Home'"
      :engine-power="'1500cc'"
      :buyer="'Humpty Dumpty'"
    />
  </div>
</template>
<script lang="ts">
import SellerOrderCardRequestedVue from "../SellerOrderCardRequested.vue";

export default {
  components: {
    SellerOrderCardRequestedVue,
  },
};
</script>
<style lang=""></style>
