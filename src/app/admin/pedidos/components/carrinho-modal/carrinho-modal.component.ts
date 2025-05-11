import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../../services/pedido.service';
import { ConfirmacaoModalComponent } from '../confirmacao-modal/confirmacao-modal.component';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private pedidoService: PedidoService
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
    const pedidoProdutos = this.itensCarrinho.map(item => ({
      clienteId: Number(this.cliente?.id),
      produtoId: item.id,
      quantidade: item.quantidade,
      observacao: this.observacao || '',
      valorUnitario: item.valor
    }));

    const request = {
      clienteId: Number(this.cliente?.id),
      pedidoProdutos,
      observacao: this.observacao
    } as any;

    console.log('Request:', request);

    this.pedidoService.criarPedido(request).subscribe({
      next: response => {
        console.log('Resposta do criarPedido:', response);
        if (response.dados) {
          // Buscar detalhes completos do pedido pelo id retornado
          this.pedidoService.obterPedidoPorId(response.dados.id).subscribe({
            next: detalhesResponse => {
              this.dialog.open(ConfirmacaoModalComponent, {
                width: '400px',
                data: { pedido: detalhesResponse.dados }
              });
              this.dialogRef.close();
            },
            error: err => {
              console.error('Erro ao buscar detalhes do pedido:', err);
            }
          });
        }
      },
      error: err => {
        console.error('Erro ao criar pedido:', err);
      }
    });
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
