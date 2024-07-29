<template>
  <CustomDataTable
    :headers="headers"
    :items="subproduct"
    title="Manajemen Sub Produk"
    entity="Sub Produk"
    :addEntity="openAddForm"
    :editEntity="openEditForm"
    :deleteEntity="openDeleteForm"
  />
  <AddSubProductForm
    ref="addSubproductForm"
    @add-new-subproduct="handleAddNewSubproduct"
  />

  <CustomSuccessModal
    message="Departemen Berhasil Ditambahkan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="addSuccessModal"
  />

  <EditSubProductForm
    ref="editSubproductForm"
    @edit-subproduct="handleEditSubproduct"
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
    @delete-divisi="handleDeleteSubproduct"
  />

  <CustomSuccessModal
    message="Subproduct berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="deleteSuccessModal"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import departementService from "@/services/DepartementService";
import productService from "@/services/ProductService";
import subproductService from "@/services/SubproductService";
import CustomDataTable from "./CustomDataTable.vue";
import AddSubProductForm from "@/components/AddSubProductForm.vue";
import EditSubProductForm from "@/components/EditSubProductForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";


const subproduct = ref([]);
const product = ref([]);
const department = ref([]);

const headers = [
  { title: "No", align: "start", key: "idSubproduct" },
  { title: "Departemen", align: "start", key: "departmentName" },
  { title: "Produk", align: "start", key: "productName" },
  { title: "Sub Produk", align: "start", key: "subproductName" },
];

const addSubproductForm = ref(null);
const addSuccessModal = ref(null);
const editSubproductForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

// eslint-disable-next-line no-undef
const formattedDeptData = computed(() =>{
   return department.value.map(dept => ({
    title: dept.departmentName,
    value: dept.idDepartment,
  }));
});

// eslint-disable-next-line no-undef
const formattedProductData = computed(() =>{
   return product.value.map(prod => ({
    title: prod.productName,
    value: prod.idProduct,
    idDepartment: prod.idDepartment,
  }));
});

const openAddForm = () => {
  addSubproductForm.value.openDialog(formattedDeptData.value, formattedProductData.value);
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewSubproduct = async (newSubproduct) => {
  try {
    await subproductService.createNewSubproduct(newSubproduct);
    fetchDataSubproduct();
    openAddSuccessModal();
  } catch (error) {
    alert("tambah data subproduct gagal!" + error);
  }
};

const openEditForm = (item) => {
  editSubproductForm.value.openDialog(item, formattedDeptData.value, formattedProductData.value);
};

const openEditSuccessModal = () => {
  editSuccessModal.value.modalState();
};

const handleEditSubproduct = async (editSubprod) => {
  try {
    await subproductService.updateSubproduct(editSubprod);
    fetchDataSubproduct();
    openEditSuccessModal();
  } catch (error) {
    alert("edit data subproduct gagal!" + error);
  }
};

const openDeleteForm = (item) => {
  deleteConfirmModal.value.modalState(item.idSubproduct);
};

const openDeleteSuccessModal = () => {
  deleteSuccessModal.value.modalState();
};

const handleDeleteSubproduct = async (deleteSubprod) => {
  try {
    await subproductService.deleteSubproduct(deleteSubprod);
    fetchDataSubproduct();
    openDeleteSuccessModal();
  } catch (error) {
    alert("delete gagal!" + error);
  }
};

const fetchDataSubproduct = async () => {
  try {
    const subproductData = await subproductService.getAllSubproduct();
    const productData = await productService.getAllProduct();
    const departmentData = await departementService.getAllDept();
    // console.log(subproductData);
    // console.log(productData.data);
    // console.log(departmentData);
    subproduct.value = subproductData.data;
    product.value = productData.data;
    department.value = departmentData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataSubproduct);
</script>

<style scoped></style>
