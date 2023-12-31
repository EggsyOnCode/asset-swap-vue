<template lang="html">
  <div class="mt-6 flex flex-col items-center">
    <OrderCardVue :name="'Ferrari'" :supplier="'Toyota'" :price="'98.89'" />
    <OrderCardVue :name="'Ferrari'" :supplier="'Toyota'" :price="'98.89'" />
    <OrderCardVue :name="'Ferrari'" :supplier="'Toyota'" :price="'98.89'" />
  </div>
</template>
<script lang="ts">
import OrderCardVue from "./OrderCard.vue";

export default {
  components: {
    OrderCardVue,
  },
};
</script>
<style lang=""></style>
