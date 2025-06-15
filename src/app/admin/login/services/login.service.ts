import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { FuncionarioRequest } from '../../funcionarios/models/request/funcionario.request';
import { Observable } from 'rxjs';
import { FuncionarioResponse } from '../../funcionarios/models/response/funcionario.response';
import { ResponseModel } from '../../../../assets/shared/models/responseModel/responseModel';
import { LoginRequest } from '../models/request/login.request';
import { Router } from '@angular/router';
import { AlterarSenhaRequest } from '../models/request/alterar-senha.request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient, private router: Router) { }

  registrarUsuario(request: FuncionarioRequest): Observable<ResponseModel<FuncionarioResponse>>{
    return this.http.post<ResponseModel<FuncionarioResponse>>(`${this.ApiUrl}/Login/RegistrarUsuario`, request);
  }

  loginUsuario(request: LoginRequest): Observable<ResponseModel<FuncionarioResponse>>{
    return this.http.post<ResponseModel<FuncionarioResponse>>(`${this.ApiUrl}/Login`, request);
  }

  alterarSenha(request: AlterarSenhaRequest): Observable<ResponseModel<FuncionarioResponse>>{
    return this.http.post<ResponseModel<FuncionarioResponse>>(`${this.ApiUrl}/Login/AlterarSenha`, request);
  }

  sair(){
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }
}
