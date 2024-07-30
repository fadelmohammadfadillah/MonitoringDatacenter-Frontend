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
import { ref } from "vue";
import ApprovalDataTable from "./ApprovalDataTable.vue";
import ApprovalHistoryDataTable from "./ApprovalHistoryDataTable.vue";

const tabs = ["Status Persetujuan", "Riwayat"];
// Data reactive
const currentTab = ref(tabs[0]);

const items = ref([
  {
    no: 1,
    date: "17/07/2024",
    bank: "Bank Aceh",
    details: [
      {
        operator: "ABX Siginen",
        date: "29/07/2024",
        submitTime: "07:00",
        detailedStatus: "Disetujui",
      },
      {
        operator: "DEF Hartono",
        date: "29/07/2024",
        submitTime: "08:00",
        detailedStatus: "Disetujui",
      },
      {
        operator: "Budi Hartono",
        date: "29/07/2024",
        submitTime: "08:00",
        detailedStatus: "Disetujui",
      },
    ],
  },
  {
    no: 2,
    date: "17/07/2024",
    bank: "Bank IBK",
    details: [
      {
        operator: "GHI Siginen",
        date: "29/07/2024",
        submitTime: "07:00",
        detailedStatus: "Disetujui",
      },
      {
        operator: "JK Hartono",
        date: "29/07/2024",
        submitTime: "08:00",
        detailedStatus: "Disetujui",
      },
      {
        operator: "LM Hartono",
        date: "29/07/2024",
        submitTime: "08:00",
        detailedStatus: "Disetujui",
      },
      {
        operator: "NO Hartono",
        date: "29/07/2024",
        submitTime: "08:00",
        detailedStatus: "Disetujui",
      },
    ],
  },
  {
    no: 3,
    date: "17/07/2024",
    bank: "Bank Sulteng",
    details: [
      {
        operator: "PQ Siginen",
        date: "29/07/2024",
        submitTime: "07:00",
        detailedStatus: "Menunggu Disetujui",
      },
      {
        operator: "RS Hartono",
        date: "29/07/2024",
        submitTime: "08:00",
        detailedStatus: "Menunggu Disetujui",
      },
      {
        operator: "TU Hartono",
        date: "29/07/2024",
        submitTime: "08:00",
        detailedStatus: "Menunggu Disetujui",
      },
    ],
  },
]);

const headers = [
  { title: "No", align: "start", key: "no" },
  { title: "Tanggal", align: "start", key: "date" },
  { title: "Bank", align: "start", key: "bank" },
  { title: "Status Pengecekan", align: "end", key: "status" },
];

const detailHeaders = [
  { title: "Nama Petugas", align: "start", key: "operator" },
  { title: "Tanggal", align: "start", key: "date" },
  { title: "Waktu submit", align: "start", key: "submitTime" },
  { title: "Status", align: "start", key: "detailedStatus" },
];

const computedItems = computed(() => {
  return items.value.map((item) => {
    const approvedCount = item.details.filter(
      (detail) => detail.detailedStatus === "Disetujui"
    ).length;
    const total = item.details.length;

    return {
      ...item,
      status: `Perlu Persetujuan (${approvedCount}/${total})`,
    };
  });
});

const statusItems = computed(() => {
  return items.value.map((item) => {
    const approvedCount = item.details.filter(
      (detail) => detail.detailedStatus === "Disetujui"
    ).length;
    const total = item.details.length;

    return {
      ...item,
      status: `Approved`,
    };
  });
});
</script>
