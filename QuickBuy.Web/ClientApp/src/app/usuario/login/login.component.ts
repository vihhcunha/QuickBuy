import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../model/usuario";
import { Router, ActivatedRoute } from "@angular/router"
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  public usuario = new Usuario()
  public returnUrl: string;
  public mensagem: string;
  private requisitando: boolean;

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private usuarioServico: UsuarioServico) {
    
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'];
  }


  entrar() {
    this.requisitando = true;
    this.usuarioServico.verificarUsuario(this.usuario)
      .subscribe(
        usuario_json => {

          this.usuarioServico.usuario = usuario_json;

          var usuarioRetorno: Usuario;
          usuarioRetorno = usuario_json;
          sessionStorage.setItem("usuarioAutenticado", "1");
          sessionStorage.setItem("email-usuario", usuarioRetorno.email);
          this.mensagem = null;

          if (this.returnUrl == null) {
            this.router.navigate(['/']);
          }
          else {
            this.router.navigate([this.returnUrl]);
          }
        },
        err => {
          this.mensagem = err.error;
          this.requisitando = false;
        }
    );


    //if (this.usuario.email == "vinicius2010.cunha@hotmail.com" && this.usuario.senha == "123") {
    //  //localStorage.setItem("usuarioAutenticado", "1");
    //  sessionStorage.setItem("usuarioAutenticado", "1");
    //  this.router.navigate([this.returnUrl]);
    //}
  }

  onfocus() {
    var inputEmail = document.getElementById("email");
    inputEmail.style.transition = "all 0.5s"
    inputEmail.style.marginTop = "100px";
  }

  onblur() {
    var inputEmail = document.getElementById("email");
    inputEmail.style.transition = "all 0.5s"
    inputEmail.style.marginTop = "50px";
  }

  onkeypress() {
    var inputEmail = document.getElementById("email");

    this.usuario.email = (<HTMLInputElement>inputEmail).value;
  }
}
