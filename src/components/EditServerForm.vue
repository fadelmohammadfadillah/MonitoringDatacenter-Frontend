<template>
    <v-dialog v-model="dialog" max-width="450px">
      <v-card>
        <v-card-title class="text-h6 d-flex justify-space-between align-center">
          <span class="pl-5">Edit Ip Address</span>
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
          <div class="text-caption font-weight-regular">Ip Address</div>
          <v-form ref="form">
            <v-row>
                <v-col v-for="(field, index) in 4" :key="index" cols="3">
                    <v-text-field
                        v-model="fields[index]"
                        :max-length="3"
                        type="number"
                        :placeholder="index < 3 ? 'XXX' : 'XXX'"
                        class="ip-field"
                        @input="onInput(index)"
                        @keydown="onKeydown($event, index)"
                        :rules="[lengthRule]"
                        solo
                        :ref="`textField${index}`"
                    ></v-text-field>
                </v-col>
            </v-row>
            <div class="text-caption font-weight-regular">Tipe Server: </div>
            <v-select
                placeholder="Silahkan Pilih Server Type"
                variant="outlined"
                :items="serverType"
                item-text="title"
                item-value="value"
                v-model="selectedServerType"
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
  
  const emit = defineEmits(["editServer"]);
  const dialog = ref(false);
  const serverData = ref({
    idServer: 0,
    ipAddress: "",
    serverType: "",
  });
  
  const serverType = [
    {title: "APP", value: "APP"},
    {title: "DB", value: "DB"},
  ];

  const selectedServerType = ref(null);

  const fields = ref([]);
  
  const openDialog = (item) => {
    serverData.value.idServer = item.idServer;
    serverData.value.ipAddress = item.ipAddress;
    serverData.value.serverType = item.serverType;
    fields.value = item.ipAddress.split('.');
    selectedServerType.value = item.serverType;  
    dialog.value = true;
  };
  
  const closeDialog = () => {
    dialog.value = false;
  };
  
  const isFormValid = computed(() => {
    return fields.value.every(field => field.length > 0 && parseInt(field) >= 0 && parseInt(field) <= 255) && selectedServerType.value;
  });
  
  const submitForm = () => {
    if (isFormValid.value) {
      serverData.value.ipAddress = fields.value.join('.');
      serverData.value.serverType = selectedServerType.value;
      // eslint-disable-next-line no-undef
      emit("editServer", { ...serverData.value });

      // Reset form
      fields.value = ['', '', '', ''];
      serverData.value = {
        idServer: 0,
        ipAddress: "",
        serverType: "",
      }
      selectedServerType.value = null;
      closeDialog();
    }
  };
  
  defineExpose({
    openDialog,
  });
</script>
  
  <style scoped></style>
  