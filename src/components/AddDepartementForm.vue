<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Tambah Departemen</span>
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
            label="Pilih Divisi"
            placeholder="Divisi yang tersedia"
            variant="outlined"
            :items="dataDivisi"
            item-text="title"
            item-value="value"
            v-model="selectValue"
          ></v-select>
          <v-text-field
            v-model="newDept.departmentName"
            label="Nama Departemen"
            placeholder="contoh: Card & Digital Transaction"
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
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["addNewDepartment"]);
const dialog = ref(false);
const newDept = ref({
  idDivisi: 0,
  departmentName: "",
});

const dataDivisi = ref( [{}]);

const selectValue = ref(null);

const openDialog = (dataDiv) => {
  dataDivisi.value = dataDiv;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return newDept.value.departmentName;
});

const submitForm = () => {
  if (isFormValid.value) {
    newDept.value.idDivisi = selectValue.value;
    // eslint-disable-next-line no-undef
    emit("addNewDepartment", { ...newDept.value });

    // Reset form
    newDept.value = {
      idDivisi : 0,
      departmentName: "",
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
