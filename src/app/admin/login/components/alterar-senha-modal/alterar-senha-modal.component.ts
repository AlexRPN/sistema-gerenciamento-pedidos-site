import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alterar-senha-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ToastrModule
  ],
  templateUrl: './alterar-senha-modal.component.html',
  styleUrl: './alterar-senha-modal.component.css'
})
export class AlterarSenhaModalComponent {
  form: FormGroup;
  hideSenhaAtual = true;
  hideNovaSenha = true;
  hideConfirmarSenha = true;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AlterarSenhaModalComponent>,
              private loginService: LoginService,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      nomeUsuario: ['', Validators.required],
      senhaAtual: ['', Validators.required],
      novaSenha: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.senhasConferem });
  }

  senhasConferem(group: FormGroup) {
    const novaSenha = group.get('novaSenha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return novaSenha === confirmarSenha ? null : { senhasNaoConferem: true };
  }

  alterarSenha() {
    if (this.form.invalid) {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const request = {
      nomeUsuario: this.form.get('nomeUsuario')?.value,
      senhaAtual: this.form.get('senhaAtual')?.value,
      novaSenha: this.form.get('novaSenha')?.value,
      confirmaNovaSenha: this.form.get('confirmarSenha')?.value
    };

    this.loginService.alterarSenha(request).subscribe({
      next: (response) => {
        if (response.status) {
          this.toastr.success(response.mensagem, 'Sucesso!');
          this.dialogRef.close('atualizar');
        } else {
          this.toastr.error(response.mensagem, 'Erro!');
        }
      },
      error: (error) => {
        const msg = error?.error?.mensagem || 'Erro ao alterar senha';
        if (msg.toLowerCase().includes('sucesso')) {
          this.toastr.success(msg, 'Sucesso!');
          this.dialogRef.close('atualizar');
        } else {
          this.toastr.error(msg, 'Erro!');
        }
      }
    });
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
