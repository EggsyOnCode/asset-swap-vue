<template lang="html">
  <div
    class="bg-primary w-screen h-screen font-garamond flex flex-col justify-center items-center"
  >
    <h1 class="text-4xl font-semibold pb-6">~Sign Up Page~</h1>
    <div
      class="bg-bg rounded-lg w-2/5 flex flex-col justify-center items-center p-6 m-3"
    >
      <v-text-field
        v-model="userName"
        label="UserName"
        placeholder="UserName"
        class="w-1/2"
      ></v-text-field>

      <v-text-field
        v-model="pwd"
        label="Password"
        placeholder="Password"
        type="password"
        class="w-1/2"
      ></v-text-field>
      <v-btn depressed elevation="2" raised class="bg-accent">Sign Up</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { endPoints } from "@/constants/apiEndpoints";
export default {
  data() {
    return {
      userName: "",
      pwd: "",
    };
  },
  methods: {
    async signUp() {
      try {
        const response = await axios.post(endPoints.userSignUp);
        if (response.status == 201) {
          alert("user created successfully!");
        } else {
          alert("user couldn't be created!");
        }
      } catch (error) {
        throw Error("error occured in signup");
      }
    },
  },
};
</script>
<style lang=""></style>
