<template>
  <v-container class="mx-6" style="max-height: 100vh">
    <v-row class="pb-10">
      <v-col class="text-h4 font-weight-bold pt-16">Approval</v-col>
    </v-row>

    <v-card>
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab
          v-for="item in items"
          :key="item"
          :text="item"
          :value="item"
        ></v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <slot :current-tab="tab"></slot>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: "Status Persetujuan",
      items: ["Status Persetujuan", "Riwayat"],
    };
  },
};
</script>
