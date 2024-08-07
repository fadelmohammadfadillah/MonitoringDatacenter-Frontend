<template>
    <CustomDataTable
        :headers="headers"
        :items="serverConfigs"
        title="Konfigurasi Server"
        entity="Konfigurasi"
        :addEntity="openAddForm"
        :editEntity="openEditForm"
        :deleteEntity="openDeleteForm"
      />
      <AddServerConfigForm
        ref="addServerConfigForm"
        @add-new-server-config="handleAddNewServerConfig"
      />
    
      <CustomSuccessModal
        message="Konfigurasi Berhasil Ditambahkan!"
        imgSrc="/src/assets/success-modal-img.svg"
        ref="addSuccessModal"
      />
    
      <EditServerConfigForm
        ref="editServerConfigForm"
        @edit-server-config="handleEditServerConfig"
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
        @delete-divisi="handleDeleteServerConfig"
      />
    
      <CustomSuccessModal
        message="Konfigurasi berhasil disimpan!"
        imgSrc="/src/assets/success-modal-img.svg"
        ref="deleteSuccessModal"
      />
    </template>
    
<script setup>
import serverService from '@/services/ServerService';
import AddServerConfigForm from './AddServerConfigForm.vue';
import subproductService from '@/services/SubproductService';

const serverConfigs = ref([]);
const servers = ref([]);
const subproducts = ref([]);

const headers = [
    { title: "No", align: "start", key: "index" },
    { title: "IP Address", align: "start", key: "ipAddress" },
    { title: "Tipe Server", align: "start", key: "serverType" },
    { title: "Port", align: "start", key: "port" },
    { title: "Sub Produk", align: "start", key: "subproductName" },
];

const addServerConfigForm = ref(null);
const addSuccessModal = ref(null);
const editServerConfigForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

const formattedSubprodData = computed(() =>{
   return subproducts.value.map(subprod => ({
    title: subprod.subproductName,
    value: subprod.idSubproduct,
  }));
});

const formattedServerData = computed(() => {
    return servers.value.map(server => ({
        title: server.ipAddress,
        value: server.idServer,
        serverType: server.serverType
    }));
  });

const openAddForm = () => {
  addServerConfigForm.value.openDialog(formattedServerData.value, formattedSubprodData.value);
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewServerConfig = async (newServer) => {
    try {
      await serverService.createNewServerConfig(newServer);
      fetchDataServerConfig();
      openAddSuccessModal();
    } catch (error) {
      alert("tambah data server gagal!" + error);
    }
};

const openEditForm = (item) => {
  console.log(item)
    editServerConfigForm.value.openDialog(item, formattedServerData.value, formattedSubprodData.value);
};

const openEditSuccessModal = () => {
    editSuccessModal.value.modalState();
};

const handleEditServerConfig = async (editServerConfig) => {
    try {
    console.log(editServerConfig);
    await serverService.updateServerConfig(editServerConfig);
    fetchDataServerConfig();
    openEditSuccessModal();
    } catch (error) {
    alert("edit data subproduct gagal!" + error);
    }
};

const openDeleteForm = (item) => {
    deleteConfirmModal.value.modalState(item.idServerConfig);
};

const openDeleteSuccessModal = () => {
    deleteSuccessModal.value.modalState();
};

const handleDeleteServerConfig = async (deleteServerConfig) => {
    try {
    console.log(deleteServerConfig);
    await serverService.deleteServerConfig(deleteServerConfig);
    fetchDataServerConfig();
    openDeleteSuccessModal();
    } catch (error) {
    alert("delete gagal!" + error);
    }
};

const fetchDataServerConfig = async () => {
    try {
    const serverConfigData = await serverService.getAllServerConfig();
    serverConfigs.value = serverConfigData.data.map((item, index) => ({
        ...item,
        index: index + 1,
    }));
    const serverData = await serverService.getAllServer();
    servers.value = serverData.data;
    const subproductData = await subproductService.getAllSubproduct();
    subproducts.value = subproductData.data;
    console.log(subproducts.value);
    } catch (error) {
    console.log(error);
    }
};

onMounted(fetchDataServerConfig);
</script>