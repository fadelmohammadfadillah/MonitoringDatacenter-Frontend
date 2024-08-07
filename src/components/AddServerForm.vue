<template>
  <v-dialog v-model="dialog" max-width="550px">
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between text-h5 ma-2">
        <span>Tambah IP Address</span>
        <v-spacer></v-spacer>
        <v-divider vertical></v-divider>
        <v-btn @click="closeDialog" prepend-icon="mdi-close" variant="plain">
          Close
        </v-btn>
      </v-card-title>
      <v-divider class="my-1"></v-divider>
      <v-card-text class="py-2">
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
import { ref, computed, nextTick, onMounted } from 'vue';

// Emit for custom events
const emit = defineEmits(['addNewServer']);
const dialog = ref(false);
const fields = ref(['', '', '', '']); // Array to store input values for IP Address
const newServer = ref({
  ipAddress: "",
  serverType: "",
});

// Array to hold references to the text fields
const textFields = ref([]);

const serverType = [
  {title: "APP", value: "APP"},
  {title: "DB", value: "DB"},
];

const selectedServerType = ref(null);

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

// Validate IP Address by checking all 4 fields
const isFormValid = computed(() => {
  return fields.value.every(field => field.length > 0 && parseInt(field) >= 0 && parseInt(field) <= 255) && selectedServerType.value;
});

const submitForm = () => {
  if (isFormValid.value) {
    newServer.value.ipAddress = fields.value.join('.');
    newServer.value.serverType = selectedServerType.value;
    emit('addNewServer', { ...newServer.value });

    // Reset form fields
    fields.value = ['', '', '', ''];
    newServer.value.ipAddress = "";
    newServer.value.serverType = "";
    selectedServerType.value = null;
    closeDialog();
  }
};

const onInput = (index) => {
  const value = fields.value[index];
  if (value.length === 3 && index < 3) {
    nextTick(() => {
      const nextField = textFields.value[index + 1];
      if (nextField) nextField.focus();
    });
  }
  fields.value[index] = value.slice(0, 3);
};

const onKeydown = (event, index) => {
  if (event.key === 'Backspace' && fields.value[index].length === 0 && index > 0) {
    nextTick(() => {
      const prevField = textFields.value[index - 1];
      if (prevField) prevField.focus();
    });
  }
};

const lengthRule = computed(() => (v) => v.length <= 3 || 'Maximum 3 digits');

// Attach refs to text fields on mount
onMounted(() => {
  textFields.value = document.querySelectorAll('.ip-field');
});

defineExpose({
  openDialog
});
</script>

<style>
.ip-field {
  text-align: center;
}
</style>
