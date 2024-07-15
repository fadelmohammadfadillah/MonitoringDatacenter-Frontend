<template>
  <TableCustom
    title="Manajemen Produk"
    entity="Produk"
    :headers="headers"
    :items="produk"
    @addEntity="addProduk"
  />
</template>

<script setup>
import { ref } from "vue";
import TableCustom from "@/components/TableCustom.vue";

const headers = [
  { text: "No", align: "start", value: "no" },
  { text: "Nama Produk", align: "start", value: "product" },
];

const produk = ref([

  {
    no: 1,
    nama: "Switcihng",
    product: "Switcihng",
  },
  {
    no: 2,
    nama: "Middleware",
    product: "Middleware",
  },



]);

const addProduk = () => {
  // Logika tambah pengguna di sini
};
</script>

<style scoped></style>
