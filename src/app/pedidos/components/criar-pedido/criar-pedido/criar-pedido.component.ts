import { PedidoResponse } from './../../../models/response/pedido.response';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-criar-pedido',
  imports: [MatInputModule,
            FormsModule,
            MatIconModule,
            CommonModule,
  ],
  templateUrl: './criar-pedido.component.html',
  styleUrl: './criar-pedido.component.css'
})
export class CriarPedidoComponent {
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

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService
  ) {}

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
}
