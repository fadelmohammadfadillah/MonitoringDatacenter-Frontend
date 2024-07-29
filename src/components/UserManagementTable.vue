<template>
  <CustomDataTable
    :headers="headers"
    :items="user"
    title="Manajemen Pengguna"
    entity="Pengguna"
    :addEntity="openAddForm"
    :editEntity="openEditForm"
    :deleteEntity="openDeleteForm"
  />
  <AddUserForm
    ref="addUserForm"
    @add-new-user="handleAddNewUser"
  />

  <CustomSuccessModal
    message="User Berhasil Ditambahkan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="addSuccessModal"
  />

  <EditUserForm
    ref="editUserForm"
    @edit-user="handleEditUser"
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
    @delete-divisi="handleDeleteUser"
  />

  <CustomSuccessModal
    message="User berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="deleteSuccessModal"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import userService from "@/services/userService";
import departmentService from "@/services/DepartementService";
import divisiService from "@/services/DivisiService";
import CustomDataTable from "./CustomDataTable.vue";
import AddUserForm from "./AddUserForm.vue";
import EditUserForm from "./EditUserForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";
import role from "@/config/role";

const department = ref([]);
const divisi = ref([]);
const user = ref([]);

const headers = [
  { title: "No", align: "start", key: "index" },
  { title: "Nama", align: "start", key: "name" },
  { title: "Role", align: "start", key: "role" },
  { title: "Department", align: "start", key: "departmentName" },
  { title: "Divisi", align: "start", key: "divisiName" },
  { title: "Username", align: "start", key: "username" },
];

const addUserForm = ref(null);
const addSuccessModal = ref(null);
const editUserForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

const formattedDivisiData = computed(() =>{
   return divisi.value.map(div => ({
    title: div.divisiName,
    value: div.idDivisi,
  }));
});

const formattedDeptData = computed(() =>{
   return department.value.map(dept => ({
    title: dept.departmentName,
    value: dept.idDepartment,
    idDivisi: dept.idDivisi,
  }));
});

const openAddForm = () => {
  addUserForm.value.openDialog(formattedDivisiData.value, formattedDeptData.value);
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewUser = async (newUser) => {
  try {
    await userService.createNewUser(newUser);
    fetchDataUser();
    openAddSuccessModal();
  } catch (error) {
    alert("tambah data user gagal!" + error);
  }
};

const openEditForm = (item) => {
  editUserForm.value.openDialog(item, formattedDivisiData.value, formattedDeptData.value);
};

const openEditSuccessModal = () => {
  editSuccessModal.value.modalState();
};

const handleEditUser = async (editUser) => {
  try {
    await userService.updateUser(editUser);
    fetchDataUser();
    openEditSuccessModal();
  } catch (error) {
    alert("edit data user gagal!" + error);
  }
};
const roleToDelete = ref(null);
const openDeleteForm = (item) => {
  console.log(item);
  if(item.role == role[0] || item.role == role[1]){
    roleToDelete.value = item.role;
    deleteConfirmModal.value.modalState(item.idPO);
  }else if(item.role == role[2]){
    roleToDelete.value = item.role;
    deleteConfirmModal.value.modalState(item.idSupervisor);
  }else if(item.role == role[3]){
    roleToDelete.value = item.role;
    deleteConfirmModal.value.modalState(item.idOperator);
  }else{
    alert("invalid user role!");
  }
};

const openDeleteSuccessModal = () => {
  deleteSuccessModal.value.modalState();
};

const handleDeleteUser = async (deleteUser) => {
  try {
    if(roleToDelete.value == role[0] || roleToDelete.value == role[1]){
      await userService.deleteUserProductOwner(deleteUser);
    }else if(roleToDelete.value == role[2]){
      await userService.deleteUserSupervisor(deleteUser);
    }else if(roleToDelete.value == role[3]){
      await userService.deleteUserOperator(deleteUser);
    }
    fetchDataUser();
    openDeleteSuccessModal();
  } catch (error) {
    alert("delete gagal!" + error);
  }
};

const fetchDataUser = async () => {
  try {
    const userData = await userService.getAllUsers();
    const deptData = await departmentService.getAllDept();
    const divData = await divisiService.getAllDiv();
    user.value = userData.data.map((item, index) => ({
      ...item,
      index: index + 1,
      departmentName: item.departmentName || "All Div. " + item.divisiName
    }));
    console.log(user.value);
    department.value = deptData.data;
    divisi.value = divData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataUser);
</script>

<style scoped></style>
