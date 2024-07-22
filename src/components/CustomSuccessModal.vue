<template>
  <v-dialog v-model="modal" max-width="400px">
    <v-card class="pa-4">
      <v-card-title class="text-h6 text-center rounded-xl">
        {{ message }}
      </v-card-title>
      <v-card-text class="text-center">
        <v-img :src="imgSrc" contain max-width="250px" class="mx-auto"></v-img>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          variant="flat"
          color="orange"
          block
          @click="modalState"
          rounded="lg"
          class="text-white"
        >
          Ok, Tutup
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  message: {
    type: String,
    default: "message here!",
  },
  imgSrc: {
    type: String,
    default: "img/path",
  },
});

const modal = ref(false);

const modalState = () => {
  modal.value = !modal.value;
};

defineExpose({
  modalState,
});
</script>
