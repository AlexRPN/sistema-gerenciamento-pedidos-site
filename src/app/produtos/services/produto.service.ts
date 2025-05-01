import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../../assets/shared/models/responseModel/responseModel';
import { Observable } from 'rxjs';
import { ProdutoResponse } from '../models/response/produto.response';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) { }

  listarProdutos(): Observable<ResponseModel<ProdutoResponse[]>> {
    return this.http.get<ResponseModel<ProdutoResponse[]>>(`${this.ApiUrl}/Produto`);
  }


}
