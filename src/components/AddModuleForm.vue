<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title
        class="d-flex align-center justify-space-between text-h5 ma-2"
      >
        <span class>Tambah Module</span>
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
        <div class="text-caption font-weight-regular">Nama Sub Produk</div>
        <v-form ref="form">
          <v-select
         
            placeholder="Silahkan Pilih"
            variant="outlined"
            :items="dataSubprod"
            item-text="title"
            item-value="value"
            v-model="selectedSubprod"
            required
          ></v-select>
          <div class="text-caption font-weight-regular">Nama Module</div>
          <v-text-field
            v-model="newModule.moduleName"
      
            placeholder="contoh: authfinnet"
            variant="outlined"
            required
          ></v-text-field>
          <div class="text-caption font-weight-regular">Nama Profile</div>
          <v-text-field
            v-model="newModule.profile"
         
            placeholder="contoh: 001"
            variant="outlined"
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
const emit = defineEmits(["addNewModule"]);
const dialog = ref(false);
const newModule = ref({
  idSubproduct: 0,
  moduleName: "",
  profile: "",
});

const dataSubprod = ref([{}]);
const selectedSubprod = ref(null);

const openDialog = (dataSubproduct) => {
  dataSubprod.value = dataSubproduct;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return newModule.value.moduleName;
});

const submitForm = () => {
  if (isFormValid.value) {
    newModule.value.idSubproduct = selectedSubprod;
    // eslint-disable-next-line no-undef
    emit("addNewModule", { ...newModule.value });

    // Reset form
    selectedSubprod.value = null;
    newModule.value = {
      idSubproduct: 0,
      moduleName: "",
      profile: "",
    };
    closeDialog();
  }
};

defineExpose({
  openDialog,
});
</script>

<style scoped></style>
