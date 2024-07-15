<template>
  <TableCustom
    title="Manajemen Bank"
    entity="Bank"
    :headers="headers"
    :items="bank"
    @addEntity="addBank"
  />
</template>

<script setup>
import { ref } from "vue";
import TableCustom from "@/components/TableCustom.vue";

const headers = [
  { text: "No", align: "start", value: "no" },
  { text: "Bank", align: "start", value: "bank" },
];

const bank = ref([

  {
    no: 1,
    nama: "Bank Aceh",
    bank: "Bank Aceh",
  },
  {
    no: 2,
    nama: "Industrial Bank of Korea",
    bank: "Industrial Bank of Korea",
  },
  {
    no: 3,
    nama: "Bank Sulteng",
    bank: "Bank Sulteng",
  },
  {
    no: 4,
    nama: "Bank NTB",
    bank: "Bank NTB",
  },
  {
    no: 5,
    nama: "Bank Bengkulu",
    bank: "Bank Bengkulu",
  },


]);

const addBank = () => {
  // Logika tambah pengguna di sini
};
</script>

<style scoped></style>
