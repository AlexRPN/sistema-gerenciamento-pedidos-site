import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoResponse } from '../../models/response/produto.response';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {

  produtos: ProdutoResponse[] = [];
  produtosFiltrados: ProdutoResponse[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe(response => {
      this.produtos = response.dados;
      this.produtosFiltrados = this.produtos;
    })
  }
}