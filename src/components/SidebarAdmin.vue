<template>
  <v-navigation-drawer
    app
    class="pa-4"
    v-model="drawer"
    style="max-height: 100vh; position:fixed"
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
      <v-list-item subtitle="Manajemen" class="pa-0 pl-2"></v-list-item>
      <CustomSidebarButton
        icon="mdi-account-multiple"
        text="Pengguna"
        route-link="UserManagementTable"
      />
      <CustomSidebarButton
        icon="mdi-account-group"
        text="Divisi"
        route-link="DivisiManagementTable"
      />
      <CustomSidebarButton
        icon="mdi-account-group"
        text="Department"
        route-link="DepartmentManagementTable"
      />

      <!-- Switching Section -->
      <v-list-item subtitle="Konfigurasi" class="pa-0 pl-2"></v-list-item>
      <!-- custom dropdown button -->
      <v-btn
        @mouseover="isHoveringDropdownBtn = true"
        @mouseleave="isHoveringDropdownBtn = false"
        :variant="isHoveringDropdownBtn ? 'tonal' : 'plain'"
        :color="isHoveringDropdownBtn ? 'orange' : 'grey-darken-4'"
        @click="toggleProducts"
        :append-icon="showProducts ? 'mdi-menu-up' : 'mdi-menu-down'"
        block
        prepend-icon="mdi-archive-outline"
        class="text-subtitle-2 font-weight-medium pl-4 py-5"
        rounded="lg"
        style="justify-content: start"
      >
        Kategori Produk
      </v-btn>
      <template v-if="showProducts">
        <CustomSidebarButton
          icon="mdi-file-tree"
          text="Produk"
          route-link="ProductManagementTable"
          class="pl-4"
        />
        <CustomSidebarButton
          icon="mdi-file-tree"
          text="Sub Produk"
          route-link="SubProductManagementTable"
          class="pl-4"
        />
      </template>
      <CustomSidebarButton
        icon="mdi-bank-outline"
        text="Bank"
        route-link="BankManagementTable"
      />
      <!-- <CustomSidebarButton icon="mdi-dns-outline" text="Profile TCP" /> -->
      <CustomSidebarButton
        icon="mdi-view-module-outline"
        text="Module"
        route-link="ModuleManagementTable"
      />

      <!-- Operasi Section -->
      <v-list-item subtitle="Operasi" class="pa-0 pl-2"></v-list-item>
      <CustomSidebarButton icon="mdi-stamper" text="Approval" route-link="ApprovalMonitoringTable"/>
      <CustomSidebarButton icon="mdi-format-list-checks" text="Checklist" />
      <CustomSidebarButton icon="mdi-chart-box-outline" text="Report" />
      <v-spacer></v-spacer>
      <!-- Signout -->
      <v-divider class="my-4"></v-divider>
      <CustomSidebarButton icon="mdi-logout" text="Signout" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import CustomSidebarButton from "@/components/CustomSidebarButton.vue";
import { useDrawerStore } from "@/stores/DrawerState";

const drawerStore = useDrawerStore();
const drawer = computed({
  get() {
    return drawerStore.drawer;
  },
  set(value) {
    drawerStore.drawer = value;
  },
});

const showProducts = ref(false);
const productsIcon = computed(() =>
  showProducts.value ? "mdi-menu-up" : "mdi-menu-down"
);

const toggleProducts = () => {
  showProducts.value = !showProducts.value;
};

const isHoveringDropdownBtn = ref(false);
</script>

<style scoped></style>
