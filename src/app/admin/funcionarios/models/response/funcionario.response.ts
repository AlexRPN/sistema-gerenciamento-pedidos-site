import { EmpresaResponse } from "../../../empresa/models/response/empresa.response";
import { EnderecoFuncionarioResponse } from "./endereco-funcionario.response";

export interface FuncionarioResponse {
  id: number;
  nome: string;
  nomeUsuario: string;
  senha: string;
  confirmaSenha: string;
  telefone: string;
  situacao: string;
  dataCriacao: string;
  perfilAcesso: string;
  empresa: EmpresaResponse;
  endereco: EnderecoFuncionarioResponse;
}
