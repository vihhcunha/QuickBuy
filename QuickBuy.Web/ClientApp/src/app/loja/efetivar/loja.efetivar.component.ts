import { Component, OnInit } from "@angular/core";
import { LojaCarrinhoCompras } from "../carrinho/loja.carrinho.compras";
import { Produto } from "../../model/produto";

@Component({
  selector: "loja-efetivar",
  templateUrl: "./loja.efetivar.component.html",
  styleUrls: ["./loja.efetivar.component.css"]
})
export class LojaEfetivarComponent implements OnInit{

  public produtos: Produto[] = [];
  public carrinho: LojaCarrinhoCompras;

  ngOnInit(): void {
    this.carrinho = new LojaCarrinhoCompras();
    this.produtos = this.carrinho.obterProdutos();
  }

  public atualizarPreco(produto: Produto, quantidade: number) {
    if (!produto.precoOriginal) {
      produto.precoOriginal = produto.preco;
    }
    produto.preco = produto.precoOriginal * quantidade;
  }

}
