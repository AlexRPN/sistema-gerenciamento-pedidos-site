import { ClienteResponse } from "../../../clientes/models/response/cliente.response";
import { EmpresaResponse } from "../../../empresa/models/response/empresa.response";
import { PedidoProdutoResponse } from "../../../pedido-produto/models/response/pedido-produto.response";

export interface PedidoResponse {
  id: number;
  valorTotal: number;
  tipoPagamento: string;
  dataPedido: Date;
  observacao: string;
  statusPedido: string;
  motivoCancelamento: string;
  cliente: ClienteResponse;
  produtos: PedidoProdutoResponse[];
  empresa: EmpresaResponse;
}
