<template>
    <v-container class="mx-2">
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
            @click="dialogInsert"
          >
            Tambah {{ entity }}
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        v-model:sort-by="sortBy"
        :headers="headers"
        :items="items"
        :search="search"
        height="50vh"
        sticky
      >
      <template v-slot:item.actions="{ item }">
        <v-menu
          transition="scale-transition"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="orange"
              v-bind="props"
              icon="mdi-dots-horizontal"
              variant="plain"
            >
            </v-btn>
          </template>

          <v-list class="pr-6">
            <v-list-item
              title="Edit"
              @click="() => dialogEdit(item)"
            >
            </v-list-item>
            <v-list-item
              base-color="red"
              @click="dialogDelete(item)"
            >Hapus
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    </v-container>
</template>
<script setup>
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
    const sortBy =  [{ key: props.headers[0].key, order: 'asc'}];

    if(props.headers[props.headers.length - 1].title !== 'Action'){
      props.headers.push({title: 'Action', align: 'end', key: 'actions', sortable: false})
    }

    const search = ref("");

    const dialogInsert = () => {
        // console.log("add entity!");
        props.addEntity();
    };

    const dialogEdit = (item) => {
      // console.log("edit entity");
      props.editEntity(item);
    }

    const dialogDelete = (item) => {
      // console.log("delete entity" + item);
      props.deleteEntity(item);
    }
</script>