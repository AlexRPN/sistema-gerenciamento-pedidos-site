import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoResponse } from '../../models/response/produto.response';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

interface FiltroState {
  texto: string;
  tamanho: string;
  categoria: string;
  situacao: string;
}

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'valor', 'tamanho', 'categoria', 'situacao', 'acoes'];
  dataSource!: MatTableDataSource<ProdutoResponse>;
  dadosOriginais: ProdutoResponse[] = [];

  filtroAtual: FiltroState = {
    texto: '',
    tamanho: '',
    categoria: '',
    situacao: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Opções para os filtros
  tamanhos: string[] = ['Pequeno', 'Medio', 'Grande'];
  categorias: string[] = ['Sanduiche', 'Omelete', 'PaoSirio', 'Pizza', 'Bebidas', 'Adicional'];
  situacoes: string[] = ['Ativo', 'Inativo'];

  // Valores selecionados nos filtros
  tamanhoSelecionado: string = '';
  categoriaSelecionada: string = '';
  situacaoSelecionada: string = '';

  constructor(private produtoService: ProdutoService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<ProdutoResponse>([]);
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private carregarProdutos() {
    this.produtoService.listarProdutos().subscribe(response => {
      this.dadosOriginais = response.dados;
      this.dataSource.data = this.dadosOriginais;
    });
  }

  alterarStatusProduto(produtoId: number) {
    const produto = this.dataSource.data.find(p => p.id === produtoId);
    if(produto) {
      produto.situacao = produto.situacao === 'Ativo' ? 'Inativo' : 'Ativo';
      this.produtoService.inativarProduto(produtoId).subscribe((response) => {
        if(response.dados !== null) {
          this.toastr.success(response.mensagem, "Sucesso!");
        }else {
          this.toastr.error(response.mensagem, "Error!");
        }
      });
    }
  }

  applyFilter(event: Event) {
    this.filtroAtual.texto = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.aplicarFiltros();
  }

  aplicarFiltroSelect() {
    this.filtroAtual.tamanho = this.tamanhoSelecionado;
    this.filtroAtual.categoria = this.categoriaSelecionada;
    this.filtroAtual.situacao = this.situacaoSelecionada;
    this.aplicarFiltros();
  }

  private aplicarFiltros() {
    let dadosFiltrados = this.dadosOriginais;

    // Filtro de texto
    if (this.filtroAtual.texto) {
      dadosFiltrados = dadosFiltrados.filter(produto =>
        produto.nome.toLowerCase().includes(this.filtroAtual.texto) ||
        produto.descricao.toLowerCase().includes(this.filtroAtual.texto) ||
        produto.valor.toString().includes(this.filtroAtual.texto)
      );
    }

    // Filtro de tamanho
    if (this.filtroAtual.tamanho) {
      dadosFiltrados = dadosFiltrados.filter(produto =>
        produto.tamanho === this.filtroAtual.tamanho
      );
    }

    // Filtro de categoria
    if (this.filtroAtual.categoria) {
      dadosFiltrados = dadosFiltrados.filter(produto =>
        produto.categoria === this.filtroAtual.categoria
      );
    }

    // Filtro de situação
    if (this.filtroAtual.situacao) {
      dadosFiltrados = dadosFiltrados.filter(produto =>
        produto.situacao === this.filtroAtual.situacao
      );
    }

    this.dataSource.data = dadosFiltrados;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
