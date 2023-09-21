<template>
  <CgeHeaderTitle>
    <div class="flex justify-end items-center">
      <q-input outlined class="btn-search q-mr-sm" v-model="pacienteStore.searchString" bg-color="white">
        <template #after>
          <div>
            <q-btn color="secondary" icon-right="fa-solid fa-magnifying-glass cge" no-caps />
          </div>
        </template>
      </q-input>
      <q-btn class="gt-sm btn-height" color="secondary" icon-right="fa-solid fa-plus cge" label="Novo" no-caps
        @click="newItem" />
      <q-page-sticky position="top-right" :offset="[10, 20]" class="btn-floating lt-md"
        :class="{ 'opacity': commonStore.scroll.position > 10 }">
        <q-btn fab icon="add" color="secondary" @click="newItem" />
      </q-page-sticky>
    </div>
  </CgeHeaderTitle>
  <TableClientSide :columns="columns" :rows="pacienteStore.getPacienteListByFilter" :loading="pacienteStore.isLoading"
    :pagination="pacienteStore.pagination" :templateRow="['cidadeNome','cidadeSigla']" @onRequest="onRequest"
    @handleSwipe="handleSwipe" @onRowClick="onRowClick" @editRow="editRow" @deleteRow="deleteRow" @submit="submit"
    @actionsOpen="actionsOpen">
    <template v-slot:body-cell-cidadeNome="item">
      <q-td :props="item.props" @click="onRowClick(item.props.row)" class="cursor-pointer">
        {{  item.props.row.cidade.nome}}
      </q-td>
    </template>
    <template v-slot:body-cell-cidadeSigla="item">
      <q-td :props="item.props" @click="onRowClick(item.props.row)" class="cursor-pointer">
        {{  item.props.row.cidade.sigla}}
      </q-td>
    </template>
  </TableClientSide>
</template>

<script>
import { computed, onMounted, onUnmounted } from "vue";
import { exportTable } from "../../helper/export";
import { useQuasar } from "quasar";
import { useCommonStore } from "src/stores/common.store";
import CgeHeaderTitle from "src/components/header/CgeHeaderTitle.vue";
import TableClientSide from "src/components/table/TableClientSide.vue";
import { usePacienteStore } from "../../stores/paciente_store";

export default {
  components: {
    CgeHeaderTitle,
    TableClientSide
  },
  setup() {
    const pacienteStore = usePacienteStore();
    const commonStore = useCommonStore();

    onMounted(() => {
      commonStore.setPageTitle("Listar Pacientes");
    });

    onUnmounted(() => {
      commonStore.hideTitle();
    });

    const columns = [
      {
        name: "id",
        field: "id",
        label: "Código",
        align: "left",
        sortable: true,
        style: 'width: 100px'
      },
      {
        name: "tipoPaciente",
        field: "tipoPaciente",
        label: "Tipo de Paciente",
        align: "left",
        sortable: true,
      },
      {
        name: "documento",
        field: "documento",
        label: "Documento",
        align: "left",
        sortable: true,
      },
      {
        name: "nome",
        field: "nome",
        label: "Nome",
        align: "left",
        sortable: true,
      },
      {
        name: "razaoSocial",
        field: "razaoSocial",
        label: "Razão Social",
        align: "left",
        sortable: true,
      },
      {
        name: "nomeFantasia",
        field: "nomeFantasia",
        label: "Nome Fantasia",
        align: "left",
        sortable: true,
      },
      {
        name: "cidadeSigla",
        field: "cidadeSigla",
        label: "Estado",
        align: "left",
        sortable: true,
      },
      {
        name: "cidadeNome",
        field: "cidadeNome",
        label: "Cidade",
        align: "left",
        sortable: true,
      },
      { name: "actions", label: "Ações", field: "", align: "center", classes: 'tb-actions', },
    ];

    onMounted(() => {
      pacienteStore.getPacienteList();
    });

    const onRequest = (props) => {
      pacienteStore.getPacienteList();
    };

    const quasar = useQuasar();
    const screen = computed(() => {
      return quasar.screen;
    });
    return { pacienteStore, commonStore, columns, onRequest, exportTable, screen, quasar };
  },
  methods: {
    submit() {
      this.pacienteStore.salvar();
    },
    newItem() {
      this.$router.push({ name: "paciente-adicionar" });
    },
    editRow(props) {
      this.pacienteStore.paciente = props.row;
      this.$router.push({ name: "paciente-editar", params: { previousPage: "paciente-listar" } });
    },
    deleteRow(props) {
      this.pacienteStore.paciente = props.row;
      this.pacienteStore.deletar();
    },
    handleSwipe(item) {
      const minDistance = 100;
      const container = this.getElement(item);
      const swipeDistance = container.scrollLeft - container.clientWidth;

      if (swipeDistance < (minDistance * -1)) {
        this.editRow(item);
      } else if (swipeDistance > minDistance) {
        this.deleteRow(item);
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
    onRowClick(row) {
      this.pacienteStore.paciente = row;
      this.$router.push({ name: "paciente-visualizar" });
    }
  }
};
</script>
<style lang="scss" scoped>
:deep(.btn-search) {
  .q-field__inner {
    display: flex;
    align-items: center;

    .q-field__control {
      height: 35.99px;
      width: 100%;
    }
  }

}


@media (max-width: 600px) {
  .btn-search {
    width: 100%;
  }
}
</style>
