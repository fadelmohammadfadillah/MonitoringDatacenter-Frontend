<template>
  <CustomDataTable
    :headers="headers"
    :items="departement"
    title="Manajemen Departemen"
    entity="Departemen"
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
import AddDepartementForm from "@/components/AddDepartementForm.vue";
import EditDepartementForm from "@/components/EditDepartementForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";

const departement = ref([
  {
    idDepartement: 1,
    departementName: "Sales & Business Development",
    divisiName: "Divisi Sales",
  },
  {
    idDepartement: 2,
    departementName: "Business Application Conventional",
    divisiName: "Divisi Business App",
  },
  {
    idDepartement: 3,
    departementName: "System Application Development Conventional",
    divisiName: "Divisi System App",
  },
  {
    idDepartement: 4,
    departementName: "Business Application Syariah",
    divisiName: "Divisi Business App Syariah",
  },
  {
    idDepartement: 5,
    departementName: "System Application Development Syariah",
    divisiName: "Divisi System App Syariah",
  },
  {
    idDepartement: 6,
    departementName: "Card & Digital Transaction",
    divisiName: "Divisi Card & Digital",
  },
  {
    idDepartement: 7,
    departementName: "Digital Channel",
    divisiName: "Divisi Digital",
  },
  {
    idDepartement: 8,
    departementName: "Data Warehouse & Management Information System",
    divisiName: "Divisi Data",
  },
  {
    idDepartement: 9,
    departementName: "Regulatory Report",
    divisiName: "Divisi Report",
  },
  {
    idDepartement: 10,
    departementName: "Financial Reporting",
    divisiName: "Divisi Financial",
  },
  {
    idDepartement: 11,
    departementName:
      "Quality Control, Quality Assurance, & Application Control Library",
    divisiName: "Divisi Quality",
  },
  {
    idDepartement: 12,
    departementName: "Data Center Operation",
    divisiName: "Divisi Data Center",
  },
  {
    idDepartement: 13,
    departementName: "Disaster Recovery Center Operation",
    divisiName: "Divisi Recovery",
  },
  {
    idDepartement: 14,
    departementName: "Digital Enterprise Operation",
    divisiName: "Divisi Enterprise",
  },
  {
    idDepartement: 15,
    departementName: "Security Operation Center",
    divisiName: "Divisi Security",
  },
  {
    idDepartement: 16,
    departementName: "Network Operation",
    divisiName: "Divisi Network",
  },
  {
    idDepartement: 17,
    departementName: "Infrastructure & Application Support Operation",
    divisiName: "Divisi Infrastructure",
  },
  {
    idDepartement: 18,
    departementName: "Procurement & Office Management",
    divisiName: "Divisi Procurement",
  },
  {
    idDepartement: 19,
    departementName: "Human Capital",
    divisiName: "Divisi Human Capital",
  },
  {
    idDepartement: 20,
    departementName: "Finance",
    divisiName: "Divisi Finance",
  },
  {
    idDepartement: 21,
    departementName: "Legal & Corporate Secretary",
    divisiName: "Divisi Legal",
  },
  {
    idDepartement: 22,
    departementName: "Internal Audit",
    divisiName: "Divisi Audit",
  },
  {
    idDepartement: 23,
    departementName: "Information Security & Risk Management",
    divisiName: "Divisi Risk Management",
  },
]);

const headers = [
  { title: "No", align: "start", key: "idDepartement" },
  { title: "Departemen", align: "start", key: "departementName" },
  { title: "Divisi", align: "start", key: "divisiName" },
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
