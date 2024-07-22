<template>
  <CustomDataTable
    :headers="headers"
    :items="bank"
    title="Manajemen Bank"
    entity="Bank"
    :addEntity="openAddForm"
    :editEntity="openEditForm"
    :deleteEntity="openDeleteForm"
  />
  <AddBankForm ref="addBankForm" @add-new-bank="handleAddNewBank" />

  <CustomSuccessModal
    message="Data Bank Berhasil Ditambahkan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="addSuccessModal"
  />

  <EditBankForm ref="editBankForm" @edit-bank="handleEditBank" />
  <CustomSuccessModal
    message="Perubahan berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="editSuccessModal"
  />

  <CustomDeleteConfirmationModal
    ref="deleteConfirmModal"
    message="Yakin Ingin Menghapus?"
    imgSrc="/src/assets/confirmation-modal-img.svg"
    @delete-divisi="handleDeleteBank"
  />

  <CustomSuccessModal
    message="Bank berhasil dihapus!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="deleteSuccessModal"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import bankService from "@/services/BankService";
import CustomDataTable from "./CustomDataTable.vue";
import AddBankForm from "./AddBankForm.vue";
import EditBankForm from "@/components/EditBankForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";

const bank = ref([]);

const headers = [
  { title: "No", align: "start", key: "idBank" },
  { title: "Bank", align: "start", key: "bankName" },
];

const addBankForm = ref(null);
const addSuccessModal = ref(null);
const editBankForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

const openAddForm = () => {
  addBankForm.value.openDialog();
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewBank = async (newBank) => {
  try {
    await bankService.createNewBank(newBank);
    fetchDataBank();
    openAddSuccessModal();
  } catch (error) {
    alert("tambah data bank gagal!" + error);
  }
};

const openEditForm = (item) => {
  editBankForm.value.openDialog(item);
};

const openEditSuccessModal = () => {
  editSuccessModal.value.modalState();
};

const handleEditBank = async (editBank) => {
  try {
    await bankService.updateBank(editBank);
    fetchDataBank();
    openEditSuccessModal();
  } catch (error) {
    alert("edit data bank gagal!" + error);
  }
};

const openDeleteForm = (item) => {
  deleteConfirmModal.value.modalState(item.idBank);
};

const openDeleteSuccessModal = () => {
  deleteSuccessModal.value.modalState();
};

const handleDeleteBank = async (deleteBank) => {
  try {
    await bankService.deleteBank(deleteBank);
    fetchDataBank();
    openDeleteSuccessModal();
  } catch (error) {
    alert("delete gagal!" + error);
  }
};

const fetchDataBank = async () => {
  try {
    const bankData = await bankService.getAllBank();
    bank.value = bankData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataBank);
</script>

<style scoped></style>
