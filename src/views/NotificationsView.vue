<template>
  <div class="mt-10">
    <h1 class="text-2xl font-bold mb-4">Current Notifications</h1>
    <div class="w-2/4 flex flex-col justify-center items-center mx-auto">
      <v-card
        v-for="(notification, index) in notifications"
        :key="index"
        class="mb-4 w-full"
      >
        <template v-slot:title>Update on Order</template>
        <template v-slot:subtitle>
          {{ notification.asset }} from {{ notification.from }}
        </template>
        <template v-slot:text>
          {{ notification.msg }}
        </template>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { endPoints } from "@/constants/apiEndpoints";
import store from "@/store";

export default {
  data() {
    return {
      notifications: [],
    };
  },
  mounted() {
    const token = store.getters.getToken;
    axios
      .get(`${endPoints.notificationEvent}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.notifications);
        const notifications = response.data.notifications.map((notif) => ({
          msg: notif.msg,
          from: notif.from.username,
          asset: notif.order.asset.model,
        }));
        this.notifications = notifications;
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  },
};
</script>
