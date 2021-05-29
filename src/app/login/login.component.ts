import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import {Session} from "../../app/core/models/session";
import {ApiService} from "../core/services/api.service";
import {LoginI} from "../core/models/logini";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
  private loginSession: Session;
  private loginI:LoginI;
  hide = true;

  constructor(private formBuilder: FormBuilder,
    private storageService: StorageService,
    private api: ApiService,
    private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  

  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      this.loginI= {
        grant_type: 'password',
        username: this.loginForm.get("username").value,
        password: this.loginForm.get("password").value
      }
      
      this.api.loginService(this.loginI).subscribe(data =>{
        if(data){
          this.loginSession = new Session();
          let token =  JSON.stringify( data );
          this.loginSession  = JSON.parse(token);
          this.correctLogin(this.loginSession);
        }
      }, error =>{
        console.log(error);
        this.snackBar.open(error, 'Aceptar', {
          duration: 4000,
        });
      });
      
    }
  }

  private correctLogin(data: Session){
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/home']);
  }

}
