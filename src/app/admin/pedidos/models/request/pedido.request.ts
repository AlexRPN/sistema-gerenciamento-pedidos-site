import { PedidoProdutoRequest } from "../../../pedido-produto/models/request/pedido-produto.request";

export interface PedidoRequest {
  clienteId: number;
  tipoPagamento: string;
  tipoEntrega: string;
  pedidoProdutos: PedidoProdutoRequest[];
}
