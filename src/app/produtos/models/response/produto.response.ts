export interface ProdutoResponse {
  id: number,
  nome: string,
  descricao: string,
  valor: number,
  categoria: string,
  tamanho: string,
  situacao: string,
  dataCadastro: Date,
  imagem: string,
  //empresa: EmpresaResponse
}

// Falta adicionar a empresaResponse
