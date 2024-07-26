<template>
  <ApprovalDataTable :headers="headers" :items="computedItems" />
</template>

<script setup>
import { ref, computed } from "vue";
import ApprovalDataTable from "./ApprovalDataTable.vue";

const items = ref([
  {
    no: 1,
    date: "17/07/2024",
    bank: "Bank Aceh",
    details: [
      {
        operator: "ABX Siginen",
        submitTime: "07:00",
        detailedStatus: "Disetujui",
      },
      {
        operator: "DEF Hartono",
        submitTime: "08:00",
        detailedStatus: "Disetujui",
      },
      {
        operator: "Budi Hartono",
        submitTime: "08:00",
        detailedStatus: "Menunggu Disetujui",
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
        submitTime: "07:00",
        detailedStatus: "Menunggu Disetujui",
      },
      {
        operator: "JK Hartono",
        submitTime: "08:00",
        detailedStatus: "Menunggu Disetujui",
      },
      {
        operator: "LM Hartono",
        submitTime: "08:00",
        detailedStatus: "Menunggu Disetujui",
      },
      {
        operator: "NO Hartono",
        submitTime: "08:00",
        detailedStatus: "Menunggu Disetujui",
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
        submitTime: "07:00",
        detailedStatus: "Menunggu Disetujui",
      },
      {
        operator: "RS Hartono",
        submitTime: "08:00",
        detailedStatus: "Menunggu Disetujui",
      },
      {
        operator: "TU Hartono",
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
</script>

<style scoped></style>
