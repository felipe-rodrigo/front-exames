<template>
  <CgeHeaderTitle></CgeHeaderTitle>
  <q-card class="my-card">
    <q-card-section class="q-pt-xl q-pl-xl" >
      <q-form class="row" @submit="submit">

        <div class="col-12 col-md-5 q-mb-lg q-pr-md">
          <q-select clearable square filled v-model="pessoaStore.pessoa.tipoPessoa" label="Tipo de Pessoa" :options="tpessoa"
            :option-label="item => item.label" emit-value map-options
            @update:model-value="val=>showHideCard(val)" :rules="[validationRequired]"
          />
        </div>

        <div class="col-12 col-md-7"><p>&nbsp;</p></div>

        <div v-if="this.fisica" class="col-12 col-md-10 row">
          <q-card class="col-12 col-md-12 row q-pa-md q-mb-sm">
              <div class="col-12 q-mb-sm">
                <h6>Informações de Pessoa Física:</h6>
              </div>

              <div class="col-12 col-md-6 q-pr-md">
                <q-input square filled v-model="pessoaStore.pessoa.nome" label="Nome:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 200),
                ]" />
              </div>

              <div class="col-12 col-md-6">
                <q-input square filled v-model="pessoaStore.pessoa.documento"
                  label="CPF"  :readonly="isView" placeholder="somente números"
                         mask="###.###.###-##"
                         :rules="[
                  validationRequired
                ]"
                />
              </div>

              <div class="col-12 col-md-6 q-pr-md">
                <q-input square filled v-model="pessoaStore.pessoa.rG" label="RG:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 15),
                ]" />
              </div>

              <div class="col-12 col-md-6">
                <q-input square filled v-model="pessoaStore.pessoa.rgOrgao" label="Órgão Expeditor:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 10),
                ]" />
              </div>

            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled label="Data de Nascimento:" v-model="pessoaStore.pessoa.dtnascimento" mask="##/##/####"
                       :rules="[
              validationRequired,
              validationDate
            ]">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="pessoaStore.pessoa.dtnascimento" mask="DD/MM/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Fechar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

            </div>

            <div class="col-12 col-md-6">
              <q-input square filled v-model="pessoaStore.pessoa.nomeMae" label="Nome da Mãe:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 200),
                ]" />
            </div>
          </q-card>
        </div>
        <div v-if="this.juridica" class="col-12 col-md-10 row">
          <q-card class="col-12 col-md-12 row q-pa-md q-mb-sm">
            <div class="col-12 q-mb-sm">
              <h6>Informações de Pessoa Jurídica:</h6>
            </div>
            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled v-model="pessoaStore.pessoa.documento"
                       label="CNPJ"  :readonly="isView" placeholder="somente números"
                       mask="##.###.###/####-##"
                       :rules="[
                  validationRequired
                ]"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input square filled v-model="pessoaStore.pessoa.razaoSocial" label="Razão Social:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 200),
                ]" />
            </div>
            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled v-model="pessoaStore.pessoa.nomeFantasia" label="Nome Fantasia:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 200),
                ]" />
            </div>
            <div class="col-12 col-md-6">
              <q-input square filled label="Data de Abertura:" v-model="pessoaStore.pessoa.dataAbertura" mask="##/##/####"
                       :rules="[
              validationRequired,
              validationDate
            ]">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="pessoaStore.pessoa.dataAbertura" mask="DD/MM/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Fechar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

            </div>
            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled v-model="pessoaStore.pessoa.cnaePrincipal" label="CNAE Principal:" :readonly="isView"  />
            </div>
            <div class="col-12 col-md-6">
              <q-input square filled v-model="pessoaStore.pessoa.cnaeSegundario" label="CNAE Secundário:" :readonly="isView"  />
            </div>
            <div class="col-12 col-md-6 q-pr-md q-pt-md">
              <q-input square filled v-model="pessoaStore.pessoa.socioResponsavel" label="Nome do Sócio Responsável :" :readonly="isView" />
            </div>
            <div class="col-12 col-md-6 q-pt-md">
              <q-input square filled v-model="pessoaStore.pessoa.cpfSocioResponsavel"
                       label="CPF do Sócio Responsável"  :readonly="isView" placeholder="somente números"
                       mask="###.###.###-##"
              />
            </div>
          </q-card>
        </div>
        <div v-if="this.estrangeira" class="col-12 col-md-10 row">
          <q-card class="col-12 col-md-12 row q-pa-md q-mb-sm">
            <div class="col-12 q-mb-sm">
              <h6>Informações de Pessoa Estrangeira:</h6>
            </div>
            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled v-model="pessoaStore.pessoa.nome" label="Nome:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 200),
                ]" />
            </div>

            <div class="col-12 col-md-6">
              <q-input square filled v-model="pessoaStore.pessoa.documento"
                       label="Documento de Identificação"  :readonly="isView" :rules="[validationRequired]"
              />
            </div>

            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled v-model="pessoaStore.pessoa.paisOrigem" label="País de Origem:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 200),
                ]" />
            </div>

            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled v-model="pessoaStore.pessoa.tipoDocumento" label="Tipo de Documento:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 200),
                ]" />
            </div>
          </q-card>
        </div>
        <div class="col-12 col-md-10 row">
          <q-card class="col-12 col-md-12 row q-pa-md q-my-lg">
            <div class="col-12">
              <h6>Informações de Endereço:</h6>
            </div>
            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled v-model="pessoaStore.pessoa.endereco" label="Logradouro:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 400),
                ]" />
            </div>
            <div class="col-12 col-md-6">
              <q-input square filled v-model="pessoaStore.pessoa.numeroEndereco" label="Número:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 10),
                ]" />
            </div>
            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled v-model="pessoaStore.pessoa.bairro" label="Bairro:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 200),
                ]" />
            </div>
            <div class="col-12 col-md-6">
              <q-input square filled v-model="pessoaStore.pessoa.cep" label="CEP:" :readonly="isView" mask="#####-###" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 9, 9),
                ]" />
            </div>
            <div class="col-12 col-md-6 q-pr-md q-pb-md">
              <q-select clearable square filled v-model="pessoaStore.estado" label="UF" :options="uf"
                        :option-label="item => item.label" emit-value map-options />
            </div>
            <div class="col-12 col-md-6">
              <q-select clearable square filled v-model="pessoaStore.pessoa.cidade" label="Cidade" :options="cidadesAux"
                        :option-label= "'nome'"
                        :option-value="'id'"
                        />
            </div>
            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled v-model="pessoaStore.pessoa.pais" label="País:" :readonly="isView" :rules="[
                  validationRequired,
                  (val) => validationStringMaxMin(val, 3, 100),
                ]" />
            </div>
            <div class="col-12 col-md-6">
              <q-input square filled v-model="pessoaStore.pessoa.email" label="E-Mail:" type="email" hint="Email" :readonly="isView" :rules="[validationRequired]" />
            </div>
            <div class="col-12 col-md-6 q-pr-md">
              <q-input square filled v-model="pessoaStore.pessoa.telefone" mask="(##)#####-####" label="Telefone:" :readonly="isView" :rules="[validationRequired]" />
            </div>
            <div class="col-12 col-md-6 q-px-sm"></div>
          </q-card>
          <div class="col-12 col-md-1 q-pt-sm">
            <p>Observações:</p>
          </div>
          <div class="col-11 col-md-12 q-pb-sm">
            <q-editor toolbar-bg="grey-3" v-model="pessoaStore.pessoa.observacao" min-height="7rem" placeholder="Digite aqui..." />
          </div>
        </div>

        <div v-if="isView" class="col-12 flex justify-end">
          <q-btn class="btn-edit" label="Editar" type="button" color="secondary" @click="editAction"></q-btn>
          <q-btn label="Apagar" type="button" color="secondary" class="q-ml-sm btn-delete" @click="deleteAction" />
          <q-btn v-if="isView" label="Voltar" type="button" color="secondary" flat class="q-ml-sm" @click="back" />
        </div>
        <div v-if="isEdit || isNew" class="col-10 flex justify-end q-pt-md">
          <q-btn label="Salvar" type="submit" color="secondary"></q-btn>
          <q-btn label="Cancelar" type="reset" color="secondary" flat class="q-ml-sm" @click="cancel" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { validationRequired, validationStringMaxMin } from "../../helper/validation";
import CgeHeaderTitle from "src/components/header/CgeHeaderTitle.vue";
import { usePessoaStore } from "../../stores/paciente_store";
import { useCidadeStore } from "../../stores/cidade.store";
import { Uf } from "../../model/estado.enum";
import { TipoPessoa } from "../../model/tipoPessoa.enum";
import { useCommonStore } from "../../stores/common.store";


export default {
  components: {
    CgeHeaderTitle
  },
  setup() {
    let fisica = false;
    let juridica = false;
    let estrangeira = false;
    let cidadesAux = [];
    const pessoaStore = usePessoaStore();
    const commonStore = useCommonStore();
    const cidadeStore = useCidadeStore();
    const listaCidades =  computed(()=>cidadeStore.cidadesResponse);
    pessoaStore.estado = "";
    const route = useRoute();
    const pageTitle = ref("");
    const isEdit = ref(false);
    const isView = ref(false);
    const isNew = ref(false);
    const uf = Object.keys(Uf).map(key => ({ label: Uf[key], value: key }))
    const isPreviousPageList = computed(() => {
      return route.params.previousPage;
    });
    const tpessoa = Object.keys(TipoPessoa).map(key => ({ label: TipoPessoa[key], value: key }))

    onMounted(() => {
      cidadeStore.getCidadeList();
      commonStore.setPageTitle(pageTitle.value);
    });

    onUnmounted(() => {
      commonStore.hideTitle();
    });

    const setTitle = () => {
      switch (route.name) {
        case "pessoa-editar":
          isEdit.value = true;
          pageTitle.value = "Editar Pessoa";
          isNullBack();
          break;
        case "pessoa-adicionar":
          isNew.value = true;
          pageTitle.value = "Adicionar Pessoa";
          pessoaStore.pessoa = {};
          pessoaStore.pessoa = {observacao:''};
          break;
        default:
          isView.value = true;
          pageTitle.value = "Visualizar Pessoa";
          isNullBack();
          break;
      }
      commonStore.setPageTitle(pageTitle.value);
    };

    const router = useRouter();

    const isNullBack = () => {
      if (!pessoaStore.pessoa?.id) {
        router.push("/pessoa/listar");
      }
    }

    setTitle();

    return {
      uf,
      listaCidades,
      fisica,
      juridica,
      estrangeira,
      tpessoa,
      cidadesAux,
      isEdit,
      isView,
      router,
      isNew,
      setTitle,
      pageTitle,
      commonStore,
      pessoaStore,
      isPreviousPageList,
      validationRequired,
      validationStringMaxMin,
    };
  },
  watch :{'pessoaStore.estado'(newEstado,oldEstado) {
      if (this.pessoaStore.pessoa != null) {
        this.pessoaStore.pessoa.cidade = null;
        this.cidadesAux={};
      }
      if (this.pessoaStore.estado != null) {
        this.cidadesAux = this.listaCidades.filter(cidade => cidade.sigla.toLocaleUpperCase().includes(this.pessoaStore.estado));
      }
    }
  },
  methods: {
    submit() {
      if (this.isEdit) {
        this.pessoaStore.editar();
      } else {
        this.pessoaStore.salvar();
        this.isEdit = false
      }
    },
    cancel() {
      console.log(this.$route.params);
      if (this.isNew || this.isPreviousPageList) {
        this.$router.back();
        return;
      }
      this.$router.push({ name: "pessoa-visualizar" });
      setTimeout(() => {
        this.setTitle();
      }, 100);
      this.isEdit = false;
      this.isView = true;
      this.isNew = false;
    },
    back() {
      this.$router.push({ name: "pessoa-listar" })
    },
    deleteAction() {
      this.pessoaStore.deletar().onOk(() => {
        this.$router.push({ name: "pessoa-listar" })
      });
    },
    editAction() {
      this.$router.push({ name: "pessoa-editar" }).then(() => {
        this.setTitle();
      });
      this.isEdit = true;
      this.isView = false;
      this.isNew = false;
    },
    showHideCard: function showHideCard(val){
      this.fisica = false;
      this.juridica = false;
      this.estrangeira = false;

      if(val=='FISICA'){
        this.fisica = true;
        return;
      }else if (val=='JURIDICA'){
        this.juridica = true;
        return;
      } else if (val=='ESTRANGEIRO'){
        this.estrangeira = true;
      }
    }
  },
}
</script>
