<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Tambah Module</span>
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
            label="Pilih Sub Produk"
            placeholder="Sub Produk yang tersedia"
            variant="outlined"
            :items="dataSubprod"
            item-text="title"
            item-value="value"
            v-model="selectedSubprod"
            required
          ></v-select>
          <v-text-field
            v-model="newModule.moduleName"
            label="Nama Module"
            placeholder="contoh: authfinnet"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="newModule.profile"
            label="Nama Profile"
            placeholder="contoh: 001"
            variant="outlined"
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
          :disabled="!isFormValid && !selectedSubprod"
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
const emit = defineEmits(["addNewModule"]);
const dialog = ref(false);
const newModule = ref({
  idSubproduct: 0,
  moduleName: "",
  profile: "",
});

const dataSubprod = ref([{}]);
const selectedSubprod = ref(null);

const openDialog = (dataSubproduct) => {
  dataSubprod.value = dataSubproduct;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return newModule.value.moduleName;
});

const submitForm = () => {
  if (isFormValid.value) {
    newModule.value.idSubproduct = selectedSubprod;
    // eslint-disable-next-line no-undef
    emit("addNewModule", { ...newModule.value });

    // Reset form
    selectedSubprod.value = null;
    newModule.value = {
      idSubproduct: 0,
      moduleName:"",
      profile: "",
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
