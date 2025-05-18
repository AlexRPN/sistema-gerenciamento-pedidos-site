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

export const routes: Routes = [
  // Rotas do cliente (público)
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeComponent },
      // Outras rotas do cliente podem ser adicionadas aqui
    ]
  },
  // Rotas do admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'produtos', pathMatch: 'full' },
      { path: 'produtos', component: ProdutosComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'funcionarios', component: FuncionariosComponent },
      { path: 'relatorios', component: RelatoriosComponent },
      { path: 'cadastro', component: CadastrarProdutoComponent },
      { path: 'editar/:id', component: EditarProdutoComponent },
      { path: 'criar-pedido', component: CriarPedidoComponent },
      { path: 'cadastro-cliente', component: CadastrarClienteModalComponent },
      { path: 'editar-cliente/:id', component: EditarClienteModalComponent },
      { path: 'cadastro-funcionario', component: CadastroFuncionarioModalComponent },
      { path: 'editar-funcionario/:id', component: EditarFuncionarioModalComponent },
      { path: 'detalhe-funcionario/:id', component: DetalheFuncionarioModalComponent }
    ]
  }
];
