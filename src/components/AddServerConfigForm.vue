<template>
    <v-dialog v-model="dialog" max-width="550px">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between text-h5 ma-2">
          <span>Konfigurasi IP Aplikasi</span>
          <v-spacer></v-spacer>
          <v-divider vertical></v-divider>
          <v-btn @click="closeDialog" prepend-icon="mdi-close" variant="plain">
            Close
          </v-btn>
        </v-card-title>
        <v-divider class="my-1"></v-divider>
        <v-card-text class="py-2">
        <v-form ref="form">
            <div class="text-caption font-weight-regular">Ip Address</div>
            <v-select
              placeholder="Silahkan Pilih Server"
              variant="outlined"
              :items="dataServer"
              item-text="title"
              item-value="value"
              v-model="selectedServer"
              required
            ></v-select>
            <div class="text-caption font-weight-regular">Tipe Server: </div>
            <v-select
              placeholder="Silahkan Pilih Server Type"
              variant="outlined"
              :items="filteredServerType"
              item-text="title"
              item-value="value"
              v-model="selectedServerType"
              disabled
              required
            ></v-select>
            <div class="text-caption font-weight-regular">Port: </div>
            <v-text-field
              v-model="newServerConfig.port"
              placeholder="contoh: 3901"
              variant="outlined"
              type="number"
              :rules="[lengthRule]"
              :max-length="5"
              required
            ></v-text-field>
            <div class="text-caption font-weight-regular">Sub Produk: </div>
            <v-select
              placeholder="Silahkan Pilih"
              variant="outlined"
              :items="dataSubprod"
              item-text="title"
              item-value="value"
              v-model="selectedSubprod"
              required
            ></v-select>
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
  import { ref, computed } from 'vue';
  
  // Emit for custom events
  const emit = defineEmits(['addNewServerConfig']);
  const dialog = ref(false);
  const newServerConfig = ref({
    idServer: 0,
    serverType: "",
    port: "",
    idSubproduct: 0,
  });
  
  const dataServer = ref([]);
  const dataSubprod = ref([]);
  const selectedServer = ref(null);
  const selectedServerType = ref(null);
  const selectedSubprod = ref(null);
  
  const openDialog = (server, subprod) => {
    dataServer.value = server;
    console.log(dataServer.value);
    dataSubprod.value = subprod;
    dialog.value = true;
  };
  
  const closeDialog = () => {
    dialog.value = false;
  };
  
  // Validate IP Address by checking all 4 fields
  const isFormValid = computed(() => {
    return selectedServer.value && selectedServerType.value && selectedSubprod && newServerConfig.value.port && parseInt(newServerConfig.value.port) >= 0 && parseInt(newServerConfig.value.port) <= 65535;
  });

  const filteredServerType = computed(() => {
    // console.log(selectedDept.value);
    if (!selectedServer.value) return [];
    console.log(selectedServer.value)
    const server = dataServer.value.find(
      
      (server) => server.value === selectedServer.value
    );
    console.log(server)
    selectedServerType.value = server.serverType;
  });
  
  const submitForm = () => {
    if (isFormValid.value) {
      newServerConfig.value.idServer = selectedServer.value;
      newServerConfig.value.idSubproduct = selectedSubprod;
      newServerConfig.value.serverType = selectedServerType;
      emit('addNewServerConfig', { ...newServerConfig.value });
  
      // Reset form fields
      newServerConfig.value = {
        idSubproduct: 0,
        idServer: 0,
        port: "",
        serverType: "",
      }
      selectedServer.value = null;
      selectedServerType.value = null;
      selectedSubprod.value = null
      closeDialog();
    }
  };

  const lengthRule = computed(() => (v) => v.length <= 5 || 'Maximum 5 digits');
  
  defineExpose({
    openDialog
  });
  </script>
  
  <style>
  .ip-field {
    text-align: center;
  }
  </style>
  