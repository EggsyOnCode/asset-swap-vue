<template lang="html">
  <div class="mt-6 flex flex-col items-center">
    <BuyerOrderCardCompletedVue
      :price="'98.89'"
      :seller="'ToyotaCompleted'"
      :mileage="'10000'"
      :manufacturing-date="'2022-09-01'"
      :model="'Buggati 2'"
      :location="'Gosal\'s Home'"
      :engine-power="'1500cc'"
    />
  </div>
</template>
<script lang="ts">
import BuyerOrderCardCompletedVue from "../BuyerOrderCardCompleted.vue";

export default {
  components: {
    BuyerOrderCardCompletedVue,
  },
};
</script>
<style lang=""></style>
