<template>
  <div>
    <TableCustom
      title="Manajemen Pengguna"
      entity="Pengguna"
      :headers="headers"
      :items="users"
      :addEntity="addUser"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TableCustom from "@/components/TableCustom.vue";

const headers = [
  { text: "No", align: "start", value: "no" },
  { text: "Nama", align: "start", value: "nama" },
  { text: "Role", align: "start", value: "role" },
  { text: "Divisi", align: "start", value: "divisi" },
  { text: "Departemen", align: "start", value: "departemen" },
  { text: "Email", align: "start", value: "email" },
  { text: "Status", align: "start", value: "status" },
];

const users = ref([
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
    status: "No Active",
  },
]);

const addUser = () => {
  // Contoh logika tambah pengguna
  const newUser = {
    no: users.value.length + 1,
    nama: "Nama Pengguna Baru",
    role: "Role Baru",
    divisi: "Divisi Baru",
    departemen: "Departemen Baru",
    email: "emailbaru@example.com",
    status: "Active",
  };
  users.value.push(newUser);
};
</script>

<style scoped></style>



==========

DivisiManagementTable

<template>
  <TableCustom
    title="Manajemen Divisi"
    entity="Divisi"
    :headers="headers"
    :items="divisi"
    @addEntity="addDivisi"
  />
</template>

<script setup>
import { ref } from "vue";
import TableCustom from "@/components/TableCustom.vue";

const headers = [
  { text: "No", align: "start", value: "no" },
  { text: "Divisi", align: "start", value: "divisi" },
  { text: "Departemen", align: "start", value: "departemen" },
];

const divisi = ref([
  {
    no: 1,
    nama: "Digital Enterprise",
    divisi: "Digital Enterprise",
    departemen: "Card & Digital Transaction",
  },
  {
    no: 2,
    nama: "Digital Enterprise",
    divisi: "Digital Enterprise",
    departemen: "Digital Channel",
  },
  {
    no: 3,
    nama: "Core Banking System Conventional",
    divisi: "Core Banking System Conventional",
    departemen: "Business Application Conventional",
  },
  {
    no: 4,
    nama: "Core Banking System Conventional",
    divisi: "Core Banking System Conventional",
    departemen: "System Application Development Conventional",
  },

  {
    no: 5,
    nama: "Core Banking System Syariah",
    divisi: "Core Banking System Syariah",
    departemen: "Business Application Syariah",
  },
  {
    no: 6,
    nama: "Core Banking System Syariah",
    divisi: "Core Banking System Syariah",
    departemen: "System Application Development Syariah",
  },
  {
    no: 7,
    nama: "Business Development",
    divisi: "Business Development",
    departemen: "Sales & Business Development",
  },
  {
    no: 8,
    nama: "Surrounding Application",
    divisi: "Surrounding Application",
    departemen: "Data Warehouse & Management Information System",
  },
  {
    no: 9,
    nama: "Surrounding Application",
    divisi: "Surrounding Application",
    departemen: "E-Government & Surrounding Application",
  },
  {
    no: 10,
    nama: "Regulatory & Financial Reporting",
    divisi: "Regulatory & Financial Reporting",
    departemen: "Regulatory Support",
  },
  {
    no: 11,
    nama: "Infrastrukture",
    divisi: "Infrastrukture",
    departemen: "Infrastrukture & Application Support Operation",
  },
]);

const addDivisi = () => {
  // Logika tambah pengguna di sini
};
</script>

<style scoped></style>
