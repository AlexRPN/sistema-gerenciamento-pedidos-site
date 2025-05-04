import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-carrinho-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrinho-modal.component.html',
  styleUrl: './carrinho-modal.component.css'
})
export class CarrinhoModalComponent {
  itensCarrinho: any[] = [];
  cliente: any = null;
  observacao: string = '';

  constructor(
    public dialogRef: MatDialogRef<CarrinhoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itensCarrinho = data?.itensCarrinho || [];
    this.cliente = data?.cliente || null;
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  calcularTotal(): number {
    return this.itensCarrinho.reduce((total, item) => total + item.valor * item.quantidade, 0);
  }

  criarPedido() {
    // Aqui você pode emitir um evento ou chamar um serviço para criar o pedido
    alert('Pedido criado com observação: ' + this.observacao);
  }

  alterarQuantidade(item: any, delta: number) {
    item.quantidade += delta;
    if (item.quantidade < 1) {
      this.itensCarrinho = this.itensCarrinho.filter(p => p !== item);
    }
  }

  removerTodosProdutos() {
    this.dialogRef.close('limparCarrinho');
  }
}
