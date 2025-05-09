import { EnderecoClienteEdicaoRequest } from "./endereco-cliente-edicao.request";

export interface ClienteEdicaoRequest {
  id: number;
  nome: string;
  telefone: string;
  enderecoCliente: EnderecoClienteEdicaoRequest;
}
