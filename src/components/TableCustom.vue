<template>
  <div class="table-custom mx-4">
    <v-container>
      <v-row>
        <v-col>
          <v-toolbar flat color="white" class="pt-5">
            <v-toolbar-title class="text-h5 font-weight-bold">
              {{ title }}
            </v-toolbar-title>
          </v-toolbar>
        </v-col>
      </v-row>

      <v-row class="toolbar-actions" align="center" justify="space-between">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            :placeholder="'Cari ' + entity"
            clearable
            dense
            prepend-inner-icon="mdi-magnify"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="auto" class="d-flex justify-end">
          <v-btn
            class="text-white mx-4"
            prepend-icon="mdi-filter-variant"
            variant="outlined"
            color="orange"
          >
            Filter
          </v-btn>

          <v-btn
            prepend-icon="mdi-plus"
            class="text-white"
            color="orange"
            @click="addEntityClicked"
          >
            Tambah {{ entity }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-table>
            <thead class="bg-orange-lighten-5">
              <tr>
                <th
                  class="text-left"
                  v-for="header in headers"
                  :key="header.value"
                >
                  {{ header.text }}
                </th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedItems" :key="item.no">
                <td v-for="header in headers" :key="header.value">
                  {{ item[header.value] }}
                </td>
                <td>
                  <v-btn
                    class="text-white mx-1"
                    prepend-icon="mdi-dots-horizontal"
                    variant="plain"
                    color="orange"
                  >
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>

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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  title: String,
  entity: String,
  headers: Array,
  items: Array,
  addEntity: Function,
});

const search = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const perPageOptions = [1, 5, 10, 15, 20, 25];

const filteredItems = computed(() => {
  return props.items.filter((item) =>
    item.nama.toLowerCase().includes(search.value.toLowerCase())
  );
});

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredItems.value.slice(startIndex, startIndex + itemsPerPage.value);
});

const changePage = (page) => {
  currentPage.value = page;
};

const addEntityClicked = () => {
  props.addEntity();
};
</script>

<style scoped></style>
