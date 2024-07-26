<template>
  <ApprovalHeader>
    <template v-slot="{ currentTab }">
      <v-tabs-items v-model="tab">
        <v-tab-item v-if="currentTab === 'Status Persetujuan'">
          <ApprovalTable />
        </v-tab-item>
        <v-tab-item v-if="currentTab === 'Riwayat'">
          <v-card flat>
            <v-card-text>Riwayat Konten di sini...</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </template>
  </ApprovalHeader>
</template>

<script>
import ApprovalHeader from "./ApprovalHeader.vue";
import ApprovalTable from "./ApprovalTable.vue";

export default {
  components: {
    ApprovalHeader,
    ApprovalTable,
  },
  data() {
    return {
      tab: "Status Persetujuan",
    };
  },
};
</script>
