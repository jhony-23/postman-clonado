import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpMethod, HttpHeader, HttpRequestData } from '../../interfaces/http-request.interface';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-form.html',
  styleUrl: './request-form.css'
})
export class RequestFormComponent {
  // Emite la petición hacia el componente padre
  @Output() sendRequest = new EventEmitter<HttpRequestData>();

  url: string = '';
  method: HttpMethod = 'GET';
  body: string = '';
  headers: HttpHeader[] = [{ key: '', value: '' }];

  methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  // Métodos que permiten body
  methodsWithBody: HttpMethod[] = ['POST', 'PUT', 'PATCH'];

  // Determina si se debe mostrar el campo de body según el método
  get showBody(): boolean {
    return this.methodsWithBody.includes(this.method);
  }

  addHeader(): void {
    this.headers.push({ key: '', value: '' });
  }

  // Solo permite eliminar si hay más de un header
  removeHeader(index: number): void {
    if (this.headers.length > 1) {
      this.headers.splice(index, 1);
    }
  }

  // Valida y emite la petición al componente padre
  onSubmit(): void {
    if (!this.url) {
      alert('Por favor ingresa una URL');
      return;
    }

    // Construye el objeto de petición filtrando headers vacíos
    const requestData: HttpRequestData = {
      url: this.url,
      method: this.method,
      headers: this.headers.filter(h => h.key && h.value),
      body: this.showBody ? this.body : undefined
    };

    this.sendRequest.emit(requestData);
  }
}