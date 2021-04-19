import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Cliente } from '../models/ClienteModel';

@Injectable({
    providedIn: 'root'
  })
  export class ClienteService {

    private RUTA_BASE = 'http://localhost:3000/dev/cliente/';
    private HEADERS = new HttpHeaders({
        // Sin headers
    });

    constructor(
      private http: HttpClient
    ) {}
  
    crearCliente(body: Cliente) {
      console.log('body: ', body);
      const URL = `${this.RUTA_BASE}crearcliente`;
      
      return this.http.post(URL, body, { headers: this.HEADERS });
                      // .pipe( map( (data: any) => data.cliente ) );
    }
  
    getListaClientes() {
      const URL = `${this.RUTA_BASE}listclientes`;

      return this.http.get(URL, { headers: this.HEADERS });
    }
  
    getKpiClientes() {
      const URL = `${this.RUTA_BASE}kpideclientes`;

      return this.http.get(URL, { headers: this.HEADERS })
                      .pipe( map( (data: any) => data.kpi ) );
    }
  }