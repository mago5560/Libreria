import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import {Session} from "../../app/core/models/session";

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

  constructor(private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router) { }

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

      this.loginSession = new Session();
      this.loginSession.token ='{ ""access_token"": "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsiYmRzc2VjdXJlaWQiXSwidXNlcl9uYW1lIjoid296dmVsaSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2MjIwNTE1NTQsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImp0aSI6IjgxNGRkZjAwLTZhZTEtNGExNy04ZmZkLTIxNGU0MTczMDAzMiIsImNsaWVudF9pZCI6ImJkc2xpYnJlcmlhYXBwIn0.b8ga16bO441M1-8xx2A4D7SBmCxPCOGFf4Czgqs_dsc"}';
      this.correctLogin(this.loginSession);
    }
  }

  private correctLogin(data: Session){
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/home']);
  }

}
