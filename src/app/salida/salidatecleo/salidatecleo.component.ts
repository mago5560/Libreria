import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteI } from 'src/app/core/models/clientei';
import { ProductoI } from 'src/app/core/models/productoi';
import { SalidaDetalleI } from 'src/app/core/models/salidadetallei';
import { SalidaI } from 'src/app/core/models/salidai';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-salidatecleo',
  templateUrl: './salidatecleo.component.html',
  styleUrls: ['./salidatecleo.component.css']
  ,providers:[DatePipe]
})
export class SalidatecleoComponent implements OnInit {

  public submitted: Boolean = false;
  frm: FormGroup;
  public error: {code: number, message: string} = null;

  tituloForm: String;
  _data:SalidaI;
  _dataDetalle:SalidaDetalleI;
  ID:number;
  IDDetalle:number;

  _clienteData: ClienteI[];
  _productoData: ProductoI[];
  _salidaDetalle: SalidaDetalleI[]=[];



  public localSave: Boolean = true;

  constructor(@Optional() public dialogRef: MatDialogRef<SalidatecleoComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: SalidaI,
  private api: ApiService,public formBuilder: FormBuilder,private  datePipe: DatePipe, private snackBar: MatSnackBar) {
      this._data = data;
      this.fillCombo();
   }

  ngOnInit(): void {

    this.frm = this.formBuilder.group({
      fecha:['',Validators.required],
      cliente:['',Validators.required],
      producto:['',Validators.required],
      cantidad:['',Validators.required]
    });

      if(this._data){  
          this.ID = this._data.idSalida;
          this.tituloForm ="Consulta Salida ("+ this.ID+")" ;
          this.frm.get("fecha").setValue(this.datePipe.transform(this.data.fecha,'yyyy-MM-dd'))
          this.frm.get("cliente").setValue(this.data.cliente.id)
          this.frm.get("fecha").disable();
          this.frm.get("cliente").disable();
          this.frm.get("producto").disable();
          this.frm.get("cantidad").disable();
          this.localSave = false;
          this.buscar();
      }else{
        this.frm.get("fecha").setValue(this.datePipe.transform(new Date(),"yyyy-MM-dd"));
        this.tituloForm ="Grabar Salida";
      }
  }

  displayedColumns: string[] = ['idSalidaDetalle', 'producto','cantidad','valor','valorTotal','opciones'];
  dataSource: MatTableDataSource<SalidaDetalleI>;


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
            idSalidaDetalle: this.IDDetalle,
            salida:null,
            cantidad: this.frm.get("cantidad").value,
            valor: selectProducto.valorUnidad ,
            valorTotal:selectProducto.valorUnidad * this.frm.get("cantidad").value
        }
        this._salidaDetalle.push(this._dataDetalle);
        this.dataSource = new MatTableDataSource(this._salidaDetalle);

        this.frm.get("fecha").disable();
        this.frm.get("cliente").disable();
        this.frm.get("cantidad").setValue("");
        this.frm.get("producto").setValue("");
    }

  }

  fillCombo(){  
    this.api.getCliente().subscribe(data =>{
      this._clienteData = data;
    })
    this.api.getProducto().subscribe(data =>{
      this._productoData = data;
    })
  }


  grabar(){
    
    if(this.dataSource.data.length > 0){
        let selectCliente = this._clienteData.find(c=> c.id == this.frm.get("cliente").value);
        this._data={
          idSalida: this.ID,
          fecha : this.datePipe.transform(this.frm.get('fecha').value,"yyyy-MM-dd'T'HH:mm:ss"),
          cliente:selectCliente
        }

        this.api.setSalida(this._data).subscribe(data =>{
          if(data){
              this._salidaDetalle.forEach( item =>{
                item.salida = data
                this.api.setSalidaDetalle(item).subscribe(data =>{})
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

  eliminar(data:SalidaDetalleI) {
      let index: number = this._salidaDetalle.findIndex(c=> c == data);
      this._salidaDetalle.splice(index,1);
      this.dataSource = new MatTableDataSource(this._salidaDetalle);
  }


  buscar(){
    this.api.getSalidaDetalle().subscribe(data =>{
      if(data){ 
        data.forEach(item =>{
          if(item.salida.idSalida == this.ID){
            this._salidaDetalle.push(item);
          }
        })
        this.dataSource = new MatTableDataSource(this._salidaDetalle);
      }
    })
  }

}
