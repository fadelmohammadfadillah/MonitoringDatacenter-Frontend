<template>
  <CustomDataTable
    :headers="headers"
    :items="department"
    title="Manajemen Department"
    entity="Departement"
    :addEntity="openAddForm"
    :editEntity="openEditForm"
    :deleteEntity="openDeleteForm"
  />
  <AddDepartementForm
    ref="addDepartmentForm"
    @add-new-department="handleAddNewDepartment"
  />

  <CustomSuccessModal
    message="Departemen Berhasil Ditambahkan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="addSuccessModal"
  />

  <EditDepartementForm
    ref="editDepartementForm"
    @edit-dept="handleEditDepartement"
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
import AddDepartementForm from "@/components/AddDepartementForm.vue";
import EditDepartementForm from "@/components/EditDepartementForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";

const department = ref([]);

const headers = [
  { title: "No", align: "start", key: "idDepartment" },
  { title: "Department", align: "start", key: "departmentName" },
  { title: "Divisi", align: "start", key: "divisiName" },
];

const addDepartmentForm = ref(null);
const addSuccessModal = ref(null);
const editDepartementForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

const formattedDivisiData = computed(() =>{
   return department.value.map(dept => ({
    title: dept.divisiName,
    value: dept.idDivisi,
  }));
});

const openAddForm = () => {
  console.log(formattedDivisiData.value);
  addDepartmentForm.value.openDialog(formattedDivisiData.value);
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewDepartment = async (newDept) => {
  try {
    await departementService.createNewDept(newDept);
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
    const deptData = await departementService.getAllDept();
    console.log(deptData);
    department.value = deptData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataDepartement);
</script>

<style scoped></style>
