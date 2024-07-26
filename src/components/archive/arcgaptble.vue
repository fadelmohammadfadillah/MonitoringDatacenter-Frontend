<template>
  <v-container class="mx-2" style="max-height: 100vh">
    <v-row class="toolbar-actions" align="center" justify="space-between">
    </v-row>
    <v-data-table
      v-model:expanded="expanded"
      :headers="headers"
      :items="paginatedItems"
      :search="search"
      hide-default-footer
      item-value="no"
      show-expand
      class="elevation-2"
      height="44vh"
      sticky-header
    >
      <!-- Slot untuk kolom Status -->
      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" text-color="white" small>
          {{ item.status }}
        </v-chip>
      </template>

      <!-- Expanded row slot -->
      <template v-slot:expanded-row="{ item }">
        <tr>
          <td :colspan="headers.length">
            <v-row>
              <v-col
                v-for="detail in item.details"
                :key="detail.submitTime"
                cols="auto"
              >
                <tbody>
                  <v-row no-gutters class="py-1">
                    <v-col cols="12 " md="3" class="d-flex align">
                      <div class="d-flex flex-column">
                        <span class="font-weight-bold">Nama Petugas:</span>
                        <span class="info-text">{{ detail.operator }}</span>
                      </div>
                    </v-col>

                    <v-col cols="12" md="2" class="d-flex align-center">
                      <div class="d-flex flex-column">
                        <span class="font-weight-bold">Tanggal:</span>
                        <span class="info-text">{{ item.date }}</span>
                      </div>
                    </v-col>

                    <v-col cols="12" md="2" class="d-flex align-center">
                      <div class="d-flex flex-column">
                        <span class="font-weight-bold">Waktu Submit:</span>
                        <span class="info-text">{{ detail.submitTime }}</span>
                      </div>
                    </v-col>

                    <v-col cols="12" md="2" class="d-flex align-center">
                      <v-chip
                        :color="getStatusColor(detail.detailedStatus)"
                        text-color="white"
                        class="info-chip"
                      >
                        {{ detail.detailedStatus }}
                      </v-chip>
                    </v-col>

                    <v-col
                      cols="12"
                      md="2"
                      class="d-flex align-center justify-end"
                    >
                      <v-btn
                        color="orange"
                        variant="outlined"
                        @click="viewDetails(item)"
                      >
                        Lihat Detail
                      </v-btn>
                    </v-col>
                  </v-row>
                </tbody>
                
              </v-col>
            </v-row>
          </td>
        </tr>
      </template>
    </v-data-table>

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
          :length="Math.ceil(filteredItems.length / itemsPerPage)"
          rounded
          @input="changePage"
          color="orange"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  title: String,
  entity: String,
  headers: Array,
  items: {
    type: Array,
    default: () => [],
  },
});

const expanded = ref([]);

const search = ref("");

const getStatusColor = (status) => {
  switch (status) {
    case "Disetujui":
      return "green";
    case "Ditolak":
      return "red";
    case "Menunggu Disetujui":
      return "orange";
    default:
      return "grey";
  }
};

const currentPage = ref(1);
const itemsPerPage = ref(10);
const perPageOptions = [1, 5, 10, 15, 20, 25, 50, 100];

const filteredItems = computed(() => {
  return props.items.filter((item) => {
    return props.headers.some((header) => {
      const fieldValue = item[header.key];
      if (fieldValue) {
        return fieldValue
          .toString()
          .toLowerCase()
          .includes(search.value.toLowerCase());
      }
    });
  });
});

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredItems.value.slice(startIndex, startIndex + itemsPerPage.value);
});

watch(props.items, () => {
  currentPage.value = 1;
});

const changePage = (page) => {
  currentPage.value = page;
};

const viewDetails = (detail) => {
  console.log("Lihat detail untuk:", detail);
  // Implementasi logika detail view disini
};
</script>

<style scoped></style>
