export interface AlterarSenhaRequest {
  nomeUsuario: string;
  senhaAtual: string;
  novaSenha: string;
  confirmaNovaSenha: string;
}