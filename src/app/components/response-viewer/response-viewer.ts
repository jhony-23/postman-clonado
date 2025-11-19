import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpResponseData } from '../../interfaces/http-request.interface';

@Component({
  selector: 'app-response-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-viewer.html',
  styleUrl: './response-viewer.css'
})
export class ResponseViewerComponent {
  // Recibe datos del componente padre
  @Input() response: HttpResponseData | null = null;
  @Input() error: string | null = null;
  @Input() loading: boolean = false;

  // Formatea el JSON con indentación
  get formattedBody(): string {
    if (!this.response?.body) return '';
    try {
      return JSON.stringify(this.response.body, null, 2);
    } catch {
      return String(this.response.body);
    }
  }

  // Determina el color del status según el código
  getStatusClass(): string {
    if (!this.response) return '';
    const status = this.response.status;
    if (status >= 200 && status < 300) return 'status-success';
    if (status >= 400 && status < 500) return 'status-client-error';
    if (status >= 500) return 'status-server-error';
    return 'status-info';
  }
}