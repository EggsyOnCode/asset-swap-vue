<template lang="html">
  <div class="mt-6 flex flex-col items-center">
    <OrderCardVue
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
import OrderCardVue from "./OrderCard.vue";
import axios from "axios";

interface item {
  model: string;
  price: string;
}

export default {
  components: {
    OrderCardVue,
  },
  data() {
    return {
      items: [], // Store the data from the API response
    };
  },
};
</script>
<style lang=""></style>
