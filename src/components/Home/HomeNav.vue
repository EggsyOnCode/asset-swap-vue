<template>
  <div
    class="px-4 pt-1 bg-primary flex flex-row items-center justify-around text-lg"
  >
    <div
      class="text-white font-garamond"
      v-for="navItem in navBar"
      :key="navItem.index"
    >
      <template v-if="navItem">
        <h1
          v-if="shouldRenderNavItem(navItem)"
          class="hover:cursor-pointer"
          :class="navItem.index === activeItem ? 'text-green' : ''"
          @click="setActive(navItem)"
        >
          {{ navItem.name }}
        </h1>

        <h1
          v-else-if="isNotification(navItem)"
          class="hover:cursor-pointer"
          :class="{ 'text-red': redNotf }"
          @click="notifNav()"
        >
          {{ navItem.name }}
        </h1>

        <!-- Conditionally render v-select for other items -->
        <v-menu v-else-if="isOrder(navItem)" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" font="font-garamond">
              Orders
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in ordersOptions" :key="index">
              <v-list-item-title @click="orderNav(index)">{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu v-else-if="isAuth(navItem)" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" font="font-garamond">
              Auth
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in authOptions" :key="index">
              <v-list-item-title @click="authNav(index)">{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </div>
  </div>
</template>

<script>
import { homeNavLinks } from "@/constants/navList";
import { endPoints } from "@/constants/apiEndpoints";
import store from "@/store";
import { fetchEventSource } from "@microsoft/fetch-event-source";
export default {
  data() {
    return {
      navBar: homeNavLinks,
      activeItem: null,
      ordersOptions: ["Buying Orders", "Selling Orders", "Advertise An Asset"],
      authOptions: ["Login", "SignUp"],
      notfCount: "",
      redNotf: false,
    };
  },
  computed: {
    restNav() {
      return this.navBar.slice(1);
    },
    firstNavItem() {
      return this.navBar[0];
    },
    notificationCount() {
      return store.getters.getNotificationCount;
    },
    shouldRenderNavItem() {
      return (item) => {
        return (
          item.name !== "Orders" && item.name !== "Auth" && item.index !== 5
        );
      };
    },
  },
  watch: {
    notificationCount(oldnotificationCount, newnotificationCount) {
      const value = store.getters.getNotificationCount;
      this.redNotf = value !== 0;
    },
  },
  methods: {
    isActive(itemIndex) {
      return this.activeItem === itemIndex;
    },
    isOrder(item) {
      return item.name === "Orders";
    },
    isAuth(item) {
      return item.name === "Auth";
    },
    isNotification(item) {
      return item.index === 5;
    },
    handleNotificationClick(navItem) {
      return;
    },
    setActive(item) {
      this.activeItem = item.index;
      this.navToPage(item.name);
    },
    navToPage(item) {
      console.log(item.toLowerCase());
      this.$router.push(`/${item.toLowerCase()}`);
    },
    notifNav() {
      this.$router.push("/notifications");
    },
    orderNav(index) {
      switch (index) {
        case 0:
          this.$router.push("/orders/buying");
          break;
        case 1:
          this.$router.push("/orders/selling");
          break;
        case 2:
          this.$router.push("/createOrder");
          break;
        default:
          this.$router.push("/orders");
          break; // Not necessary, but it's good practice to include a break in the default case
      }
    },

    authNav(index) {
      switch (index) {
        case 0:
          this.$router.push("/login");
          break;
        case 1:
          this.$router.push("/signUp");
          break;
        default:
          this.$router.push("/login");
          break; // Not necessary, but it's good practice to include a break in the default case
      }
    },
  },
};
</script>
