import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AlterarSenhaModalComponent } from '../../components/alterar-senha-modal/alterar-senha-modal.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nomeUsuario: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  login(){
    this.loginService.loginUsuario(this.loginForm.value).subscribe(response => {
      if(response.dados != null){
        localStorage.setItem('token', response.dados.token);
        this.toastr.success(response.mensagem, 'Sucesso!');
        this.router.navigate(['/admin/produtos']);
      }else{
        this.toastr.error(response.mensagem, 'Erro!');
      }
    });
  }

  abrirModalAlterarSenha(){
    this.dialog.open(AlterarSenhaModalComponent, {
      width: '100%',
      maxWidth: '500px',
      panelClass: 'custom-modal'
    });
  }

}
