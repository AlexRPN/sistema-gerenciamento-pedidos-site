import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from '../../../admin/produtos/services/produto.service';
import { ProdutoResponse } from '../../../admin/produtos/models/response/produto.response';
import { environment } from '../../../../environments/environment.development';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';

interface Tab {
  label: string;
  content: string;
  categoria: string;
}

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatCardModule, MatButtonModule, MatTabsModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent implements OnInit {
  produtos: ProdutoResponse[] = [];
  itensCarrinho: any[] = [];
  tabs: Tab[] = [];
  asyncTabs: Observable<Tab[]>;
  abaSelecionada = 0;

  tamanhosPizza = [
    { nome: 'Pequeno', descricao: '2 complementos' },
    { nome: 'Medio', descricao: '2 complementos' },
    { nome: 'Grande', descricao: '2 complementos' }
  ];
  tamanhoPizzaSelecionado = 'Pequeno';

  categorias = [
    { chave: 'Pizza', label: 'PIZZAS', emoji: '🍕' },
    { chave: 'Sanduíche', label: 'SANDUÍCHES', emoji: '🥪' },
    { chave: 'Omelete', label: 'OMELETES', emoji: '🍳' },
    { chave: 'Pão Sírio', label: 'PÃO SÍRIO', emoji: '🥙' },
    { chave: 'Adicional', label: 'ADICIONAIS', emoji: '➕' },
    { chave: 'Bebidas', label: 'BEBIDAS', emoji: '🥤' }
  ];

  mostrarTodos: { [key: string]: boolean } = {
    Pizza: false,
    'Sanduíche': false,
    Omelete: false,
    'Pão Sírio': false,
    Adicional: false,
    Bebidas: false
  };

  urlApi = environment.UrlApi.replace(/\/api$/, '');

  constructor(
    private produtoService: ProdutoService,
    private dialog: MatDialog
  ) {
    this.tabs = [
      { label: 'Pizza', content: 'Pizza', categoria: 'Pizza' },
      { label: 'Sanduíche', content: 'Sanduíche', categoria: 'Sanduiche' },
      { label: 'Omelete', content: 'Omelete', categoria: 'Omelete' },
      { label: 'Pão Sírio', content: 'Pão Sírio', categoria: 'PaoSirio' },
      { label: 'Adicional', content: 'Adicional', categoria: 'Adicional' },
      { label: 'Bebidas', content: 'Bebidas', categoria: 'Bebidas' }
    ];
    this.asyncTabs = of(this.tabs);
  }

  ngOnInit() {
    this.carregarProdutosPorCategoria(this.tabs[this.abaSelecionada].categoria);
  }

  onTabChange(event: any) {
    this.abaSelecionada = event.index;
    const categoria = this.tabs[event.index].categoria;
    this.carregarProdutosPorCategoria(categoria);
  }

  carregarProdutosPorCategoria(categoria: string) {
    this.produtoService.listarProdutosPorCategoria({ categoria }).subscribe(
      response => {
        console.log(response);
        if (response.dados && response.dados.length > 0) {
          this.produtos = response.dados;
        } else {
          this.produtos = []; // Garante que o grid fique vazio
        }
      }
    );
  }


  produtosFiltrados(categoria: string) {
    return this.produtos.filter(
      p => p.categoria && p.categoria.trim().toLowerCase() === categoria.trim().toLowerCase()
    );
  }

  toggleVerMais(categoria: string) {
    this.mostrarTodos[categoria] = !this.mostrarTodos[categoria];
  }

  getUrlImagem(imagem: string | null): string {
    if (!imagem) {
      return 'assets/img/sem-imagem.png'; // Caminho para imagem padrão
    }
    return `${this.urlApi}/${imagem}`;
  }

  adicionarAoCarrinho(produto: ProdutoResponse) {
    const itemExistente = this.itensCarrinho.find(item => item.id === produto.id);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      this.itensCarrinho.push({
        ...produto,
        quantidade: 1
      });
    }
  }

  trackByProdutoId(index: number, produto: ProdutoResponse): number {
    return produto.id;
  }

  pizzasFiltradas() {
    return this.produtos.filter(
      p => p.categoria && p.categoria.trim().toLowerCase() === 'pizza' &&
           p.tamanho === this.tamanhoPizzaSelecionado
    );
  }
}
