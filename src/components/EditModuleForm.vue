<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="">Edit Module</span>
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
            v-model="moduleData.moduleName"
      
            placeholder="contoh: authfinnet"
            variant="outlined"
            required
          ></v-text-field>

          <div class="text-caption font-weight-regular">Nama Profile</div>
          <v-text-field
            v-model="moduleData.profile"
        
            placeholder="contoh: 001"
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

const emit = defineEmits(["editModule"]);
const dialog = ref(false);
const moduleData = ref({
  idSubproduct: 0,
  idModule: 0,
  moduleName: "",
  profile: "",
});

const dataSubprod = ref([{}]);
const selectedSubprod = ref(null);

const openDialog = (item, dataSubproduct) => {
  dataSubprod.value = dataSubproduct;
  selectedSubprod.value = item.idSubproduct;
  moduleData.value.moduleName = item.moduleName;
  moduleData.value.profile = item.profile;
  moduleData.value.idSubproduct = item.idSubproduct;
  moduleData.value.idModule = item.idModule;

  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return moduleData.value.moduleName;
});

const submitForm = () => {
  if (isFormValid.value) {
    console.log(selectedSubprod.value);
    moduleData.value.idSubproduct = selectedSubprod.value;
    // eslint-disable-next-line no-undef
    emit("editModule", { ...moduleData.value });

    // Reset form
    selectedSubprod.value = null;
    moduleData.value = {
      idSubproduct: 0,
      idModule: 0,
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
