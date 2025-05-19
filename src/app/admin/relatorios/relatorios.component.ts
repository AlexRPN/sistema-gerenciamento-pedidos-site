import { Component, OnInit, Inject } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../pedidos/services/pedido.service';
import { PedidoResponse } from '../pedidos/models/response/pedido.response';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [NgChartsModule, FormsModule, CommonModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent implements OnInit {
  faturamentoTotal = 0;
  periodoSelecionado: 'mes' = 'mes';
  statusSelecionado: 'Todos' | 'Entregue' | 'Cancelado' = 'Todos';
  public barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public barChartType: 'bar' = 'bar';
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true } },
    indexAxis: 'x',
    maintainAspectRatio: false
  };

  constructor(@Inject(PedidoService) private pedidoService: PedidoService) {}

  ngOnInit() {
    this.filtrar();
  }

  filtrar() {
    this.pedidoService.listarPedidos().subscribe((response: { dados: PedidoResponse[] }) => {
      let pedidos: PedidoResponse[] = response.dados || [];

      if (this.statusSelecionado !== 'Todos') {
        pedidos = pedidos.filter((p: PedidoResponse) => p.statusPedido === this.statusSelecionado);
      }

      // Agrupa por mês
      const agrupado: { [key: string]: { quantidade: number, faturamento: number } } = {};
      let faturamento = 0;

      pedidos.forEach((pedido: PedidoResponse) => {
        const d = new Date(pedido.dataPedido);
        const chave = `${d.getMonth() + 1}/${d.getFullYear()}`;

        if (!agrupado[chave]) agrupado[chave] = { quantidade: 0, faturamento: 0 };

        agrupado[chave].quantidade += 1;
        agrupado[chave].faturamento += pedido.valorTotal;

        if (pedido.statusPedido === 'Entregue') {
          faturamento += pedido.valorTotal;
        }
      });

      this.faturamentoTotal = faturamento;

      const labels = Object.keys(agrupado).sort((a, b) => {
        const [ma, ya] = a.split('/').map(Number);
        const [mb, yb] = b.split('/').map(Number);
        return ya !== yb ? ya - yb : ma - mb;
      });

      const quantidades = labels.map(l => agrupado[l].quantidade);
      const faturamentos = labels.map(l => agrupado[l].faturamento);

      this.barChartData = {
        labels,
        datasets: [
          {
            label: 'Vendas ' + (this.statusSelecionado === 'Todos' ? 'Entregues/Canceladas' : this.statusSelecionado),
            data: quantidades,
            backgroundColor: 'rgba(27,197,189,0.7)',
            borderColor: '#1BC5BD',
            borderWidth: 1,
            yAxisID: 'y',
            barThickness: 80 // Colunas mais finas
          },
          {
            label: 'Faturamento Total',
            data: faturamentos,
            backgroundColor: 'rgba(105,147,255,0.7)',
            borderColor: '#6993FF',
            borderWidth: 1,
            yAxisID: 'y1',
            barThickness: 80 // Colunas mais finas
          }
        ]
      };

      this.barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            position: 'left',
            title: {
              display: true,
              text: 'Vendas'
            }
          },
          y1: {
            beginAtZero: true,
            position: 'right',
            title: {
              display: true,
              text: 'Faturamento (R$)'
            },
            grid: {
              drawOnChartArea: false
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Resumo de Vendas e Faturamento'
          }
        }
      };


      this.barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: { size: 14 }
            }
          },
          title: {
            display: true,
            text: 'Resumo de Vendas e Faturamento',
            font: { size: 18 }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context: any) => {
                const label = context.dataset.label || '';
                const value = context.raw;
                if (label.includes('Faturamento')) {
                  return `${label}: R$ ${value.toFixed(2).replace('.', ',')}`;
                }
                return `${label}: ${value}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Período (Mês/Ano)',
              font: { size: 14 }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Vendas',
              font: { size: 14 }
            }
          },
          y1: {
            beginAtZero: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            title: {
              display: true,
              text: 'Faturamento (R$)',
              font: { size: 14 }
            },
            ticks: {
              callback: function (tickValue: string | number) {
                const num = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue.replace(/[^0-9\,\.]/g, '').replace(',', '.'));
                return 'R$ ' + num.toLocaleString('pt-BR');
              }
            }
          }
        },
        indexAxis: 'x'
      };
    });
  }

}
