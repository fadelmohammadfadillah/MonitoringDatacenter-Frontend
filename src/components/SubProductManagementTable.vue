<template>
  <TableCustom
    title="Manajemen Sub Produk"
    entity="Sub Produk"
    :headers="headers"
    :items="subproduk"
    @addEntity="addSubProduk"
  />
</template>

<script setup>
import { ref } from "vue";
import TableCustom from "@/components/TableCustom.vue";

const headers = [
  { text: "No", align: "start", value: "no" },
  { text: "Nama Sub Produk", align: "start", value: "product" },
];

const subproduk = ref([

  {
    no: 1,
    nama: "Ecardman",
    product: "Ecardman",
  },
  {
    no: 2,
    nama: "Emware-ws",
    product: "Emware-ws",
  },
  {
    no: 3,
    nama: "Engine Token",
    product: "Engine Token",
  },

  {
    no: 4,
    nama: "E-Report",
    product: "E-Report",
  },
  {
    no: 5,
    nama: "E-Config",
    product: "E-Config",
  },
  {
    no: 6,
    nama: "E-Monitoring",
    product: "E-Monitoring",
  },
  {
    no: 7,
    nama: "ATM",
    product: "ATM",
  },
  {
    no: 8,
    nama: "Ecardman",
    product: "Ecardman",
  },
  {
    no: 9,
    nama: "Host",
    product: "Host",
  },
  {
    no: 10,
    nama: "TCP",
    product: "TCP",
  },
  {
    no: 11,
    nama: "emware-ws",
    product: "emware-ws",
  },





]);

const addSubProduk = () => {
  // Logika tambah pengguna di sini
};
</script>

<style scoped></style>
