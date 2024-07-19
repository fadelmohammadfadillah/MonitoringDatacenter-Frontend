<template>
  <CustomDataTable
    :headers="headers"
    :items="departement"
    title="Manajemen Sub Produk"
    entity="Sub Produk"
    :addEntity="openAddForm"
    :editEntity="openEditForm"
    :deleteEntity="openDeleteForm"
  />
  <AddDepartementForm
    ref="addDepartementForm"
    @add-new-div="handleAddNewDepartement"
  />

  <CustomSuccessModal
    message="Departemen Berhasil Ditambahkan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="addSuccessModal"
  />

  <EditDepartementForm
    ref="editDepartementForm"
    @edit-div="handleEditDepartement"
  />
  <CustomSuccessModal
    message="Perubahan berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="editSuccessModal"
  />

  <CustomDeleteConfirmationModal
    ref="deleteConfirmModal"
    message="Yakin Ingin Menghapus?"
    imgSrc="/src/assets/confirmation-modal-img.svg"
    @delete-divisi="handleDeleteDepartement"
  />

  <CustomSuccessModal
    message="Divisi berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="deleteSuccessModal"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import departementService from "@/services/DepartementService";
import CustomDataTable from "./CustomDataTable.vue";
import AddDepartementForm from "@/components/AddSubProductForm.vue";
import EditDepartementForm from "@/components/EditSubProductForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";

const departement = ref([
  {
    idDepartement: 1,
    productName: "Switching",
    subproductName: "Ecardman",
    departementName: "Card & Digital Transactions",
  },
  {
    idDepartement: 2,
    productName: "Middleware",
    subproductName: "E-Monitoring",
    departementName: "Card & Digital Transactions",
  },
  {
    idDepartement: 3,
    productName: "Switching",
    subproductName: "Emware-ws",
    departementName: "Digital Channel",
  },
  {
    idDepartement: 4,
    productName: "Middleware",
    subproductName: "ATM",
    departementName: "Card & Digital Transactions",
  },
  {
    idDepartement: 5,
    productName: "Switching",
    subproductName: "E-Config",
    departementName: "Digital Channel",
  },
]);

const headers = [
  { title: "No", align: "start", key: "idDepartement" },
  { title: "Produk", align: "start", key: "productName" },
  { title: "Sub Produk", align: "start", key: "subproductName" },
  { title: "Departemen", align: "start", key: "departementName" },
];

const addDepartementForm = ref(null);
const addSuccessModal = ref(null);
const editDepartementForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

const openAddForm = () => {
  addDepartementForm.value.openDialog();
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewDepartement = async (newDiv) => {
  try {
    await departementService.createNewDiv(newDiv);
    fetchDataDepartement();
    openAddSuccessModal();
  } catch (error) {
    alert("tambah data departemen gagal!" + error);
  }
};

const openEditForm = (item) => {
  editDepartementForm.value.openDialog(item);
};

const openEditSuccessModal = () => {
  editSuccessModal.value.modalState();
};

const handleEditDepartement = async (editDiv) => {
  try {
    await departementService.updateDiv(editDiv);
    fetchDataDepartement();
    openEditSuccessModal();
  } catch (error) {
    alert("edit data departemen gagal!" + error);
  }
};

const openDeleteForm = (item) => {
  deleteConfirmModal.value.modalState(item.idDepartement);
};

const openDeleteSuccessModal = () => {
  deleteSuccessModal.value.modalState();
};

const handleDeleteDepartement = async (deleteDiv) => {
  try {
    await departementService.deleteDiv(deleteDiv);
    fetchDataDepartement();
    openDeleteSuccessModal();
  } catch (error) {
    alert("delete gagal!" + error);
  }
};

const fetchDataDepartement = async () => {
  try {
    const divisiData = await departementService.getAllDep();
    departement.value = divisiData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataDepartement);
</script>

<style scoped></style>
