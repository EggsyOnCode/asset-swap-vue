<template lang="html">
  <div class="mt-6 flex flex-col items-center">
    <OrderCardVue
      :price="'98.89'"
      :mileage="'10000 completed'"
      :manufacturing-date="'2022-09-01'"
      :model="'Buggati 2'"
      :location="'Gosal\'s Home'"
      :engine-power="'1500cc'"
    />
  </div>
</template>
<script lang="ts">
import OrderCardVue from "../../OrderCard.vue";

export default {
  components: {
    OrderCardVue,
  },
};
</script>
<style lang=""></style>
