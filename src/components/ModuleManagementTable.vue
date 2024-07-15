<template>
  <TableCustom
    title="Manajemen Module"
    entity="Module"
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
  { text: "Nama Module", align: "start", value: "module" },
  { text: "Profile TCP", align: "start", value: "profile" },
];

const divisi = ref([
  {
    no: 1,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
  {
    no: 2,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
  {
    no: 3,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
  {
    no: 4,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
  {
    no: 5,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
  {
    no: 6,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
  {
    no: 7,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
  {
    no: 8,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
  {
    no: 9,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
  {
    no: 10,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
  {
    no: 11,
    nama: "mtask",
    module: "mtask",
    profile: "AD001015",
  },
]);

const addDivisi = () => {
  // Logika tambah pengguna di sini
};
</script>

<style scoped></style>
