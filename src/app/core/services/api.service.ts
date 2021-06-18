import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { AuthorizationApi } from '../models/authorizationapi';
import { LoginI } from '../models/logini';
import { from, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BodegaI } from '../models/bodegai';
import { StorageService } from './storage.service';
import { ResponseErrorI } from '../models/response_error_i';
import { CategoriaI } from '../models/categoriai';
import { MarcaI } from '../models/marca';
import { ClienteI } from '../models/clientei';
import { ProveedorI } from '../models/proveedori';
import { ProductoI } from '../models/productoi';
import { IngresoI } from '../models/ingresoi';
import { IngresoDetalleI } from '../models/ingresodetallei';
import { SalidaI } from '../models/salidai';
import { SalidaDetalleI } from '../models/salidadetallei';


export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "http://143.198.122.31/libreria/";

  constructor(private http: HttpClient, private storageService: StorageService,) {}

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    let errorMessage;
    let _error = JSON.stringify(error.error);
    const _errorM : ResponseErrorI = JSON.parse(_error);

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error("Ocurrio un error:", error.error.message);
      errorMessage = "Ocurrio un error:"+ error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      //console.error("Error retornado de Backend " + error.status + ", Cuerpo de error " + error.error);
        errorMessage = "Error  " + _errorM.error + ", detalle de error " + _errorM.error_description
    }
    // return an observable with a user-facing error message
    //return throwError("Algo malo sucedio; Por favor, inténtelo de nuevo más tarde.");
    return throwError(errorMessage);
  };



  loginService(login: LoginI) {
    var auth: AuthorizationApi = new AuthorizationApi();

    var _body = new HttpParams()
    .set("grant_type", login.grant_type)
    .set("username", login.username)
    .set("password", login.password);

    const _headers = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded;application/json; charset=utf-8")
    .set("Authorization", "Basic " + btoa(auth.username + ":" + auth.password));

    return this.http.post(this.url + 'oauth/token', _body.toString(), { headers: _headers }).pipe(retry(0), catchError(this.handleError));
  }




  getBodegas(): Observable<BodegaI[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.get<BodegaI[]>(this.url + 'bodegas', { headers: reqHeader });
  }

  setBodegas(bodegaI:BodegaI){
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.post<HttpResponse<any>>(this.url + 'bodegas', JSON.stringify(bodegaI) ,{ headers: reqHeader });
  }

  eliminarBodega(bodega: BodegaI){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
   })

   var id: number = bodega.bodegaId;

    return this.http.delete(`${this.url}bodegas/${encodeURIComponent(String(id))}`,{headers:reqHeader})
  }




  getCategoria(): Observable<CategoriaI[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.get<CategoriaI[]>(this.url + 'cat-producto', { headers: reqHeader });
  }

  setCategoria(data:CategoriaI){
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.post<any>(this.url + 'cat-producto', JSON.stringify(data) ,{ headers: reqHeader });
  }

  eliminarCategoria(data: CategoriaI){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
   })

    return this.http.delete(`${this.url}cat-producto/${encodeURIComponent(String(data.idCategoriaProducto))}`,{headers:reqHeader})
  }




  getMarca(): Observable<MarcaI[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.get<MarcaI[]>(this.url + 'marca', { headers: reqHeader });
  }

  setMarca(data:MarcaI){
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.post<any>(this.url + 'marca', JSON.stringify(data) ,{ headers: reqHeader });
  }

  eliminarMarca(data: MarcaI){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
   })

    return this.http.delete(`${this.url}marca/${encodeURIComponent(String(data.idMarca))}`,{headers:reqHeader})
  }


  getCliente(): Observable<ClienteI[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.get<ClienteI[]>(this.url + 'cliente', { headers: reqHeader });
  }

  setCliente(data:ClienteI){
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.post<any>(this.url + 'cliente', JSON.stringify(data) ,{ headers: reqHeader });
  }

  eliminarCliente(data: ClienteI){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
   })

    return this.http.delete(`${this.url}cliente/${encodeURIComponent(String(data.id))}`,{headers:reqHeader})
  }



  getProveedor(): Observable<ProveedorI[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.get<ProveedorI[]>(this.url + 'proveedor', { headers: reqHeader });
  }

  setProveedor(data:ProveedorI){
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.post<any>(this.url + 'proveedor', JSON.stringify(data) ,{ headers: reqHeader });
  }

  eliminarProveedor(data: ProveedorI){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
   })

    return this.http.delete(`${this.url}proveedor/${encodeURIComponent(String(data.id))}`,{headers:reqHeader})
  }



  getProducto(): Observable<ProductoI[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.get<ProductoI[]>(this.url + 'producto', { headers: reqHeader });
  }

  setProducto(data:ProductoI){
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.post<any>(this.url + 'producto', JSON.stringify(data) ,{ headers: reqHeader });
  }

  eliminarProducto(data: ProductoI){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
   })

    return this.http.delete(`${this.url}producto/${encodeURIComponent(String(data.id))}`,{headers:reqHeader})
  }



  getIngreso(): Observable<IngresoI[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.get<IngresoI[]>(this.url + 'ingreso', { headers: reqHeader });
  }

  setIngreso(data:IngresoI){
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.post<IngresoI>(this.url + 'ingreso', JSON.stringify(data) ,{ headers: reqHeader });
  }

  eliminarIngreso(data: IngresoI){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
   })

    return this.http.delete(`${this.url}ingreso/${encodeURIComponent(String(data.idIngreso))}`,{headers:reqHeader}).pipe(retry(0), catchError(this.handleError));
  }




  getIngresoDetalle(): Observable<IngresoDetalleI[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.get<IngresoDetalleI[]>(this.url + 'ingreso-detalle', { headers: reqHeader });
  }

  setIngresoDetalle(data:IngresoDetalleI){
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.post<IngresoDetalleI>(this.url + 'ingreso-detalle', JSON.stringify(data) ,{ headers: reqHeader });
  }

  eliminarIngresoDetalle(data: IngresoDetalleI){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
   })

    return this.http.delete(`${this.url}ingreso-detalle/${encodeURIComponent(String(data.idIngresoDetalle))}`,{headers:reqHeader}).pipe(retry(0), catchError(this.handleError));
  }



  getSalida(): Observable<SalidaI[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.get<SalidaI[]>(this.url + 'salida', { headers: reqHeader });
  }

  setSalida(data:SalidaI){
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.post<SalidaI>(this.url + 'salida', JSON.stringify(data) ,{ headers: reqHeader });
  }

  eliminarSalida(data: SalidaI){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
   })

    return this.http.delete(`${this.url}salida/${encodeURIComponent(String(data.idSalida))}`,{headers:reqHeader}).pipe(retry(0), catchError(this.handleError));
  }

  getSalidaDetalle(): Observable<SalidaDetalleI[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;application/json; charset=utf-8',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.get<SalidaDetalleI[]>(this.url + 'salida-detalle', { headers: reqHeader });
  }

  setSalidaDetalle(data:SalidaDetalleI){
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    return this.http.post<SalidaDetalleI>(this.url + 'salida-detalle', JSON.stringify(data) ,{ headers: reqHeader });
  }

  eliminarSalidaDetalle(data: SalidaDetalleI){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
   })

    return this.http.delete(`${this.url}salida-detalle/${encodeURIComponent(String(data.idSalidaDetalle))}`,{headers:reqHeader}).pipe(retry(0), catchError(this.handleError));
  }


}
