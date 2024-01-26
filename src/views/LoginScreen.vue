<template lang="html">
  <div
    class="bg-primary w-screen h-screen font-garamond flex flex-col justify-center items-center"
  >
    <h1 class="text-4xl font-semibold pb-6">~Login Page~</h1>
    <div
      class="bg-bg rounded-lg w-2/5 flex flex-col justify-center items-center p-6 m-3"
    >
      <v-text-field
        label="UserName"
        placeholder="UserName"
        class="w-1/2"
      ></v-text-field>

      <v-text-field
        label="Password"
        placeholder="Password"
        type="password"
        class="w-1/2"
      ></v-text-field>
      <v-btn depressed elevation="2" raised class="bg-accent">Login</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
export default {};
</script>
<style lang=""></style>
