import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProveedorI } from 'src/app/core/models/proveedori';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-proveedortecleo',
  templateUrl: './proveedortecleo.component.html',
  styleUrls: ['./proveedortecleo.component.css']
})
export class ProveedortecleoComponent implements OnInit {

  public submitted: Boolean = false;
  frm: FormGroup;
  public error: {code: number, message: string} = null;

  _data:ProveedorI;

  ID:number;

  tituloForm: String;

  constructor(@Optional() public dialogRef: MatDialogRef<ProveedortecleoComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: ProveedorI,
  private api: ApiService,public formBuilder: FormBuilder) {
      this._data = data;
   }

  ngOnInit(): void {

    this.frm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      nombreComercial: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      nit: ['', [Validators.required]]
    });

    if(this.data){  
      this.ID = this._data.id;
      this.frm.get('nombre').setValue( this.data.nombre); 
      this.frm.get('direccion').setValue( this.data.direccion); 
      this.frm.get('nombreComercial').setValue( this.data.nombreComercial); 
      this.frm.get('nit').setValue( this.data.nit); 
      this.frm.get('telefono').setValue( this.data.telefono); 
      this.frm.get('mail').setValue( this.data.mail); 

      this.tituloForm ="Modificar Proveedor ("+ this.ID+")" ;
    }else{
      this.tituloForm ="Grabar Proveedor";
    }


  }

  cerrar() {
    this.dialogRef.close();
  }

  addItem():void {
    this.submitted = true;
    this.error = null;

    if(this.frm.valid){
      this._data= {
        id: this.ID,
        nombre: this.frm.get('nombre').value,
        direccion: this.frm.get('direccion').value,
        nombreComercial: this.frm.get('nombreComercial').value,
        nit: this.frm.get('nit').value,
        telefono: this.frm.get('telefono').value,
        mail: this.frm.get('mail').value
      }
      
      this.api.setProveedor(this._data).subscribe(data => {
        console.log(data);
          this.dialogRef.close(true);
      })
    }

  
  }
}
