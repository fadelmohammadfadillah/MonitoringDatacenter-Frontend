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
  <AddModuleForm ref="addModuleForm" @add-new-module="handleAddNewModule" />

  <CustomSuccessModal
    message="Divisi Berhasil Ditambahkan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="addSuccessModal"
  />

  <EditModuleForm ref="editModuleForm" @edit-module="handleEditModule" />
  <CustomSuccessModal
    message="Perubahan berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="editSuccessModal"
  />

  <CustomDeleteConfirmationModal
    ref="deleteConfirmModal"
    message="Yakin Ingin Menghapus?"
    imgSrc="/src/assets/confirmation-modal-img.svg"
    @delete-divisi="handleDeleteModule"
  />

  <CustomSuccessModal
    message="Module berhasil dihapus!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="deleteSuccessModal"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import moduleService from "@/services/ModuleService";
import subproductService from "@/services/SubproductService";
import CustomDataTable from "./CustomDataTable.vue";
import AddModuleForm from "@/components/AddModuleForm.vue";
import EditModuleForm from "@/components/EditModuleForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";

const module = ref([]);
const subproduct = ref([]);

const headers = [
  { title: "No", align: "start", key: "idModule" },
  { title: "Sub Produk", align: "start", key: "subproductName" },
  { title: "Module", align: "start", key: "moduleName" },
  { title: "Profile", align: "start", key: "profile" },
];

const addModuleForm = ref(null);
const addSuccessModal = ref(null);
const editModuleForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

const formattedSubprodData = computed(() =>{
   return subproduct.value.map(subprod => ({
    title: subprod.subproductName,
    value: subprod.idSubproduct,
  }));
});

const openAddForm = () => {
  addModuleForm.value.openDialog(formattedSubprodData.value);
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewModule = async (newModule) => {
  try {
    await moduleService.createNewModule(newModule);
    fetchDataModule();
    openAddSuccessModal();
  } catch (error) {
    alert("tambah data divisi gagal!" + error);
  }
};

const openEditForm = (item) => {
  editModuleForm.value.openDialog(item, formattedSubprodData.value);
};

const openEditSuccessModal = () => {
  editSuccessModal.value.modalState();
};

const handleEditModule = async (editModule) => {
  try {
    await moduleService.updateModule(editModule);
    fetchDataModule();
    openEditSuccessModal();
  } catch (error) {
    alert("edit data divisi gagal!" + error);
  }
};

const openDeleteForm = (item) => {
  deleteConfirmModal.value.modalState(item.idModule);
};

const openDeleteSuccessModal = () => {
  deleteSuccessModal.value.modalState();
};

const handleDeleteModule = async (deleteModule) => {
  try {
    await moduleService.deleteModule(deleteModule);
    fetchDataModule();
    openDeleteSuccessModal();
  } catch (error) {
    alert("delete gagal!" + error);
  }
};

const fetchDataModule = async () => {
  try {
    const moduleData = await moduleService.getAllModule();
    const subproductData = await subproductService.getAllSubproduct();
    module.value = moduleData.data;
    subproduct.value = subproductData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataModule);
</script>

<style scoped></style>
