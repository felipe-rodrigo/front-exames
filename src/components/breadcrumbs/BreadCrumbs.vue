<template>
  <div v-if="route.name !== 'inicio'">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Início" to="/" />
      <!-- <q-breadcrumbs-el label="" /> -->
      <q-breadcrumbs-el :label="commonStore.pageTitle" />
    </q-breadcrumbs>
  </div>
</template>
<script lang="ts">
import { title } from 'process';
import { useCommonStore } from 'src/stores/common_store';
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute();
    const commonStore = useCommonStore();
    return { commonStore, route };
  },
};
</script>
