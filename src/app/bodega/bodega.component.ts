import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BodegaI } from '../core/models/bodegai';
import { ApiService } from '../core/services/api.service';
import { BodegatecleoComponent } from './tecleo/bodegatecleo.component';


@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {
  bodegId:number;
  bodegaAdd:BodegaI;
  _bodega = [];


  constructor(private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { 
    this.buscarBogedas();
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['bodegaId', 'descripcion','editar'];
  dataSource: MatTableDataSource<BodegaI>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  buscarBogedas(){
    this.api.getBodegas().subscribe(data =>{
      console.log(data);
      this._bodega = data;
      this.dataSource = new MatTableDataSource(this._bodega);
      this.dataSource.paginator = this.paginator;
   });
  }

  getDataFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  dialogBodega(bodega?: BodegaI) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = bodega;

    const dialogRef = this.dialog.open(BodegatecleoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (confirmDialog: boolean) => {
        if(confirmDialog){
         // this.toastr.success("Registro grabado correctamente", "Mensaje del Sistema");
          this.snackBar.open('Persona creada correctamente', 'Aceptar', {
            duration: 2000,
          });
          this.buscarBogedas()
        }
      }
    );
  }

}
