import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import SuperAdminLayout from "@/layouts/SuperAdminLayout.vue";
import UserManagementTable from "@/components/UserManagementTable.vue";
import DepartmentManagementTable from "@/components/DepartmentManagementTable.vue";
import DivisiManagementTable from "@/components/DivisiManagementTable.vue";
import BankManagementTable from "@/components/BankManagementTable.vue";
import ProductManagementTable from "@/components/ProductManagementTable.vue";
import SubProductManagementTable from "@/components/SubProductManagementTable.vue";
import ModuleManagementTable from "@/components/ModuleManagementTable.vue";
import ApprovalMonitoringTable from "@/components/ApprovalMonitoringTable.vue";
import DetailStatusMonitoringTable from "@/components/DetailStatusMonitoringTable.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
    name: "loginPage",
  },
  {
    path: "/admin-dashboard",
    component: SuperAdminLayout,
    children: [
      {
        path: "/sa/admin-dashboard",
        component: UserManagementTable,
        name: "UserManagementTable",
      },
      {
        path: "/sa/departement-management",
        component: DepartmentManagementTable,
        name: "DepartmentManagementTable",
      },
      {
        path: "/sa/divisi-management",
        component: DivisiManagementTable,
        name: "DivisiManagementTable",
      },
      {
        path: "/sa/bank-management",
        component: BankManagementTable,
        name: "BankManagementTable",
      },
      {
        path: "/sa/product-management",
        component: ProductManagementTable,
        name: "ProductManagementTable",
      },
      {
        path: "/sa/subproduct-management",
        component: SubProductManagementTable,
        name: "SubProductManagementTable",
      },

      {
        path: "/sa/module-management",
        component: ModuleManagementTable,
        name: "ModuleManagementTable",
      },

      {
        path: "/spv/approval-management",
        component: ApprovalMonitoringTable,
        name: "ApprovalMonitoringTable",
      },

      {
        path: "/spv/detail-status-monitoring/:idMonitoring",
        component: DetailStatusMonitoringTable,
        name: "DetailStatusMonitoringTable",
      },

      {
        path: "/:catchAll(.*)",
        redirect: { name: "loginPage" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
