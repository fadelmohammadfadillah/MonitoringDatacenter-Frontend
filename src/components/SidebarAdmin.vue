<template>
  <v-navigation-drawer app class="pa-4">
    <v-list-item class="d-flex justify-center">
      <v-img
        src="../assets/Logo Collega.svg"
        alt="logo collega"
        min-height="9vh"
        min-width="10vw"
        class="pa-4"
      ></v-img>
    </v-list-item>
    <v-divider class="my-4"></v-divider>

    <v-list>
      <!-- Pengguna Section -->
      <v-list-item subtitle="Pengguna" class="pa-0 pl-2"></v-list-item>
      <CustomSidebarButton
        icon="mdi-account-multiple"
        text="Manajemen Pengguna"
      />

      <!-- Struktur Section -->
      <v-list-item subtitle="Struktur" class="pa-0 pl-2"></v-list-item>
      <CustomSidebarButton icon="mdi-account-multiple" text="Divisi" />

      <!-- Switching Section -->
      <v-list-item subtitle="Switching" class="pa-0 pl-2">
        <template #subtitle>
          <span>
            Kategori Produk
            <v-icon @click="toggleProducts" class="ml-1">{{
              productsIcon
            }}</v-icon>
          </span>
        </template>
      </v-list-item>
      <template v-if="showProducts">
        <CustomSidebarButton icon="mdi-account-multiple" text="Produk" />
        <CustomSidebarButton icon="mdi-account-multiple" text="Sub Produk" />
      </template>

      <!-- Other Sections -->
      <CustomSidebarButton icon="mdi-account-multiple" text="Bank" />
      <CustomSidebarButton icon="mdi-account-multiple" text="Profile TCP" />
      <CustomSidebarButton icon="mdi-account-multiple" text="Module" />

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

export default {
  components: {
    CustomSidebarButton,
  },
  data() {
    return {
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

<style scoped>
.text-h6 {
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
