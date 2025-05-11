export interface ProdutoEdicaoRequest {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  categoria: string;
  tamanho: string;
  situacao: string;
  imagem: string;
  empresaId: number;
}