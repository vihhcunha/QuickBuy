import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from "../../model/usuario";


@Injectable({
  providedIn:"root"
})
export class UsuarioServico {

  private baseUrl: string;
  private _usuario: Usuario;

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  get usuario(): Usuario {
    return this._usuario;
  }

  set usuario(usuario: Usuario) {
    sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuario));
    this._usuario = usuario;
  }

  public usuarioAutenticado(): boolean {
    return this._usuario != null && this.usuario.email != "" && this.usuario.senha != ""; 
  }

  public limparSessao() {
    sessionStorage.setItem("usuarioAutenticado", "");
    this._usuario = null;
  }

  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public verificarUsuario(usuario: Usuario): Observable<Usuario> {

    const headers = new HttpHeaders().set('content-type', 'application/json');

    var body = {
      email: usuario.email,
      senha: usuario.senha
    }

    return this.http.post<Usuario>(this.baseUrl + "api/Usuario/VerificarUsuario", body, { headers });
    
  }

  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>
      (this.baseUrl + "api/usuario/CadastrarUsuario", JSON.stringify(usuario), { headers: this.headers });
  }
}
