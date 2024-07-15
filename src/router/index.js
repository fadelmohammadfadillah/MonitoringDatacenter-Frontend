import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import DashboardAdminPage from "@/pages/DashboardAdminPage.vue";
import UserManagementPage from "@/pages/UserManagementPage.vue"; // Import halaman UserManagementPage
import DivisiManagementPage from "@/pages/DivisiManagementPage.vue"; // Import halaman DivisiManagementPage
import BankManagementPage from "@/pages/BankManagementPage.vue"; // Import halaman BankManagementPage
import ProductManagementPage from "@/pages/ProductManagementPage.vue"; // Import halaman ProductManagementPage
import SubProductManagementPage from "@/pages/SubProductManagementPage.vue"; // Import halaman SubProductManagementPage
import DepartementManagementPage from "@/pages/DepartementManagementPage.vue"; // Import halaman DepartementManagementPage
import ModuleManagementPage from "@/pages/ModuleManagementPage.vue"; // Import halaman ModuleManagementPage

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
  {
    path: "/divisi-management",
    component: DepartementManagementPage,
    name: "DepartementManagementPage",
  },
  {
    path: "/departement-management",
    component: DivisiManagementPage,
    name: "DivisiManagementPage",
  },
  {
    path: "/bank-management",
    component: BankManagementPage,
    name: "BankManagementPage",
  },
  {
    path: "/product-management",
    component: ProductManagementPage,
    name: "ProductManagementPage",
  },
  {
    path: "/subproduct-management",
    component: SubProductManagementPage,
    name: "SubProductManagementPage",
  },

  {
    path: "/module-management",
    component: ModuleManagementPage,
    name: "ModuleManagementPage",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
