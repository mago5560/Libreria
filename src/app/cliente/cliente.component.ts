import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../core/services/api.service';
import { ClienteI } from '../core/models/clientei';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClientetecleoComponent } from './clientetecleo/clientetecleo.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  _data = [];

  constructor(private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { 
    this.buscar();
  }

  ngOnInit(): void {
     this.paginator._intl.itemsPerPageLabel = "Registros por página";
  
  }

  displayedColumns: string[] = ['id', 'nombre','direccion','telefono','nit','mail','opciones'];
  dataSource: MatTableDataSource<ClienteI>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  buscar(){
    this.api.getCliente().subscribe(data =>{
      this._data = data;
      this.dataSource = new MatTableDataSource(this._data);
      this.dataSource.paginator = this.paginator;
   });
  }

  getDataFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  dialogGM(data?: ClienteI) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(ClientetecleoComponent, dialogConfig);

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


  eliminar(data: ClienteI) {
    const respuesta = confirm("¿Esta seguro que desea eliminar el registro?. Ya no podra recuperarlo.");
    if (respuesta) {
      this.api.eliminarCliente(data).subscribe(data => {
       
        this.snackBar.open('Registro eliminado correctamente', 'Aceptar', {
          duration: 2000,
        });
        this.buscar();
      })
    }
  }

}
