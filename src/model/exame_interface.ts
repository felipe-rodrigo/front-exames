import { Common, SpringBootResponse } from "./helper_interface";
import { Medico } from "./medico_interface";
import { Paciente } from "./paciente_interface";

export interface ExameListResponse extends SpringBootResponse {
  _embedded: {
    examesResponseList: Exames[];
  }
}

export interface Exames extends Common {
  idExame:number;
  idMedico: Medico[];
  idPaciente: Paciente[];
  dataHoraExame: Date;
  observacao: string;
  resultado: string;
}
