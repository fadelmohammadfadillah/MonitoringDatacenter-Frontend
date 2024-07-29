<template>
  <v-dialog v-model="dialog" max-width="550px">
    <v-card>
      <v-card-title
        class="d-flex align-center justify-space-between text-h5 ma-2"
      >
        <span>Tambah Sub Produk</span>
        <v-spacer></v-spacer>
        <v-divider vertical class=""></v-divider>

        <v-btn
          @click="closeDialog"
          prepend-icon="mdi-close"
          variant="plain"
          class=""
        >
          Close
        </v-btn>
      </v-card-title>
      <v-divider class="my-1"></v-divider>
      <v-card-text class="py-2">
        <div class="text-caption font-weight-regular">Nama Departemen</div>

        <v-form ref="form">
          <v-select
            placeholder="Silahkan Pilih"
            variant="outlined"
            :items="dataDept"
            item-text="title"
            item-value="value"
            v-model="selectedDept"
            required
          ></v-select>
          <div class="text-caption font-weight-regular">Nama Produk</div>

          <v-select
            placeholder="Silahkan Pilih"
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
            v-model="newSubproduct.subproductName"
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

const filteredProducts = computed(() => {
  // console.log(selectedDept.value);
  if (!selectedDept.value) return [];
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  selectedProduct.value = null;
  return dataProduct.value.filter(
    (product) => product.idDepartment === selectedDept.value
  );
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

<style scoped></style>
