export interface FuncionarioRequest {
  nome: string;
  nomeUsuario: string;
  token: string;
  senha: string;
  confirmaSenha: string;
  telefone: string;
  perfilAcesso: string;
  empresaId: number;
  senhaHash: Uint8Array;
  senhaSalt: Uint8Array;
  //enderecoFuncionario: EnderecoFuncionarioRequest;
}