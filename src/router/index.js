import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/Collapse.vue"),
    },
    {
      path: "/table",
      name: "table",
      component: () => import("../components/TableComp.vue"),
    },
  ],
});

export default router;
