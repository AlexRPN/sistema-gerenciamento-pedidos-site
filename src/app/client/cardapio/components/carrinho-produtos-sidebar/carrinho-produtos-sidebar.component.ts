import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarClienteModalComponent } from '../confirmar-pedido-modal/confirmar-pedido-modal.component';

@Component({
  selector: 'app-carrinho-produtos-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrinho-produtos-sidebar.component.html',
  styleUrls: ['./carrinho-produtos-sidebar.component.css']
})
export class CarrinhoProdutosSidebarComponent {
  @Input() itensCarrinho: any[] = [];
  @Output() fechar = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  calcularTotal(): number {
    return this.itensCarrinho.reduce((total, item) => total + (item.valor * item.quantidade), 0);
  }

  alterarQuantidade(item: any, delta: number) {
    item.quantidade += delta;
    if (item.quantidade < 1) {
      const idx = this.itensCarrinho.indexOf(item);
      if (idx > -1) {
        this.itensCarrinho.splice(idx, 1);
      }
    }
  }

  removerTodosProdutos() {
    this.itensCarrinho.length = 0;
  }

  abrirModalConfirmarCliente() {
    this.dialog.open(ConfirmarClienteModalComponent, {
      panelClass: 'custom-dialog-container',
      width: '90vw',
      maxWidth: '700px',
      disableClose: true,
      autoFocus: false,
      data: { produtos: this.itensCarrinho }
    });
  }


}
