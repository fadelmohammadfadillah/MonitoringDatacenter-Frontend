<template>
    <v-navigation-drawer class="pa-4">
        <v-list-item class="d-flex justify-center">
            <v-img 
                src="../assets/Logo Collega.svg"
                alt="logo collega"
                min-height="10vh"
                min-width="12vw"
                class="pa-4"
            ></v-img>
        </v-list-item>
        <v-divider class="my-4"></v-divider>
        <v-list-item subtitle="Pengguna" class="pa-0 pl-2"></v-list-item>
        <CustomSidebarButton icon="mdi-account-multiple" text="Manajemen Pengguna" />
        <v-list-item subtitle="Struktur" class="pa-0 pl-2"></v-list-item>
        <CustomSidebarButton icon="mdi-account-multiple" text="Departement" />
        <CustomSidebarButton icon="mdi-account-multiple" text="Divisi" />
        <v-list-item subtitle="Switching" class="pa-0 pl-2"></v-list-item>
        <CustomSidebarButton icon="mdi-bank" text="Bank" />
        <CustomSidebarButton icon="mdi-view-dashboard" text="Kategori Produk" />
        <CustomSidebarButton icon="mdi-view-dashboard" text="Profile" />
        <CustomSidebarButton icon="mdi-view-module-outline" text="Modul" />
        <template v-slot:append>
            <CustomSidebarButton icon="mdi-logout" text="Signout" />
        </template>
    </v-navigation-drawer>
</template>

<script>
import CustomSidebarButton from './CustomSidebarButton.vue';

    export default {
    }
</script>

<style scoped>
</style>