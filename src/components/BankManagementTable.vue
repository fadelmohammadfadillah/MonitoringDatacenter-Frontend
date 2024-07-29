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
const bank = ref([
  //   { idBank: 1, bankName: "Bank Aceh" },
  //   { idBank: 2, bankName: "Bank IBKIndonesia" },
  //   { idBank: 3, bankName: "Bank Sulteng" },
  //   { idBank: 4, bankName: "Bank NTB" },
  //   { idBank: 5, bankName: "Bank Bengkulu" },
  //   { idBank: 6, bankName: "Bank Jambi" },
  //   { idBank: 7, bankName: "Bank Riau" },
  //   { idBank: 8, bankName: "Bank Sumut" },
  //   { idBank: 9, bankName: "Bank Sumbar" },
  //   { idBank: 10, bankName: "Bank Sumsel" },
  //   { idBank: 11, bankName: "Bank Lampung" },
  //   { idBank: 12, bankName: "Bank Banten" },
  //   { idBank: 13, bankName: "Bank Jabar" },
  //   { idBank: 14, bankName: "Bank DKI" },
  //   { idBank: 15, bankName: "Bank Jateng" },
  //   { idBank: 16, bankName: "Bank DIY" },
  //   { idBank: 17, bankName: "Bank Jatim" },
  //   { idBank: 18, bankName: "Bank Kalbar" },
  //   { idBank: 19, bankName: "Bank Kalteng" },
  //   { idBank: 20, bankName: "Bank Kaltim" },
  //   { idBank: 21, bankName: "Bank Kalut" },
  //   { idBank: 22, bankName: "Bank Sulbar" },
  //   { idBank: 23, bankName: "Bank Sulteng" },
  //   { idBank: 24, bankName: "Bank Sulsel" },
  //   { idBank: 25, bankName: "Bank Sultra" },
  //   { idBank: 26, bankName: "Bank Gorontalo" },
  //   { idBank: 27, bankName: "Bank Maluku" },
  //   { idBank: 28, bankName: "Bank Papua" },
  //   { idBank: 29, bankName: "Bank NTT" },
  //   { idBank: 30, bankName: "Bank Bali" },
  //   { idBank: 31, bankName: "Bank NTB Syariah" },
  //   { idBank: 32, bankName: "Bank Sumsel Babel" },
  //   { idBank: 33, bankName: "Bank BPD Bali" },
  //   { idBank: 34, bankName: "Bank Kalsel" },
  //   { idBank: 35, bankName: "Bank Kaltimtara" },
  //   { idBank: 36, bankName: "Bank SulutGo" },
  //   { idBank: 37, bankName: "Bank Aceh Syariah" },
  //   { idBank: 38, bankName: "Bank Nagari" },
  //   { idBank: 39, bankName: "Bank BRI" },
  //   { idBank: 40, bankName: "Bank BNI" },
  //   { idBank: 41, bankName: "Bank Mandiri" },
  //   { idBank: 42, bankName: "Bank BCA" },
  //   { idBank: 43, bankName: "Bank CIMB Niaga" },
  //   { idBank: 44, bankName: "Bank Danamon" },
  //   { idBank: 45, bankName: "Bank Permata" },
  //   { idBank: 46, bankName: "Bank Panin" },
  //   { idBank: 47, bankName: "Bank OCBC NISP" },
  //   { idBank: 48, bankName: "Bank HSBC" },
  //   { idBank: 49, bankName: "Bank Maybank" },
  //   { idBank: 50, bankName: "Bank Mega" },
]);

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
