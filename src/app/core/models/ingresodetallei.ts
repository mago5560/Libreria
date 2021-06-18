import { IngresoI } from "./ingresoi";
import { ProductoI } from "./productoi";

export interface IngresoDetalleI{
    "cantidad": number,
    "idIngresoDetalle": number,
    "ingreso": IngresoI,
    "producto": ProductoI,
    "valor": number,
    "valorTotal": number
}