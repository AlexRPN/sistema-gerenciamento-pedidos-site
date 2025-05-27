import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-cliente-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-cliente-modal.component.html',
  styleUrl: './confirmar-cliente-modal.component.css'
})
export class ConfirmarClienteModalComponent {
  name: string = '';
  phone: string = '';

  constructor(
    private dialogRef: MatDialogRef<ConfirmarClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fecharModal() {
    this.dialogRef.close();
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.dialogRef.close({
        nome: this.name,
        telefone: this.phone,
        itensCarrinho: this.data.itensCarrinho
      });
    }
  }

  formatarTelefone() {
    if (!this.phone) return;
    let valor = this.phone.replace(/\D/g, '');
    if (valor.length > 0) {
      valor = valor.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4}).*/, '($1) $2 $3-$4');
      valor = valor.replace(/-$/, '');
    }
    this.phone = valor.trim();
  }
}
