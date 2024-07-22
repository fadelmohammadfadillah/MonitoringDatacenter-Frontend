<template>
  <v-dialog v-model="modal" max-width="26vw">
    <v-card class="pa-9 text-center">
      <v-card-title class="text-h6 text-center">
        {{ message }}
      </v-card-title>
      <div class="py-4">
        <v-img :src="imgSrc" max-width="20vw"></v-img>
      </div>
      <v-row>
        <v-btn
          variant="outlined"
          color="orange"
          @click="modalState"
          rounded="lg"
          class="text-white"
        >
          Tidak, Batalkan
        </v-btn>

        <v-btn
          variant="flat"
          color="orange"
          @click="confirmDelete"
          rounded="lg"
          class="text-white"
        >
          Ya, Saya Yakin
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["deleteDivisi"]);
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
