<template>
  <div>
    <div v-for="(notification, index) in notifications" :key="index">
      <p>{{ notification.msg }}</p>
      <p>
        Update on order regarding "{{ notification.asset }}" from "{{
          notification.from
        }}"
      </p>
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
