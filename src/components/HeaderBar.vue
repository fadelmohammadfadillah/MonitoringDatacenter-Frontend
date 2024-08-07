<template>
  <v-app-bar app elevation="0" color="#fff" class="pa-3 custom-bottom-border" style="position: sticky">
    <v-btn icon="mdi-page-layout-sidebar-left" @click.stop="drawerStore.useDrawer"></v-btn>
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-bell" @click.stop="toggleNotifications"> </v-btn>

    <div class="mr-2">
      <div class="font-weight-bold">{{ username }}</div>
      <div class="font-italic text-h7">{{ role }}</div>
    </div>

    <v-avatar size="50">
      <v-img :src="userProfile" alt="User Image"></v-img>
    </v-avatar>
  </v-app-bar>
</template>

<script>
import userProfile from "@/assets/userprofile.jpg";
import {useDrawerStore} from "@/stores/drawerState.js";

export default {
  props: {
    username: {
      type: String,
      default: "Username",
    },
    role: {
      type: String,
      default: "Role",
    },
  },
  setup() {
    const drawerStore = useDrawerStore();
    return {
      drawerStore,
      userProfile,
    };
  },
  methods: {
    toggleNotifications() {
      // untuk notifikasi nya
    },
  },
};
</script>

<style scoped>
.custom-bottom-border {
  border-bottom: 0.1rem solid grey;
}
</style>
