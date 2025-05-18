import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../service/cliente.service';
import { ClienteResponse } from '../../models/response/cliente.response';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarClienteModalComponent } from '../../components/cadastrar-cliente-modal/cadastrar-cliente-modal.component';
import { EditarClienteModalComponent } from '../../components/editar-cliente-modal/editar-cliente-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<ClienteResponse>;
  clientes: ClienteResponse[] = [];
  displayedColumns: string[] = ['id', 'nome', 'telefone', 'endereco', 'situacao', 'acoes'];

  // Filtros
  situacaoSelecionada: string = '';
  situacoes: string[] = ['Ativo', 'Inativo'];

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<ClienteResponse>([]);
  }

  ngOnInit(): void {
    this.carregarClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private carregarClientes() {
    this.clienteService.listarClientes().subscribe(response => {
      this.clientes = response.dados;
      this.dataSource.data = this.clientes;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aplicarFiltroSelect() {
    this.dataSource.filterPredicate = (data: ClienteResponse, filter: string) => {
      const matchSituacao = !this.situacaoSelecionada || data.situacao === this.situacaoSelecionada;
      return matchSituacao;
    };
    this.dataSource.filter = ' ';
  }

  alterarStatusCliente(id: number) {
    const cliente = this.dataSource.data.find(c => c.id === id);
    if(cliente) {
      cliente.situacao = cliente.situacao === 'Ativo' ? 'Inativo' : 'Ativo';
      this.clienteService.alterarStatusCliente(id).subscribe((response) => {
        if(response.dados !== null) {
          this.toastr.success(response.mensagem, "Sucesso!");
        }else {
          this.toastr.error(response.mensagem, "Error!");
        }
      });
    }
  }

  abrirModalCadastroCliente() {
    const dialogRef = this.dialog.open(CadastrarClienteModalComponent, {
      width: '1100px',
      maxWidth: '98vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'atualizar') {
        this.carregarClientes();
      }
    });
  }

  abrirModalEdicao(cliente: any) {
    const dialogRef = this.dialog.open(EditarClienteModalComponent, {
      width: '900px',
      maxWidth: '98vw',
      data: { cliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'atualizar') {
        this.carregarClientes();
      }
    });
  }
}
