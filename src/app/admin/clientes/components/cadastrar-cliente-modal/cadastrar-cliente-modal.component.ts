import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../../service/cliente.service';
import { ClienteRequest } from '../../models/request/cliente.request';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastrar-cliente-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './cadastrar-cliente-modal.component.html',
  styleUrl: './cadastrar-cliente-modal.component.css'
})
export class CadastrarClienteModalComponent {
  descTitulo = 'Cadastrar Cliente';
  btnAcao = 'Salvar';
  isLoading = false;

  cliente = {
    nome: '',
    telefone: { telefone: '' },
    endereco: {
      id: 0,
      logradouro: '',
      complemento: '',
      cep: ''
    }
  };

  constructor(private clienteService: ClienteService,
              private router: Router,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<CadastrarClienteModalComponent>
  ) {}

  cadastrarCliente() {
    const request: ClienteRequest = {
      nome: this.cliente.nome,
      telefone: {
        telefone: this.cliente.telefone.telefone
      },
      empresaId: 1,
      endereco: {
        logradouro: this.cliente.endereco.logradouro,
        complemento: this.cliente.endereco.complemento,
        cep: this.cliente.endereco.cep
      }
    };
    this.clienteService.cadastrarCliente(request).subscribe({
      next: response => {
        if (response.dados) {
          this.toastr.success(response.mensagem, 'Sucesso!');
          this.dialogRef.close('atualizar');
        } else {
          this.toastr.error(response.mensagem, 'Erro!');
        }
      }
    });
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
