import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaI } from 'src/app/core/models/categoriai';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-categoriaarticulotecleo',
  templateUrl: './categoriaarticulotecleo.component.html',
  styleUrls: ['./categoriaarticulotecleo.component.css']
})
export class CategoriaarticulotecleoComponent implements OnInit {

  _data:CategoriaI;
  ID:number;
  descripcion:string;
  tituloForm: String;

  constructor(@Optional() public dialogRef: MatDialogRef<CategoriaarticulotecleoComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: CategoriaI,
  private api: ApiService) {
      this._data = data;
   }

  ngOnInit(): void {

    if(this.data){  
      this.ID = this._data.idCategoriaProducto;
      this.descripcion = this.data.descripcion;      
      this.tituloForm ="Modificar Categoria ("+ this.ID+")" ;
    }else{
      this.tituloForm ="Grabar Categoria";
    }
  }

  cerrar() {
    this.dialogRef.close();
  }

  addItem() {
    this._data= {
      idCategoriaProducto: this.ID,
      descripcion: this.descripcion
    }

    this.api.setCategoria(this._data).subscribe(data => {
      console.log(data);
        this.dialogRef.close(true);
    })
  }

}
