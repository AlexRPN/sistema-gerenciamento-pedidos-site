import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PedidoResponse } from '../../../models/response/pedido.response';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalhes-pedido-modal',
  templateUrl: './detalhes-pedido-modal.component.html',
  styleUrls: ['./detalhes-pedido-modal.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule]
})
export class DetalhesPedidoModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DetalhesPedidoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pedido: PedidoResponse }
  ) {
    console.log('Pedido recebido no modal:', data.pedido);
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  imprimirPedido(): void {
    const printContents = document.querySelector('.modal-container')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Para garantir que a página volte ao normal após a impressão
    }
  }
}
