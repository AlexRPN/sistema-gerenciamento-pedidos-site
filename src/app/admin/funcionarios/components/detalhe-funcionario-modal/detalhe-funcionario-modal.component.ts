import { Component, Inject } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhe-funcionario-modal',
  imports: [FormsModule],
  templateUrl: './detalhe-funcionario-modal.component.html',
  styleUrl: './detalhe-funcionario-modal.component.css'
})
export class DetalheFuncionarioModalComponent {

  descTitulo: string = 'Detalhes do Funcionário';
  btnAcao: string = 'Fechar';

  funcionario = {
    nome: '',
    nomeUsuario: '',
    telefone: '',
    perfilAcesso: '',
    endereco: {
      cep: '',
      logradouro: '',
      complemento: ''
    }
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private funcionarioService: FuncionarioService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DetalheFuncionarioModalComponent>
  ) {
    this.funcionario = data.funcionario;
  }

  fecharModal() {
    this.dialogRef.close();
  }

}
