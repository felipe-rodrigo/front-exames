<template>
  <q-page padding>
    <DashboardTest />
    testetstets
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import DashboardTest from 'src/dashboard/DashboardTest.vue'

export default defineComponent({

  name: 'IndexPage',
  components: {
    DashboardTest
  }
})
</script>
