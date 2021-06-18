import { CategoriaI } from "./categoriai";
import { MarcaI } from "./marca";

export interface ProductoI {

    "categoriaProducto": CategoriaI;
    "descripcion": string;
    "fechaSaldo": string;
    "id": number;
    "identificador": string;
    "marca": MarcaI;
    "maximo": number;
    "minimo": number;
    "perecedero": boolean;
    "porcentajeGanancia": number;
    "saldo": number;
    "valor": number;
    "valorPromedio": number;
    "valorUnidad": number;
}
