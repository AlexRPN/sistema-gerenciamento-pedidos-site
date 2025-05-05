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
import { ResponseModel } from '../../../assets/shared/models/responseModel/responseModel';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesPedidoModalComponent } from '../components/detalhes-pedido-modal/detalhes-pedido-modal/detalhes-pedido-modal.component';
import { RouterModule } from '@angular/router';

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

  filtroIdPedido: string = '';
  filtroNomeCliente: string = '';
  filtroStatus: string = '';
  filtroDataInicio: Date | null = null;
  filtroDataFim: Date | null = null;

  constructor(private pedidoService: PedidoService, private dialog: MatDialog) {}

  ngOnInit() {
    this.carregarPedidos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carregarPedidos() {
    this.pedidoService.listarPedidos().subscribe(
      (response: ResponseModel<PedidoResponse[]>) => {
        this.pedidos = response.dados;
        this.dataSource.data = response.dados;
      },
      (error: any) => {
        console.error('Erro ao carregar pedidos:', error);
      }
    );
  }

  pedidosFiltrados() {
    return this.pedidos.filter(pedido => {
      const idMatch = !this.filtroIdPedido || pedido.id.toString().includes(this.filtroIdPedido);
      const nomeMatch = !this.filtroNomeCliente || pedido.cliente.nome.toLowerCase().includes(this.filtroNomeCliente.toLowerCase());
      const statusMatch = !this.filtroStatus || pedido.statusPedido === this.filtroStatus;
      const dataMatch = !this.filtroDataInicio || !this.filtroDataFim ||
        (new Date(pedido.dataPedido) >= this.filtroDataInicio && new Date(pedido.dataPedido) <= this.filtroDataFim);
      return idMatch && nomeMatch && statusMatch && dataMatch;
    });
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

  cancelarPedido(pedido: PedidoResponse) {
    // Implementar lógica para cancelar pedido
  }

  exportarExcel() {
    // Implementar lógica para exportar para Excel
    console.log('Exportar dados para Excel');
  }
}
