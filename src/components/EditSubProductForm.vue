<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Edit Sub Produk</span>
        <v-divider vertical class="pl-16 ml-16"></v-divider>

        <v-btn
          @click="closeDialog"
          prepend-icon="mdi-close"
          variant="plain"
          class="pr-11"
        >
          Close
        </v-btn>
      </v-card-title>
      <v-divider class="my-2"></v-divider>
      <v-card-text>
        <div class="text-caption font-weight-regular">Nama Departemen</div>
        <v-form ref="form">
          <v-select
            v-model="selectedDept"
            placeholder="contoh: Digital Enterprise"
            variant="outlined"
            :items="dataDepartment"
            item-text="title"
            item-value="value"
            @change="handleDepartmentChange"
            required
          ></v-select>

          <div class="text-caption font-weight-regular">Nama Produk</div>
          <v-select
            placeholder="Produk yang tersedia"
            variant="outlined"
            :items="filteredProducts"
            item-text="title"
            item-value="value"
            v-model="selectedProduct"
            :disabled="!selectedDept"
            required
          ></v-select>

          <div class="text-caption font-weight-regular">Nama Sub Produk</div>
          <v-text-field
            v-model="subproductData.subproductName"
            placeholder="contoh: E-Monitoring"
            variant="outlined"
            :disabled="!selectedProduct"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-row class="px-4 pb-4">
        <v-col>
          <v-btn block variant="outlined" color="orange" @click="closeDialog">
            Batalkan
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            block
            variant="flat"
            :color="!isFormValid ? 'grey' : 'orange'"
            @click="submitForm"
            :disabled="!isFormValid"
            class="text-white"
          >
            Simpan
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["editSubproduct"]);
const dialog = ref(false);
const subproductData = ref({
  idSubproduct: 0,
  idProduct: 0,
  subproductName: "",
});

const dataDepartment = ref([{}]);
const dataProduct = ref([{}]);
const selectedDept = ref(null);
const selectedProduct = ref(null);

const openDialog = (item, dataDept, dataProd) => {
  subproductData.value.idProduct = item.idProduct;
  subproductData.value.subproductName = item.subproductName;
  subproductData.value.idSubproduct = item.idSubproduct;
  selectedProduct.value = item.idProduct;
  selectedDept.value = item.idDepartment;

  dataDepartment.value = dataDept;
  dataProduct.value = dataProd;

  dialog.value = true;
};

const handleDepartmentChange = () => {
  selectedProduct.value = null;
};

const filteredProducts = computed(() => {
  if (!selectedDept.value) return [];
  return dataProduct.value.filter(
    (product) => product.idDepartment === selectedDept.value
  );
});

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return subproductData.value.subproductName;
});

const submitForm = () => {
  if (isFormValid.value) {
    subproductData.value.idProduct = selectedProduct;
    // eslint-disable-next-line no-undef
    emit("editSubproduct", { ...subproductData.value });

    // Reset form
    selectedDept.value = null;
    selectedProduct.value = null;
    subproductData.value = {
      idSubproduct: 0,
      idProduct: 0,
      subproductName: "",
    };
    closeDialog();
  }
};

defineExpose({
  openDialog,
});
</script>

<style scoped></style>
