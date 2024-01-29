<template lang="html">
  <div class="mt-6 flex flex-col items-center">
    <SellerOrderCardCompletedVue
      :price="'98.89'"
      :mileage="'10000 completed'"
      :manufacturing-date="'2022-09-01'"
      :model="'Buggati 2'"
      :location="'Gosal\'s Home'"
      :engine-power="'1500cc'"
      :buyer="'Humpty Dumpty'"
    />
  </div>
</template>
<script lang="ts">
import SellerOrderCardCompletedVue from "../SellerOrderCardCompleted.vue";

export default {
  components: {
    SellerOrderCardCompletedVue,
  },
};
</script>
<style lang=""></style>
