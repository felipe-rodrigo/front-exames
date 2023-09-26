<template>
  <q-page class="row items-center justify-evenly">
    <DashboardTest />
    Bem vindo!
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DashboardTest from "src/dashboard/DashboardTest.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    DashboardTest,
  },
});
</script>
