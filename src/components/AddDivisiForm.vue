<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h6">
        Tambah Divisi
        <v-spacer></v-spacer>

        <v-btn prepend-icon="mdi-close" @click="closeDialog"> Close </v-btn>
      </v-card-title>
      <v-divider class="my-2"></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="newDiv.divisiName"
            label="Nama Divisi"
            placeholder="contoh: Digital Enterprise"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="closeDialog" color="orange"> Batalkan </v-btn>
        <v-btn text @click="submitForm" :disabled="!isFormValid">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['addNewDivisi'])
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
  return newDiv.value.divisiName;
});

const submitForm = () => {
  if (isFormValid.value) {
    // eslint-disable-next-line no-undef
    emit("addNewDiv", { ...newDiv.value });

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
