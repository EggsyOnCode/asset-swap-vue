<template>
  <home-nav />
  <router-view />
</template>

<script>
import HomeNav from "./components/Home/HomeNav.vue";

export default {
  components: {
    HomeNav,
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
