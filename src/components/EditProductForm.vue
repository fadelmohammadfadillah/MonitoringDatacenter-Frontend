<template>
  <v-dialog v-model="dialog" max-width="550px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Edit Produk</span>
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
            v-model="selectedDept"
            placeholder="contoh: Card Digital & Transaction"
            variant="outlined"
            :items="dataDept"
            item-text="title"
            item-value="value"
            required
          ></v-select>
          <div class="text-caption font-weight-regular">Nama Produk</div>
          <v-text-field
            v-model="productData.productName"
            placeholder="contoh: Mobile Banking"
            variant="outlined"
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

<style scoped></style>
