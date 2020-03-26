import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioServico } from '../servicos/usuario/usuario.servico';
import { LojaCarrinhoCompras } from '../loja/carrinho/loja.carrinho.compras';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;

  public carrinho: LojaCarrinhoCompras;

  ngOnInit(): void {
    this.carrinho = new LojaCarrinhoCompras();
  }

  constructor(private router: Router, private usuarioServico: UsuarioServico) {
    
  }
    

  get usuario() {
    console.log(this.usuarioServico.usuarioAutenticado())
    return this.usuarioServico.usuario;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public usuarioLogado(): boolean {
    return this.usuarioServico.usuarioAutenticado();
  }

  public usuarioAdministrador(): boolean {
    return this.usuarioServico.usuarioAdministrador();
  }

  sair() {
    this.usuarioServico.limparSessao();
    this.router.navigate(['/']);
  }

  public temItensCarrinho(): boolean {
    return this.carrinho.temItens();
  }
}
