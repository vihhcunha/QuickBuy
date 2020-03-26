import { Component, OnInit } from "@angular/core"
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../model/produto";
import { Router } from "@angular/router";
import { LojaCarrinhoCompras } from "../carrinho/loja.carrinho.compras";

@Component({
  selector: "loja-app-produto",
  templateUrl: "./loja.produto.component.html",
  styleUrls: ["./loja.produto.component.css"]
})
export class LojaProdutoComponent implements OnInit {

  public produto: Produto;
  public carrinho: LojaCarrinhoCompras;

  ngOnInit(): void {
    var prodJson = sessionStorage.getItem('produtoDetalhe');

    if (prodJson) {
      this.produto = JSON.parse(prodJson);
    }

    this.carrinho = new LojaCarrinhoCompras();
  }

  constructor(private produtoServico: ProdutoServico, private router: Router) {

  }

  public comprar() {
    this.carrinho.adicionar(this.produto);
    this.router.navigate(["/loja-efetivar"]);
  }

}
