import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import OrdersViewVue from "@/views/OrdersView.vue";
import CreateOrderVue from "@/views/CreateOrder.vue";
import LoginScreenVue from "@/views/LoginScreen.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },

  {
    path: "/createOrder",
    name: "orderCreation",
    component: CreateOrderVue,
  },
  {
    path: "/orders",
    name: "orders",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: OrdersViewVue,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginScreenVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
