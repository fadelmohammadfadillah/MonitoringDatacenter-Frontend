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
            <div class="text-caption font-weight-regular">Log:</div>
            <div
              v-if="serverData.logServerApp === 'Normal'"
              class="text-normal"
            >
              Normal
            </div>
            <div
              v-if="serverData.status === 'WARN'"
              class="text-normal text-orange"
            >
              Almost 75%
            </div>
            <div
              v-if="serverData.status === 'NOK'"
              class="text-red"
              style="height: 150px; overflow-y: scroll"
            >
              • Error starting ApplicationContext. To display the condition
              evaluation report re-run your application with 'debug' enabled.
              2024-07-24T15:26:49.121+07:00 ERROR 24188 --- [otomasi-datacenter]
              [main] o.s.boot.SpringApplication : Application run failed •
              org.springframework.context.ApplicationContextException: Unable to
              start web server at
              org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.onRefresh(ServletWebServerApplicationContext.java:165)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:618)
              ~[spring-context-6.1.10.jar:6.1.10] at
              org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.boot.SpringApplication.refresh(SpringApplication.java:754)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:456)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.boot.SpringApplication.run(SpringApplication.java:335)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.boot.SpringApplication.run(SpringApplication.java:1363)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.boot.SpringApplication.run(SpringApplication.java:1352)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              com.collega.otomasi_datacenter.OtomasiDatacenterApplication.main(OtomasiDatacenterApplication.java:10)
              ~[classes/:na] • Caused by:
              org.springframework.boot.web.server.WebServerException: Unable to
              start embedded Tomcat at
              org.springframework.boot.web.embedded.tomcat.TomcatWebServer.initialize(TomcatWebServer.java:145)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.boot.web.embedded.tomcat.TomcatWebServer.(TomcatWebServer.java:105)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory.getTomcatWebServer(TomcatServletWebServerFactory.java:499)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory.getWebServer(TomcatServletWebServerFactory.java:218)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.createWebServer(ServletWebServerApplicationContext.java:188)
              ~[spring-boot-3.2.7.jar:3.2.7] at
              org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.onRefresh(ServletWebServerApplicationContext.java:162)
              ~[spring-boot-3.2.7.jar:3.2.7] ... 8 common frames omitted
            </div>
          </v-container>

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
