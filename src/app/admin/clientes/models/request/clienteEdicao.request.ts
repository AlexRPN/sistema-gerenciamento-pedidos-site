import { EnderecoClienteEdicaoRequest } from "./endereco-cliente-edicao.request";
import { TelefoneClienteEdicaoRequest } from "./telefone-cliente-edicao.request";

export interface ClienteEdicaoRequest {
  id: number;
  nome: string;
  telefone: TelefoneClienteEdicaoRequest;
  enderecoCliente: EnderecoClienteEdicaoRequest;
}
