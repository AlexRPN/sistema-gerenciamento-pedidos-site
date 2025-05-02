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

  cadastrarProduto(request: any) {
    const formData = new FormData();
    formData.append('nome', request.nome);
    formData.append('descricao', request.descricao);
    formData.append('valor', request.valor);
    formData.append('categoria', request.categoria);
    formData.append('tamanho', request.tamanho);
    formData.append('situacao', request.situacao || 'Ativo');
    formData.append('empresaId', request.empresaId || 1);

    // Se for um arquivo (imagem), adiciona ao FormData
    if (request.imagem && typeof request.imagem !== 'string') {
      formData.append('foto', request.imagem);
    }

    this.produtoService.cadastrarProduto(formData).subscribe(response => {
      if (response.dados != null) {
        this.toastr.success(response.mensagem, 'Sucesso!');
        this.router.navigate(['/produtos']);
      } else {
        this.toastr.error(response.mensagem, 'Erro!');
      }
    });
  }
}
