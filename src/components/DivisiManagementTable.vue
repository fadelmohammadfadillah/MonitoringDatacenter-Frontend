<template>
  <CustomDataTable
    :headers="headers"
    :items="divisi"
    title="Manajemen Divisi"
    entity="Divisi"
    :addEntity="openAddForm"
    :editEntity="openEditForm"
    :deleteEntity="openDeleteForm"
  />
  <AddDivisiForm ref="addDivisiForm" @add-new-div="handleAddNewDivisi" />

  <CustomSuccessModal
    message="Divisi Berhasil Ditambahkan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="addSuccessModal"
  />

  <EditDivisiForm ref="editDivisiForm" @edit-div="handleEditDivisi" />
  <CustomSuccessModal
    message="Perubahan berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="editSuccessModal"
  />

  <CustomDeleteConfirmationModal
    ref="deleteConfirmModal"
    message="Yakin Ingin Menghapus?"
    imgSrc="/src/assets/confirmation-modal-img.svg"
    @delete-divisi="handleDeleteDivisi"
  />

  <CustomSuccessModal
    message="Divisi berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="deleteSuccessModal"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import divisiService from "@/services/DivisiService";
import CustomDataTable from "./CustomDataTable.vue";
import AddDivisiForm from "@/components/AddDivisiForm.vue";
import EditDivisiForm from "@/components/EditDivisiForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";

const divisi = ref([
  { idDivisi: 1, divisiName: "Business Development", status: "Active" },
  {
    idDivisi: 2,
    divisiName: "Core Banking System Conventional",
    status: "Active",
  },
  { idDivisi: 3, divisiName: "Core Banking System Syariah", status: "Active" },
  { idDivisi: 4, divisiName: "Digital Enterprise", status: "Active" },
  { idDivisi: 5, divisiName: "Surrounding Application", status: "Active" },
  {
    idDivisi: 6,
    divisiName: "Regulatory & Financial Reporting",
    status: "Active",
  },
  { idDivisi: 7, divisiName: "Quality Assurance", status: "Active" },
  { idDivisi: 8, divisiName: "Region 1", status: "Active" },
  { idDivisi: 9, divisiName: "Region 2", status: "Active" },
  { idDivisi: 10, divisiName: "Region 3", status: "Active" },
  { idDivisi: 11, divisiName: "IT Operation Management", status: "Active" },
  { idDivisi: 12, divisiName: "Infrastructure", status: "Active" },
  { idDivisi: 13, divisiName: "Business Support", status: "Active" },
  {
    idDivisi: 14,
    divisiName: "Human Capital, Finance, Legal, & Corporate Secretary",
    status: "Active",
  },
  {
    idDivisi: 15,
    divisiName: "Internal Audit & Risk Management",
    status: "Active",
  },
]);

const headers = [
  { title: "No", align: "start", key: "idDivisi" },
  { title: "Divisi", align: "start", key: "divisiName" },
  // { title: "Status", align: "start", key: "status" },
];

const addDivisiForm = ref(null);
const addSuccessModal = ref(null);
const editDivisiForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

const openAddForm = () => {
  addDivisiForm.value.openDialog();
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewDivisi = async (newDiv) => {
  try {
    await divisiService.createNewDiv(newDiv);
    fetchDataDivisi();
    openAddSuccessModal();
  } catch (error) {
    alert("tambah data divisi gagal!" + error);
  }
};

const openEditForm = (item) => {
  editDivisiForm.value.openDialog(item);
};

const openEditSuccessModal = () => {
  editSuccessModal.value.modalState();
};

const handleEditDivisi = async (editDiv) => {
  try {
    await divisiService.updateDiv(editDiv);
    fetchDataDivisi();
    openEditSuccessModal();
  } catch (error) {
    alert("edit data divisi gagal!" + error);
  }
};

const openDeleteForm = (item) => {
  deleteConfirmModal.value.modalState(item.idDivisi);
};

const openDeleteSuccessModal = () => {
  deleteSuccessModal.value.modalState();
};

const handleDeleteDivisi = async (deleteDiv) => {
  try {
    await divisiService.deleteDiv(deleteDiv);
    fetchDataDivisi();
    openDeleteSuccessModal();
  } catch (error) {
    alert("delete gagal!" + error);
  }
};

const fetchDataDivisi = async () => {
  try {
    const divisiData = await divisiService.getAllDiv();
    divisi.value = divisiData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataDivisi);
</script>

<style scoped></style>
