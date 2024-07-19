<template>
  <CustomDataTable
    :headers="headers"
    :items="module"
    title="Manajemen Module"
    entity="Module"
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
import AddDivisiForm from "@/components/AddModuleForm.vue";
import EditDivisiForm from "@/components/EditModuleForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";

const module = ref([
  { idModule: 1, moduleName: "Nama Module", profileModule: "001" },
  { idModule: 2, moduleName: "mtask", profileModule: "001" },
  { idModule: 3, moduleName: "mcenter", profileModule: "001" },
  { idModule: 4, moduleName: "mcenterajs", profileModule: "001" },
  { idModule: 5, moduleName: "mcenterprima", profileModule: "001" },
  { idModule: 6, moduleName: "mcenterpayajs", profileModule: "001" },
  { idModule: 7, moduleName: "mcenterfinnet", profileModule: "001" },
  { idModule: 8, moduleName: "mcentermpng2", profileModule: "001" },
  { idModule: 9, moduleName: "mcentersms", profileModule: "001" },
  { idModule: 10, moduleName: "mcenterpemko", profileModule: "001" },
  { idModule: 11, moduleName: "mcenteruinarraniry", profileModule: "001" },
  { idModule: 12, moduleName: "mcentersamsat", profileModule: "001" },
  { idModule: 13, moduleName: "auth", profileModule: "001" },
  { idModule: 14, moduleName: "authajs", profileModule: "002" },
  { idModule: 15, moduleName: "authprima", profileModule: "003" },
  { idModule: 16, moduleName: "authfinnet", profileModule: "001" },
  { idModule: 17, moduleName: "authpayajs", profileModule: "001" },
  { idModule: 18, moduleName: "authsms", profileModule: "001" },
  { idModule: 19, moduleName: "authpemko", profileModule: "001" },
  { idModule: 20, moduleName: "authuinarraniry", profileModule: "001" },
  { idModule: 21, moduleName: "authsamsat", profileModule: "001" },
  { idModule: 22, moduleName: "safajs", profileModule: "001" },
  { idModule: 23, moduleName: "saf", profileModule: "001" },
  { idModule: 24, moduleName: "safprima", profileModule: "001" },
  { idModule: 25, moduleName: "saffinnet", profileModule: "001" },
  { idModule: 26, moduleName: "safpayajs", profileModule: "001" },
  { idModule: 27, moduleName: "smspush", profileModule: "001" },
  { idModule: 28, moduleName: "olibsdrv", profileModule: "001" },
  { idModule: 29, moduleName: "olibsajsdrv", profileModule: "001" },
  { idModule: 30, moduleName: "olibsprimadrv", profileModule: "001" },
  { idModule: 31, moduleName: "olibspayajsdrv", profileModule: "001" },
  { idModule: 32, moduleName: "olibssmsdrv", profileModule: "001" },
  { idModule: 33, moduleName: "olibssmsntfdrv", profileModule: "001" },
  { idModule: 34, moduleName: "olibsmpng2drv", profileModule: "001" },
  { idModule: 35, moduleName: "olibspemkodrv", profileModule: "001" },
  { idModule: 36, moduleName: "olibsuinarranirydrv", profileModule: "001" },
  { idModule: 37, moduleName: "olibssamsatdrv", profileModule: "001" },
  { idModule: 38, moduleName: "payajs8583", profileModule: "001" },
  { idModule: 39, moduleName: "finnet8583", profileModule: "001" },
  { idModule: 40, moduleName: "ajs8583", profileModule: "001" },
  { idModule: 41, moduleName: "prima8583", profileModule: "001" },
  { idModule: 42, moduleName: "pemko8583", profileModule: "001" },
  { idModule: 43, moduleName: "uinarraniry8583", profileModule: "001" },
  { idModule: 44, moduleName: "samsat8583", profileModule: "001" },
  { idModule: 45, moduleName: "hsmrep", profileModule: "001" },
  { idModule: 46, moduleName: "sms8583", profileModule: "001" },
  { idModule: 47, moduleName: "webolibscard", profileModule: "001" },
  { idModule: 48, moduleName: "mpng28583", profileModule: "001" },
  { idModule: 49, moduleName: "host8583", profileModule: "001" },
  { idModule: 50, moduleName: "TCP", profileModule: "AD001015" },
  { idModule: 51, moduleName: "NDC", profileModule: "AD001016" },
  { idModule: 52, moduleName: "TCP", profileModule: "AD001017" },
  { idModule: 53, moduleName: "TCP", profileModule: "AD001018" },
  { idModule: 54, moduleName: "NDC", profileModule: "AD001019" },
  { idModule: 55, moduleName: "TCP", profileModule: "AD001020" },
  { idModule: 56, moduleName: "TCP", profileModule: "AD001021" },
  { idModule: 57, moduleName: "NDC", profileModule: "AD001022" },
  { idModule: 58, moduleName: "TCP", profileModule: "AD001023" },
  { idModule: 59, moduleName: "TCP", profileModule: "AD001024" },
  { idModule: 60, moduleName: "NDC", profileModule: "AD001025" },
]);

const headers = [
  { title: "No", align: "start", key: "idModule" },
  { title: "Module", align: "start", key: "moduleName" },
  { title: "Profile", align: "start", key: "profileModule" },
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
    module.value = divisiData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataDivisi);
</script>

<style scoped></style>
