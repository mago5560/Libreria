import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaI } from 'src/app/core/models/categoriai';
import { MarcaI } from 'src/app/core/models/marca';
import { ProductoI } from 'src/app/core/models/productoi';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-productotecleo',
  templateUrl: './productotecleo.component.html',
  styleUrls: ['./productotecleo.component.css'],
  providers:[DatePipe]
})
export class ProductotecleoComponent implements OnInit {

  public submitted: Boolean = false;
  frm: FormGroup;
  public error: {code: number, message: string} = null;

  _data:ProductoI;
  _marcaData: MarcaI[];
  _categoriaData:CategoriaI[];



  ID:number;

  tituloForm: String;

  constructor(@Optional() public dialogRef: MatDialogRef<ProductotecleoComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductoI,
  private api: ApiService,public formBuilder: FormBuilder,private  datePipe: DatePipe) {
      this._data = data;
      this.fillCombo();
   }

  ngOnInit(): void {

    this.frm = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      fechaSaldo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      valorUnidad: ['', [Validators.required]],
      saldo: ['', [Validators.required]],
      perecedero: '',
    });

    if(this.data){  
      this.ID = this._data.id;
      
      this.frm.get('descripcion').setValue( this.data.descripcion); 
      this.frm.get('fechaSaldo').setValue( this.datePipe.transform(this.data.fechaSaldo,'yyyy-MM-dd')); 
      this.frm.get('categoria').setValue( this.data.categoriaProducto.idCategoriaProducto ); 
      this.frm.get('marca').setValue (this.data.marca.idMarca); 
      this.frm.get('valorUnidad').setValue( this.data.valor); 
      this.frm.get('perecedero').setValue( this.data.perecedero);   
      this.frm.get('saldo').setValue( this.data.saldo);       

      this.tituloForm ="Modificar Producto ("+ this.ID+")" ;
      
    }else{

      this.tituloForm ="Grabar Producto";
    }


   
  }

  cerrar() {
    this.dialogRef.close();
  }

  addItem():void {
    this.submitted = true;
    this.error = null;

    if(this.frm.valid){
    
      let selectMarca = this._marcaData.find(c => c.idMarca ==this.frm.get('marca').value)  
      let selectCategoriaProducto = this._categoriaData.find(c => c.idCategoriaProducto == this.frm.get('categoria').value)  
      this._data= {
        id: this.ID,
        descripcion: this.frm.get('descripcion').value,
        fechaSaldo: this.datePipe.transform(this.frm.get('fechaSaldo').value,"yyyy-MM-dd'T'HH:mm:ss"),
        categoriaProducto: selectCategoriaProducto,
        marca: selectMarca,
        valorUnidad: this.frm.get('valorUnidad').value,
        valor: this.frm.get('saldo').value * this.frm.get('valorUnidad').value,
        perecedero: this.frm.get('perecedero').value,
        identificador :"",
        maximo:0,
        minimo:0,
        porcentajeGanancia:0,
        saldo: this.frm.get('saldo').value,
        valorPromedio:0
      }

      this.api.setProducto(this._data).subscribe(data => {
          this.dialogRef.close(true);
      })
    }
  }

 
  fillCombo(){
   
    this.api.getCategoria().subscribe(data =>{
      this._categoriaData = data;
    })

    this.api.getMarca().subscribe(data =>{
      this._marcaData = data;
    })
    

  }

}
