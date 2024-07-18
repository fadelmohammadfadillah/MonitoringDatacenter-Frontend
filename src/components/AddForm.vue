<template>
  <AddForm
    title="Tambah Divisi"
    :isOpen="dialog"
    :isFormValid="isFormValid"
    @submit="handleSubmit"
    @close="handleClose"
  >
    <v-text-field
      v-model="newDiv.divisiName"
      label="Nama Divisi"
      placeholder="contoh: Digital Enterprise"
      variant="outlined"
      required
    ></v-text-field>
  </AddForm>
</template>

<script setup>
import { ref, computed } from "vue";
import AddForm from "./AddForm.vue";

const dialog = ref(false);
const newDiv = ref({
  divisiName: "",
});

const isFormValid = computed(() => {
  return newDiv.value.divisiName.trim() !== "";
});

const handleSubmit = () => {
  // Emit the event with the new division data
  // This is just a placeholder for actual submission logic
  console.log("Form submitted", newDiv.value);

  // Reset the form
  newDiv.value = {
    divisiName: "",
  };
};

const handleClose = () => {
  dialog.value = false;
};

// For demonstration purposes, open the dialog on mount
onMounted(() => {
  dialog.value = true;
});
</script>
