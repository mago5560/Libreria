import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { IngresoDetalleI } from 'src/app/core/models/ingresodetallei';
import { IngresoI } from 'src/app/core/models/ingresoi';
import { ProductoI } from 'src/app/core/models/productoi';
import { ProveedorI } from 'src/app/core/models/proveedori';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-ingresotecleo',
  templateUrl: './ingresotecleo.component.html',
  styleUrls: ['./ingresotecleo.component.css']
  ,providers:[DatePipe]
})
export class IngresotecleoComponent implements OnInit {
  public submitted: Boolean = false;
  frm: FormGroup;
  public error: {code: number, message: string} = null;

  tituloForm: String;
  _data:IngresoI;
  _dataDetalle:IngresoDetalleI;
  ID:number;
  IDDetalle:number;

  _proveedorData: ProveedorI[];
  _productoData: ProductoI[];
  _ingresoDetalle: IngresoDetalleI[]=[];



  public localSave: Boolean = true;

  constructor(@Optional() public dialogRef: MatDialogRef<IngresotecleoComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: IngresoI,
  private api: ApiService,public formBuilder: FormBuilder,private  datePipe: DatePipe, private snackBar: MatSnackBar) {
      this._data = data;
      this.fillCombo();
     
   }

  ngOnInit(): void {

    this.frm = this.formBuilder.group({
      fecha:['',Validators.required],
      proveedor:['',Validators.required],
      producto:['',Validators.required],
      cantidad:['',Validators.required]
    });

      if(this._data){  
          this.ID = this._data.idIngreso;
          this.tituloForm ="Consulta Ingreso ("+ this.ID+")" ;
          this.frm.get("fecha").setValue(this.datePipe.transform(this.data.fecha,'yyyy-MM-dd'))
          this.frm.get("proveedor").setValue(this.data.proveedor.id)
          this.frm.get("fecha").disable();
          this.frm.get("proveedor").disable();
          this.frm.get("producto").disable();
          this.frm.get("cantidad").disable();
          this.localSave = false;
          this.buscar();
      }else{
        this.frm.get("fecha").setValue(this.datePipe.transform(new Date(),"yyyy-MM-dd"));
        this.tituloForm ="Grabar Ingreso";
      }
  }

  displayedColumns: string[] = ['idIngresoDetalle', 'producto','cantidad','valor','valorTotal','opciones'];
  dataSource: MatTableDataSource<IngresoDetalleI>;


  cerrar() {
    this.dialogRef.close();
  }

  addItem() {
    this.submitted = true;
    this.error = null;

    if(this.frm.valid){
        let selectProducto = this._productoData.find(c => c.id == this.frm.get("producto").value);
        this._dataDetalle={
            producto: selectProducto,
            idIngresoDetalle: this.IDDetalle,
            ingreso:null,
            cantidad: this.frm.get("cantidad").value,
            valor: selectProducto.valorUnidad ,
            valorTotal:selectProducto.valorUnidad * this.frm.get("cantidad").value
        }
        this._ingresoDetalle.push(this._dataDetalle);
        this.dataSource = new MatTableDataSource(this._ingresoDetalle);

        this.frm.get("fecha").disable();
        this.frm.get("proveedor").disable();
        this.frm.get("cantidad").setValue("");
        this.frm.get("producto").setValue("");
    }

  }

  fillCombo(){  
    this.api.getProveedor().subscribe(data =>{
      this._proveedorData = data;
    })
    this.api.getProducto().subscribe(data =>{
      this._productoData = data;
    })
  }


  grabar(){
    
    if(this.dataSource.data.length > 0){
        let selectProveedor = this._proveedorData.find(c=> c.id == this.frm.get("proveedor").value);
        this._data={
          idIngreso: this.ID,
          fecha : this.datePipe.transform(this.frm.get('fecha').value,"yyyy-MM-dd'T'HH:mm:ss"),
          proveedor:selectProveedor
        }

        this.api.setIngreso(this._data).subscribe(data =>{
          if(data){
              this._ingresoDetalle.forEach( item =>{
                item.ingreso = data
                this.api.setIngresoDetalle(item).subscribe(data =>{})
              })
              this.dialogRef.close(true);
          }else{
            this.snackBar.open('No se grabaron los registros favor de verificacion comunicacion.', 'Aceptar', {
              duration: 2000,
            });      
          }
        })

    }else{
      this.snackBar.open('Debe de grabar por lo menos una linea', 'Aceptar', {
        duration: 2000,
      });
    }
  }

  eliminar(data:IngresoDetalleI) {
      let index: number = this._ingresoDetalle.findIndex(c=> c == data);
      this._ingresoDetalle.splice(index,1);
      this.dataSource = new MatTableDataSource(this._ingresoDetalle);
  }


  buscar(){
    this.api.getIngresoDetalle().subscribe(data =>{
      if(data){ 
        data.forEach(item =>{
          if(item.ingreso.idIngreso == this.ID){
            this._ingresoDetalle.push(item);
          }
        })
        this.dataSource = new MatTableDataSource(this._ingresoDetalle);
      }
    })
  }

}
