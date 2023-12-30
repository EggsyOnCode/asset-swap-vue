<template>
  <div class="p-4 bg-primary flex flex-row items-center justify-around">
    <div class="text-white font-garamond">
      <a v-bind:href="firstNavItem.index">{{ firstNavItem.name }}</a>
    </div>
    <div
      class="text-white font-garamond"
      v-for="(navItem, index) in restNav"
      :key="index"
    >
      <a href="index">{{ navItem.name }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { homeNavLinks, navItem } from "@/constants/navList";
//navItem is an interface
export default {
  data() {
    return {
      navBar: homeNavLinks as navItem[],
    };
  },
  computed: {
    restNav() {
      const rest = this.navBar.slice(1);
      return rest;
    },
    firstNavItem() {
      return this.navBar[0];
    },
  },
};
</script>
