<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="items"
    item-value="no"
    show-expand
    class="elevation-1"
  >
    <template v-slot:item.status="{ item }">
      <v-chip :color="statusColor(item.status)">
        {{ item.status }}
      </v-chip>
    </template>

    <template v-slot:expanded-row="{ item }">
      <tr>
        <td :colspan="headers.length">
          <v-card flat>
            <v-card-text>
              <div class="d-flex justify-space-between">
                <span><strong>Nama Petugas:</strong> {{ item.operator }}</span>
                <span><strong>Tanggal:</strong> {{ item.date }}</span>
                <span
                  ><strong>Waktu Submit:</strong> {{ item.submitTime }}</span
                >
                <v-chip :color="statusColor(item.detailedStatus)">
                  {{ item.detailedStatus }}
                </v-chip>
                <v-btn color="primary" text @click="viewDetails(item)"
                  >Lihat Detail</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </td>
      </tr>
    </template>
    
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      headers: [
        { text: "No", value: "no" },
        { text: "Tanggal", value: "date" },
        { text: "Bank", value: "bank" },
        { text: "Status Pengecekan", value: "status" },
      ],
      items: [
        {
          no: 1,
          date: "17/07/2024",
          bank: "Bank Aceh",
          status: "Perlu Persetujuan (1/2)",
          operator: "Aldi Siginen",
          submitTime: "07:00",
          detailedStatus: "Disetujui",
        },
      ],
    };
  },
  methods: {
    statusColor(status) {
      switch (status) {
        case "Disetujui":
          return "green";
        case "Menunggu Disetujui":
          return "orange";
        default:
          return "grey";
      }
    },
    viewDetails(item) {
      console.log("Lihat detail untuk:", item);
      // Implementasi logika detail view disini
    },
  },
};
</script>

<style scoped></style>
