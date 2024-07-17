<template>
    <v-container class="mx-2">
      <v-row>
        <v-col class="text-h4 font-weight-bold pt-8">
          Manajemen Pengguna
        </v-col>
      </v-row>

      <v-row class="toolbar-actions" align="center" justify="space-between">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            placeholder="Cari Pengguna"
            clearable
            dense
            prepend-inner-icon="mdi-magnify"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="auto" class="d-flex justify-end">
          <v-btn
            class="text-white mx-4"
            prepend-icon="mdi-filter-variant"
            variant="outlined"
            color="orange"
          >
            Filter
          </v-btn>

          <v-btn
            prepend-icon="mdi-plus"
            class="text-white"
            color="orange"
            @click="openAddUserForm"
          >
            Tambah Pengguna
          </v-btn>

          <AddUserForm
            ref="addUserForm"
            @add-user="handleAddUser"
          ></AddUserForm>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-table>
            <thead class="bg-orange-lighten-5">
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">Nama</th>
                <th class="text-left">Role</th>
                <th class="text-left">Divisi</th>
                <th class="text-left">Departemen</th>
                <th class="text-left">Email</th>
                <th class="text-left">Status</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedUsers" :key="item.no">
                <td>{{ item.no }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.role }}</td>
                <td>{{ item.divisi }}</td>
                <td>{{ item.departemen }}</td>
                <td>{{ item.email }}</td>
                <td>
                  <v-chip
                    :color="getStatusColor(item.status)"
                    text-color="white"
                    small
                  >
                    {{ item.status }}
                  </v-chip>
                </td>
                <td>
                  <v-menu bottom right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        class="text-white mx-1"
                        prepend-icon="mdi-dots-horizontal"
                        variant="plain"
                        color="orange"
                      >
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="editItem(item)">
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteItem(item)">
                        <v-list-item-title>Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </td>
              </tr>
            </tbody>
          </v-table>

          <v-row class="d-flex justify-between align-center mt-4">
            <v-col cols="auto">
              <div class="left pa-2">
                <span>Item per halaman:</span>
                <v-select
                  v-model="itemsPerPage"
                  :items="perPageOptions"
                  outlined
                  dense
                ></v-select>
              </div>
            </v-col>
            <v-col cols="center" class="d-flex justify-end">
              <v-pagination
                v-model="currentPage"
                :length="Math.ceil(filteredUsers.length / itemsPerPage)"
                rounded="circle"
                @input="changePage"
                color="orange"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import AddUserForm from "@/components/AddUserForm.vue";

const users = ref([
  {
    no: 1,
    nama: "Athalie Aurora",
    role: "Supervisor",
    divisi: "Digital Enterprise",
    departemen: "Card & Digital Transaction",
    email: "auroraaawr@gmail.com",
    status: "Active",
  },
  {
    no: 2,
    nama: "Fadel Mohammad",
    role: "Product Owner",
    divisi: "Digital Enterprise",
    departemen: "Card & Digital Transaction",
    email: "fadelCihuy@gmail.com",
    status: "Active",
  },
  {
    no: 3,
    nama: "Jovanka Siginendra",
    role: "Operator",
    divisi: "Infrastructure",
    departemen: "Data Center Operation",
    email: "JovanAyee@gmail.com",
    status: "Active",
  },
]);

const search = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10); // Menggunakan ref untuk itemsPerPage
const perPageOptions = [1, 5, 10, 15, 20, 25]; // Options for items per page

const addUserForm = ref(null);

const openAddUserForm = () => {
  addUserForm.value.openDialog();
};

const handleAddUser = (newUser) => {
  users.value.push(newUser);
  // Perbarui nomor urut
  users.value.forEach((user, index) => (user.no = index + 1));
};

const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    user.nama.toLowerCase().includes(search.value.toLowerCase())
  );
});

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredUsers.value.slice(startIndex, startIndex + itemsPerPage.value);
});

const changePage = (page) => {
  currentPage.value = page;
};

const getStatusColor = (status) => {
  if (status === "Active") {
    return "green";
  } else if (status === "No Active") {
    return "red";
  } else if (status === "Pending") {
    return "orange";
  }
};
</script>

<style scoped></style>
