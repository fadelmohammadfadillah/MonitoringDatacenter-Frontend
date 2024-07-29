<template>
  <v-app>
    <SidebarAdmin />
    <HeaderBar :userImage="userImage" :username="username" :role="role" />
    <v-main class="" style="max-height: 100vh; background-color: #f6f6f6;">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import SidebarAdmin from "@/components/SidebarAdmin.vue";

const username = "Admin"; // User's username
const role = "Super Admin"; // User's role
</script>
