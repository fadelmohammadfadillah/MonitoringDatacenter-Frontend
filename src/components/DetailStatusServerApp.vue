<template>
  <v-dialog v-model="dialog" max-width="550px">
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span>Detail Server App</span>
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
      <v-card>
        <v-card-text class="py-2">
          <v-row class="pb-4 pl-10">
            <v-col cols="4">
              <div class="text-caption font-weight-regular">
                Nama Server Aplikasi:
              </div>
              <div class="text-">{{ serverData.nameServerApp }}</div>
            </v-col>
            <v-col cols="4">
              <div class="text-caption font-weight-regular">IP:</div>
              <div class="text">{{ serverData.ipServer }}</div>
            </v-col>
            <v-col cols="4">
              <div class="text-caption font-weight-regular">Path:</div>
              <div class="text">{{ serverData.pathServer }}</div>
            </v-col>
            <v-col cols="4">
              <div class="text-caption font-weight-regular">Usage (%):</div>
              <div class="text-">{{ serverData.usageServer }}</div>
            </v-col>

            <v-col cols="4">
              <div class="text-caption font-weight-regular">Status:</div>
              <div class="text">{{ serverData.status }}</div>
            </v-col>
          </v-row>

          <spacer></spacer>

          <v-divider></v-divider>

          <v-container>
            <div class="text-caption font-weight-regular">Catatan Petugas</div>
            <v-sheet :height="100" :width="490" border rounded class="pa-3">
              {{ serverData.noteServerApp }}</v-sheet
            >
          </v-container>
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const serverData = ref({
  idstatusServerApp: "",
  nameServerApp: "",
  ipServer: "",
  pathServer: "",
  usageServer: "",
  status: "",
  logServerApp: "",
  noteServerApp: "",
});

const openDialog = (item) => {
  serverData.value.idstatusServerApp = item.idstatusServerApp;
  serverData.value.nameServerApp = item.nameServerApp;
  serverData.value.ipServer = item.ipServer;
  serverData.value.pathServer = item.pathServer;
  serverData.value.usageServer = item.usageServer;
  serverData.value.status = item.status;
  serverData.value.logServerApp = item.logServerApp;
  serverData.value.noteServerApp = item.noteServerApp;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

defineExpose({
  openDialog,
});
</script>

<style scoped></style>
