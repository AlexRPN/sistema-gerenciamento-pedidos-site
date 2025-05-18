import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FuncionarioRequest } from '../../models/request/funcionario.request';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../services/funcionario.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-funcionario-modal',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './cadastro-funcionario-modal.component.html',
  styleUrl: './cadastro-funcionario-modal.component.css'
})
export class CadastroFuncionarioModalComponent {
  descTitulo: string = 'Cadastrar Funcionário';
  btnAcao: string = 'Cadastrar';
  mostrarSenha = false;
  mostrarConfirmaSenha = false;

  funcionario = {
    nome: '',
    nomeUsuario: '',
    telefone: '',
    perfilAcesso: '',
    senha: '',
    confirmaSenha: '',
    empresaId: 1,
    endereco: {
      cep: '',
      logradouro: '',
      complemento: ''
    }
  };

  constructor(private fb: FormBuilder,
              private funcionarioService: FuncionarioService,
              private dialogRef: MatDialogRef<CadastroFuncionarioModalComponent>,
              private toastr: ToastrService
  ) {}

  cadastrarFuncionario() {
    const request: FuncionarioRequest = {
      nome: this.funcionario.nome,
      nomeUsuario: this.funcionario.nomeUsuario,
      telefone: this.funcionario.telefone,
      perfilAcesso: this.funcionario.perfilAcesso,
      senha: this.funcionario.senha,
      confirmaSenha: this.funcionario.confirmaSenha,
      empresaId: 1,
      endereco: {
        cep: this.funcionario.endereco.cep,
        logradouro: this.funcionario.endereco.logradouro,
        complemento: this.funcionario.endereco.complemento
      }
    };
    this.funcionarioService.cadastrarFuncionario(request).subscribe({
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
