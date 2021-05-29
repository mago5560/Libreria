import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthorizationApi } from '../models/authorizationapi';
import { LoginI } from '../models/logini';
import { from, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BodegaI } from '../models/bodegai';
import { StorageService } from './storage.service';
import { ResponseErrorI } from '../models/response_error_i';


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

  setBodegas(bodegaI:BodegaI) {
    var reqHeader = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.storageService.getCurrentToken()
    })
    console.log(JSON.stringify(bodegaI))
    return this.http.post(this.url + 'bodegas', JSON.stringify(bodegaI) ,{ headers: reqHeader });
  }


}
