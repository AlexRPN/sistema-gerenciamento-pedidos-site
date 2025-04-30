import { Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';

export const routes: Routes = [
  {path: '', redirectTo: 'produtos', pathMatch: 'full'},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'funcionarios', component: FuncionariosComponent},
  {path: 'relatorios', component: RelatoriosComponent},
];
