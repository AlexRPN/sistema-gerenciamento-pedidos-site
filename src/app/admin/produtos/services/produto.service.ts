import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoResponse } from '../models/response/produto.response';
import { ProdutoEdicaoRequest } from '../models/request/produtoEdicao.request';
import { ProdutoRequest } from '../models/request/produto.request';
import { environment } from '../../../../environments/environment.development';
import { ResponseModel } from '../../../../assets/shared/models/responseModel/responseModel';

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

  editarProduto(produto: FormData): Observable<ResponseModel<ProdutoResponse>> {
    return this.http.put<ResponseModel<ProdutoResponse>>(`${this.ApiUrl}/Produto`, produto);
  }

  cadastrarProduto(produto: FormData): Observable<ResponseModel<ProdutoResponse>> {
    return this.http.post<ResponseModel<ProdutoResponse>>(`${this.ApiUrl}/Produto`, produto);
  }

  listarProdutosPorCategoria(filtro?: {categoria?: string}): Observable<ResponseModel<ProdutoResponse[]>> {
    let params = new HttpParams();

    if (filtro?.categoria) {
      params = params.append('categoria', filtro.categoria);
    }

    return this.http.get<ResponseModel<ProdutoResponse[]>>(`${this.ApiUrl}/Produto`, { params });
  }
}
