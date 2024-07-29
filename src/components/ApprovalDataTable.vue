<template>
  <v-container>
    <v-row class="toolbar-actions" align="center" justify="space-between">
    </v-row>
      <v-spacer>

    </v-spacer>
    <v-data-table
      v-model:expanded="expanded"
      :headers="headers"
      :items="paginatedItems"
      :search="search"
      hide-default-footer
      item-value="no"
      show-expand
      height="44vh"
      variant: 
      sticky
      class="rounded-xl"
    >
      <template v-slot:column.header="{ column }">
        <th style="background-color: #FCB275">
          {{ column.title }}
        </th>
      </template>
      <!-- Slot untuk kolom Status -->
      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" text-color="white" small>
          {{ item.status }}
        </v-chip>
      </template>
      <!-- Expanded row slot -->
      <template v-slot:expanded-row="{ item }">
        <tr>
          <td :colspan="headers.length + 1" class="pa-0">
            <v-data-table
              :headers="detailHeaders"
              :items="item.details"
              hide-default-footer
              hide-default-header
              style="background-color: #F6F6F6"
            >
              <template v-slot:item.operator="{item: detail}">
                <div class="text-caption font-weight-light">Nama Petugas:</div>
                <div class="text-body-2 font-weight-regular">{{detail.operator}}</div>
              </template>  
              <template v-slot:item.date="{item: detail}">
                <div class="text-caption font-weight-light">Tanggal:</div>
                <div class="text-body-2 font-weight-regular">{{detail.date}}</div>
              </template>
              <template v-slot:item.submitTime="{item: detail}">
                <div class="text-caption font-weight-light">Waktu Submit:</div>
                <div class="text-body-2 font-weight-regular">{{detail.submitTime}}</div>
              </template>
              <template v-slot:item.detailedStatus="{item: detail}">
                <div class="text-caption font-weight-light">Status:</div>
                <v-chip
                  :color="getStatusColor(detail.detailedStatus)"
                  text-color="white"
                  size="small"
                >
                {{ detail.detailedStatus }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{item: detail}">
                <v-btn
                  size="small"
                  color="orange"
                  variant="outlined"
                  @click="viewDetail(item)"
                >Lihat Detail</v-btn>
              </template>
            </v-data-table>
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
  detailHeaders: Array,
});

if (props.detailHeaders[props.detailHeaders.length - 1].title !== "Action") {
  // eslint-disable-next-line vue/no-mutating-props
  props.detailHeaders.push({
    title: "Action",
    align: "end",
    key: "actions",
    sortable: false,
  });
}

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

<style scoped></style>
