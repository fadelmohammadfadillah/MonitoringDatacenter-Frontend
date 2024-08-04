<template>
  <v-list-item class="pa-0">
    <v-btn
      @mouseover="isHovering = true"
      @mouseleave="isHovering = false"
      :variant="isHovering ? 'tonal' : 'plain'"
      :color="isHovering ? 'orange' : 'black'"
      block
      :prepend-icon="icon"
      @click="$router.push({name: routeLink})"
      class="text-subtitle-2 font-weight-medium pl-4 py-5"
      rounded="lg"
      style="justify-content: start"
      >{{ text }}</v-btn
    >
  </v-list-item>
</template>
<script setup>
  const props =  defineProps({
    icon: {
      type: String,
      default: 'mdi-home',
    },
    text: {
      type: String,
      default: 'home',
    },
    routeLink: {
      type: String,
      default: "",
    }
  });

  const isHovering = ref(false);
</script>
