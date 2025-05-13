import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../../../assets/shared/models/responseModel/responseModel';
import { FuncionarioResponse } from '../models/response/funcionario.response';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) { }

  listarFuncionarios(filtro?: {id?: number, telefone?: string, nome?: string}): Observable<ResponseModel<FuncionarioResponse[]>> {
    let params = new HttpParams();

    if (filtro?.id) {
      params = params.append('id', filtro.id.toString());
    }

    if (filtro?.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro?.telefone) {
      params = params.append('telefone', filtro.telefone);
    }
    return this.http.get<ResponseModel<FuncionarioResponse[]>>(`${this.ApiUrl}/Funcionario`, { params });
  }
}
