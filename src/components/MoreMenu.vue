<template>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290"
      min-width="200"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="text-white mx-1"
          prepend-icon="mdi-dots-horizontal"
          variant="plain"
          color="orange"
          v-bind="attrs"
          v-on="on"
        ></v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item @click="editItem">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteItem">
            <v-list-item-title class="red--text">Hapus</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const menu = ref(false);
  
  const editItem = () => {
    // Logika untuk mengedit item
    console.log('Edit item');
  };
  
  const deleteItem = () => {
    // Logika untuk menghapus item
    console.log('Delete item');
  };
  </script>
  
  <style scoped>
  .v-list-item-title.red--text {
    color: red !important;
  }
  </style>
  