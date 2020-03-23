import { Component, OnInit } from "@angular/core"
import { Produto } from "../model/produto";
import { ProdutoServico } from "../servicos/produto/produto.servico";
import { Router } from "@angular/router";

@Component({
  selector: "app-produto",
  templateUrl: "./produto.component.html",
  styleUrls: ["./produto.component.css"]
})
export class ProdutoComponent implements OnInit {

  public produto: Produto;
  public arquivoSelecionado: File;
  public ativar_spinner: boolean;
  public mensagem: string;

  constructor(private produtoServico: ProdutoServico, private router: Router) {
    
  }

  ngOnInit(): void {
    var produtoSessao = sessionStorage.getItem('produtoSessao');

    if (produtoSessao) {
      this.produto = JSON.parse(produtoSessao);
    }
    else {
      this.produto = new Produto();
    }
  }

  public inputFileChange(files: FileList) {
    this.ativar_spinner = true;
    this.arquivoSelecionado = files.item(0);

    this.produtoServico.enviarArquivo(this.arquivoSelecionado)
      .subscribe(
        nomeArquivo => {
          this.produto.nomeArquivo = nomeArquivo;
          console.log(this.produto.nomeArquivo);
          this.ativar_spinner = false;
        },
        e => {
          console.log(e.error);
          this.ativar_spinner = false;
        });
  }

  public cadastrar() {

    this.ativar_spinner = true;
    this.produtoServico.cadastrar(this.produto)
      .subscribe(
        produtoJson => {
          console.log(produtoJson);
          this.ativar_spinner = false;
          this.router.navigate(['/pesquisar-produto'])
        },
        e => {
          console.log(e.error);
          this.mensagem = e.error;
          this.ativar_spinner = false;
        }
      );
  }
}
