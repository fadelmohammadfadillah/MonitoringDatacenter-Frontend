<template>
  <v-container class="mx-2" style="max-height: 100vh">
    <v-row class="toolbar-actions" align="center" justify="space-between">
      <v-col cols="auto" class="d-flex justify-end">
        <!-- Optional toolbar actions can be added here -->
      </v-col>
    </v-row>
    <v-data-table
      v-model:expanded="expanded"
      :headers="headers"
      :items="paginatedItems"
      :search="search"
      hide-default-footer
      item-value="no"
      show-expand
      class="elevation-1"
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
            <v-card flat>
              <v-card-text>
                <v-data-table
                  :headers="detailHeaders"
                  :items="item.details"
                  hide-default-footer
                  item-value="submitTime"
                  class="elevation-1"
                  dense
                >
                  <template v-slot:item.operator="{ item }">
                    <td>{{ item.operator }}</td>
                  </template>

                  <template v-slot:item.submitTime="{ item }">
                    <td>{{ item.submitTime }}</td>
                  </template>

                  <template v-slot:item.detailedStatus="{ item }">
                    <td>
                      <v-chip
                        :color="getStatusColor(item.detailedStatus)"
                        text-color="white"
                      >
                        {{ item.detailedStatus }}
                      </v-chip>
                    </td>
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <td>
                      <v-btn color="primary" text @click="viewDetail(item)">
                        Lihat Detail
                      </v-btn>
                    </td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
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

const viewDetail = (detail) => {
  console.log("Lihat detail untuk:", detail);
  // Implementasi logika detail view disini
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
