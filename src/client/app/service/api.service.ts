import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  private baseUrl = '/api';

  constructor(private httpClient: HttpClient) { }

  get(url: string) {
    return this.httpClient.get(`${this.baseUrl}/${url}`);
  }

  post(url: string, body: Object) {
    return this.httpClient.post(`${this.baseUrl}/${url}`, body);
  }

  put(url: string, body: Object) {
    return this.httpClient.put(`${this.baseUrl}/${url}`, body);
  }

  delete(url: string) {
    return this.httpClient.delete(`${this.baseUrl}/${url}`);
  }
}
