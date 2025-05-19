import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { FuncionarioRequest } from '../../funcionarios/models/request/funcionario.request';
import { Observable } from 'rxjs';
import { FuncionarioResponse } from '../../funcionarios/models/response/funcionario.response';
import { ResponseModel } from '../../../../assets/shared/models/responseModel/responseModel';
import { LoginRequest } from '../models/request/login.request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) { }

  registrarUsuario(request: FuncionarioRequest): Observable<ResponseModel<FuncionarioResponse>>{
    return this.http.post<ResponseModel<FuncionarioResponse>>(`${this.ApiUrl}/Login/RegistrarUsuario`, request);
  }

  loginUsuario(request: LoginRequest): Observable<ResponseModel<FuncionarioResponse>>{
    return this.http.post<ResponseModel<FuncionarioResponse>>(`${this.ApiUrl}/Login`, request);
  }
}
