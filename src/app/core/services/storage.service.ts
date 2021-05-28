import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Session } from '../models/session';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession: Session

  constructor(private router: Router) {
      this.localStorageService = localStorage;
      this.currentSession = this.loadSessionData();
   }

   setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('access_token', JSON.stringify(session));
  }

   loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('access_token');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('access_token');
    this.currentSession = null;
  }

  isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    return (this.getCurrentToken() != null && !helper.isTokenExpired(this.getCurrentToken())) ? true : false;
  };

  

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.access_token) ? session.access_token : null;
  };

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
