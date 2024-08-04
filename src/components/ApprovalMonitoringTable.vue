<template>
  <v-container class="px-4" style="max-height: 100vh">
    <v-row class="pb-10">
      <v-col class="text-h4 font-weight-bold pt-8">Approval</v-col>
    </v-row>

    <v-card>
      <v-tabs v-model="currentTab" bg-color="white" slider-color="orange">
        <v-tab v-for="tab in tabs" :value="tab">{{ tab }}</v-tab>
      </v-tabs>
    </v-card>

    <v-card-text class="px-0 mx-0">
      <v-tabs-window v-model="currentTab">
        <v-tabs-window-item v-for="tab in tabs" :value="tab">
          <ApprovalDataTable
            class="px-0"
            :headers="headers"
            :items="computedItems"
            :detailHeaders="detailHeaders"
            :viewDetail="viewDetailItem"
            v-if="tab === tabs[0]"
          />
          <!-- <v-card-text v-if="tab === tabs[1]">Riwayat Konten di sini...</v-card-text> -->
          <ApprovalHistoryDataTable
            class="px-0"
            :headers="headers"
            :items="statusItems"
            :detailHeaders="detailHeaders"
            v-if="tab === tabs[1]"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ApprovalDataTable from "./ApprovalDataTable.vue";
import ApprovalHistoryDataTable from "./ApprovalHistoryDataTable.vue";
import eventMonitoringService from "@/services/EventMonitoringService";
import { useRouter } from "vue-router";

const router = useRouter();

const tabs = ["Status Persetujuan", "Riwayat"];
// Data reactive
const currentTab = ref(tabs[0]);

const eventMonitoring = ref([]);

const headers = [
  { title: "No", align: "start", key: "index" },
  { title: "Tanggal", align: "start", key: "dateMon" },
  { title: "Bank", align: "start", key: "bankName" },
  { title: "Status Pengecekan", align: "end", key: "status" },
];

const detailHeaders = [
  { title: "Nama Petugas", align: "start", key: "operatorName" },
  { title: "Tanggal", align: "start", key: "dateMon" },
  { title: "Waktu submit", align: "start", key: "timeMon" },
  { title: "Status", align: "start", key: "approvalStatus" },
];

const computedItems = computed(() => {
  return eventMonitoring.value.map((item) => {
    const approvedCount = item.details.filter(
      (detail) => detail.approvalStatus === "DISETUJUI"
    ).length;
    const total = item.details.length;

    return {
      ...item,
      status: `Perlu Persetujuan (${approvedCount}/${total})`,
    };
  });
});

const statusItems = computed(() => {
  return eventMonitoring.value.map((item) => {
    const approvedCount = item.details.filter(
      (detail) => detail.approvalStatus === "DISETUJUI"
    ).length;
    const total = item.details.length;

    return {
      ...item,
      status: `Selesai Pengecekan`,
    };
  });
});

const viewDetailItem = (detail) => {
  console.log("detail item: " + JSON.stringify(detail));
  router.push({
    name: 'DetailStatusMonitoringTable',
    params: {idMonitoring: detail.idMonitoring},
  });
}

const fetchEventMonitoring = async () => {
  try {
    const eventMonitoringData = await eventMonitoringService.getAllEventMonitoring();
    eventMonitoring.value = eventMonitoringData.data.map((item, index) => ({
      ...item,
      index: index+1,
    }));
    console.log(eventMonitoring.value);
  } catch (error) {
    console.log(error);
  }
}

onMounted(fetchEventMonitoring);
</script>
