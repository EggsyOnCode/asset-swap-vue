<template lang="html">
  <div
    class="bg-primary w-screen h-screen font-garamond flex flex-col justify-center items-center"
  >
    <h1 class="text-4xl font-semibold pb-6">~Login Page~</h1>
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
      <v-btn depressed elevation="2" raised class="bg-accent" @click="login"
        >Login</v-btn
      >
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { endPoints } from "@/constants/apiEndpoints";
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  data() {
    return {
      userName: "",
      pwd: "",
    };
  },
  methods: {
    async login() {
      try {
        const data = {
          username: this.userName,
          password: this.pwd,
        };
        const response = await axios.post(endPoints.login, data);
        const user = {
          userName: response.data.userName,
          userId: response.data.userId,
          userWallet: response.data.userWallet,
        };
        store.commit("setUser", user);
        store.commit("setJwtAccessToken", response.data.jwt);
        console.log(store.getters.getUserWallet);
        if (response.status === 200) {
          alert("User loggedIn successfully!");
          store.dispatch("initSSEListener");
        } else {
          alert("Incorrect Credentials!");
        }
      } catch (error) {
        alert(error);
        throw new Error("Error occurred in login");
      }
    },
  },
});
</script>
<style lang=""></style>
