import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import { BodegaComponent } from './bodega/bodega.component';
import { CategoriaarticuloComponent } from './categoriaarticulo/categoriaarticulo.component';
import { MarcaComponent } from './marca/marca.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProductoComponent } from './producto/producto.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { SalidaComponent } from './salida/salida.component';
import { IngresotecleoComponent } from './ingreso/ingresotecleo/ingresotecleo.component';


const routes: Routes = [{ path: 'home', component: HomeComponent , canActivate: [AuthorizationGuard] },
{ path: 'bodega', component: BodegaComponent , canActivate: [AuthorizationGuard] },
{ path: 'categoria', component: CategoriaarticuloComponent , canActivate: [AuthorizationGuard] },
{ path: 'marca', component: MarcaComponent , canActivate: [AuthorizationGuard] },
{ path: 'cliente', component: ClienteComponent , canActivate: [AuthorizationGuard] },
{ path: 'proveedor', component: ProveedorComponent , canActivate: [AuthorizationGuard] },
{ path: 'producto', component: ProductoComponent , canActivate: [AuthorizationGuard] },
{ path: 'ingreso', component: IngresoComponent,canActivate: [AuthorizationGuard]  },
{ path: 'salida', component: SalidaComponent, canActivate: [AuthorizationGuard]  },
{ path: 'login', component: LoginComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**', redirectTo: '/home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
