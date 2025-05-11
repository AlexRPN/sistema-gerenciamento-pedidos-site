export interface PedidoProdutoRequest {
  clienteId: number;
  produtoId: number;
  quantidade: number;
  observacao: string;
  valorUnitario: number;
}
