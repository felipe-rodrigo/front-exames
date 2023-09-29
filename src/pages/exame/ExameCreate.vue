<template>
  <div>
    <div class="row header-title text-primary">
      <div class="col-12 col-md-6">
        <div class="q-px-lg">
          <h3 class="text-primary text-weight-medium">Criar o exame</h3>
        </div>
      </div>
    </div>
    <q-card-section class="q-pt-xl q-pl-lg">
      <q-card>
        <q-form class="row q-pa-lg" @submit="submit">
          <div class="col-12 col-md-6 q-mb-lg q-pr-md">
            <!-- <q-item-label class="text-weight-medium">Médico</q-item-label> -->
            <q-select
              v-model="exameStore.exame.idMedico"
              :options="medicoStore.medicosResponse"
              map-options
              emit-value
              option-label="nome"
              :option-value="'id'"
              label="Médico"
            />
          </div>
          {{ exameStore.exame.idMedico }}
          <div class="col-12 col-md-6 q-mb-lg">
            <q-select
              v-model="exameStore.exame.idPaciente"
              :options="optionsMed"
              label="Paciente"
            />
          </div>
          <div class="col-12 col-md-6 q-mb-lg q-pr-md">
            <q-input
              v-model="exameStore.exame.dataHoraExame"
              label="Data/Hora do Exame"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="exameStore.exame.dataHoraExame"
                      mask="YYYY-MM-DD"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 q-mb-lg">
            <q-input
              v-model="exameStore.exame.observacao"
              :options="options"
              label="Observação"
              type="textarea"
            />
          </div>
          <div class="flex col-12 justify-end">
            <q-btn
              class="q-mr-md q-py-md q-px-lg"
              icon="fa-solid fa-xmark"
              color="primary"
              label="Cancelar"
              type="reset"
              flat
              rounded
            />
            <q-btn
              color="primary"
              label="Salvar"
              icon="fa-solid fa-check"
              type="submit"
              class="q-py-md q-px-lg"
              rounded
            />
          </div>
        </q-form>
      </q-card>
    </q-card-section>
  </div>
</template>
<script>
import { useExameStore } from "src/stores/exame_store";
import { usePacienteStore } from "src/stores/paciente_store";
import { useMedicoStore } from "src/stores/medico_store";

export default {
  setup() {
    const exameStore = useExameStore();
    const pacienteStore = usePacienteStore();
    const medicoStore = useMedicoStore();
    const optionsMed = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // console.log(optionsMed);

    medicoStore.getMedicoList();

    return { exameStore, pacienteStore, medicoStore, optionsMed };
  },
  methods: {
    submit() {
      console.log(this.exameStore.exame);
      this.exameStore.exame.idMedico = this.exameStore.exame.idMedico.idMedico;
      this.exameStore.exame.resultado = "teste";
      console.log(this.exameStore.exame.idMedico);

      this.exameStore.postExame();
      debugger;

      // "idMedico": 1,
      // "idPaciente": 2,
      // "dataHoraExame": "2023-09-25 13:01:41",
      // "observacao": "Os resultados do exame estão em conformidade com o previsto.",
      // "resultado": "O exame realizado acusa uma leve alteração na pressão arterial."
    },
  },
};
</script>

<style>
.q-card {
  border-radius: 20px;
}
</style>
