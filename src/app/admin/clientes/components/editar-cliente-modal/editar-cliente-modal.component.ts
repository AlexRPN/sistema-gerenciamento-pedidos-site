import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../service/cliente.service';
import { ClienteEdicaoRequest } from '../../models/request/clienteEdicao.request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-cliente-modal',
  imports: [FormsModule],
  templateUrl: './editar-cliente-modal.component.html',
  styleUrl: './editar-cliente-modal.component.css'
})
export class EditarClienteModalComponent {
  descTitulo: string = 'Editar Cliente';
  btnAcao: string = 'Salvar';
  cliente = {
    nome: '',
    telefone: '',
    endereco: {
      cep: '',
      logradouro: '',
      complemento: ''
    }
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditarClienteModalComponent>,
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) {
    if (data && data.cliente) {
      this.cliente = { ...data.cliente };
      if (!this.cliente.endereco) {
        this.cliente.endereco = { cep: '', logradouro: '', complemento: '' };
      }
    }
  }

  editarCliente() {
    const request: ClienteEdicaoRequest = {
      id: this.data.cliente.id,
      nome: this.cliente.nome,
      telefone: this.cliente.telefone,
      enderecoCliente: {
        id: this.data.cliente.endereco.id,
        cep: this.cliente.endereco.cep,
        logradouro: this.cliente.endereco.logradouro,
        complemento: this.cliente.endereco.complemento
      }
    };

    this.clienteService.editarCliente(request).subscribe({
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
