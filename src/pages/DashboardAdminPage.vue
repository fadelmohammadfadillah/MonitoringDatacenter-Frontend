<template>
  <v-app>
    <SidebarAdmin />
    <HeaderBar :userImage="userImage" :username="username" :role="role" />
    <v-main>
      <div>Isi isi isi</div>
    </v-main>
  </v-app>
</template>

<script setup>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import HeaderBar from "@/components/HeaderBar.vue";

const username = "Admin"; // User's username
const role = "Super Admin"; // User's role
</script>
