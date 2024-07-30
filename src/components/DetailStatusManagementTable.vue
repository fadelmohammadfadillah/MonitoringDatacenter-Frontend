<template>
  <v-container class="px-4" style="max-height: 100vh">
    <CustomSidebarButton
      icon="mdi-arrow-left"
      text="Status Persetujuan"
      route-link="/approval-management"
      class="pt-7"
      color="orange"
    />

    <ShowDetailModule ref="showdetailModule" />

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
            :editEntity="openDetailmodule"
            v-if="tab === tabs[0]"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import CustomDetailStatusTable from "./CustomDetailStatusTable.vue";

const tabs = ["Module", "Server App", "Server DB", "Backup", "Storage"];

const currentTab = ref(tabs[0]);



// Detail Module Status

const headermodule = [
  { title: "No", align: "start", key: "idstatusModule" },
  { title: "Module", align: "start", key: "moduleName" },
  { title: "Status", align: "start", key: "status" },
  { title: "Performa", align: "start", key: "performa" },
  { title: "Log", align: "start", key: "log" },
  { title: "Catatan Petugas", align: "start", key: "noteModule" },
];

const module = ref([
  {
    idstatusModule: 1,
    moduleName: "mtask001",
    status: "NOK",
    performa: "≧ 5 detik",
    log: "TCP Module Delay",
    noteModule: "Sempat terjadi kesalahan",
  },
  {
    idstatusModule: 2,
    moduleName: "mcenter001",
    status: "OK",
    performa: "≦ 2 detik",
    log: "Normal",
    noteModule: "-",
  },
  {
    idstatusModule: 3,
    moduleName: "mcjs001",
    status: "OK",
    performa: "≦ 2 detik",
    log: "Normal",
    noteModule: "-",
  },

  {
    idstatusModule: 4,
    moduleName: "TTCP Module",
    status: "OK",
    performa: "≦ 2 detik",
    log: "Normal",
    noteModule: "-",
  },

  {
    idstatusModule: 5,
    moduleName: "auth001",
    status: "OK",
    performa: "≦ 2 detik",
    log: "Normal",
    noteModule: "-",
  },

  {
    idstatusModule: 6,
    moduleName: "auth002",
    status: "OK",
    performa: "≦ 2 detik",
    log: "Normal",
    noteModule: "Yuhuuu",
  },

  {
    idstatusModule: 7,
    moduleName: "mcenterajs001",
    status: "OK",
    performa: "≦ 2 detik",
    log: "Normal",
    noteModule: "Test",
  },

  {
    idstatusModule: 8,
    moduleName: "mcenterajs002",
    status: "OK",
    performa: "≦ 2 detik",
    log: "Normal",
    noteModule: "-",
  },
  {
    idstatusModule: 9,
    moduleName: "mcenterajs003",
    status: "OK",
    performa: "≦ 2 detik",
    log: "Normal",
    noteModule: "-",
  },
  {
    idstatusModule: 10,
    moduleName: "mcenterajs004",
    status: "OK",
    performa: "≦ 2 detik",
    log: "Normal",
    noteModule: "-",
  },
]);

import ShowDetailModule from "@/components/DetailStatusModule.vue";
import detailModuleService from "@/services/DetailModuleService.js";

const showdetailModule = ref(null);

const openDetailmodule = (item) => {
  showdetailModule.value.openDialog(item);
};

const fetchDataStatusModule = async () => {
  try {
    const datastatusModule = await detailModuleService.getAllstatusModule();
    console.log(datastatusModule);
    divisi.value = datastatusModule.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataStatusModule);

// ===================================================================








</script>
