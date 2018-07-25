import { Injectable } from '@angular/core';

import {Headers, Http, Response, ResponseContentType} from '@angular/http';

import { KeycloakService } from '../keycloak.service';



@Injectable()
export class ItemService {

  private apiBaseUrl: string = 'http://service:3000/api/v1/';
  
  constructor(private http: Http, private keycloak: KeycloakService) { }

  /**
   * Helper method to attach user's Keycloak authorization token to request headers
   */
  private CreateAuthorizationHeader(): Headers {
    let h: Headers = new Headers();
    h.append('Authorization', 'Bearer ' + KeycloakService.Token);
    return h;
  }

  get(): Promise<Response> {
    let h: Headers = this.CreateAuthorizationHeader();
    return this.http.get(this.apiBaseUrl + 'values', { headers: h, responseType: ResponseContentType.Json})
    .toPromise()
    .then((response: Response) => response)
    .catch((response: any) => this.handleError(response));
  }

  add(data) {
    let h: Headers = this.CreateAuthorizationHeader();
    return this.http.post(this.apiBaseUrl + 'value', data, { headers: h, responseType: ResponseContentType.Json})
    .toPromise()
    .then((response: Response) => response)
    .catch((response: any) => this.handleError(response));
  }
  
  update(key, data) {
    let h: Headers = this.CreateAuthorizationHeader();
    return this.http.put(this.apiBaseUrl + 'value/'+key, data, { headers: h, responseType: ResponseContentType.Json})
    .toPromise()
    .then((response: Response) => response)
    .catch((response: any) => this.handleError(response));
  }
    
  delete(key) {
    let h: Headers = this.CreateAuthorizationHeader();
    return this.http.delete(this.apiBaseUrl + 'value/'+key, { headers: h, responseType: ResponseContentType.Json})
    .toPromise()
    .then((response: Response) => response)
    .catch((response: any) => this.handleError(response));
  }

  /**
   * Error handler for async http calls
   * @param error
   */
  private handleError(error: Response | any) {
    let errMsg: string = error.message ? error.message : error.toString();              
    console.log(errMsg);
  }
}
