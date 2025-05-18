import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
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

  cadastrarProduto(formData: FormData) {
    this.produtoService.cadastrarProduto(formData).subscribe(response => {
      console.log(response, 'response');
      if (response.dados != null) {
        this.toastr.success(response.mensagem, 'Sucesso!');
        this.router.navigate(['admin/produtos']);
      } else {
        this.toastr.error(response.mensagem, 'Erro!');
      }
    });
  }
}
