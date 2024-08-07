<template>
  <v-container class="px-4" style="max-height: 100vh">
    <v-btn
      prepend-icon="mdi-arrow-left"
      @click="$router.push({name: 'ApprovalMonitoringTable'})"
      @mouseover="isHovering = true"
      @mouseleave="isHovering = false"
      class="text-subtitle-2 font-weight-medium mt-7"
      :color="isHovering ? 'orange' : 'black'"
      variant="plain"
      rounded="lg"
    >Status Persetujuan</v-btn>

    <ShowDetailModule ref="showdetailModule" />

    <ShowDetailServerApp ref="showdetailServerApp" />

    <v-row class="pb-10">
      <v-col class="text-h4 font-weight-bold pt-8"
        >Detail Status Persetujuan</v-col
      >
    </v-row>

    <v-card>
      <v-tabs v-model="currentTab" flat bg-color="#f6f6f6" slider-color="orange">
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

          <!-- <CustomDetailStatusTable
            class="px-0"
            :headers="headerServerApp"
            :items="servers"
            :editEntity="openDetailserverApp"
            v-if="tab === tabs[1]"
          /> -->
          <CustomServerDetailTable
            :headers="headerServerApp"
            :detail-headers="detailHeaderServerApp"
            :items="servers"
          />

          <CustomDetailStatusTable
            class="px-0"
            :headers="headerBackup"
            :items="backups"
            :editEntity="openDetailserverApp"
            v-if="tab === tabs[3]"
          />

          <CustomDetailStatusTable
            class="px-0"
            :headers="headerServerMon"
            :items="serverMon"
            :editEntity="openDetailserverApp"
            v-if="tab === tabs[4]"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import CustomDetailStatusTable from "./CustomDetailStatusTable.vue";
import { useRoute } from "vue-router";
import eventMonitoringService from "@/services/EventMonitoringService";
import CustomServerDetailTable from "./CustomServerDetailTable.vue";

const route = useRoute();

const tabs = ["Module", "Server App", "Server DB", "Backup", "Storage"];

const currentTab = ref(tabs[0]);

const isHovering = ref(false);

// Detail Module Status
const headermodule = [
  { title: "No", align: "start", key: "index" },
  { title: "Module", align: "start", key: "moduleName" },
  { title: "Status", align: "start", key: "status" },
  { title: "Performa", align: "start", key: "performa" },
  { title: "Log", align: "start", key: "log" },
  { title: "Catatan Petugas", align: "start", key: "operatorNotes" },
];

const modules = ref([]);
const serverApps = ref([]);
const serverDbs = ref([]);
const backups = ref([]);
const serverMon = ref([]);

import ShowDetailModule from "@/components/DetailStatusModule.vue";

const showdetailModule = ref(null);

const openDetailmodule = (item) => {
  showdetailModule.value.openDialog(item);
};

const fetchDataModuleMonitoring = async () => {
  try {
    const moduleData = await eventMonitoringService.getAllModuleMonByIdMon(route.params.idMonitoring);
    modules.value = moduleData.data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    console.log(modules.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataModuleMonitoring);

// Detail Server App Status
const headerServerApp = [
  { title: "No", align: "start", key: "idstatusServerApp" },
  { title: "IP", align: "start", key: "ipServer" },
  { title: "Nama Server Aplikasi", align: "start", key: "nameServerApp" },
  
];

const detailHeaderServerApp = [
  { title: "Path", align: "start", key: "pathServer" },
  { title: "Usage (%)", align: "start", key: "usageServer" },
  { title: "Status", align: "start", key: "status" },
  { title: "Catatan Petugas", align: "start", key: "noteServerApp" },
];

const servers = ref([
  {
    idstatusServerApp: 1,
    nameServerApp: "ATM",
    ipServer: "10.234.44.80",
    details: [
      {
        pathServer: "/",
        usageServer: "65",
        status: "OK",
        noteServerApp: "-",
      },
      {
        pathServer: "/",
        usageServer: "65",
        status: "OK",
        noteServerApp: "-",
      },
      {
        pathServer: "/",
        usageServer: "65",
        status: "OK",
        noteServerApp: "-",
      },
      {
        pathServer: "/",
        usageServer: "65",
        status: "OK",
        noteServerApp: "-",
      },
    ]
    
  },
  {
    idstatusServerApp: 2,
    nameServerApp: "ATM",
    ipServer: "10.234.44.80",
    pathServer: "/home",
    usageServer: "13",
    status: "OK",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 3,
    nameServerApp: "BPIH",
    ipServer: "10.234.44.30",
    pathServer: "/",
    usageServer: "49",
    status: "OK",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 4,
    nameServerApp: "BPIH",
    ipServer: "10.234.44.30",
    pathServer: "/home",
    usageServer: "20",
    status: "OK",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 5,
    nameServerApp: "APPTOOLS",
    ipServer: "10.234.44.81",
    pathServer: "/",
    usageServer: "33",
    status: "OK",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 6,
    nameServerApp: "APPTOOLS",
    ipServer: "10.234.44.81",
    pathServer: "/home",
    usageServer: "19",
    status: "OK",
    noteServerApp: "-",
  },
  {
    idstatusServerApp: 7,
    nameServerApp: "APPTOOLS",
    ipServer: "10.234.44.81",
    pathServer: "/opt",
    usageServer: "72",
    status: "WARN",
    noteServerApp: "Storage sudah hampir 75%. Akan membahayakan operasional.",
  },
]);

import ShowDetailServerApp from "@/components/DetailStatusServerApp.vue";
import detailServerApp from "@/services/DetailServerApp.js";

const showdetailServerApp = ref(null);

const openDetailserverApp = (item) => {
  showdetailServerApp.value.openDialog(item);
};

// const fetchDataServerAppMonitoring = async () => {
//   try {
//     const serverAppMonData = await detailServerApp
//     console.log(datastatusServerApp);
//     servers.value = datastatusServerApp.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// onMounted(fetchDataStatusServerApp);


// Detail Server Backup Monitoring

const headerBackup = [
  { title: "No", align: "start", key: "index" },
  { title: "IP Server", align: "start", key: "ipAddress" },
  { title: "Directory Backup", align: "start", key: "directoryBackup" },
  { title: "Mulai", align: "start", key: "startBackup" },
  { title: "Selesai", align: "start", key: "finishBackup" },
  { title: "Status", align: "start", key: "status" },
  { title: "Catatan Petugas", align: "start", key: "operatorNotes" },
];


const fetchBackupMonitoring = async () => {
  try {
    const backupMonData = await eventMonitoringService.getAllBackupMonByIdMon(route.params.idMonitoring);
    backups.value = backupMonData.data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    console.log(backups.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchBackupMonitoring);

const headerServerMon = [
  { title: "No", align: "start", key: "index" },
  { title: "IP Addres", align: "start", key: "ipAddress" },
  { title: "CPU Usage (%)", align: "start", key: "cpuUsage" },
  { title: "Ram Usage (%)", align: "start", key: "ramUsage" },
  { title: "Disk Usage (%)", align: "start", key: "diskUsage" },
  { title: "Log", align: "start", key: "log" },
  { title: "Catatan Petugas", align: "start", key: "operatorNotes" },
];

const fetchServerMonitoring = async () => {
  try {
    const serverMonData = await eventMonitoringService.getAllServerMonByIdMon(route.params.idMonitoring);
    serverMon.value = serverMonData.data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    console.log(serverMon.value);
  } catch (error) {
    console.log(error);
  }
};


onMounted(fetchServerMonitoring);

</script>
<style scoped>
</style>