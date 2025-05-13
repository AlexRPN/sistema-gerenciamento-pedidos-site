import { Component, OnInit, ViewChild } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { FuncionarioResponse } from '../../models/response/funcionario.response';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-funcionarios',
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
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  funcionarios: FuncionarioResponse[] = [];
  dataSource!: MatTableDataSource<FuncionarioResponse>;
  displayedColumns: string[] = ['id', 'nome', 'nomeUsuario', 'telefone', 'situacao','acoes'];

  // Filtros
  situacaoSelecionada: string = '';
  situacoes: string[] = ['Ativo', 'Inativo'];

  constructor(private funcionarioService: FuncionarioService,
              private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<FuncionarioResponse>([]);
   }

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aplicarFiltroSelect() {
    this.dataSource.filterPredicate = (data: FuncionarioResponse, filter: string) => {
      const matchSituacao = !this.situacaoSelecionada || data.situacao === this.situacaoSelecionada;
      return matchSituacao;
    };
    this.dataSource.filter = ' ';
  }

  abrirModalCadastroFuncionario(){
    //Implementar modal de cadastro de funcionário
  }

  /*alterarStatusFuncionario(id: number) {
    this.funcionarioService.alterarStatusFuncionario(id).subscribe(() => {
      this.carregarFuncionarios();
    });
  }*/

  private carregarFuncionarios() {
    this.funcionarioService.listarFuncionarios().subscribe(response => {
      this.funcionarios = response.dados;
      this.dataSource.data = this.funcionarios;
      console.log(this.funcionarios, "Funcionarios response");
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
}
