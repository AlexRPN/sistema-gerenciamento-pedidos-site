import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../../assets/shared/models/responseModel/responseModel';
import { Observable } from 'rxjs';
import { ProdutoResponse } from '../models/response/produto.response';
import { ProdutoEdicaoRequest } from '../models/request/produtoEdicao.request';
import { ProdutoRequest } from '../models/request/produto.request';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) { }

  listarProdutos(): Observable<ResponseModel<ProdutoResponse[]>> {
    return this.http.get<ResponseModel<ProdutoResponse[]>>(`${this.ApiUrl}/Produto`);
  }

  inativarProduto(id: number): Observable<ResponseModel<ProdutoResponse>> {
    return this.http.put<ResponseModel<ProdutoResponse>>(`${this.ApiUrl}/Produto/${id}`, null);
  }

  buscarProdutoPorId(id: number): Observable<ResponseModel<ProdutoResponse>> {
    return this.http.get<ResponseModel<ProdutoResponse>>(`${this.ApiUrl}/Produto/${id}`);
  }

  editarProduto(produto: ProdutoEdicaoRequest): Observable<ResponseModel<ProdutoResponse>> {
    return this.http.put<ResponseModel<ProdutoResponse>>(`${this.ApiUrl}/Produto`, produto);
  }

  cadastrarProduto(produto: ProdutoRequest | FormData): Observable<ResponseModel<ProdutoResponse>> {
    return this.http.post<ResponseModel<ProdutoResponse>>(`${this.ApiUrl}/Produto`, produto);
  }
}
