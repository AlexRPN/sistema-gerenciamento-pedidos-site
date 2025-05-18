import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PedidoService } from '../services/pedido.service';
import { PedidoResponse } from '../models/response/pedido.response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesPedidoModalComponent } from '../components/detalhes-pedido-modal/detalhes-pedido-modal.component';
import { RouterModule } from '@angular/router';
import {jsPDF} from 'jspdf';
import {autoTable} from 'jspdf-autotable';
import { ResponseModel } from '../../../../assets/shared/models/responseModel/responseModel';
import { MatSort } from '@angular/material/sort';
import { AlterarStatusModalComponent } from '../components/alterar-status-modal/alterar-status-modal.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  standalone: true,
  imports: [CommonModule,
            FormsModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatSelectModule,
            MatTableModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatPaginatorModule,
            RouterModule]
})
export class PedidosComponent implements OnInit {
  pedidos: PedidoResponse[] = [];
  dataSource = new MatTableDataSource<PedidoResponse>(this.pedidos);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filtroIdPedido: string = '';
  filtroNomeCliente: string = '';
  filtroStatus: string = '';
  filtroDataInicio: Date | null = null;
  filtroDataFim: Date | null = null;

  displayedColumns: string[] = ['id', 'cliente', 'dataPedido', 'valorTotal', 'status', 'acoes'];

  constructor(private pedidoService: PedidoService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.carregarPedidos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarPedidos() {
    this.pedidoService.listarPedidos().subscribe(
      (response: ResponseModel<PedidoResponse[]>) => {
        this.pedidos = response.dados;
        this.dataSource.data = response.dados;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      (error: any) => {
        console.error('Erro ao carregar pedidos:', error);
      }
    );
  }

  aplicarFiltro() {
    const filtrados = this.pedidos.filter(pedido => {
      const idMatch = !this.filtroIdPedido || pedido.id.toString().includes(this.filtroIdPedido);
      const nomeMatch = !this.filtroNomeCliente || pedido.cliente.nome.toLowerCase().includes(this.filtroNomeCliente.toLowerCase());
      const statusMatch = !this.filtroStatus || pedido.statusPedido === this.filtroStatus;
      const dataMatch = (!this.filtroDataInicio && !this.filtroDataFim) ||
        (this.filtroDataInicio && this.filtroDataFim &&
          (new Date(pedido.dataPedido) >= this.filtroDataInicio && new Date(pedido.dataPedido) <= this.filtroDataFim));
      return idMatch && nomeMatch && statusMatch && dataMatch;
    });
    this.dataSource.data = filtrados;
  }

  limparFiltro() {
    this.filtroIdPedido = '';
    this.filtroNomeCliente = '';
    this.filtroStatus = '';
    this.filtroDataInicio = null;
    this.filtroDataFim = null;
    this.dataSource.data = this.pedidos;
  }

  exibirDetalhes(pedido: PedidoResponse) {
    this.pedidoService.obterPedidoPorId(pedido.id).subscribe({
      next: (response) => {
        const pedidoDetalhado = response.dados;
        this.dialog.open(DetalhesPedidoModalComponent, {
          width: '500px',
          position: { right: '0' },
          panelClass: 'custom-dialog-container',
          data: { pedido: pedidoDetalhado }
        });
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes do pedido:', err);
      }
    });
  }

  abrirModalAlterarStatus(pedido: PedidoResponse) {
    const dialogRef = this.dialog.open(AlterarStatusModalComponent, {
      width: '500px',
      data: { pedido }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'atualizar') {
        this.carregarPedidos();
      }
    });
  }

  exportarPDF() {
    const doc = new jsPDF();

    // Título do PDF
    doc.setFontSize(18);
    doc.text('Relatório de Pedidos', 14, 15);

    // Cabeçalho da tabela
    const head = [['ID Pedido', 'Cliente', 'Data do Pedido', 'Valor Total', 'Status']];

    // Dados da tabela (substitua pelo array real do seu componente)
    const data = this.pedidos.map((pedido: any) => [
      pedido.id,
      pedido.cliente.nome,
      this.formatarData(pedido.dataPedido),
      pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      pedido.statusPedido
    ]);

    // Geração da tabela
    autoTable(doc, {
      startY: 25,
      head: head,
      body: data,
    });

    // Salvar PDF
    doc.save('relatorio-pedidos.pdf');
  }

  private formatarData(data: string | Date): string {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
  }
}
