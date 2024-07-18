<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Tambah Divisi</span>
        <v-divider vertical class="pl-16 ml-16"></v-divider>

        <v-btn
          @click="closeDialog"
          prepend-icon="mdi-close"
          variant="plain"
          class="pr-11"
        >
          close
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            class="pt-7"
            v-model="newDiv.divisiName"
            label="Nama Divisi"
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
const emit = defineEmits(["addNewDivisi"]);
const dialog = ref(false);
const newDiv = ref({
  divisiName: "",
});

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return newDiv.value.divisiName.trim() !== "";
});

const submitForm = () => {
  if (isFormValid.value) {
    emit("addNewDivisi", { ...newDiv.value });

    // Reset form
    newDiv.value = {
      divisiName: "",
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
