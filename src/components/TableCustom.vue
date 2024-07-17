<template>
    <v-container class="mx-2" style="max-height: 100vh;">
      <v-row>
        <v-col class="text-h4 font-weight-bold pt-8">
          {{ title }}
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
              <tr v-for="item in paginatedItems" :key="item[headers[0].value]">
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
  addEntity: Function,
});

const search = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const perPageOptions = [1, 5, 10, 15, 20, 25];

const filteredItems = computed(() => {
  return props.items.filter((item) =>{
    return props.headers.some((header) => {
      const fieldValue = item[header.value]
      if(fieldValue){
        return fieldValue.toString().toLowerCase().includes(search.value.toLowerCase())
      }
    })
    // return item.divisiName.toLowerCase().includes(search.value.toLowerCase())
  }
  );
});

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredItems.value.slice(startIndex, startIndex + itemsPerPage.value);
});


watch(props.items, () => {
  currentPage.value = 1
})

const changePage = (page) => {
  currentPage.value = page;
};

const addEntityClicked = () => {
  props.addEntity();
};
</script>

<style scoped></style>
