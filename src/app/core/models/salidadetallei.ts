import { ProductoI } from "./productoi";
import { SalidaI } from "./salidai";

export interface SalidaDetalleI{
    "cantidad": number,
    "idSalidaDetalle": number,
    "producto": ProductoI,
    "salida": SalidaI,
    "valor": number,
    "valorTotal": number
}