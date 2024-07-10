import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import DashboardAdminPage from "@/pages/DashboardAdminPage.vue";
import UserManagementPage from "@/pages/UserManagementPage.vue"; // Import halaman UserManagementPage

const routes = [
  {
    path: "/",
    component: LoginPage,
    name: "login-page",
  },
  {
    path: "/admin-dashboard",
    component: DashboardAdminPage,
    name: "DashboardOperatorPage",
  },
  {
    path: "/user-management",
    component: UserManagementPage,
    name: "UserManagementPage",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
