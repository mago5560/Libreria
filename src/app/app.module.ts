import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import{MaterialModule} from '../app/material/material.module';
import { BodegaComponent } from './bodega/bodega.component';
import { BodegatecleoComponent } from './bodega/tecleo/bodegatecleo.component';
import { FooterbarComponent } from './footerbar/footerbar.component';
import { CategoriaarticuloComponent } from './categoriaarticulo/categoriaarticulo.component';
import { CategoriaarticulotecleoComponent } from './categoriaarticulo/tecleo/categoriaarticulotecleo.component';
import { MarcaComponent } from './marca/marca.component';
import { MarcatecleoComponent } from './marca/marcatecleo/marcatecleo.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClientetecleoComponent } from './cliente/clientetecleo/clientetecleo.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProveedortecleoComponent } from './proveedor/proveedortecleo/proveedortecleo.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductotecleoComponent } from './producto/productotecleo/productotecleo.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { SalidaComponent } from './salida/salida.component';
import { IngresotecleoComponent } from './ingreso/ingresotecleo/ingresotecleo.component';
import { SalidatecleoComponent } from './salida/salidatecleo/salidatecleo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BodegaComponent,
    BodegatecleoComponent,
    FooterbarComponent,
    CategoriaarticuloComponent,
    CategoriaarticulotecleoComponent,
    MarcaComponent,
    MarcatecleoComponent,
    ClienteComponent,
    ClientetecleoComponent,
    ProveedorComponent,
    ProveedortecleoComponent,
    ProductoComponent,
    ProductotecleoComponent,
    IngresoComponent,
    SalidaComponent,
    IngresotecleoComponent,
    SalidatecleoComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
