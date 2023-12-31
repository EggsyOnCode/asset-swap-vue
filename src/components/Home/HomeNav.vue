<template>
  <div class="p-4 bg-primary flex flex-row items-center justify-around text-lg">
    <div
      class="text-white font-garamond"
      v-for="navItem in navBar"
      :key="navItem.index"
    >
      <h1
        class="hover:cursor-pointer"
        :class="navItem.index === activeItem ? 'text-green' : ''"
        @click="setActive(navItem)"
      >
        {{ navItem.name }}
      </h1>
    </div>
  </div>
</template>

<script>
import { homeNavLinks } from "@/constants/navList";

export default {
  data() {
    return {
      navBar: homeNavLinks,
      activeItem: null,
    };
  },
  computed: {
    restNav() {
      return this.navBar.slice(1);
    },
    firstNavItem() {
      return this.navBar[0];
    },
  },
  methods: {
    isActive(itemIndex) {
      return this.activeItem === itemIndex;
    },
    setActive(item) {
      this.activeItem = item.index;
      this.navToPage(item.name);
    },
    navToPage(item) {
      console.log(item.toLowerCase());
      this.$router.push(`/${item.toLowerCase()}`);
    },
  },
};
</script>
