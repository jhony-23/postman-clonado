import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestFormComponent } from './components/request-form/request-form';
import { ResponseViewerComponent } from './components/response-viewer/response-viewer';
import { ApiService } from './services/api';
import { HttpRequestData, HttpResponseData } from './interfaces/http-request.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RequestFormComponent, ResponseViewerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  response: HttpResponseData | null = null;
  error: string | null = null;
  loading: boolean = false;

  constructor(private apiService: ApiService) {}

  // Ejecuta la petición HTTP cuando el usuario envía el formulario
  handleRequest(requestData: HttpRequestData): void {
    this.loading = true;
    this.error = null;
    this.response = null;

    // Inicia el contador de tiempo
    const startTime = performance.now();

    this.apiService.executeRequest(requestData).subscribe({
      next: (httpResponse) => {
        // Calcula el tiempo total de respuesta
        const endTime = performance.now();
        this.response = {
          status: httpResponse.status,
          statusText: httpResponse.statusText,
          body: httpResponse.body,
          responseTime: endTime - startTime
        };
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Ocurrió un error al realizar la petición';
      }
    });
  }
}