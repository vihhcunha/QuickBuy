import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProdutoComponent } from './Produto/produto.component';
import { LoginComponent } from './usuario/login/login.component';
import { GuardaRotas } from './autorizacao/guardaRotas';
import { UsuarioServico } from './servicos/usuario/usuario.servico';
import { CadastroUsuarioComponent } from './usuario/cadastro/cadastro.usuario.component';
import { HomeComponent } from './home/home.component';
import { ProdutoServico } from './servicos/produto/produto.servico';
import { PesquisaProdutoComponent } from './Produto/Pesquisa/pesquisa.produto.component';
import { LojaPesquisaComponent } from './loja/pesquisa/loja.pesquisa.component';
import { LojaProdutoComponent } from './loja/produto/loja.produto.component';
import { LojaEfetivarComponent } from './loja/efetivar/loja.efetivar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ProdutoComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    HomeComponent,
    PesquisaProdutoComponent,
    LojaPesquisaComponent,
    LojaProdutoComponent,
    LojaEfetivarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      //{ path: 'produto', component: ProdutoComponent, canActivate: [GuardaRotas] },
      { path: 'produto', component: ProdutoComponent},
      { path: 'entrar', component: LoginComponent },
      { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
      { path: 'pesquisar-produto', component: PesquisaProdutoComponent },
      { path: 'loja', component: LojaPesquisaComponent },
      { path: 'loja-produto', component: LojaProdutoComponent },
      { path: 'loja-efetivar', component: LojaEfetivarComponent }
    ])
  ],
  providers: [UsuarioServico, ProdutoServico],
  bootstrap: [AppComponent]
})
export class AppModule { }
