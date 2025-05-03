import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PedidoResponse } from '../models/response/pedido.response';
import { ResponseModel } from '../../../assets/shared/models/responseModel/responseModel';
import { Observable } from 'rxjs';
import { PedidoProdutoResponse } from '../../pedido-produto/models/response/pedido-produto.response';

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
}
