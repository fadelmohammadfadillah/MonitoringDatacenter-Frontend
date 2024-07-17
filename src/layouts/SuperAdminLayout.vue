<template>
  <v-app>
    <SidebarAdmin/>
    <HeaderBar/>
    <v-main class="" style="max-height: 100vh;">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue';
import SidebarAdmin from '@/components/SidebarAdmin.vue';

//
</script>
