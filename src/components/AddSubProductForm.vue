<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Tambah Sub Produk</span>
        <v-divider vertical class="pl-16 ml-10"></v-divider>

        <v-btn
          @click="closeDialog"
          prepend-icon="mdi-close"
          variant="plain"
          class="pr-10"
        >
          Close
        </v-btn>
      </v-card-title>
      <v-divider class="my-2"></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-select
            label="Pilih Department"
            placeholder="Department yang tersedia"
            variant="outlined"
            :items="dataDept"
            item-text="title"
            item-value="value"
            v-model="selectedDept"
            @change="handleDepartmentChange"
            required
          ></v-select>
          <v-select
            label="Pilih Produk"
            placeholder="Produk yang tersedia"
            variant="outlined"
            :items="filteredProducts"
            item-text="title"
            item-value="value"
            v-model="selectedProduct"
            :disabled="!selectedDept"
            required
          ></v-select>
          <v-text-field
            v-model="newSubproduct.subproductName"
            label="Nama Sub Produk"
            placeholder="contoh: E-Monitoring"
            variant="outlined"
            :disabled="!selectedProduct"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="d-flex justify-center pb-6">
        <v-btn outlined @click="closeDialog" class="cancel-button px-16">
          Batalkan
        </v-btn>
        <v-btn
          outlined
          @click="submitForm"
          :disabled="!isFormValid"
          class="save-button px-16"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["addNewSubproduct"]);
const dialog = ref(false);
const newSubproduct = ref({
  idDepartment: 0,
  idProduct: 0,
  subproductName: "",
});

const dataDept = ref([{}]);
const dataProduct = ref([{}]);

const selectedDept = ref(null);
const selectedProduct = ref(null);

const openDialog = (dataDepartment, dataProd) => {
  dataDept.value = dataDepartment;
  dataProduct.value = dataProd;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return newSubproduct.value.subproductName;
});

const handleDepartmentChange = () => {
  selectedProduct.value = null;
}

const filteredProducts = computed(() => {
  // console.log(selectedDept.value);
  if(!selectedDept.value) return [];
  return dataProduct.value.filter(product => product.idDepartment === selectedDept.value);
});

const submitForm = () => {
  if (isFormValid.value) {
    newSubproduct.value.idDepartment = selectedDept.value;
    newSubproduct.value.idProduct = selectedProduct.value;
    // eslint-disable-next-line no-undef
    emit("addNewSubproduct", { ...newSubproduct.value });

    // Reset form
    selectedDept.value = null;
    selectedProduct.value = null;
    newSubproduct.value = {
      idDepartment: 0,
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

<style scoped>
.cancel-button {
  border: 1px solid orange;
  color: orange;
}
.save-button {
  background-color: #e0e0e0;
  color: gray;
}
</style>

<!-- <v-form ref="form">
          <v-select
            v-model="newDept.divisionId"
            :items="divisions"
            item-text="divisiName"
            item-value="idDivisi"
            label="Pilih Divisi"
            placeholder="Pilih Divisi"
            variant="outlined"
            required
          ></v-select>
          <v-text-field
            v-model="newDept.departmentName"
            label="Nama Departemen"
            placeholder="contoh: Pengembangan"
            variant="outlined"
            required
          ></v-text-field>
        </v-form> -->
