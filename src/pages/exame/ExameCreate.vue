<template>
  <div>
    <div class="row header-title text-primary">
      <div class="col-12 col-md-6">
        <div class="q-px-lg">
          <h2 class="title text-secondary">Criar o exame</h2>
        </div>
      </div>
    </div>
    <q-card-section class="q-pt-xl q-pl-xl">
      <q-form class="row" @submit="submit">
        <div class="col-12 col-md-6 q-mb-lg q-pr-md">
          <q-select
            filled
            v-model="exameStore.exame.idMedico"
            :options="options"
            label="Médito"
          />
        </div>
        <div class="col-12 col-md-6 q-mb-lg q-pr-md">
          <q-select
            filled
            v-model="exameStore.exame.idPaciente"
            :options="options"
            label="Paciente"
          />
        </div>
        <div class="col-12 col-md-6 q-mb-lg q-pr-md">
          <q-input filled v-model="exameStore.exame.dataHoraExame">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-12 q-mb-lg q-pr-md">
          <q-input
            filled
            v-model="exameStore.exame.observacao"
            :options="options"
            label="Observa"
            type="textarea"
          />
        </div>
        <q-btn outline color="primary" label="Salvar" type="submit" />
      </q-form>
    </q-card-section>
  </div>
</template>
<script>
import { useExameStore } from "src/stores/exame_store";

export default {
  setup() {
    const exameStore = useExameStore();
    return { exameStore };
  },
  methods: {
    submit() {
      exameStore.postExame();

      // "idMedico": 1,
      // "idPaciente": 2,
      // "dataHoraExame": "2023-09-25 13:01:41",
      // "observacao": "Os resultados do exame estão em conformidade com o previsto.",
      // "resultado": "O exame realizado acusa uma leve alteração na pressão arterial."
    },
  },
};
</script>
