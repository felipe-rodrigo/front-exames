import { Medico } from "./medico_interface";
import { Paciente } from "./paciente_interface";

export interface Exame {
  idExame: number;
  idMedico: Medico[];
  idPaciente: Paciente[];
  dataHoraExame: Date;
  observacao: string;
  resultado: string;
}
