<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Edit Produk</span>
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
        <v-form ref="form">
          <v-select
            v-model="selectedDept"
            label="Nama Department"
            placeholder="contoh: Digital Enterprise"
            variant="outlined"
            :items="dataDept"
            item-text="title"
            item-value="value"
            required
          ></v-select>

          <v-text-field
            v-model="productData.productName"
            label="Nama Produk"
            placeholder="contoh: Mobile Banking"
            variant="outlined"
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

const emit = defineEmits(["editProduct"]);
const dialog = ref(false);
const productData = ref({
  idProduct: 0,
  idDepartment: 0,
  productName: "",
});

const dataDept = ref([{}]);
const selectedDept = ref(null);

const openDialog = (item, dataDepartment) => {
  productData.value.idProduct = item.idProduct;
  productData.value.productName = item.productName;
  selectedDept.value = item.idDepartment;
  dataDept.value = dataDepartment;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return productData.value.productName;
});

const submitForm = () => {
  if (isFormValid.value) {
    productData.value.idDepartment = selectedDept.value;
    // eslint-disable-next-line no-undef
    emit("editProduct", { ...productData.value });

    // Reset form
    selectedDept.value = null;
    productData.value = {
      idProduct: 0,
      idDepartment: 0,
      productName: "",
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
