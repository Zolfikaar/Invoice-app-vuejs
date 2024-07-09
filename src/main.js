import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import Alpine from "alpinejs";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());

Alpine.start();
app.use(router);

app.mount("#app");
