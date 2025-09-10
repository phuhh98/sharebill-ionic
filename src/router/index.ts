import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { useFirebaseAuth } from "../stores/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/upload",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/tabs/",
    component: TabsPage,
    beforeEnter: (to, from, next) => {
      const store = useFirebaseAuth();

      if (!store.isAuthenticated) {
        next("/login");
      } else {
        next();
      }
    },
    children: [
      {
        path: "",
        redirect: "/tabs/upload",
      },
      {
        path: "upload",
        component: () => import("@/views/UploadPage.vue"),
      },
      {
        path: "receipt",
        component: () => import("@/views/ReceiptPage.vue"),
      },
      {
        path: "share",
        component: () => import("@/views/SharePage.vue"),
      },
      {
        path: "payers",
        component: () => import("@/views/PayerPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
