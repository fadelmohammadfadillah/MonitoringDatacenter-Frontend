<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Tambah Produk</span>
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
            label="Pilih Departemen"
            :items="departements"
            placeholder="Departemen yang tersedia"
            variant="outlined"
          ></v-select>
          <v-text-field
            v-model="newProduct.productName"
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

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["addNewProduct"]);
const dialog = ref(false);
const newProduct = ref({
  productName: "",
});

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return newProduct.value.productName;
});

const submitForm = () => {
  if (isFormValid.value) {
    // eslint-disable-next-line no-undef
    emit("addNewProduct", { ...newProduct.value });

    // Reset form
    newProduct.value = {
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
