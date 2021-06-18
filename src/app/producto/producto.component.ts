import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoI } from '../core/models/productoi';
import { ApiService } from '../core/services/api.service';
import { ProductotecleoComponent } from './productotecleo/productotecleo.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  _data = [];

  constructor(private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { 
    this.buscar();
  }

  ngOnInit(): void {
     this.paginator._intl.itemsPerPageLabel = "Registros por página";
  
  }

  displayedColumns: string[] = ['id', 'descripcion','fechaSaldo','categoriaProducto','marca','perecedero','valorUnidad','valor','saldo','opciones'];
  dataSource: MatTableDataSource<ProductoI>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  buscar(){
    this.api.getProducto().subscribe(data =>{
      this._data = data;
      this.dataSource = new MatTableDataSource(this._data);
      this.dataSource.paginator = this.paginator;
   });
  }

  getDataFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  dialogGM(data?: ProductoI) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(ProductotecleoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (confirmDialog: boolean) => {
        if(confirmDialog){
          this.snackBar.open('Registro creada correctamente', 'Aceptar', {
            duration: 2000,
          });
          this.buscar()
        }
      }
    );

  }


  eliminar(data: ProductoI) {
    const respuesta = confirm("¿Esta seguro que desea eliminar el registro?. Ya no podra recuperarlo.");
    if (respuesta) {
      this.api.eliminarProducto(data).subscribe(data => {
       
        this.snackBar.open('Registro eliminado correctamente', 'Aceptar', {
          duration: 2000,
        });
        this.buscar();
      })
    }
  }

}
