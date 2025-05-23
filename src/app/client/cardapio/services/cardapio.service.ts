import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoResponse } from '../../../admin/produtos/models/response/produto.response';
import { ResponseModel } from '../../../../assets/shared/models/responseModel/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) { }

  listarProdutosPorCategoria(filtro?: {categoria?: string}): Observable<ResponseModel<ProdutoResponse[]>> {
    let params = new HttpParams();

    if (filtro?.categoria) {
      params = params.append('categoria', filtro.categoria);
    }

    return this.http.get<ResponseModel<ProdutoResponse[]>>(`${this.ApiUrl}/Produto`, { params });
  }
}
