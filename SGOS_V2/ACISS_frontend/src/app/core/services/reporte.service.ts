import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipo } from '../models/equipo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  url: string = environment.baseUrl + 'reporte';

  constructor(private http: HttpClient) { }

  ObtenerCantidades() {
    return this.http.get<any>( this.url + '/obtener');
  }

  DescargarPDFOrden(id: number): Observable<any>  {
    return this.http.get<Blob>(this.url + '/descargarOrdenPDF/'+ id, { observe: 'response', responseType: 'blob' as 'json' });
  }

}
