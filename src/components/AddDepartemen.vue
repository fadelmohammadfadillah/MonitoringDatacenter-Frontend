<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">
        Tambah Departemen
        <v-spacer></v-spacer>

        <v-btn prepend-icon="mdi-close" @click="closeDialog"> Close </v-btn>
      </v-card-title>
      <v-divider class="my-2"></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-select
            v-model="newUser.divisi"
            :items="divisis"
            label="Divisi"
            placeholder="Silahkan Pilih"
            required
          ></v-select>
          <v-text-field
            v-model="newUser.departemen"
            label="Nama Departemen"
            placeholder="contoh: Card & Digital Transaction"
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
import { ref, computed } from "vue";
// eslint-disable-next-line no-unused-vars

const divisis = ["Digital Enterprise", "Infrastructure"];

const dialog = ref(false);
const newUser = ref({
  departemen: "",

  divisi: "",
});

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return newUser.value.nama && newUser.value.divisi;
});

const submitForm = () => {
  if (isFormValid.value) {
    // eslint-disable-next-line no-undef
    emit("add-user", { ...newUser.value });

    // Reset form
    newUser.value = {
      departemen: "",
      divisi: "",
    };
    closeDialog();
  }
};

defineExpose({
  openDialog,
});
</script>
