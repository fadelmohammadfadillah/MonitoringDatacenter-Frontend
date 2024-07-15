<!-- File: UserOptionsMenu.vue -->
<template>
    <v-menu
      offset-y
      v-model="menu"
      :close-on-content-click="false"
      :activator="$refs.menuActivator"
    >
      <template #activator="{ on }">
        <v-btn
          ref="menuActivator"
          class="text-white mx-1"
          prepend-icon="mdi-dots-horizontal"
          variant="plain"
          color="orange"
          v-bind="on"
        ></v-btn>
      </template>
  
      <v-list>
        <v-list-item @click="editUser">
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
        <v-list-item @click="deleteUser">
          <v-list-item-title>Hapus</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup(props, { emit }) {
      const menu = ref(false);
  
      const editUser = () => {
        // Mengirimkan event untuk mengedit pengguna
        emit('edit-user');
        menu.value = false; // Menutup menu setelah klik
      };
  
      const deleteUser = () => {
        // Mengirimkan event untuk menghapus pengguna
        emit('delete-user');
        menu.value = false; // Menutup menu setelah klik
      };
  
      return {
        menu,
        editUser,
        deleteUser,
      };
    },
  };
  </script>
  
  <style scoped></style>
  