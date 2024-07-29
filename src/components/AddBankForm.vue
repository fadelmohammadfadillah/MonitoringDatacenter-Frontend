<template>
  <v-dialog v-model="dialog" max-width="550px">
    <v-card>
      <v-card-title
        class="d-flex align-center justify-space-between text-h5 ma-2"
      >
        <span>Tambah Bank</span>
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
        <div class="text-caption font-weight-regular">Nama Bank</div>
        <v-form ref="form">
          <v-text-field
            v-model="newBank.bankName"
            placeholder="contoh: Bank DKI "
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
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["addNewBank"]);
const dialog = ref(false);
const newBank = ref({
  bankName: "",
});

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return newBank.value.bankName;
});

const submitForm = () => {
  if (isFormValid.value) {
    // eslint-disable-next-line no-undef
    emit("addNewBank", { ...newBank.value });

    // Reset form
    newBank.value = {
      bankName: "",
    };
    closeDialog();
  }
};

defineExpose({
  openDialog,
});
</script>

<style scoped></style>
