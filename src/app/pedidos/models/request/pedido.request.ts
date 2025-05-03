import { PedidoProdutoRequest } from "../../../pedido-produto/models/request/pedido-produto.request";

export interface PedidoRequest {
  idCliente: number;
  pedidoProdutos: PedidoProdutoRequest[];
}