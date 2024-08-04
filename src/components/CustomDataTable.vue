<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container class="mx-2" style="max-height: 100vh">
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
          variant="outlined"
  
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
          @click="dialogInsert"
        >
          Tambah {{ entity }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- v-model:sort-by="sortBy" -->
    <v-data-table
      :headers="headers"
      :items="paginatedItems"
      :search="search"
      hide-default-footer
      height="44vh"
      sticky
      hover
    >
      <!-- Slot untuk kolom Status -->
      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" text-color="white" small>
          {{ item.status }}
        </v-chip>
      </template>

      <!-- Slot untuk kolom Action -->
      <template v-slot:item.actions="{ item }">
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              color="grey"
              v-bind="props"
              icon="mdi-dots-horizontal"
              variant="plain"
            ></v-btn>
          </template>

          <v-list class="left rounded-lg px-4 pr-6">
            <v-list-item title="Edit" @click="() => dialogEdit(item)">
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item base-color="red" @click="dialogDelete(item)"
              >Hapus
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <v-row class="d-flex justify-between align-center mt-4">
      <v-col cols="auto">
        <div class="left pa-2">
          <span>Item per halaman:</span>
        </div>
      </v-col>
      <v-col class="v-col-2 pt-15 pl-2 px-12">
        <v-select
          v-model="itemsPerPage"
          :items="perPageOptions"
          variant="outlined"
          dense
          class="pr-13"
        ></v-select>
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
  addEntity: Function,
  editEntity: Function,
  deleteEntity: Function,
});

// eslint-disable-next-line no-unused-vars
const sortBy = [{ key: props.headers[0].key, order: "asc" }];

if (props.headers[props.headers.length - 1].title !== "Action") {
  // eslint-disable-next-line vue/no-mutating-props
  props.headers.push({
    title: "Action",
    align: "end",
    key: "actions",
    sortable: false,
  });
}

const search = ref("");

const dialogInsert = () => {
  props.addEntity();
};

const dialogEdit = (item) => {
  props.editEntity(item);
};

const dialogDelete = (item) => {
  props.deleteEntity(item);
};

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "green";
    case "No Active":
      return "red";
    case "Pending":
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
</script>
