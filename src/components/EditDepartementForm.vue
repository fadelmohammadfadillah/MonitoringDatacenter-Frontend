<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Edit Departemen</span>
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
            v-model="divData.divisiName"
            label="Pilih Divisi"
            placeholder="Divisi yang tersedia"
            variant="outlined"
          ></v-select>

          <v-text-field
            v-model="divData.departementName"
            label="Nama Departemen"
            placeholder="contoh: Digital Enterprise"
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

const emit = defineEmits(["editDiv"]);
const dialog = ref(false);
const divData = ref({
  idDivisi: "",
  departementName: "",
  divisiName: "",
});

const openDialog = (item) => {
  divData.value.idDivisi = item.idDivisi;
  divData.value.divisiName = item.divisiName;
  divData.value.departementName = item.departementName;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return divData.value.departementName;
});

const submitForm = () => {
  if (isFormValid.value) {
    // eslint-disable-next-line no-undef
    emit("editDiv", { ...divData.value });

    // Reset form
    divData.value = {
      divisiName: "",
      departementName: "",
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
