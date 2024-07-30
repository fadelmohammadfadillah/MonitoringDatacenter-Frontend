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

    <ShowDetailServerApp ref="showdetailServerApp" />

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
            :items="modules"
            :editEntity="openDetailmodule"
            v-if="tab === tabs[0]"
          />

          <CustomDetailStatusTable
            class="px-0"
            :headers="headerserverapp"
            :items="servers"
            :editEntity="openDetailserverApp"
            v-if="tab === tabs[1]"
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
  { title: "Module", align: "start", key: "nameModule" },
  { title: "Status", align: "start", key: "status" },
  { title: "Performa", align: "start", key: "performaModule" },
  { title: "Log", align: "start", key: "logModule" },
  { title: "Catatan Petugas", align: "start", key: "noteModule" },
];

const modules = ref([
  {
    idstatusModule: 1,
    nameModule: "mtask001",
    status: "NOK",
    performaModule: "≧ 5 detik",
    logModule: "TCP Module Delay",
    noteModule: "Sempat terjadi kesalahan",
  },
  {
    idstatusModule: 2,
    nameModule: "mcenter001",
    status: "OK",
    performaModule: "≦ 2 detik",
    logModule: "Normal",
    noteModule: "-",
  },
  {
    idstatusModule: 3,
    nameModule: "mcjs001",
    status: "OK",
    performaModule: "≦ 2 detik",
    logModule: "Normal",
    noteModule: "-",
  },

  {
    idstatusModule: 4,
    nameModule: "TTCP Module",
    status: "OK",
    performaModule: "≦ 2 detik",
    logModule: "Normal",
    noteModule: "-",
  },

  {
    idstatusModule: 5,
    nameModule: "auth001",
    status: "OK",
    performaModule: "≦ 2 detik",
    logModule: "Normal",
    noteModule: "-",
  },

  {
    idstatusModule: 6,
    nameModule: "auth002",
    status: "OK",
    performaModule: "≦ 2 detik",
    logModule: "Normal",
    noteModule: "Yuhuuu",
  },

  {
    idstatusModule: 7,
    nameModule: "mcenterajs001",
    status: "OK",
    performaModule: "≦ 2 detik",
    logModule: "Normal",
    noteModule: "Test",
  },

  {
    idstatusModule: 8,
    nameModule: "mcenterajs002",
    status: "OK",
    performaModule: "≦ 2 detik",
    logModule: "Normal",
    noteModule: "-",
  },
  {
    idstatusModule: 9,
    nameModule: "mcenterajs003",
    status: "OK",
    performaModule: "≦ 2 detik",
    logModule: "Normal",
    noteModule: "-",
  },
  {
    idstatusModule: 10,
    nameModule: "mcenterajs004",
    status: "OK",
    performaModule: "≦ 2 detik",
    logModule: "Normal",
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
    module.value = datastatusModule.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataStatusModule);

// Detail Server App Status
const headerserverapp = [
  { title: "No", align: "start", key: "idstatusServerApp" },
  { title: "Nama Server Aplikasi", align: "start", key: "nameServerApp" },
  { title: "IP", align: "start", key: "ipServer" },
  { title: "Path", align: "start", key: "pathServer" },
  { title: "Usage (%)", align: "start", key: "usageServer" },
  { title: "Status", align: "start", key: "status" },
  { title: "Log", align: "start", key: "logServerApp" },
  { title: "Catatan Petugas", align: "start", key: "noteServerApp" },
];

const servers = ref([
  {
    idstatusServerApp: 1,
    nameServerApp: "ATM",
    ipServer: "10.234.44.80",
    pathServer: "/",
    usageServer: "65",
    status: "OK",
    logServerApp: "Normal",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 2,
    nameServerApp: "ATM",
    ipServer: "10.234.44.80",
    pathServer: "/home",
    usageServer: "13",
    status: "OK",
    logServerApp: "Normal",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 3,
    nameServerApp: "BPIH",
    ipServer: "10.234.44.30",
    pathServer: "/",
    usageServer: "49",
    status: "OK",
    logServerApp: "Normal",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 4,
    nameServerApp: "BPIH",
    ipServer: "10.234.44.30",
    pathServer: "/home",
    usageServer: "20",
    status: "OK",
    logServerApp: "Normal",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 5,
    nameServerApp: "APPTOOLS",
    ipServer: "10.234.44.81",
    pathServer: "/",
    usageServer: "33",
    status: "OK",
    logServerApp: "Normal",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 6,
    nameServerApp: "APPTOOLS",
    ipServer: "10.234.44.81",
    pathServer: "/home",
    usageServer: "19",
    status: "OK",
    logServerApp: "Normal",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 7,
    nameServerApp: "APPTOOLS",
    ipServer: "10.234.44.81",
    pathServer: "/opt",
    usageServer: "72",
    status: "WARN",
    logServerApp: "Almost 75%",
    noteServerApp: "Storage sudah hampir 75%. Akan membahayakan operasional.",
  },
]);

import ShowDetailServerApp from "@/components/DetailStatusServerApp.vue";
import detailServerApp from "@/services/DetailServerApp.js";

const showdetailServerApp = ref(null);

const openDetailserverApp = (item) => {
  showdetailServerApp.value.openDialog(item);
};

const fetchDataStatusServerApp = async () => {
  try {
    const datastatusServerApp = await detailServerApp.getAllstatusServerApp();
    console.log(datastatusServerApp);
    servers.value = datastatusServerApp.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataStatusServerApp);
</script>
