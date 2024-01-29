<template lang="html">
  <div class="mt-6 flex flex-col items-center">
    <BuyerOrderCardInspectedVue
      :price="'98.89'"
      :seller="'ToyotaInspected'"
      :mileage="'10000'"
      :manufacturing-date="'2022-09-01'"
      :model="'Buggati 2'"
      :location="'Gosal\'s Home'"
      :engine-power="'1500cc'"
    />
  </div>
</template>
<script lang="ts">
import BuyerOrderCardInspectedVue from "../BuyerOrderCardInspected.vue";

export default {
  components: {
    BuyerOrderCardInspectedVue,
  },
};
</script>
<style lang=""></style>
