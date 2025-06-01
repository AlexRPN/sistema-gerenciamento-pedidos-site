import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoResponse } from '../../../admin/produtos/models/response/produto.response';
import { ResponseModel } from '../../../../assets/shared/models/responseModel/responseModel';
import { ClienteResponse } from '../../../admin/clientes/models/response/cliente.response';
import { ClienteEdicaoRequest } from '../../../admin/clientes/models/request/clienteEdicao.request';
import { ClienteRequest } from '../../../admin/clientes/models/request/cliente.request';
import { PedidoRequest } from '../../../admin/pedidos/models/request/pedido.request';
import { PedidoResponse } from '../../../admin/pedidos/models/response/pedido.response';
import { PedidoProdutoResponse } from '../../../admin/pedido-produto/models/response/pedido-produto.response';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  private readonly ApiUrl = `${environment.UrlApi}/PedidoClientes`;

  constructor(private http: HttpClient) { }

  listarProdutosPorCategoria(filtro?: { categoria?: string }): Observable<ResponseModel<ProdutoResponse[]>> {
    let params = new HttpParams();

    if (filtro?.categoria) {
      params = params.append('categoria', filtro.categoria);
    }

    return this.http.get<ResponseModel<ProdutoResponse[]>>(`${this.ApiUrl}/produtos`, { params });
  }

  listarClientes(filtro?: { id?: number, telefone?: string, nome?: string }): Observable<ResponseModel<ClienteResponse[]>> {
    let params = new HttpParams();

    if (filtro?.id) {
      params = params.append('id', filtro.id.toString());
    }
    if (filtro?.telefone) {
      params = params.append('telefone', filtro.telefone);
    }
    if (filtro?.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<ResponseModel<ClienteResponse[]>>(`${this.ApiUrl}/clientes`, { params });
  }

  editarCliente(request: ClienteEdicaoRequest): Observable<ResponseModel<ClienteRequest>> {
    return this.http.put<ResponseModel<ClienteRequest>>(`${this.ApiUrl}/cliente`, request);
  }

  obterPedidoPorId(id: number): Observable<ResponseModel<PedidoProdutoResponse>> {
    return this.http.get<ResponseModel<PedidoProdutoResponse>>(`${this.ApiUrl}/pedido/${id}`);
  }

  criarPedido(pedido: PedidoRequest): Observable<ResponseModel<PedidoResponse>> {
    return this.http.post<ResponseModel<PedidoResponse>>(`${this.ApiUrl}/pedido`, pedido);
  }

  cadastrarCliente(request: ClienteRequest): Observable<ResponseModel<ClienteRequest>> {
    return this.http.post<ResponseModel<ClienteRequest>>(`${this.ApiUrl}/cliente`, request);
  }
}
