import { EmpresaResponse } from "../../../empresa/models/response/empresa.response";
import { EnderecoClienteResponse } from "./endereco-cliente.response";
import { TelefoneClienteResponse } from "./telefone-cliente.reponse";

export interface ClienteResponse {
  id: number;
  nome: string;
  telefone: TelefoneClienteResponse;
  situacao: string;
  perfilAcesso: string;
  dataCadastro: string;
  endereco: EnderecoClienteResponse;
  empresa: EmpresaResponse;
}
