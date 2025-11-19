import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestData, HttpResponseData } from '../interfaces/http-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Ejecuta la petición HTTP según los datos proporcionados
  executeRequest(requestData: HttpRequestData): Observable<HttpResponse<any>> {
    const startTime = performance.now();
    
    // Construir headers personalizados
    let headers = new HttpHeaders();
    requestData.headers.forEach(header => {
      if (header.key && header.value) {
        headers = headers.set(header.key, header.value);
      }
    });

    const options = {
      headers,
      observe: 'response' as const
    };

    // Ejecutar según el método HTTP
    switch (requestData.method) {
      case 'GET':
        return this.http.get(requestData.url, options);
      
      case 'POST':
        return this.http.post(requestData.url, this.parseBody(requestData.body), options);
      
      case 'PUT':
        return this.http.put(requestData.url, this.parseBody(requestData.body), options);
      
      case 'DELETE':
        return this.http.delete(requestData.url, options);
      
      case 'PATCH':
        return this.http.patch(requestData.url, this.parseBody(requestData.body), options);
      
      default:
        return this.http.get(requestData.url, options);
    }
  }

  // Parsea el body JSON, maneja errores de sintaxis
  private parseBody(body?: string): any {
    if (!body || body.trim() === '') return null;
    try {
      return JSON.parse(body);
    } catch (error) {
      throw new Error('Formato JSON inválido en el body');
    }
  }
}