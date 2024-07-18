<template>
    <v-dialog
        v-model="modal"
        max-width="30vw"
    >
    <v-card class="pa-4">
        <v-card-title class="text-h6 text-center">
            {{ message }}
        </v-card-title>
        <div class="py-4">
            <v-img 
            :src="imgSrc" 
            max-width="20vw"
        ></v-img>
        </div>
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
    </v-card>

    </v-dialog>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
    message: {
        type: String,
        default: "message here!",
    },
    imgSrc: {
        type: String,
        default: "img/path"
    }
});

const modal = ref(false);

const modalState = () => {
    modal.value = !modal.value;
};

defineExpose({
  modalState,
  props,
});

</script>