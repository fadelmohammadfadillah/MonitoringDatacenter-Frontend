<template>
  <v-dialog v-model="dialog" max-width="550px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span class="pl-5">Edit Pengguna</span>
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
      <v-card-text class="py-2">
        <div class="text-caption font-weight-regular">Nama Lengkap</div>
        <v-form ref="form">
          <v-text-field
            v-model="userData.name"
            placeholder="contoh: Lega Delaujov"
            density="compact"
            variant="outlined"
            required
          ></v-text-field>

          <div class="text-caption font-weight-regular">Username</div>
          <v-text-field
            v-model="userData.username"
            placeholder="contoh: delaujov07"
            density="compact"
            variant="outlined"
            required
          ></v-text-field>

          <div class="text-caption font-weight-regular">Password</div>
          <v-text-field
            v-model="userData.password"
            placeholder="contoh: passworcollega"
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            density="compact"
            variant="outlined"
            required
          ></v-text-field>
          <div class="text-caption font-weight-regular">Role</div>
          <v-select
            v-model="selectedRole"
            :items="roles"
            placeholder="Silahkan Pilih"
            density="compact"
            variant="outlined"
            :disabled="true"
            required
          ></v-select>
          <div class="text-caption font-weight-regular">Divisi</div>
          <v-select
            v-model="selectedDiv"
            :items="dataDivisi"
            placeholder="Silahkan Pilih"
            density="compact"
            variant="outlined"
            required
          ></v-select>

          <div class="text-caption font-weight-regular">Departemen</div>
          <v-select
            v-model="selectedDept"
            :items="filteredDeptDataByDiv"
            placeholder="Silahkan Pilih"
            density="compact"
            variant="outlined"
            :disabled="isDisabled"
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
import role from "@/config/role";

const emit = defineEmits(["editUser"]);
const dialog = ref(false);
const userData = ref({
  idUser: 0,
  idPO: 0,
  idOperator: 0,
  idSupervisor: 0,
  idDivisi: 0,
  idDepartment: 0,
  name: "",
  username: "",
  password: "",
  role: "",
});

const dataDivisi = ref([{}]);
const dataDepartment = ref([{}]);
const selectedDept = ref(null);
const selectedDiv = ref(null);
const selectedRole = ref(null);
const isDisabled = ref(true);
const visible = ref(false);
const originalDivUser = ref(null);

const openDialog = (item, dataDiv, dataDept) => {
  console.log("isi item: " + item);
  Object.assign(userData.value, item);

  if (item.role == role[0] || item.role == role[1]) {
    userData.value.idUser = item.idPO;
  } else if (item.role == role[2]) {
    userData.value.idUser = item.idSupervisor;
  } else if (item.role == role[3]) {
    userData.value.idUser = item.idOperator;
  } else {
    alert("invalid user role!");
  }

  originalDivUser.value = item.idDivisi;

  selectedDiv.value = item.idDivisi;
  selectedDept.value = item.idDepartment;
  selectedRole.value = item.role;

  dataDivisi.value = dataDiv;
  dataDepartment.value = dataDept;

  dialog.value = true;
};

const filteredDeptDataByDiv = computed(() => {
  // jika role PO_DIVISI tidak perlu mengisi field department
  if (!selectedDiv.value || selectedRole.value == role[0]) {
    isDisabled.value = true;
    selectedDept.value = null;
    return [];
  }
  isDisabled.value = false;
  // agar nilai department tidak null saat pertama isi
  // dan setelah change divisi bisa null
  if (selectedDiv.value != originalDivUser.value) {
    selectedDept.value = null;
    originalDivUser.value = null;
  }
  return dataDepartment.value.filter(
    (dept) => dept.idDivisi === selectedDiv.value
  );
});

const closeDialog = () => {
  dialog.value = false;
};

const isFormValid = computed(() => {
  return userData.value.name;
});

const submitForm = () => {
  if (isFormValid.value) {
    userData.value.idDivisi = selectedDiv.value;
    userData.value.idDepartment = selectedDept.value;
    // eslint-disable-next-line no-undef
    emit("editUser", { ...userData.value });

    // Reset form
    selectedDept.value = null;
    selectedDiv.value = null;
    userData.value = {
      idUser: 0,
      idPO: 0,
      idOperator: 0,
      idSupervisor: 0,
      idDivisi: 0,
      idDepartment: 0,
      name: "",
      username: "",
      password: "",
      role: "",
    };
    closeDialog();
  }
};

defineExpose({
  openDialog,
});
</script>

<style scoped></style>
