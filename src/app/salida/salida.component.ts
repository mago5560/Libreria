import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SalidaI } from '../core/models/salidai';
import { ApiService } from '../core/services/api.service';
import { SalidatecleoComponent } from './salidatecleo/salidatecleo.component';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {

  _data = [];

  constructor(private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { 
    this.buscar();
  }

  ngOnInit(): void {
     this.paginator._intl.itemsPerPageLabel = "Registros por página";
  }

  displayedColumns: string[] = ['idSalida', 'fecha','cliente','nit','opciones'];
  dataSource: MatTableDataSource<SalidaI>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  buscar(){
    this.api.getSalida().subscribe(data =>{
      this._data = data;
      this.dataSource = new MatTableDataSource(this._data);
      this.dataSource.paginator = this.paginator;
   });
  }

  getDataFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  dialogGM(data?: SalidaI) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(SalidatecleoComponent, dialogConfig);

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


  eliminar(data: SalidaI) {
    const respuesta = confirm("¿Esta seguro que desea eliminar el registro?. Ya no podra recuperarlo.");
    if (respuesta) {
      this.api.eliminarSalida(data).subscribe(data => {
        this.snackBar.open('Registro eliminado correctamente', 'Aceptar', {
          duration: 2000,
        });
        this.buscar();
      }, error =>{
        console.log(error);
        this.snackBar.open(error, 'Aceptar', {
          duration: 4000,
        });
      });
    }
  }
  
}
