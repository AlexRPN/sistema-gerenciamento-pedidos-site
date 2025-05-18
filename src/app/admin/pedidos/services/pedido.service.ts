import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PedidoResponse } from '../models/response/pedido.response';
import { Observable } from 'rxjs';
import { PedidoProdutoResponse } from '../../pedido-produto/models/response/pedido-produto.response';
import { PedidoRequest } from '../models/request/pedido.request';
import { environment } from '../../../../environments/environment.development';
import { ResponseModel } from '../../../../assets/shared/models/responseModel/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) { }

  listarPedidos(): Observable<ResponseModel<PedidoResponse[]>> {
    return this.http.get<ResponseModel<PedidoResponse[]>>(`${this.ApiUrl}/Pedido`);
  }

  obterPedidoPorId(id: number): Observable<ResponseModel<PedidoProdutoResponse>> {
    return this.http.get<ResponseModel<PedidoProdutoResponse>>(`${this.ApiUrl}/Pedido/${id}`);
  }

  criarPedido(pedido: PedidoRequest): Observable<ResponseModel<PedidoResponse>> {
    return this.http.post<ResponseModel<PedidoResponse>>(`${this.ApiUrl}/Pedido`, pedido);
  }

  alterarStatusPedido(id: number, status: string, motivoCancelamento?: string): Observable<ResponseModel<PedidoResponse>> {
    let url = `${this.ApiUrl}/Pedido/status?Id=${id}&StatusPedido=${status}`;
    if (motivoCancelamento) {
      url += `&MotivoCancelamento=${encodeURIComponent(motivoCancelamento)}`;
    }
    return this.http.put<ResponseModel<PedidoResponse>>(url, null);
  }
}