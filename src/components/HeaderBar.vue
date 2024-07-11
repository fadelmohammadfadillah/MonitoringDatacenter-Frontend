<template>
  <v-app-bar app color="#fff">
    <v-btn prepend-icon="mdi-page-layout-sidebar-left" @click.stop="drawerStore.useDrawer"></v-btn>
    <v-spacer></v-spacer>
    <div class="notification">
      <v-btn icon @click.stop="toggleNotifications">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </div>

    <div class="user-info mr-2">
      <div class="username">{{ username }}</div>
      <div class="role">{{ role }}</div>
    </div>

    <v-avatar size="40">
      <v-img :src="userProfile" alt="User Image"></v-img>
    </v-avatar>
  </v-app-bar>
</template>

<script>
import userProfile from "@/assets/userprofile.jpg";
import {useDrawerStore} from "@/stores/drawerState";

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
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}

.username {
  font-weight: bold;
}

.role {
  font-size: 12px;
  color: gray;
}
</style>
