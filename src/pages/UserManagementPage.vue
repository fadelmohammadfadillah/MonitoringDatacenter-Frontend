<template>
  <v-app>
    <SidebarAdmin />
    <HeaderBar :userImage="userImage" :username="username" :role="role" />
    <v-main>
      <UserManagementTable />
    </v-main>
  </v-app>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import UserManagementTable from "@/components/UserManagementTable.vue";

const username = "Admin"; // User's username
const role = "Super Admin"; // User's role
</script>
