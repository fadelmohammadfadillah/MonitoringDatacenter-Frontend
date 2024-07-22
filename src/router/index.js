import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import SuperAdminLayout from "@/layouts/SuperAdminLayout.vue";
import UserManagementTable from "@/components/UserManagementTable.vue";
import DepartementManagementTable from "@/components/DepartementManagementTable.vue";
import DivisiManagementTable from "@/components/DivisiManagementTable.vue";
import BankManagementTable from "@/components/BankManagementTable.vue";
import ProductManagementTable from "@/components/ProductManagementTable.vue";
import SubProductManagementTable from "@/components/SubProductManagementTable.vue";
import ModuleManagementTable from "@/components/ModuleManagementTable.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
    name: "login-page",
  },
  {
    path: "/admin-dashboard",
    component: SuperAdminLayout,
    children: [
      {
        path: "/user-management",
        component: UserManagementTable,
        name: "UserManagementTable",
      },
      {
        path: "/departement-management",
        component: DepartementManagementTable,
        name: "DepartementManagementTable",
      },
      {
        path: "/divisi-management",
        component: DivisiManagementTable,
        name: "DivisiManagementTable",
      },
      {
        path: "/bank-management",
        component: BankManagementTable,
        name: "BankManagementTable",
      },
      {
        path: "/product-management",
        component: ProductManagementTable,
        name: "ProductManagementTable",
      },
      {
        path: "/subproduct-management",
        component: SubProductManagementTable,
        name: "SubProductManagementTable",
      },

      {
        path: "/module-management",
        component: ModuleManagementTable,
        name: "ModuleManagementTable",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
