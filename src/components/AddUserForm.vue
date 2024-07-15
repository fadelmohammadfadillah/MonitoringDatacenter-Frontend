<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">
        Tambah Pengguna
        <v-spacer></v-spacer>

        <v-btn prepend-icon="mdi-close" @click="closeDialog"> Close </v-btn>
      </v-card-title>
      <v-divider class="my-1"></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="newUser.nama"
            label="Nama Lengkap"
            placeholder="contoh: Divisi"
            required
          ></v-text-field>

          <v-text-field
            v-model="newUser.email"
            label="Email"
            placeholder="contoh: aurorapuspa07@gmail.com"
            required
          ></v-text-field>

          <v-select
            v-model="newUser.role"
            :items="roles"
            label="Role"
            placeholder="Silahkan Pilih"
            required
          ></v-select>

          <v-select
            v-model="newUser.divisi"
            :items="divisis"
            label="Divisi"
            placeholder="Silahkan Pilih"
            required
          ></v-select>

          <v-select
            v-model="newUser.departemen"
            :items="departemens"
            label="Departemen"
            placeholder="Silahkan Pilih"
            required
          ></v-select>
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

const dialog = ref(false);

const newUser = ref({
  nama: "",
  email: "",
  role: "",
  divisi: "",
  departemen: "",
  status: "Pending",
});

const roles = ["Supervisor", "Product Owner", "Operator"];
const divisis = ["Digital Enterprise", "Infrastructure"];
const departemens = ["Card & Digital Transaction", "Data Center Operation"];

const isFormValid = computed(() => {
  return (
    newUser.value.nama &&
    newUser.value.email &&
    newUser.value.role &&
    newUser.value.divisi &&
    newUser.value.departemen
  );
});

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const submitForm = () => {
  if (isFormValid.value) {
    // eslint-disable-next-line no-undef
    emit("add-user", { ...newUser.value });

    // Reset form
    newUser.value = {
      nama: "",
      email: "",
      role: "",
      divisi: "",
      departemen: "",
    };
    closeDialog();
  }
};

defineExpose({
  openDialog,
});
</script>

<style scoped>
.v-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
