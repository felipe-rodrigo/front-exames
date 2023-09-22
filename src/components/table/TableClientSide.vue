<template>
  <q-table class="cge-table-custom" color="secondary" :pagination="pagination" :rows="rows" :loading="loading"
    :columns="columns" :grid="screen.name === 'xs'" @request="$emit('onRequest', onRequest)">
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template v-slot:no-data="{ icon, filter }">
      <div class="full-width row flex-center text-secondary q-gutter-sm">
        <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        <span> Sem dados </span>
      </div>
    </template>
    <template v-slot:item="props">
      <div class="swipe-container col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        :style="props.selected ? 'transform: scale(0.95);' : ''" @touchend="handleSwipe(props)"
        :ref="'item' + props.rowIndex">

        <div class="action left">
          <i class="material-icons">edit</i>
        </div>

        <div class="swipe-element" :class="props.selected ? 'bg-grey-2' : ''" @click="$emit('onRowClick', props.row)">
          <q-list dense>
            <q-item v-for="col in props.cols.filter(col => col.name !== 'actions')" :key="col.name">
              <q-item-section>
                <q-item-label>{{  col.label  }}</q-item-label>
              </q-item-section>
              <q-item-section side class="break-50">
                <q-item-label caption>{{  col.value  }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="action right">
          <i class="material-icons">close</i>
        </div>
      </div>
    </template>
    <template #[getSlotName(item.name)]="props"
      v-for="item in (columns.filter(x => templateRow.includes(x.name) && x.name !== 'actions'))" :key="item.id">
      <slot :name="getSlotName(item.name)" :props="props"></slot>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <span @click="actionsOpen(props)">
          <q-icon class="btn-actions" size="xs" name="fa-solid fa-ellipsis-vertical" color="grey-6">
          </q-icon>
        </span>
        <q-btn-dropdown :ref="`actionsOpen${props.rowIndex}`" color="secondary" icon="fa-solid fa-ellipsis-vertical"
          class="invisible nimbo">
          <q-list>
            <q-item dense clickable v-close-popup @click="$emit('editRow', props)">
              <q-item-section avatar>
                <q-avatar icon="fa-solid fa-pen-to-square" size="md" color="with" text-color="grey-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Editar</q-item-label>
              </q-item-section>
            </q-item>
            <q-item dense clickable v-close-popup @click="$emit('deleteRow', props)">
              <q-item-section avatar>
                <q-avatar icon="fa-solid fa-trash" color="with" size="md" text-color="grey-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Apagar</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { computed } from "vue";
import { exportTable } from "../../helper/export";
import { useQuasar } from "quasar";
import { useCommonStore } from "src/stores/common.store";

export default {
  emits: ['onRequest', 'onRowClick', 'editRow', 'deleteRow', 'submit'],
  props: ['pagination', 'rows', 'loading', 'columns', 'templateRow'],
  components: {},
  setup() {
    const commonStore = useCommonStore();
    const quasar = useQuasar();
    const screen = computed(() => {
      return quasar.screen;
    });
    return { commonStore, exportTable, screen, quasar };
  },
  methods: {
    handleSwipe(item) {
      const minDistance = 100;
      const container = this.getElement(item);
      const swipeDistance = container.scrollLeft - container.clientWidth;

      if (swipeDistance < (minDistance * -1)) {
        this.$emit('editRow', item);
      } else if (swipeDistance > minDistance) {
        this.$emit('deleteRow', item);
      } else {
        console.log(`did not swipe ${minDistance}px`);
      }
    },
    getElement(item) {
      return this.$refs['item' + item.rowIndex];
    },
    setIsOpen() {
      return this.actionsOpen = !this.actionsOpen;
    },
    actionsOpen(props) {
      const item = this.$refs[`actionsOpen${props.rowIndex}`]
      item.toggle();
    },
    getSlotName(item) {
      return `body-cell-${item}`;
    }
  }
};
</script>
