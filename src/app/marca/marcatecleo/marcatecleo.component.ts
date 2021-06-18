import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MarcaI } from 'src/app/core/models/marca';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-marcatecleo',
  templateUrl: './marcatecleo.component.html',
  styleUrls: ['./marcatecleo.component.css']
})
export class MarcatecleoComponent implements OnInit {

  _data:MarcaI;
  ID:number;
  descripcion:string;
  tituloForm: String;

  constructor(@Optional() public dialogRef: MatDialogRef<MarcatecleoComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: MarcaI,
  private api: ApiService) {
      this._data = data;
   }

  ngOnInit(): void {

    if(this.data){  
      this.ID = this._data.idMarca;
      this.descripcion = this.data.descripcion;      
      this.tituloForm ="Modificar Marca ("+ this.ID+")" ;
    }else{
      this.tituloForm ="Grabar Marca";
    }
  }

  cerrar() {
    this.dialogRef.close();
  }

  addItem() {
    this._data= {
      idMarca: this.ID,
      descripcion: this.descripcion
    }

    this.api.setMarca(this._data).subscribe(data => {
      console.log(data);
        this.dialogRef.close(true);
    })
  }
}
