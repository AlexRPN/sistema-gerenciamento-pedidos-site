import { EnderecoFuncionarioRequest } from "./endereco-funcionario.request";

export interface FuncionarioRequest {
  nome: string;
  telefone: string;
  nomeUsuario: string;
  senha: string;
  confirmaSenha: string;
  perfilAcesso: string;
  empresaId: number;
  endereco: EnderecoFuncionarioRequest;
}