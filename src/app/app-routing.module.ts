import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthorizationGuard } from './core/guards/authorization.guard';


const routes: Routes = [{ path: 'home', component: HomeComponent , canActivate: [AuthorizationGuard] },
{ path: 'login', component: LoginComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**', redirectTo: '/home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
