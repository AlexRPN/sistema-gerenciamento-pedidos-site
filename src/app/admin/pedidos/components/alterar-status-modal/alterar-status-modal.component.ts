import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PedidoResponse } from '../../models/response/pedido.response';
import { PedidoService } from '../../services/pedido.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alterar-status-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './alterar-status-modal.component.html',
  styleUrl: './alterar-status-modal.component.css'
})
export class AlterarStatusModalComponent {
  statusSelecionado: string = '';
  motivoCancelamento: string = '';
  pedido!: PedidoResponse;

  constructor(
    private dialogRef: MatDialogRef<AlterarStatusModalComponent>,
    private pedidoService: PedidoService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { pedido: PedidoResponse }
  ) {
    this.pedido = data.pedido;
    this.statusSelecionado = this.pedido.statusPedido;
    this.motivoCancelamento = this.pedido.motivoCancelamento;
  }


  get exibirMotivoCancelamento(): boolean {
    return this.statusSelecionado === 'Cancelado';
  }


  alterarStatusPedido() {
    const pedidoAtualizado = { ...this.pedido, statusPedido: this.statusSelecionado, motivoCancelamento: this.motivoCancelamento };
    //console.log(pedidoAtualizado, "Pedido atualizado");
    this.pedidoService.alterarStatusPedido(pedidoAtualizado.id, this.statusSelecionado, pedidoAtualizado.motivoCancelamento).subscribe({
      next: response => {
        console.log(response, "Resposta do pedido");
        if (response.dados) {
          this.toastr.success(response.mensagem, 'Sucesso!');
          this.dialogRef.close('atualizar');
        } else {
          this.toastr.error(response.mensagem, 'Erro!');
        }
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
