export interface ProdutoRequest {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
  categoria: string;
  tamanho: string;
  situacao: string;
  imagem: string | null;
  empresaId: number;
}
