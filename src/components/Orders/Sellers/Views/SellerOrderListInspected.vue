<template lang="html">
  <div class="mt-6 flex flex-col items-center">
    <SellerOrderCardInspectedVue
      :price="'98.89'"
      :mileage="'10000 inspected'"
      :manufacturing-date="'2022-09-01'"
      :model="'Buggati 2'"
      :buyer="'Humpty Dumpty'"
      :location="'Gosal\'s Home'"
      :engine-power="'1500cc'"
    />
  </div>
</template>
<script lang="ts">
import SellerOrderCardInspectedVue from "../SellerOrderCardInspected.vue";

export default {
  components: {
    SellerOrderCardInspectedVue,
  },
};
</script>
<style lang=""></style>
