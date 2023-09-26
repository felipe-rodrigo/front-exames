<!-- <template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Gestão de Exames

        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
const linksList = [
  {
    title: 'Docs',
    icon: 'home',
    route: { name : 'home' }
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script> -->

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white header" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../../public/redondo_azul.png" />
          </q-avatar>
          Gestão de Exames
        </q-toolbar-title>

        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
      </q-toolbar>

      <!-- <q-tabs align="left">
        <q-route-tab to="/exames" label="Exames" />
        <q-route-tab to="/medicos" label="Médicos" />
        <q-route-tab to="/pacientes" label="Pacientes" />
      </q-tabs> -->
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->

      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              :active="menuItem.label === 'Outbox'"
              v-ripple
              :to="{ name: 'exame-create' }"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" size="xs" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="primary text-white text-center">
      <!-- <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../../public/redondo_azul.png">
          </q-avatar>
          Gestão de Exames
        </q-toolbar-title>
      </q-toolbar> -->
      <q-toolbar>
        <q-toolbar-title class="text-white row gt-">
          <div class="col-12 col-md text-center text-lg-left q-px-md">
            <q-avatar>
              <img src="../../public/redondo_azul.png" />
            </q-avatar>
            Gestão de Exames
          </div>
        </q-toolbar-title>
        <q-toolbar-title class="text-white row lt-sm">
          <div class="col-12 col-md text-center text-footer q-px-lg text-bold">
            SGE
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { useCommonStore } from "src/stores/common_store";
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const miniState = ref(false);
    const route = useRoute();
    const commonStore = useCommonStore();
    const menuList = [
      {
        icon: "fa-solid fa-user",
        label: "Criar Exame",
        separator: true,
      },

      // {
      //   icon: "fa-solid fa-grip",
      //   label: "aplicativos",
      //   separator: false,
      // },
      // {
      //   icon: "fa-solid fa-bell",
      //   label: "Notificações",
      //   separator: false,
      // },
      // {
      //   icon: "fa-solid fa-gear",
      //   label: "Configurações",
      //   separator: true,
      // },
      // {
      //   icon: "fa-solid fa-arrow-right-from-bracket",
      //   label: "Sair",
      //   separator: true,
      // },
      // {
      //   icon: "fa-solid fa-circle-question",
      //   iconColor: "primary",
      //   label: "Help",
      //   separator: false,
      // },
    ];

    return {
      route,
      drawer: ref(false),
      drawerRight: ref(false),
      menuList,
      miniState,
      commonStore,
      leftDrawerOpen,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
    };
  },
  methods: {
    rotaSelecionada(routerName: string): boolean {
      const route = useRoute();
      return route.name === routerName;
    },
    routesSelected(current: string, child: any[]): boolean {
      const route = useRoute();
      const nameRoute = route.name as string;
      return [current].includes(nameRoute) || child
        ? child?.map((x) => x.route).includes(nameRoute)
        : false;
    },
  },
};
</script>
