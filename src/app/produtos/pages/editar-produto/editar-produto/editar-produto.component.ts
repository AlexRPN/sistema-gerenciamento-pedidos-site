import { Component, OnInit } from '@angular/core';
import { FormularioComponent } from "../../../components/formulario/formulario/formulario.component";
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoResponse } from '../../../models/response/produto.response';
import { CommonModule } from '@angular/common';
import { ProdutoEdicaoRequest } from '../../../models/request/produtoEdicao.request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-produto',
  imports: [FormularioComponent, CommonModule],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.css'
})
export class EditarProdutoComponent implements OnInit {

  btnAcao = 'Editar';
  descTitulo = 'Editar Produto';
  produto!: ProdutoResponse;

  constructor(private produtoService: ProdutoService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produtoService.buscarProdutoPorId(id).subscribe(response => {
      this.produto = response.dados;
    })
  }

  editarProduto(produto: ProdutoEdicaoRequest): void {
    this.produtoService.editarProduto(produto).subscribe(response => {
      if(response.dados != null){
        this.toastr.success(response.mensagem, 'Sucesso');
        this.router.navigate(['/produtos']);
      }else{
        this.toastr.error(response.mensagem, 'Erro!');
      }
    });
  }
}
