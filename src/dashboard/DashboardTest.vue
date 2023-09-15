<template>
  <div >
    <apexchart type="area" height="350" :options="chartOptions" :series="chartSeries"></apexchart>
  </div>
</template>
<script>

import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: ["January", "February", "March", "April", "May"],
        },
      },
      chartSeries: [
        {
          name: "Sample Data",
          data: [30, 40, 45, 50, 49],
        },
      ],
    };
  },
};
</script>
