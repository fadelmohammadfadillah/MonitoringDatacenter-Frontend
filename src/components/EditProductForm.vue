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
            v-model="productData.departementName"
            :items="departements"
            label="Nama Departemen"
            placeholder="contoh: Digital Enterprise"
            variant="outlined"
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

const departements = ["Card & Digital Transaction", "Data Center Operation"];

const emit = defineEmits(["editProduct"]);
const dialog = ref(false);
const productData = ref({
  idProduct: "",
  departementName: "",
  productName: "",
});

const openDialog = (item) => {
  productData.value.idProduct = item.idProduct;
  productData.value.departementName = item.departementName;
  productData.value.productName = item.productName;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return productData.value.departementName;
});

const submitForm = () => {
  if (isFormValid.value) {
    // eslint-disable-next-line no-undef
    emit("editProduct", { ...productData.value });

    // Reset form
    productData.value = {
      departementName: "",
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
