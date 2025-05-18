import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionarioService } from '../../services/funcionario.service';
import { ToastrService } from 'ngx-toastr';
import { FuncionarioEdicaoRequest } from '../../models/request/funcionario-edicao.request';

@Component({
  selector: 'app-editar-funcionario-modal',
  imports: [FormsModule],
  templateUrl: './editar-funcionario-modal.component.html',
  styleUrl: './editar-funcionario-modal.component.css'
})

export class EditarFuncionarioModalComponent {
  descTitulo: string = 'Editar Funcionário';
  btnAcao: string = 'Editar';
  mostrarSenha = false;
  mostrarConfirmaSenha = false;

  funcionario = {
    nome: '',
    telefone: '',
    perfilAcesso: '',
    endereco: {
      cep: '',
      logradouro: '',
      complemento: ''
    }
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditarFuncionarioModalComponent>,
    private funcionarioService: FuncionarioService,
    private toastr: ToastrService
  ) {
    if (data && data.funcionario) {
      this.funcionario = {
        ...data.funcionario,
        endereco: {
          cep: data.funcionario.endereco?.cep || '',
          logradouro: data.funcionario.endereco?.logradouro || '',
          complemento: data.funcionario.endereco?.complemento || ''
        }
      };
    }
  }

  editarFuncionario() {
    const request: FuncionarioEdicaoRequest = {
      id: this.data.funcionario.id,
      nome: this.funcionario.nome,
      telefone: this.funcionario.telefone,
      perfilAcesso: this.funcionario.perfilAcesso,
      endereco: {
        id: this.data.funcionario.endereco.id,
        cep: this.funcionario.endereco.cep,
        logradouro: this.funcionario.endereco.logradouro,
        complemento: this.funcionario.endereco.complemento
      }
    };
    this.funcionarioService.editarFuncionario(request).subscribe({
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
