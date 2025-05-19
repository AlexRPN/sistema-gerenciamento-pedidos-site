import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nomeUsuario: ['', [Validators.required, Validators.email]],
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

}
