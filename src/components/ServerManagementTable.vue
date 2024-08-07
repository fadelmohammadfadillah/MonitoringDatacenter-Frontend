<template>
<CustomDataTable
    :headers="headers"
    :items="servers"
    title="Manajemen IP Address"
    entity="IP Address"
    :addEntity="openAddForm"
    :editEntity="openEditForm"
    :deleteEntity="openDeleteForm"
  />
  <AddServerForm
    ref="addServerForm"
    @add-new-server="handleAddNewServer"
  />

  <CustomSuccessModal
    message="IP Address Berhasil Ditambahkan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="addSuccessModal"
  />

  <EditServerForm
    ref="editServerForm"
    @edit-server="handleEditServer"
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
    @delete-divisi="handleDeleteServer"
  />

  <CustomSuccessModal
    message="IP Address berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="deleteSuccessModal"
  />
</template>

<script setup>
import serverService from '@/services/ServerService';
import EditServerForm from './EditServerForm.vue';
import AddServerForm from './AddServerForm.vue';

const servers = ref([]);

const headers = [
    { title: "No", align: "start", key: "index" },
    { title: "IP Address", align: "start", key: "ipAddress" },
    { title: "Tipe Server", align: "start", key: "serverType" },
];

const addServerForm = ref(null);
const addSuccessModal = ref(null);
const editServerForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

const openAddForm = () => {
  addServerForm.value.openDialog();
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewServer = async (newServer) => {
  try {
    await serverService.createNewServer(newServer);
    fetchDataServer();
    openAddSuccessModal();
  } catch (error) {
    alert("tambah data server gagal!" + error);
  }
};

const openEditForm = (item) => {
  editServerForm.value.openDialog(item);
};

const openEditSuccessModal = () => {
  editSuccessModal.value.modalState();
};

const handleEditServer = async (editServer) => {
  try {
    console.log(editServer);
    await serverService.updateServer(editServer);
    fetchDataServer();
    openEditSuccessModal();
  } catch (error) {
    alert("edit data subproduct gagal!" + error);
  }
};

const openDeleteForm = (item) => {
  deleteConfirmModal.value.modalState(item.idServer);
};

const openDeleteSuccessModal = () => {
  deleteSuccessModal.value.modalState();
};

const handleDeleteServer = async (deleteServer) => {
  try {
    console.log(deleteServer);
    await serverService.deleteServer(deleteServer);
    fetchDataServer();
    openDeleteSuccessModal();
  } catch (error) {
    alert("delete gagal!" + error);
  }
};

const fetchDataServer = async () => {
  try {
    const serverData = await serverService.getAllServer();
    servers.value = serverData.data.map((item, index) => ({
        ...item,
        index: index + 1,
    }));
    console.log(servers.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataServer);
</script>