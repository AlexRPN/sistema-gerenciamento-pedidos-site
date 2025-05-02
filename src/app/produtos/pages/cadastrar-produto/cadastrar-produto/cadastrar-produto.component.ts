import { Component } from '@angular/core';
import { FormularioComponent } from "../../../components/formulario/formulario/formulario.component";
import { ProdutoService } from '../../../services/produto.service';
import { ProdutoRequest } from '../../../models/request/produto.request';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  cadastrarProduto(request: ProdutoRequest){
    // Garante que todos os campos obrigatórios estejam presentes
    const produto: ProdutoRequest = {
      ...request,
      situacao: request.situacao || 'Ativo',
      empresaId: request.empresaId || 1,
      imagem: request.imagem || null
    };

    this.produtoService.cadastrarProduto(produto).subscribe(response => {
      if(response.dados != null){
        this.toastr.success(response.mensagem, 'Sucesso!');
        this.router.navigate(['/produtos']);
      }else{
        this.toastr.error(response.mensagem, 'Erro!');
      }
    });
  }
}
