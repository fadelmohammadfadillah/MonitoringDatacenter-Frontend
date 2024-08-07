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
            item-value="idstatusServerApp"
            show-expand
            height="44vh"
            sticky
            hover
            class="rounded-xl"
        >
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
                        <!-- Slot untuk kolom Status -->
                        <template v-slot:item.pathServer="{item: detail}">
                            <div class="text-caption font-weight-light">Path :</div>
                            <div class="text-body-2 font-weight-regular">{{detail.pathServer}}</div>
                        </template>  
                        <template v-slot:item.usageServer="{item: detail}">
                            <div class="text-caption font-weight-light">Usage(%):</div>
                            <div class="text-body-2 font-weight-regular">{{detail.usageServer}}</div>
                        </template>
                        <template v-slot:item.status="{ item }">
                            <div class="text-caption font-weight-light">Status :</div>
                            <v-chip :color="getStatusColor(item.status)" text-color="white" small>
                                {{ item.status }}
                            </v-chip>
                        </template>
                        <template v-slot:item.noteServerApp="{item: detail}">
                            <div class="text-caption font-weight-light">Catatan Petugas:</div>
                            <div class="text-body-2 font-weight-regular">{{detail.noteServerApp}}</div>
                        </template>
                        <template v-slot:item.actions="{item: detail}">
                            <v-btn
                                icon="mdi-dots-horizontal"
                                size="small"
                                color="grey"
                                variant="plain"
                            ></v-btn>
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
  detailHeaders: Array,
  viewDetail: Function,
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
    case "DISETUJUI":
      return "purple";
    case "DITOLAK":
      return "red";
    case "MENUNGGU PERSETUJUAN":
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