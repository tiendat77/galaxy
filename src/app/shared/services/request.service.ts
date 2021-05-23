import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class RequestService {

  constructor(private http: HttpClient) { }

  public get(url: string, params?: string) {
    const _url = url + (params ? '?' + params : '');
    return this.http.get(_url);
  }

  public post(url: string, body?) {
    return this.http.post(url, body);
  }

}
