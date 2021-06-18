import { ProveedorI } from "./proveedori";

export interface IngresoI {
    "fecha": string,
    "idIngreso": number,
    "proveedor": ProveedorI
}
