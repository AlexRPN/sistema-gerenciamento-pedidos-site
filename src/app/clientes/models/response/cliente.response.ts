import { EmpresaResponse } from "../../../empresa/models/response/empresa.response";
import { EnderecoClienteResponse } from "./endereco-cliente.response";

export interface ClienteResponse {
  id: number;
  nome: string;
  telefone: string;
  situacao: string;
  perfilAcesso: string;
  dataCadastro: string;
  endereco: EnderecoClienteResponse;
  empresa: EmpresaResponse;
}
