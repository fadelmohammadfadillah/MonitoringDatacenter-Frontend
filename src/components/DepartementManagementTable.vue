  <template>
    <TableCustom
      title="Manajemen Departement"
      entity="Departemen"
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
