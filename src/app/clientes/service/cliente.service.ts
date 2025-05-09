import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ClienteResponse } from '../models/response/cliente.response';
import { ResponseModel } from '../../../assets/shared/models/responseModel/responseModel';
import { Observable } from 'rxjs';
import { ClienteRequest } from '../models/request/cliente.request';
import { ClienteEdicaoRequest } from '../models/request/clienteEdicao.request';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) { }

  listarClientes(filtro?: {id?: number, telefone?: string, nome?: string}): Observable<ResponseModel<ClienteRequest[]>> {
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

    return this.http.get<ResponseModel<ClienteRequest[]>>(`${this.ApiUrl}/Cliente`, { params });
  }

  editarCliente(request: ClienteEdicaoRequest): Observable<ResponseModel<ClienteRequest>> {
    return this.http.put<ResponseModel<ClienteRequest>>(`${this.ApiUrl}/Cliente`, request);
  }
}
