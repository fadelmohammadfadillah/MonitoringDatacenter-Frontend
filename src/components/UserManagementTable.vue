<template>
  <div class="user-management">
    <v-container>
      <v-row>
        <v-col>
          <v-toolbar flat color="D3D3D3">
            <v-toolbar-title class="text-h6 font-weight-bold"
              >Manajemen Pengguna</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-col>
      </v-row>

      <v-row class="toolbar-actions" align="center" justify="space-between">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            placeholder="Placeholder"
            clearable
            dense
            prepend-inner-icon="mdi-magnify"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="auto" class="d-flex justify-end">
          <v-btn class="text-white mx-4" prepend-icon="mdi-filter-variant" variant="outlined" color="orange">
            Filter
          </v-btn>

          <v-btn prepend-icon="mdi-plus" class="text-white" color="orange" @click="addUser">
            Tambah Pengguna
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="filteredUsers"
            :search="search"
            :items-per-page="10"
            class="elevation-1"
          >
            <template v-slot:header="{ props }">
              <tr>
                <th v-for="header in props.headers" :key="header.value">
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.no }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.role }}</td>
                <td>{{ item.divisi }}</td>
                <td>{{ item.departemen }}</td>
                <td>{{ item.email }}</td>
                <td>
                  <v-chip
                    :color="item.status === 'Active' ? 'green' : 'red'"
                    text-color="white"
                    small
                  >
                    {{ item.status }}
                  </v-chip>
                </td>
                <td>
                  <v-icon>mdi-dots-horizontal</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const headers = [
  { text: "No", align: "start", value: "no" },
  { text: "Nama", align: "start", value: "nama" },
  { text: "Role", align: "start", value: "role" },
  { text: "Divisi", align: "start", value: "divisi" },
  { text: "Departemen", align: "start", value: "departemen" },
  { text: "Email", align: "start", value: "email" },
  { text: "Status", align: "start", value: "status" },
  { text: "Actions", align: "start", sortable: false },
];

const users = [
  {
    no: 1,
    nama: "Fadel Mohammad",
    role: "Product Owner",
    divisi: "Digital Enterprise",
    departemen: "Card & Digital Transaction",
    email: "fadelCihuy@gmail.com",
    status: "Active",
  },
  {
    no: 2,
    nama: "Athalie Aurora",
    role: "Supervisor",
    divisi: "Digital Enterprise",
    departemen: "Card & Digital Transaction",
    email: "auroraaawr@gmail.com",
    status: "Active",
  },
  {
    no: 3,
    nama: "Jordan Amanendra",
    role: "Operator",
    divisi: "Infrastructure",
    departemen: "Data Center Operation",
    email: "JordanAyee@gmail.com",
    status: "Active",
  },
  {
    no: 4,
    nama: "Haruna Sakurai",
    role: "Operator",
    divisi: "Infrastructure",
    departemen: "Data Center Operation",
    email: "harunaAkito@gmail.com",
    status: "Active",
  },
  {
    no: 5,
    nama: "Yoga Kanaeru",
    role: "Supervisor",
    divisi: "Digital Enterprise",
    departemen: "Card & Digital Transaction",
    email: "yokananan@gmail.com",
    status: "Active",
  },
  {
    no: 6,
    nama: "Yogi Kirishima",
    role: "Product Owner",
    divisi: "Digital Enterprise",
    departemen: "Card & Digital Transaction",
    email: "yokirrurur@gmail.com",
    status: "Active",
  },
  {
    no: 7,
    nama: "Bagas Atta",
    role: "Product Owner",
    divisi: "Digital Enterprise",
    departemen: "Card & Digital Transaction",
    email: "bagasGas@gmail.com",
    status: "Active",
  },
  {
    no: 8,
    nama: "Bagus Basyir",
    role: "Product Owner",
    divisi: "Digital Enterprise",
    departemen: "Card & Digital Transaction",
    email: "bagusGus@gmail.com",
    status: "Active",
  },
  {
    no: 9,
    nama: "Surya Karya",
    role: "Operator",
    divisi: "Infrastructure",
    departemen: "Data Center Operation",
    email: "suraKar@gmail.com",
    status: "Active",
  },
  {
    no: 10,
    nama: "Maliki Kanan Kiri",
    role: "Operator",
    divisi: "Infrastructure",
    departemen: "Data Center Operation",
    email: "Maliki@gmail.com",
    status: "Active",
  },
  {
    no: 11,
    nama: "Maliki Kanan Kiri",
    role: "Operator",
    divisi: "Infrastructure",
    departemen: "Data Center Operation",
    email: "Maliki@gmail.com",
    status: "Active",
  },
  {
    no: 12,
    nama: "Maliki Kanan Kiri",
    role: "Operator",
    divisi: "Infrastructure",
    departemen: "Data Center Operation",
    email: "Maliki@gmail.com",
    status: "Active",
  },
];

let search = ref("");
let page = ref(1);
const itemsPerPage = 10;

const filteredUsers = computed(() => {
  return users.filter((user) =>
    user.nama.toLowerCase().includes(search.value.toLowerCase())
  );
});

const pageCount = computed(() => {
  return Math.ceil(users.length / itemsPerPage);
});

const addUser = () => {
  // Your add user logic here
};
</script>

<style scoped>
.user-management {
  background-color: #f6f6f6;
  padding: 16px;
}
.toolbar-actions {
  background-color: #f6f6f6;
  padding: 16px 0;
}
.filter-btn {
  background-color: transparent;
  color: #ff9800;
  border: 1px solid #ff9800;
}
/* .add-user-btn {
  background-color: #ff9800;
  color: white;
} */
</style>
