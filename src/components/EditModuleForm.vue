<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Edit Module</span>
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
            v-model="moduleData.moduleName"
            label="Nama Module"
            placeholder="contoh: authfinnet"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="moduleData.profile"
            label="Nama Profile"
            placeholder="contoh: 001"
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

const emit = defineEmits(["editModule"]);
const dialog = ref(false);
const moduleData = ref({
  idSubproduct: 0,
  idModule: 0,
  moduleName: "",
  profile: "",
});

const dataSubprod = ref([{}]);
const selectedSubprod = ref(null);

const openDialog = (item, dataSubproduct) => {
  dataSubprod.value = dataSubproduct;
  selectedSubprod.value = item.idSubproduct;
  moduleData.value.moduleName = item.moduleName;
  moduleData.value.profile = item.profile;
  moduleData.value.idSubproduct = item.idSubproduct;
  moduleData.value.idModule = item.idModule;

  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return moduleData.value.moduleName;
});

const submitForm = () => {
  if (isFormValid.value) {
    console.log(selectedSubprod.value);
    moduleData.value.idSubproduct = selectedSubprod.value;
    // eslint-disable-next-line no-undef
    emit("editModule", { ...moduleData.value });

    // Reset form
    selectedSubprod.value = null;
    moduleData.value = {
      idSubproduct: 0,
      idModule:0,
      moduleName: "",
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
