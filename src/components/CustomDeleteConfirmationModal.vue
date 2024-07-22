<template>
  <v-dialog v-model="modal" max-width="400px">
    <v-card class="pa-4">
      <v-card-title class="text-h6 text-center rounded-x">
        {{ message }}
      </v-card-title>
      <v-card-text class="text-center">
        <v-img :src="imgSrc" contain max-width="200px" class="mx-auto"></v-img>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          variant="outlined"
          color="orange"
          @click="modalState"
          rounded="lg"
        >
          Tidak, Batalkan
        </v-btn>
        <spacer> </spacer>
        <v-btn
          variant="flat"
          color="orange"
          @click="confirmDelete"
          rounded="lg"
          class="text-white"
        >
          Ya, Saya Yakin
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["deleteDivisi"]);
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  message: {
    type: String,
    default: "Apakah Anda yakin ingin menghapus item ini?",
  },
  imgSrc: {
    type: String,
    default: "img/path",
  },
});

const itemId = ref(null);
const modal = ref(false);

const modalState = (item) => {
  itemId.value = item;
  modal.value = !modal.value;
};

const confirmDelete = () => {
  emit("deleteDivisi", itemId.value);
  modalState();
};

defineExpose({
  modalState,
});
</script>
