import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router:Router, private storageService: StorageService){}

  canActivate() {
    if(! this.storageService.isAuthenticated()){
       // not logged in so redirect to login page
       this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
