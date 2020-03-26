import { Component, OnInit } from "@angular/core";
import { LojaCarrinhoCompras } from "../carrinho/loja.carrinho.compras";
import { Produto } from "../../model/produto";
import { Pedido } from "../../model/pedido";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { ItemPedido } from "../../model/itemPedido";
import { PedidoServico } from "../../servicos/pedido/pedido.servico";
import { Router } from "@angular/router";

@Component({
  selector: "loja-efetivar",
  templateUrl: "./loja.efetivar.component.html",
  styleUrls: ["./loja.efetivar.component.css"]
})
export class LojaEfetivarComponent implements OnInit{

  public produtos: Produto[] = [];
  public carrinho: LojaCarrinhoCompras;
  public total: number;

  ngOnInit(): void {
    this.carrinho = new LojaCarrinhoCompras();
    this.produtos = this.carrinho.obterProdutos();
    this.atualizarTotal();
  }

  constructor(private usuarioServico: UsuarioServico, private pedidoServico: PedidoServico, private router: Router) {

  }

  public atualizarPreco(produto: Produto, quantidade: number) {
    if (!produto.precoOriginal) {
      produto.precoOriginal = produto.preco;
    }

    if (quantidade <= 0) {
      quantidade = 1;
      produto.quantidade = quantidade;
    }

    produto.preco = produto.precoOriginal * quantidade;
    this.carrinho.atualizar(this.produtos);

    this.atualizarTotal();
  }

  public remover(produto: Produto) {
    this.carrinho.removerProduto(produto);
    this.produtos = this.carrinho.obterProdutos();
    this.atualizarTotal();
  }

  public atualizarTotal() {
    this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
  }

  public efetivarCompra() {
    let pedido = this.criarPedido();
    this.pedidoServico.efetivarCompra(pedido)
      .subscribe(
        pedidoId => {
          sessionStorage.setItem("pedidoId", pedidoId.toString());
          this.produtos = [];
          this.carrinho.limparCarrinho();
          this.router.navigate(['/compra-realizada']);
        },
        e => {
          console.log(e.error);
        }
      );

  }

  public criarPedido(): Pedido {
    let pedido = new Pedido();
    pedido.usuarioId = this.usuarioServico.usuario.id;
    pedido.cep = "12132323";
    pedido.cidade = "São Paulo";
    pedido.estado = "SP";
    pedido.dataPrevisaoEntrega = new Date();
    pedido.formaPagamentoId = 1;
    pedido.numero = "12";
    pedido.endereco = "Rua sei la o que";

    this.produtos = this.carrinho.obterProdutos();

    for (let p of this.produtos) {
      let itemPedido = new ItemPedido();
      itemPedido.produtoId = p.id;

      if (!p.quantidade) {
        p.quantidade = 1;
      }

      itemPedido.quantidade = p.quantidade;

      pedido.itensPedido.push(itemPedido);
    }

    return pedido;
  }

}
