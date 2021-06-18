import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MarcaI } from '../core/models/marca';
import { ApiService } from '../core/services/api.service';
import { MarcatecleoComponent } from './marcatecleo/marcatecleo.component';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  ID:number;
  _data = [];

  constructor(private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { 
   
    this.buscar();
  }

  ngOnInit(): void {
     this.paginator._intl.itemsPerPageLabel = "Registros por página";
  
  }

  displayedColumns: string[] = ['idMarca', 'descripcion','opciones'];
  dataSource: MatTableDataSource<MarcaI>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  buscar(){
    this.api.getMarca().subscribe(data =>{
      this._data = data;
      this.dataSource = new MatTableDataSource(this._data);
      this.dataSource.paginator = this.paginator;
   });
  }

  getDataFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  dialogGM(data?: MarcaI) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(MarcatecleoComponent, dialogConfig);

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


  eliminar(data: MarcaI) {
    const respuesta = confirm("¿Esta seguro que desea eliminar el registro?. Ya no podra recuperarlo.");
    if (respuesta) {
      this.api.eliminarMarca(data).subscribe(data => {
       
        this.snackBar.open('Registro eliminado correctamente', 'Aceptar', {
          duration: 2000,
        });
        this.buscar();
      })
    }
  }
}
