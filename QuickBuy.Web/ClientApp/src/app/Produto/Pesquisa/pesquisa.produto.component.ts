import { Component, OnInit } from "@angular/core";
import { Produto } from "../../model/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Router } from "@angular/router";

@Component({
  selector: "pesquisa-produto",
  templateUrl: "./pesquisa.produto.component.html",
  styleUrls: ["./pesquisa.produto.component.css"]
})
export class PesquisaProdutoComponent implements OnInit {

  public produtos: Produto[];

  ngOnInit(): void {
       
  }

  constructor(private produtoServico: ProdutoServico, private router: Router) {
    this.produtoServico.obterTodosOsProdutos()
      .subscribe(
        produtos => {
          this.produtos = produtos;
        },
        e => {
          console.log(e.error);
        }
      );
  }

  public adicionarProduto() {
    this.router.navigate(['/produto']);
  }

  public excluirProduto(produto: Produto) {
    var retorno = confirm("Deseja realmente excluir o produto selecionado?");

    if (retorno == true) {
      this.produtoServico.deletar(produto)
        .subscribe(
          produtos => {
            this.produtos = produtos;
            console.log(produtos);
          },
          e => {
            console.log(e.error);
          }
        );
    }

  }


  public editarProduto(produto: Produto) {
    sessionStorage.setItem('produtoSessao', JSON.stringify(produto));
    this.router.navigate(['/produto']);
  }
}
