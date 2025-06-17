import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardapioService } from '../../services/cardapio.service';
import { PedidoResponse } from '../../../../admin/pedidos/models/response/pedido.response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrl: './detalhe-pedido.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class DetalhePedidoComponent implements OnInit {
  pedido: PedidoResponse | null = null;
  carregando = true;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private cardapioService: CardapioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cardapioService.obterPedidoPorId(id).subscribe({
        next: (resp: any) => {
          console.log('Resposta da API:', resp);
          this.pedido = resp.dados;
          this.carregando = false;
          console.log(this.pedido, 'pedido');
        },
        error: () => {
          this.erro = 'Não foi possível carregar os detalhes do pedido.';
          this.carregando = false;
        }
      });
    } else {
      this.erro = 'Pedido não encontrado.';
      this.carregando = false;
    }
  }

  voltarParaCardapio() {
    this.router.navigate(['/cardapio']);
  }

  formatarStatus(status: string): string {
    if (!status) return '-';
    return status
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace('Em Preparacao', 'Em Preparação')
      .trim();
  }

  public formatarTelefoneExibicao(telefone: string): string {
    if (!telefone) return '';
    let valor = telefone.replace(/\D/g, '');
    if (valor.length === 11) {
      return valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    } else if (valor.length === 10) {
      return valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
  }
}
