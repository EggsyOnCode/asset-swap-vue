import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import store from "@/store";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#460DA2",
          secondary: "#9D88B2",
          accent: "#E8D5B5",
          bg: "#FEF6FF",
          green: "#FAFF00",
          white: "#FFFFFF",
        },
      },
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(store);
app.mount("#app");
