<template>
  <CustomDataTable
    :headers="headers"
    :items="department"
    title="Manajemen Department"
    entity="Department"
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
    ref="editDepartmentForm"
    @edit-dept="handleEditDepartment"
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
    @delete-divisi="handleDeleteDepartment"
  />

  <CustomSuccessModal
    message="Divisi berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="deleteSuccessModal"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import departmentService from "@/services/DepartementService";
import divisiService from "@/services/DivisiService";
import CustomDataTable from "./CustomDataTable.vue";
import AddDepartementForm from "@/components/AddDepartementForm.vue";
import EditDepartementForm from "@/components/EditDepartementForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";

const department = ref([]);
const divisi = ref([]);

const headers = [
  { title: "No", align: "start", key: "idDepartment" },
  { title: "Department", align: "start", key: "departmentName" },
  { title: "Divisi", align: "start", key: "divisiName" },
];

const addDepartmentForm = ref(null);
const addSuccessModal = ref(null);
const editDepartmentForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

const formattedDivisiData = computed(() =>{
   return divisi.value.map(div => ({
    title: div.divisiName,
    value: div.idDivisi,
  }));
});

const openAddForm = () => {
  addDepartmentForm.value.openDialog(formattedDivisiData.value);
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewDepartment = async (newDept) => {
  try {
    await departmentService.createNewDept(newDept);
    fetchDataDepartment();
    openAddSuccessModal();
  } catch (error) {
    alert("tambah data department gagal!" + error);
  }
};

const openEditForm = (item) => {
  editDepartmentForm.value.openDialog(formattedDivisiData.value, item);
};

const openEditSuccessModal = () => {
  editSuccessModal.value.modalState();
};

const handleEditDepartment = async (editDept) => {
  try {
    await departmentService.updateDept(editDept);
    fetchDataDepartment();
    openEditSuccessModal();
  } catch (error) {
    alert("edit data department gagal!" + error);
  }
};

const openDeleteForm = (item) => {
  deleteConfirmModal.value.modalState(item.idDepartment);
};

const openDeleteSuccessModal = () => {
  deleteSuccessModal.value.modalState();
};

const handleDeleteDepartment = async (deleteDept) => {
  try {
    await departmentService.deleteDept(deleteDept);
    fetchDataDepartment();
    openDeleteSuccessModal();
  } catch (error) {
    alert("delete gagal!" + error);
  }
};

const fetchDataDepartment = async () => {
  try {
    const deptData = await departmentService.getAllDept();
    const divData = await divisiService.getAllDiv();
    department.value = deptData.data;
    divisi.value = divData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataDepartment);
</script>

<style scoped></style>
