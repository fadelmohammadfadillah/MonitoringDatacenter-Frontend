<template>
  <v-container class="px-4" style="max-height: 100vh">
    <CustomSidebarButton
      icon="mdi-arrow-left"
      text="Status Persetujuan"
      route-link="/approval-management"
      class="pt-7"
      color="orange"
    />

    <v-row class="pb-10">
      <v-col class="text-h4 font-weight-bold pt-8"
        >Detail Status Persetujuan</v-col
      >
    </v-row>

    <v-card>
      <v-tabs v-model="currentTab" bg-color="white" slider-color="orange">
        <v-tab v-for="tab in tabs" :value="tab">{{ tab }}</v-tab>
      </v-tabs>
    </v-card>

    <v-card-text class="px-0 mx-0">
      <v-tabs-window v-model="currentTab">
        <v-tabs-window-item v-for="tab in tabs" :value="tab">
          <CustomDetailStatusTable
            class="px-0"
            :headers="headermodule"
            :items="module"
            :editEntity="openEditForm"
            :deleteEntity="openDeleteForm"
            v-if="tab === tabs[0]"
          />
          <!-- <v-card-text v-if="tab === tabs[1]">Riwayat Konten di sini...</v-card-text> -->
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import CustomDetailStatusTable from "./CustomDetailStatusTable.vue";

const tabs = ["Module", "Server App", "Server DB", "Backup", "Storage"];
// Data reactive
const currentTab = ref(tabs[0]);

const headermodule = [
  { title: "No", align: "start", key: "no" },
  { title: "Module", align: "start", key: "moduleName" },
  { title: "Status", align: "start", key: "status" },
  { title: "Performa", align: "start", key: "performa" },
  { title: "Log", align: "start", key: "log" },
  { title: "Catatan Petugas", align: "start", key: "note" },
];

const module = ref([
  { no: 1, moduleName: "mtask001", status: "NOK", performa: "≧ 5 detik", log: "TCP Module Delay", note: "Sempat terjadi kesalahan" },
  { no: 2, moduleName: "mcenter001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 3, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  
  { no: 4, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  
  { no: 5, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  
  { no: 6, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  
  { no: 7, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  
  { no: 8, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 9, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 10, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 11, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 12, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 13, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 14, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 15, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 16, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 17, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 18, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 19, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },
  { no: 20, moduleName: "mcenterajs001", status: "OK", performa: "≦ 2 detik", log: "Normal", note: "-" },

]);
</script>
