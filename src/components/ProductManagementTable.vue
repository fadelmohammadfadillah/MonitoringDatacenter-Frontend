<template>
  <CustomDataTable
    :headers="headers"
    :items="product"
    title="Manajemen Produk"
    entity="Produk"
    :addEntity="openAddForm"
    :editEntity="openEditForm"
    :deleteEntity="openDeleteForm"
  />
  <AddProductForm ref="addProductForm" @add-new-product="handleAddNewProduct" />

  <CustomSuccessModal
    message="Produk Berhasil Ditambahkan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="addSuccessModal"
  />

  <EditProductForm ref="editProductForm" @edit-product="handleEditProduct" />
  <CustomSuccessModal
    message="Perubahan berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="editSuccessModal"
  />

  <CustomDeleteConfirmationModal
    ref="deleteConfirmModal"
    message="Yakin Ingin Menghapus?"
    imgSrc="/src/assets/confirmation-modal-img.svg"
    @delete-product="handleDeleteProduct"
  />

  <CustomSuccessModal
    message="Product berhasil disimpan!"
    imgSrc="/src/assets/success-modal-img.svg"
    ref="deleteSuccessModal"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import productService from "@/services/ProductService";
import CustomDataTable from "./CustomDataTable.vue";
import AddProductForm from "@/components/AddProductForm.vue";
import EditProductForm from "@/components/EditProductForm.vue";
import CustomSuccessModal from "@/components/CustomSuccessModal.vue";
import CustomDeleteConfirmationModal from "@/components/CustomDeleteConfirmationModal.vue";

const product = ref([
  {
    idProduct: 1,
    productName: "Switching",
    departementName: "Card & Digital Transactions",
  },
  {
    idProduct: 2,
    productName: "Middleware",
    departementName: "Card & Digital Transactions",
  },
]);

const headers = [
  { title: "No", align: "start", key: "idProduct" },
  { title: "Produk", align: "start", key: "productName" },
  { title: "Departemen", align: "start", key: "departementName" },
];

const addProductForm = ref(null);
const addSuccessModal = ref(null);
const editProductForm = ref(null);
const editSuccessModal = ref(null);
const deleteConfirmModal = ref(null);
const deleteSuccessModal = ref(null);

const openAddForm = () => {
  addProductForm.value.openDialog();
};

const openAddSuccessModal = () => {
  addSuccessModal.value.modalState();
};

const handleAddNewProduct = async (newProduct) => {
  try {
    await productService.createNewProduct(newProduct);
    fetchDataProduct();
    openAddSuccessModal();
  } catch (error) {
    alert("tambah data produk gagal!" + error);
  }
};

const openEditForm = (item) => {
  editProductForm.value.openDialog(item);
};

const openEditSuccessModal = () => {
  editSuccessModal.value.modalState();
};

const handleEditProduct = async (productData) => {
  try {
    await productService.updateProduct(productData);
    fetchDataProduct();
    openEditSuccessModal();
  } catch (error) {
    alert("edit data produk gagal!" + error);
  }
};

const openDeleteForm = (item) => {
  deleteConfirmModal.value.modalState(item.idProduct);
};

const openDeleteSuccessModal = () => {
  deleteSuccessModal.value.modalState();
};

const handleDeleteProduct = async (deleteProduct) => {
  try {
    await productService.deleteProduct(deleteProduct);
    fetchDataProduct();
    openDeleteSuccessModal();
  } catch (error) {
    alert("delete gagal!" + error);
  }
};

const fetchDataProduct = async () => {
  try {
    const productData = await productService.getAllProduct();
    product.value = productData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchDataProduct);
</script>

<style scoped></style>
