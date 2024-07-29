<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="6"
          ><strong>Nama Petugas:</strong> {{ item.petugas }}</v-col
        >
        <v-col cols="6"><strong>Tanggal:</strong> {{ item.date }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="6"
          ><strong>Waktu Submit:</strong> {{ item.submitTime }}</v-col
        >
        <v-col cols="6">
          <strong>Status:</strong>
          <v-chip :color="item.statusColor" dark>{{ item.status }}</v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
