<template>
  <v-container class="mx-2" style="max-height: 100vh">
    <v-row class="toolbar-actions" align="center" justify="space-between">
      <v-col cols="auto" class="d-flex justify-end"> </v-col>
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
      sticky
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
                <div class="d-flex justify-space-between">
                  <span
                    ><strong>Nama Petugas:</strong> {{ item.operator }}</span
                  >
                  <span><strong>Tanggal:</strong> {{ item.date }}</span>
                  <span
                    ><strong>Waktu Submit:</strong> {{ item.submitTime }}</span
                  >
                  <v-chip :color="getStatusColor(item.detailedStatus)">
                    {{ item.detailedStatus }}
                  </v-chip>
                  <v-btn color="primary" text @click="viewDetails(item)"
                    >Lihat Detail</v-btn
                  >
                </div>
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
          rounded="circle"
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

// eslint-disable-next-line no-unused-vars
const sortBy = [{ key: props.headers[0].key, order: "asc" }];

if (props.headers[props.headers.length - 1].title !== "Action") {
  // eslint-disable-next-line vue/no-mutating-props
  props.headers.push({
    align: "end",
    key: "actions",
    sortable: false,
  });
}

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

const viewDetails = (item) => {
  console.log("Lihat detail untuk:", item);
  // Implementasi logika detail view disini
};
</script>
