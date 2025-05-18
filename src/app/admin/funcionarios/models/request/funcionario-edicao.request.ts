import { EnderecoFuncionarioEdicaoRequest } from "./endereco-funcionario-edicao.request";

export interface FuncionarioEdicaoRequest {
  id: number;
  nome: string;
  telefone: string;
  perfilAcesso: string;
  endereco: EnderecoFuncionarioEdicaoRequest;
}
