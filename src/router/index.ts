import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import OrdersViewVue from "@/views/BuyingOrders.vue";
import CreateOrderVue from "@/views/CreateOrder.vue";
import LoginScreenVue from "@/views/LoginScreen.vue";
import SignUpVue from "@/views/SignUp.vue";
import SellingOrdersVue from "@/views/SellingOrders.vue";
import BuyingOrdersVue from "@/views/BuyingOrders.vue";

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
    path: "/orders/buying",
    name: "buyingOrders",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BuyingOrdersVue,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginScreenVue,
  },
  {
    path: "/signUp",
    name: "singUp",
    component: SignUpVue,
  },
  {
    path: "/orders/selling",
    name: "sellingOrders",
    component: SellingOrdersVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
