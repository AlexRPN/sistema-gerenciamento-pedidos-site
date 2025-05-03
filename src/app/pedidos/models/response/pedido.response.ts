import { ClienteResponse } from "../../../clientes/models/response/cliente.response";
import { ProdutoResponse } from "../../../produtos/models/response/produto.response";

export interface PedidoResponse {
  id: number;
  valorTotal: number;
  dataPedido: Date;
  statusPedido: string;
  cliente: ClienteResponse;
  produtos: ProdutoResponse[];
}