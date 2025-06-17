import { EnderecoClienteRequest } from "./endereco-cliente.request";
import { TelefoneClienteCadastroRequest } from "./telefone-cliente-cadastro.request";

export interface ClienteRequest {
  nome: string;
  telefone: TelefoneClienteCadastroRequest;
  endereco: EnderecoClienteRequest;
  empresaId: number;
}