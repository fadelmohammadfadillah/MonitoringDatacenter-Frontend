<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row class="toolbar-actions" align="center" justify="space-between">
    </v-row>
    <v-spacer>

</v-spacer>
    <!-- v-model:sort-by="sortBy" -->
    <v-data-table
      :headers="headers"
      :items="paginatedItems"

      hide-default-footer
      height="44vh"
      variant: 
      sticky
      class="rounded-xl"
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
              color="orange"
              v-bind="props"
              icon="mdi-dots-horizontal"
              variant="plain"
            ></v-btn>
          </template>

          <v-list class="left rounded-lg px-4 pr-6">
            <v-list-item title="Lihat Detail" @click="() => dialogEdit(item)">
            </v-list-item>
          
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <v-row class="d-flex justify-between align-center mb-12">
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
  editEntity: Function, 
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


const dialogEdit = (item) => {
  props.editEntity(item);
};

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
    case "OK":
      return "green";
    case "No Active":
    case "NOK":
      return "red";
    case "Pending":
    case "WARN":
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
