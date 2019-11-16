import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(public http:HttpClient) { 
    console.log('contructor logService');
  }

  validarProveedor(rut:string){
    console.log(rut);
    return this.http.get(`http://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor?rutempresaproveedor=${rut}&ticket=D6FA376A-9E33-442D-B105-150519F48BED`);
  }
}
