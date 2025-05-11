import { EnderecoClienteRequest } from "./endereco-cliente.request";

export interface ClienteRequest {
  nome: string;
  telefone: string;
  endereco: EnderecoClienteRequest;
  empresaId: number;
}