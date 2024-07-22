<template>
  <v-navigation-drawer
    app
    class="pa-4"
    v-model="drawerStore"
    style="max-height: 100vh"
  >
    <v-list-item class="d-flex justify-center">
      <v-img
        src="../assets/Logo Collega.svg"
        alt="logo collega"
        min-height="9vh"
        min-width="9vw"
        class="pt-1"
      ></v-img>
    </v-list-item>
    <v-divider class="mx-1"></v-divider>

    <v-list>
      <!-- Pengguna Section -->
      <v-list-item subtitle="Pengguna" class="pa-0 pl-2"></v-list-item>
      <CustomSidebarButton
        icon="mdi-account-multiple"
        text="Manajemen Pengguna"
        route-link="/user-management"
      />

      <!-- Struktur Section -->
      <v-list-item subtitle="Struktur" class="pa-0 pl-2"></v-list-item>
      <CustomSidebarButton
        icon="mdi-account-multiple"
        text="Manajemen Divisi"
        route-link="/divisi-management"
      />
      <CustomSidebarButton
        icon="mdi-account-multiple"
        text="Manajemen Departemen"
        route-link="/departement-management"
      />

      <!-- Switching Section -->
      <v-list-item subtitle="Switching" class="pa-0 pl-2"></v-list-item>
      <!-- Produk Section -->
      <v-list-item subtitle="Produk" class="pa-0 pl-2">
        <template #subtitle>
          <span class="pa-0 pl-2">
            Kategori Produk
            <v-icon @click="toggleProducts" class="ml-1">{{
              productsIcon
            }}</v-icon>
          </span>
        </template>
      </v-list-item>
      <template v-if="showProducts">
        <CustomSidebarButton
          icon="mdi-file-tree"
          text="Produk"
          route-link="/product-management"
        />
        <CustomSidebarButton
          icon="mdi-file-tree"
          text="Sub Produk"
          route-link="/subproduct-management"
        />
      </template>
      <CustomSidebarButton
        icon="mdi-bank-outline"
        text="Bank"
        route-link="/bank-management"
      />
      <!-- <CustomSidebarButton icon="mdi-dns-outline" text="Profile TCP" /> -->
      <CustomSidebarButton
        icon="mdi-view-module-outline"
        text="Module"
        route-link="/module-management"
      />

      <!-- Operasi Section -->
      <v-list-item subtitle="Operasi" class="pa-0 pl-2"></v-list-item>
      <CustomSidebarButton icon="mdi-clipboard-check" text="Checklist" />
      <CustomSidebarButton icon="mdi-chart-line" text="Overview" />
      <CustomSidebarButton icon="mdi-history" text="Riwayat" />

      <!-- Signout -->
      <v-divider class="my-4"></v-divider>
      <CustomSidebarButton icon="mdi-logout" text="Signout" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import CustomSidebarButton from "@/components/CustomSidebarButton.vue";
import { useDrawerStore } from "@/stores/drawerState";
import { computed } from "vue";

export default {
  components: {
    CustomSidebarButton,
  },
  setup() {
    const drawerStore = useDrawerStore();
    const drawer = computed({
      get() {
        return drawerStore.drawer;
      },
      set(value) {
        drawerStore.drawer = value;
      },
    });
    return {
      drawerStore: drawer,
      showProducts: false,
      productsIcon: "mdi-menu-down",
    };
  },
  methods: {
    toggleProducts() {
      this.showProducts = !this.showProducts;
      this.productsIcon = this.showProducts ? "mdi-menu-down" : "mdi-menu-up";
    },
  },
};
</script>

<style scoped></style>
