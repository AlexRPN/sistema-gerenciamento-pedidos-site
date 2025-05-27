import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CardapioService } from '../../services/cardapio.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-confirmar-cliente-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule, MatIconModule, MatRadioModule],
  templateUrl: './confirmar-pedido-modal.component.html',
  styleUrl: './confirmar-pedido-modal.component.css',
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ConfirmarClienteModalComponent {
  // Etapas: cliente, endereco, pedido
  etapaAtual: 'cliente' | 'endereco' | 'pedido' = 'cliente';
  slideState = 'in';

  name: string = '';
  phone: string = '';

  // Estados para controle do fluxo
  carregando: boolean = false;
  clienteEncontrado: boolean = false;
  cliente: any = null;
  endereco: any = { logradouro: '', complemento: '', cep: '' };
  edicaoEndereco: boolean = false;

  // Dados do pedido
  produtos: any[] = [];
  entrega = true;
  retirada = false;
  pagamento = {
    dinheiro: false,
    pix: false,
    credito: false,
    debito: false
  };
  pagamentoSelecionado: string = '';

  constructor(
    private dialogRef: MatDialogRef<ConfirmarClienteModalComponent>,
    private cardapioService: CardapioService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.produtos = data?.produtos || [];
  }

  // Navegação entre etapas
  proximaEtapa() {
    if (this.etapaAtual === 'cliente') this.etapaAtual = 'endereco';
    else if (this.etapaAtual === 'endereco') this.etapaAtual = 'pedido';
  }
  etapaAnterior() {
    if (this.etapaAtual === 'pedido') this.etapaAtual = 'endereco';
    else if (this.etapaAtual === 'endereco') this.etapaAtual = 'cliente';
  }

  fecharModal() {
    this.dialogRef.close();
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

  onSubmit(form: any) {
    if (form.valid) {
      this.consultarCliente();
    }
  }

  consultarCliente() {
    if (!this.name && !this.phone) {
      // Pode exibir um alerta/toastr se desejar
      return;
    }
    this.carregando = true;
    this.clienteEncontrado = false;
    this.cliente = null;
    this.endereco = { logradouro: '', complemento: '', cep: '' };
    this.cardapioService.listarClientes({
      nome: this.name || undefined,
      telefone: this.phone || undefined
    }).subscribe({
      next: (response: any) => {
        this.carregando = false;
        if (response.dados && response.dados.length > 0) {
          const cliente: any = response.dados[0];
          this.cliente = cliente;
          this.endereco = {
            logradouro: cliente.endereco?.logradouro || '',
            complemento: cliente.endereco?.complemento || '',
            cep: cliente.endereco?.cep || ''
          };
          this.clienteEncontrado = true;
          this.edicaoEndereco = false;
          this.proximaEtapa();
        } else {
          this.clienteEncontrado = false;
          this.edicaoEndereco = true; // Permite preencher endereço
        }
      },
      error: () => {
        this.carregando = false;
        this.clienteEncontrado = false;
        this.edicaoEndereco = true;
      }
    });
  }

  habilitarEdicaoEndereco() {
    this.edicaoEndereco = true;
  }

  salvarEndereco() {
    if (!this.cliente) return;
    // Aqui você pode chamar o método de edição do cardapioService
    const request = {
      id: this.cliente.id,
      nome: this.cliente.nome,
      telefone: this.cliente.telefone,
      enderecoCliente: {
        id: this.cliente.endereco?.id,
        logradouro: this.endereco.logradouro,
        complemento: this.endereco.complemento,
        cep: this.endereco.cep
      }
    };
    this.cardapioService.editarCliente(request).subscribe(() => {
      this.edicaoEndereco = false;
      this.proximaEtapa();
    });
  }

  selecionarEntrega(isEntrega: boolean) {
    this.entrega = isEntrega;
    this.retirada = !isEntrega;
  }
}
