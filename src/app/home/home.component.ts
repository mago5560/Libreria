import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public homeForm: FormGroup;
  public submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.homeForm = this.formBuilder.group({});
  }

  public submitHome(): void {
    this.submitted = true;
    this.storageService.logout();
  }

}
