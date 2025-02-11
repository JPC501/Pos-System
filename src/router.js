import { createRouter, createWebHistory } from "vue-router";
import EstadoGlobal from "@/components/vistas-menu/EstadoGlobal.vue";
import Vender from "@/components/vistas-menu/Vender.vue";

const routes = [
  { path: "/", component: EstadoGlobal },
  { path: "/vender", component: Vender },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
