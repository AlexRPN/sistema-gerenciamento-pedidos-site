import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { PedidoRequest } from '../../../models/request/pedido.request';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClienteService } from '../../../../clientes/service/cliente.service';
import { ClienteResponse } from '../../../../clientes/models/response/cliente.response';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';
import { ProdutoResponse } from '../../../../produtos/models/response/produto.response';
import { ProdutoService } from '../../../../produtos/services/produto.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CarrinhoModalComponent } from '../../carrinho-modal/carrinho-modal/carrinho-modal.component';

interface Tab {
  label: string;
  content: string;
  categoria: string;
}

type ItemCarrinho = ProdutoResponse & { quantidade: number };

@Component({
  selector: 'app-criar-pedido',
  imports: [
    MatInputModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './criar-pedido.component.html',
  styleUrl: './criar-pedido.component.css'
})
export class CriarPedidoComponent implements OnInit {
  filtroId: string = '';
  filtroNome: string = '';
  filtroTelefone: string = '';
  clienteEncontrado: boolean = false;
  endereco: any = {
    logradouro: '',
    complemento: '',
    cep: ''
  };
  cliente: any = null;
  produtos: ProdutoResponse[] = [];
  asyncTabs: Observable<Tab[]>;
  tabs: Tab[] = [];
  itensCarrinho: ItemCarrinho[] = [];

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService,
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
    // Carrega os produtos da primeira aba (Pizza) ao iniciar
    this.carregarProdutosPorCategoria(this.tabs[0].categoria);
  }

  onTabChange(event: any) {
    const categoria = this.tabs[event.index].categoria;
    this.carregarProdutosPorCategoria(categoria);
  }

    carregarProdutosPorCategoria(categoria: string) {
      this.produtos = []; // Limpa antes de buscar
      this.produtoService.listarProdutosPorCategoria({ categoria }).subscribe(
        response => {
          if (response.dados && response.dados.length > 0) {
            this.produtos = response.dados;
          } else {
            this.produtos = []; // Garante que o grid fique vazio
          }
        }
      );
    }

  adicionarAoCarrinho(produto: ProdutoResponse) {
    const item = this.itensCarrinho.find(p => p.id === produto.id);
    if (!item) {
      this.itensCarrinho.push({ ...produto, quantidade: 1 });
      this.toastr.success('Produto adicionado ao carrinho!', 'Sucesso!');
    } else {
      item.quantidade++;
      this.toastr.info('Quantidade aumentada no carrinho!', 'Atenção!');
    }
  }

  consultarCliente() {
    if (!this.filtroId && !this.filtroNome && !this.filtroTelefone) {
      this.toastr.warning('Por favor, preencha pelo menos um campo para consulta', 'Atenção!');
      return;
    }

    this.clienteEncontrado = false;
    this.cliente = null;
    this.endereco = {
      logradouro: '',
      complemento: '',
      cep: ''
    };
    this.clienteService.listarClientes({
      id: this.filtroId ? Number(this.filtroId) : undefined,
      nome: this.filtroNome || undefined,
      telefone: this.filtroTelefone || undefined
    }).subscribe(response => {
      if (response.dados && response.dados.length > 0) {
        const cliente: ClienteResponse = response.dados[0] as any;
        this.clienteEncontrado = true;
        this.cliente = cliente;
        this.endereco = {
          logradouro: cliente.endereco?.logradouro || '',
          complemento: cliente.endereco?.complemento || '',
          cep: cliente.endereco?.cep || ''
        };
        this.toastr.success(response.mensagem, 'Sucesso!');
      } else {
        this.toastr.warning(response.mensagem, 'Atenção!');
      }
    }, err => {
      this.toastr.error(err.error.mensagem, 'Erro!');
    });
  }

  criarPedido(request: PedidoRequest){
    this.pedidoService.criarPedido(request).subscribe(response => {
      if (response.dados != null) {
        this.toastr.success(response.mensagem, 'Sucesso!');
        this.router.navigate(['/produtos']);
      } else {
        this.toastr.error(response.mensagem, 'Erro!');
      }
    });
  }

  limparFiltros() {
    this.filtroId = '';
    this.filtroNome = '';
    this.filtroTelefone = '';
    this.clienteEncontrado = false;
    this.cliente = null;
    this.endereco = {
      logradouro: '',
      complemento: '',
      cep: ''
    };
  }

  abrirCarrinhoModal() {
    const dialogRef = this.dialog.open(CarrinhoModalComponent, {
      width: '900px',
      panelClass: 'custom-dialog-container',
      data: {
        cliente: this.cliente,
        itensCarrinho: this.itensCarrinho
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'limparCarrinho') {
        this.itensCarrinho = [];
      }
    });
  }
}
