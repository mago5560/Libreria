import { Component, OnInit, Inject, Optional  } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BodegaI } from 'src/app/core/models/bodegai';
import { ApiService } from 'src/app/core/services/api.service';


@Component({
  selector: 'app-bodegatecleo',
  templateUrl: './bodegatecleo.component.html',
  styleUrls: ['./bodegatecleo.component.css']
})
export class BodegatecleoComponent implements OnInit {

  bodega:BodegaI;
  bodegaId:number;
  descripcion:string;
  tituloForm: String;

  constructor(@Optional() public dialogRef: MatDialogRef<BodegatecleoComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: BodegaI,
  private api: ApiService) {
      this.bodega = data;
   }

  ngOnInit(): void {

    if(this.bodega){  
      this.bodegaId = this.bodega.bodegaId;
      this.descripcion = this.bodega.descripcion;      
      this.tituloForm ="Modificar Bodega ("+ this.bodegaId+")" ;
    }else{
      this.tituloForm ="Grabar Bodega";
    }
  }

  cerrar() {
    this.dialogRef.close();
  }

  addItem() {
    this.bodega= {
      bodegaId: this.bodegaId,
      descripcion: this.descripcion
    }

    this.api.setBodegas(this.bodega).subscribe(data => {
        console.log(data);
        this.dialogRef.close(true);
    })
  }
  //249 USD
  //1078 Q
  //224 Q 

  
}

