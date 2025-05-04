import { Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/components/produto/produtos.component';
import { PedidosComponent } from './pedidos/pages/pedidos.component';
import { ClientesComponent } from './clientes/components/cliente/clientes.component';
import { FuncionariosComponent } from './funcionarios/components/funcionario/funcionarios.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { CadastrarProdutoComponent } from './produtos/pages/cadastrar-produto/cadastrar-produto/cadastrar-produto.component';
import { EditarProdutoComponent } from './produtos/pages/editar-produto/editar-produto/editar-produto.component';
import { CriarPedidoComponent } from './pedidos/components/criar-pedido/criar-pedido/criar-pedido.component';

export const routes: Routes = [
  {path: '', redirectTo: 'produtos', pathMatch: 'full'},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'funcionarios', component: FuncionariosComponent},
  {path: 'relatorios', component: RelatoriosComponent},
  {path: 'cadastro', component: CadastrarProdutoComponent},
  {path: 'editar/:id', component: EditarProdutoComponent},
  {path: 'criar-pedido', component: CriarPedidoComponent}
];
