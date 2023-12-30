<template>
  <div class="p-4 bg-primary flex flex-row items-center justify-around text-lg">
    <div class="text-white font-garamond">
      <a v-bind:href="firstNavItem.index.toString()">{{ firstNavItem.name }}</a>
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
    restNav(this: { navBar: navItem[] }): navItem[] {
      const rest: navItem[] = this.navBar.slice(1);
      return rest;
    },
    firstNavItem(this: { navBar: navItem[] }): navItem {
      return this.navBar[0];
    },
  },
};
</script>
