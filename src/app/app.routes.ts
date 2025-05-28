import { Routes } from '@angular/router';
import { ProdutosComponent } from './admin/produtos/pages/produto/produtos.component';
import { PedidosComponent } from './admin/pedidos/pages/pedidos.component';
import { ClientesComponent } from './admin/clientes/pages/cliente/clientes.component';
import { RelatoriosComponent } from './admin/relatorios/relatorios.component';
import { CadastrarProdutoComponent } from './admin/produtos/components/cadastrar-produto/cadastrar-produto.component';
import { EditarProdutoComponent } from './admin/produtos/components/editar-produto/editar-produto.component';
import { CriarPedidoComponent } from './admin/pedidos/components/criar-pedido/criar-pedido.component';
import { CadastrarClienteModalComponent } from './admin/clientes/components/cadastrar-cliente-modal/cadastrar-cliente-modal.component';
import { FuncionariosComponent } from './admin/funcionarios/pages/funcionario/funcionarios.component';
import { HomeComponent } from './client/home/pages/home/home.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout.component';
import { EditarClienteModalComponent } from './admin/clientes/components/editar-cliente-modal/editar-cliente-modal.component';
import { CadastroFuncionarioModalComponent } from './admin/funcionarios/components/cadastro-funcionario-modal/cadastro-funcionario-modal.component';
import { EditarFuncionarioModalComponent } from './admin/funcionarios/components/editar-funcionario-modal/editar-funcionario-modal.component';
import { DetalheFuncionarioModalComponent } from './admin/funcionarios/components/detalhe-funcionario-modal/detalhe-funcionario-modal.component';
import { AlterarStatusModalComponent } from './admin/pedidos/components/alterar-status-modal/alterar-status-modal.component';
import { LoginComponent } from './admin/login/pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { CardapioComponent } from './client/cardapio/pages/cardapio.component';
import { DetalhePedidoComponent } from './client/cardapio/components/detalhe-pedido/detalhe-pedido.component';

export const routes: Routes = [
  // Rotas do cliente (público)
  { path: '', component: HomeComponent },
  { path: 'cardapio', component: CardapioComponent },
  { path: 'pedidos/:id', component: DetalhePedidoComponent },

  // Login do admin (fora do layout)
  { path: 'admin/login', component: LoginComponent },

  // Rotas do admin (com layout)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'produtos', component: ProdutosComponent, canActivate: [authGuard] },
      { path: 'pedidos', component: PedidosComponent, canActivate: [authGuard] },
      { path: 'clientes', component: ClientesComponent, canActivate: [authGuard] },
      { path: 'funcionarios', component: FuncionariosComponent, canActivate: [authGuard] },
      { path: 'relatorios', component: RelatoriosComponent, canActivate: [authGuard] },
      { path: 'cadastro', component: CadastrarProdutoComponent, canActivate: [authGuard] },
      { path: 'editar/:id', component: EditarProdutoComponent, canActivate: [authGuard] },
      { path: 'criar-pedido', component: CriarPedidoComponent, canActivate: [authGuard] },
      { path: 'cadastro-cliente', component: CadastrarClienteModalComponent, canActivate: [authGuard] },
      { path: 'editar-cliente/:id', component: EditarClienteModalComponent, canActivate: [authGuard] },
      { path: 'cadastro-funcionario', component: CadastroFuncionarioModalComponent, canActivate: [authGuard]},
      { path: 'editar-funcionario/:id', component: EditarFuncionarioModalComponent, canActivate: [authGuard] },
      { path: 'detalhe-funcionario/:id', component: DetalheFuncionarioModalComponent, canActivate: [authGuard] },
      { path: 'alterar-status-pedido/:id', component: AlterarStatusModalComponent, canActivate: [authGuard] }
    ]
  }
];
