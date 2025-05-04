import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetalhesPedidoModalComponent } from '../../detalhes-pedido-modal/detalhes-pedido-modal/detalhes-pedido-modal.component';

@Component({
  selector: 'app-confirmacao-modal',
  imports: [],
  templateUrl: './confirmacao-modal.component.html',
  styleUrl: './confirmacao-modal.component.css'
})
export class ConfirmacaoModalComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmacaoModalComponent>,
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmar() {
    const detalhesRef = this.dialog.open(DetalhesPedidoModalComponent, {
      width: '650px',
      data: { pedido: this.data.pedido, imprimir: true }
    });
    this.dialogRef.close();
    detalhesRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        window.print();
      }, 300);
    });
  }

  fechar() {
    this.dialogRef.close();
    this.router.navigate(['/pedidos']);
  }
}
