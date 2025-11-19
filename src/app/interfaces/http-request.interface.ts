// Tipos de métodos HTTP soportados
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Estructura de un header personalizado
export interface HttpHeader {
  key: string;
  value: string;
}

// Datos de la petición HTTP que se enviará
export interface HttpRequestData {
  url: string;
  method: HttpMethod;
  headers: HttpHeader[];
  body?: string;
}

// Datos de la respuesta HTTP recibida
export interface HttpResponseData {
  status: number;
  statusText: string;
  body: any;
  responseTime: number;
}