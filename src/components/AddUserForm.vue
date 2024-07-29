<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h5 ma-2">
        Tambah Pengguna
        <v-spacer></v-spacer>
        <v-divider vertical class=""></v-divider>

        <v-btn
          @click="closeDialog"
          prepend-icon="mdi-close"
          variant="plain"
          class=""
        >
          Close
        </v-btn>
      </v-card-title>
      <v-divider class="my-1"></v-divider>
      <v-card-text>
        <div class="text-caption font-weight-regular">Nama Lengkap</div>
        <v-form ref="form">
          <v-text-field
            v-model="newUser.name"
            placeholder="contoh: John Doe"
            density="compact"
            required
          ></v-text-field>
          <div class="text-caption font-weight-regular">Username</div>
          <v-text-field
            v-model="newUser.username"
            placeholder="contoh: admin123"
            density="compact"
            required
          ></v-text-field>
          <div class="text-caption font-weight-regular">Password</div>
          <v-text-field
            v-model="newUser.password"
            placeholder="contoh: password123"
            :append-inner-icon="visible ?  'mdi-eye': 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            density="compact"
            required
          ></v-text-field>
          <div class="text-caption font-weight-regular">Role</div>
          <v-select
            v-model="selectedRole"
            :items="role"
            placeholder="Silahkan Pilih"
            density="compact"
            required
          ></v-select>
          <div class="text-caption font-weight-regular">Divisi</div>
          <v-select
            v-model="selectedDiv"
            :items="dataDivisi"
            placeholder="Silahkan Pilih"
            density="compact"
            required
          ></v-select>
          <div class="text-caption font-weight-regular">Department</div>
          <v-select
            v-model="selectedDept"
            :items="filteredDeptDataByDiv"
            placeholder="Silahkan Pilih"
            density="compact"
            :disabled="isDisabled"
            required
          ></v-select>
        </v-form>
      </v-card-text>

      <v-row>
        <v-col>
          <v-btn block variant="outlined" color="orange" @click="closeDialog"> Batalkan </v-btn>
        </v-col>
        <v-col>
          <v-btn block variant="flat" :color="!isFormValid ? 'grey' : 'orange'" @click="submitForm" :disabled="!isFormValid" class="text-white">
            Simpan
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref, computed } from "vue";
  import role from "@/config/role";
  // eslint-disable-next-line no-unused-vars
  const emit = defineEmits(["addNewUser"]);
  const dialog = ref(false);
  const visible = ref(false);

  const newUser = ref({
    name: "",
    username: "",
    password: "",
    role: "",
    idDivisi: 0,
    idDepartment: 0,
  });

  const isFormValid = computed(() => {
    return (
      newUser.value.name &&
      newUser.value.username &&
      newUser.value.password &&
      selectedRole.value &&
      selectedDiv.value &&
      (isDisabled.value || selectedDept.value)
    );
  });

  const dataDivisi = ref([{}]);
  const dataDepartment = ref([{}]); 
  const selectedDept = ref(null);
  const selectedDiv = ref(null);
  const selectedRole = ref(null);
  const isDisabled = ref(true);

  const openDialog = (dataDiv, dataDept) => {
    dataDivisi.value = dataDiv;
    dataDepartment.value = dataDept;
    dialog.value = true;
  };

  const closeDialog = () => {
    dialog.value = false;
  };

  const filteredDeptDataByDiv = computed( () => {
    // jika role PO_DIVISI tidak perlu mengisi field department
    if (!selectedDiv.value || selectedRole.value == role[0]){
      isDisabled.value = true;
      selectedDept.value = null;
      return [];
    }
    isDisabled.value = false;
    selectedDept.value = null;
    return dataDepartment.value.filter(dept => dept.idDivisi === selectedDiv.value);
  });

  const submitForm = () => {
    if (isFormValid.value) {
      newUser.value.idDepartment = selectedDept.value;
      newUser.value.idDivisi = selectedDiv.value;
      newUser.value.role= selectedRole.value;
      // eslint-disable-next-line no-undef
      emit("addNewUser", { ...newUser.value });

      // Reset form
      selectedDept.value = null;
      selectedDiv.value = null;
      selectedRole.value = null;
      newUser.value = {
        name: "",
        username: "",
        password: "",
        role: "",
        idDivisi: 0,
        idDepartment: 0,
      };
      closeDialog();
    }
  };

  defineExpose({
    openDialog,
  });
</script>

<style scoped>
.v-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
