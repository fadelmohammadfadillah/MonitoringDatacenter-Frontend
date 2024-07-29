<template>
  <ApprovalDataTable
    :headers="headers"
    :items="bank"
    :editEntity="openEditForm"
    :deleteEntity="openDeleteForm"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import ApprovalDataTable from "./ApprovalDataTable.vue";

const bank = ref([
  {
    idApproval: 1,
    date: "17/07/2024",
    nameBank: "Bank Aceh",
    status: "Perlu Persetujuan (1/1)",
    operator: "Aldi Siginen",
    submitTime: "07:00",
    detailedStatus: "Disetujui",
  },
]);

const headers = [
  { title: "No", align: "start", key: "idApproval" },
  { title: "Tanggal", align: "start", key: "date" },
  { title: "Bank", align: "start", key: "nameBank" },
  { title: "Status Pengecekan", align: "end", key: "status" },
];

const editDivisiForm = ref(null);
const deleteConfirmModal = ref(null);

const openEditForm = (item) => {
  editDivisiForm.value.openDialog(item);
};

const openDeleteForm = (item) => {
  deleteConfirmModal.value.modalState(item.idDivisi);
};

const fetchDataDivisi = async () => {
  try {
    const divisiData = await divisiService.getAllDiv();
    module.value = divisiData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataDivisi);
</script>
