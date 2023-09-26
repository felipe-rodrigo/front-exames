<template>
  <div class="row header-title text-primary">
    <div class="col-12 col-md-6 first">
      <div class="title-block">
        <h1 class="title text-secondary">{{ commonStore.pageTitle }}</h1>
      </div>
      <div class="breadcrumbs gt-sm">
        <Breadcrumbs></Breadcrumbs>
      </div>
    </div>
    <div class="col-12 col-md-6 last">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Breadcrumbs from "../breadcrumbs/BreadCrumbs.vue";
import { useRoute, useRouter } from "vue-router";
import { useCommonStore } from "../../stores/common_store";

export default {
  components: {
    Breadcrumbs
  },
  setup() {
    const commonStore = useCommonStore();
    return { commonStore };
  }
}
</script>

<style lang="scss">
.header-title {
  display: flex;
  align-items: center;
  padding-top: 10px;

  div.first {
    display: block;
  }

  div.last {
    text-align: end;
  }

  .title {
    width: max-content;
    max-width: 100%;
    margin-right: 10px;
    margin: 13px 10px 13px 0;
    line-height: 1em;
    font-size: 4.5vh;
  }

  .title-block {
    width: max-content;
  }

  .breadcrumbs {
    width: max-content;
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 2px;
  }

  .actions-rigth {
    display: block;
    position: relative;
    float: right;
  }
}
</style>
