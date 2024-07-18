<template>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h6">
          Edit Divisi
          <v-spacer></v-spacer>
  
          <v-btn prepend-icon="mdi-close" @click="closeDialog"> Close </v-btn>
        </v-card-title>
        <v-divider class="my-2"></v-divider>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="divData.divisiName"
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
  import { ref, computed } from "vue";
  
  const emit = defineEmits(['editDiv'])
  const dialog = ref(false);
  const divData = ref({
    idDivisi: "",
    divisiName: "",
  });
  
  const openDialog = (item) => {
    divData.value.idDivisi = item.idDivisi;
    divData.value.divisiName = item.divisiName;
    dialog.value = true;
  };
  
  const closeDialog = () => {
    dialog.value = false;
  };
  
  const isFormValid = computed(() => {
    return divData.value.divisiName;
  });
  
  const submitForm = () => {
    if (isFormValid.value) {
      // eslint-disable-next-line no-undef
      emit("editDiv", { ...divData.value });
  
      // Reset form
      divData.value = {
        divisiName: "",
      };
      closeDialog();
    }
  };
  
  defineExpose({
    openDialog,
  });
  </script>
  