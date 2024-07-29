<template>
  <v-dialog v-model="dialog" max-width="550px">
    <v-card>
      <v-card-title
        class="d-flex align-center justify-space-between text-h5 ma-2"
      >
        <span>Tambah Departemen</span>
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
        <div class="text-caption font-weight-regular">Nama Divisi</div>
        <v-form ref="form">
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
            v-model="newDept.departmentName"
            placeholder="contoh: Card & Digital Transaction"
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
const emit = defineEmits(["addNewDepartment"]);
const dialog = ref(false);
const newDept = ref({
  idDivisi: 0,
  departmentName: "",
});

const dataDivisi = ref([{}]);

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
