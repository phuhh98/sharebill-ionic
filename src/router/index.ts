import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

import { useFirebaseAuth } from "../stores/auth.ts";
import TabsPage from "../views/TabsPage.vue";
import SharePage from "@/views/SharePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/upload",
  },
  {
    component: () => import("@/views/LoginPage.vue"),
    path: "/login",
  },
  {
    component: () => import("@/views/SignupPage.vue"),
    path: "/signup",
  },
  {
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
        component: () => import("@/views/UploadPage.vue"),
        path: "upload",
      },
      {
        component: () => import("@/views/ReceiptPage.vue"),
        path: "receipt",
      },
      {
        // component: () => import("@/views/SharePage.vue"),
        component: SharePage,
        path: "share",
      },
      {
        component: () => import("@/views/PayerPage.vue"),
        path: "payers",
      },
    ],
    component: TabsPage,
    path: "/tabs/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
