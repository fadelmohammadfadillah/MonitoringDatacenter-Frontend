<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">{{ title }}</span>
        <v-divider vertical class="pl-16 ml-16"></v-divider>
        <v-btn
          @click="closeDialog"
          prepend-icon="mdi-close"
          variant="plain"
          class="pr-11"
        >
          close
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <slot></slot>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center pb-6">
        <v-btn outlined @click="closeDialog" color="orange"> Batalkan </v-btn>
        <v-btn
          outlined
          @click="submitForm"
          :disabled="!isFormValid"
          color="orange"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineExpose } from "vue";

const props = defineProps({
  title: String,
  isOpen: Boolean,
  isFormValid: Boolean,
});

const emit = defineEmits(["submit", "close"]);
const dialog = ref(props.isOpen);

watch(
  () => props.isOpen,
  (newVal) => {
    dialog.value = newVal;
  }
);

const closeDialog = () => {
  emit("close");
  dialog.value = false;
};

const submitForm = () => {
  if (props.isFormValid) {
    emit("submit");
    closeDialog();
  }
};

defineExpose({
  openDialog: () => {
    dialog.value = true;
  },
});
</script>
