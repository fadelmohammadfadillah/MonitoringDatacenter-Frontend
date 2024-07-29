<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Edit Departemen</span>
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
        <v-form ref="form">
          <div class="text-caption font-weight-regular">Nama Divisi</div>
          <v-select
            placeholder="Silahkan Pilih"
            variant="outlined"
            :items="dataDivisi"
            item-text="title"
            item-value="value"
            v-model="selectValue"
          ></v-select>
          <div class="text-caption font-weight-regular">Nama Departemen</div>
          <v-text-field
            v-model="deptData.departmentName"
            placeholder="contoh: Digital Enterprise"
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

const emit = defineEmits(["editDept"]);
const dialog = ref(false);
const deptData = ref({
  idDivisi: 0,
  departmentName: "",
  idDepartment: 0,
});

const dataDivisi = ref([{}]);

const selectValue = ref(null);

const openDialog = (dataDiv, item) => {
  console.log(item);
  deptData.value.departmentName = item.departmentName;
  deptData.value.idDepartment = item.idDepartment;
  deptData.value.idDivisi = item.idDivisi;
  selectValue.value = item.idDivisi;
  dataDivisi.value = dataDiv;
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

<style scoped></style>
