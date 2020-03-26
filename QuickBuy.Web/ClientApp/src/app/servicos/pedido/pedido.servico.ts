import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pedido } from "../../model/pedido"

@Injectable({
  providedIn: "root"
})
export class PedidoServico implements OnInit {

  private _baseUrl: string;
  public pedido: Pedido;

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  ngOnInit(): void {
    
  }

  public efetivarCompra(pedido: Pedido): Observable<number> {
    return this.http.post<number>(this._baseUrl + "api/Pedido/EfetivarCompra", JSON.stringify(pedido), { headers: this.headers });
  }
}
