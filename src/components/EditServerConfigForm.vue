<template>
    <v-dialog v-model="dialog" max-width="450px">
      <v-card>
        <v-card-title class="text-h6 d-flex justify-space-between align-center">
          <span class="pl-5">Edit Konfigurasi</span>
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
              v-model="serverConfigData.port"
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
  import { ref, computed } from "vue";
  
  const emit = defineEmits(["editServerConfig"]);
  const dialog = ref(false);
  const serverConfigData = ref({
    idServerConfig: 0,
    idServer: 0,
    serverType: "",
    port: "",
    idSubproduct: 0,
  });
  
  const serverType = [
    {title: "APP", value: "APP"},
    {title: "DB", value: "DB"},
  ];
  const dataServer = ref([]);
  const dataSubprod = ref([]);
  const selectedServer = ref(null);
  const selectedServerType = ref(null);
  const selectedSubprod = ref(null);
  
  const openDialog = (item, server, subprod) => {
    serverConfigData.value.idServerConfig = item.idServerConfig;
    serverConfigData.value.idServer = item.idServer;
    serverConfigData.value.serverType = item.serverType;
    serverConfigData.value.idSubproduct = item.idSubproduct;
    serverConfigData.value.port = item.port;

    dataServer.value = server;
    dataSubprod.value = subprod;

    selectedSubprod.value = item.idSubproduct;
    selectedServer.value = item.idServer;
    selectedServerType.value = item.serverType;  
    dialog.value = true;
  };

  const filteredServerType = computed(() => {
    // console.log(selectedDept.value);
    if (!selectedServer.value) return [];
    const server = dataServer.value.find(
      
      (server) => server.value === selectedServer.value
    );
    selectedServerType.value = server.serverType;
  });
  
  const closeDialog = () => {
    dialog.value = false;
  };
  
  const isFormValid = computed(() => {
    return selectedServer.value && selectedServerType.value && selectedSubprod && serverConfigData.value.port && parseInt(serverConfigData.value.port) >= 0 && parseInt(serverConfigData.value.port) <= 65535;
  });
  
  const submitForm = () => {
    if (isFormValid.value) {
      serverConfigData.value.idServer = selectedServer;
      serverConfigData.value.idSubproduct = selectedSubprod.value;
      serverConfigData.value.serverType = selectedServerType.value;
      // eslint-disable-next-line no-undef
      emit("editServerConfig", { ...serverConfigData.value });

      // Reset form
      serverConfigData.value = {
        idServerConfig: 0,
        idServer: 0,
        serverType: "",
        port: "",
        idSubproduct: 0,
      }
      selectedServerType.value = null;
      closeDialog();
    }
  };

  const lengthRule = computed(() => (v) => v.length <= 5 || 'Maximum 5 digits');
  
  defineExpose({
    openDialog,
  });
</script>
  
  <style scoped></style>
  