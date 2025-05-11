import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoRequest } from '../../models/request/produto.request';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-cadastrar-produto',
  imports: [FormularioComponent],
  templateUrl: './cadastrar-produto.component.html',
  styleUrl: './cadastrar-produto.component.css'
})
export class CadastrarProdutoComponent {

  btnAcao = 'Cadastrar';
  descTitulo = 'Cadastrar Produto';

  constructor(private produtoService: ProdutoService,
              private router: Router,
              private toastr: ToastrService){}

  cadastrarProduto(request: ProdutoRequest) {
    this.produtoService.cadastrarProduto(request).subscribe(response => {
      if (response.dados != null) {
        this.toastr.success(response.mensagem, 'Sucesso!');
        this.router.navigate(['/produtos']);
      } else {
        this.toastr.error(response.mensagem, 'Erro!');
      }
    });

    this.produtoService.cadastrarProduto(request).subscribe(response => {
      if (response.dados != null) {
        this.toastr.success(response.mensagem, 'Sucesso!');
        this.router.navigate(['/produtos']);
      } else {
        this.toastr.error(response.mensagem, 'Erro!');
      }
    });
  }
}
