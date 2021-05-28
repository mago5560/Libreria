import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public submitted: Boolean = false;
  @Input() sidenav: MatSidenav

  constructor(private api: ApiService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
  }

  buscarBogedas(){
    this.api.getBodegas().subscribe(data =>{
      console.log(data);
   });
  }

  logout(){
    this.storageService.logout();
  }

}
