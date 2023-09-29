
import { QSlideItem } from 'quasar';
<template>
  <div >oiiiiiiiiiiiiiiiiiiiiii</div>
  <li v-for="item in exameStore.examesResponse" :key="item.id">
  {{ item.medico.nome }}
</li>
</template>

<script>
import { useExameStore } from "src/stores/exame_store";
import { usePacienteStore } from "src/stores/paciente_store";
import { onMounted } from "vue";
import { useMedicoStore } from "src/stores/medico_store"

export default {
  setup() {
    const exameStore = useExameStore();
    const pacienteStore = usePacienteStore();
    const medicoStore = useMedicoStore();
    // console.log(optionsMed);
    exameStore.getExameList();
    console.log(exameStore.examesResponse);

    return { exameStore, pacienteStore, medicoStore };
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

