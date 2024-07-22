<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Edit Department</span>
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
            label="Pilih Divisi"
            placeholder="Divisi yang tersedia"
            variant="outlined"
            :items="dataDivisi"
            item-text="title"
            item-value="value"
            v-model="selectValue"
          ></v-select>

          <v-text-field
            v-model="deptData.departmentName"
            label="Nama Department"
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

const emit = defineEmits(["editDept"]);
const dialog = ref(false);
const deptData = ref({
  idDivisi: 0,
  departmentName: "",
  idDepartment: 0,
});

const dataDivisi = ref( [{}])

const selectValue = ref(null);

const openDialog = (dataDiv, item) => {
  console.log(item);
  deptData.value.departmentName = item.departmentName;
  deptData.value.idDepartment = item.idDepartment;
  deptData.value.idDivisi = item.idDivisi;
  selectValue.value = item.idDivisi;
  dataDivisi.value  = dataDiv;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return deptData.value.departmentName;
});

const submitForm = () => {
  if (isFormValid.value) {
    // eslint-disable-next-line no-undef
    deptData.value.idDivisi = selectValue.value;
    emit("editDept", { ...deptData.value });

    // Reset form
    deptData.value = {
      idDivisi: 0,
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
