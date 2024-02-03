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
      <v-text-field
        v-model="walletAddress"
        label="WalletAddress"
        placeholder="Wallet Address"
        class="w-1/2"
      ></v-text-field>

      <v-btn depressed elevation="2" @click="signUp" raised class="bg-accent"
        >Sign Up</v-btn
      >
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { endPoints } from "@/constants/apiEndpoints";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      userName: "",
      pwd: "",
      walletAddress: "",
    };
  },
  methods: {
    async signUp() {
      try {
        const data = {
          username: this.userName,
          password: this.pwd,
          walletAddress: this.walletAddress,
        };
        const response = await axios.post(endPoints.userSignUp, data);
        if (response.status === 201) {
          alert("User created successfully!");
        } else {
          alert("User couldn't be created!");
        }
      } catch (error) {
        throw new Error("Error occurred in signup");
      }
    },
  },
});
</script>
<style lang=""></style>
