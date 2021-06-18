import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaI } from '../core/models/categoriai';
import { ApiService } from '../core/services/api.service';
import { CategoriaarticulotecleoComponent } from './tecleo/categoriaarticulotecleo.component';

@Component({
  selector: 'app-categoriaarticulo',
  templateUrl: './categoriaarticulo.component.html',
  styleUrls: ['./categoriaarticulo.component.css']
})
export class CategoriaarticuloComponent implements OnInit {

  ID:number;
  _data = [];

  constructor(private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { 
   
    this.buscar();
  }

  ngOnInit(): void {
     this.paginator._intl.itemsPerPageLabel = "Registros por página";
  
  }

  displayedColumns: string[] = ['idCategoriaProducto', 'descripcion','opciones'];
  dataSource: MatTableDataSource<CategoriaI>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  buscar(){
    this.api.getCategoria().subscribe(data =>{
      this._data = data;
      this.dataSource = new MatTableDataSource(this._data);
      this.dataSource.paginator = this.paginator;
   });
  }

  getDataFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  dialogGM(data?: CategoriaI) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(CategoriaarticulotecleoComponent, dialogConfig);

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


  eliminar(data: CategoriaI) {
    const respuesta = confirm("¿Esta seguro que desea eliminar el registro?. Ya no podra recuperarlo.");
    if (respuesta) {
      this.api.eliminarCategoria(data).subscribe(data => {
       
        this.snackBar.open('Registro eliminado correctamente', 'Aceptar', {
          duration: 2000,
        });
        this.buscar();
      })
    }
  }
}
