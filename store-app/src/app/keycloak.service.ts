import { Injectable } from '@angular/core';
declare var require: any;
const Keycloak: any = require('keycloak-js');
import { Observable } from 'rxjs/Rx';

@Injectable()
export class KeycloakService {
  static auth: any = {};
  static UserInfo: any;
  private static _refreshInterval: number = 60000;
  public static Token: string;
  private static tokenSubscription: Observable<string>;
  private static keycloakServer: Object =
  {
      "realm": "store",
      "url": 'http://store-keycloak:8080/auth',
      "ssl-required": "external",
      "clientId": "store-app",
      "public-client": true
  };
  constructor() {
    //Initialize user token
  }
  static init(): Promise<any> {
    console.log('KeycloakService.init()')
    let keycloakAuth: any = new Keycloak(this.keycloakServer);
    KeycloakService.auth.loggedIn = false;

      return new Promise((resolve, reject) => {
        keycloakAuth.init({ onLoad: 'login-required' })
          .success(() => {
            KeycloakService.auth.loggedIn = true;
            KeycloakService.auth.authz = keycloakAuth;
            KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl
            + '/realms/'
            + this.keycloakServer['realm']
            + '/protocol/openid-connect/logout?redirect_uri='
            + document.baseURI;
            var awaiter = Promise.all([this.getUserInfo(keycloakAuth), this.setUserToken()]);                    
            KeycloakService.tokenSubscription = KeycloakService.refreshToken().subscribe((data: string) => { KeycloakService.Token = data });

            awaiter.then(() => {
                resolve();
            });
          })
          .error(() => {
            reject();
          });
      });
    }

  logout() {
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;
    window.location.href = KeycloakService.auth.logoutUrl;
  }

  static getUserInfo(keycloak: any):  Promise<{}> {
    let p: Promise<{}> = new Promise((resolve, reject) => {
        keycloak.loadUserInfo()
            .success((userInfo: any) => {
                KeycloakService.UserInfo = userInfo;
                resolve();
            })
            .error(() => {
                reject('Failed to load user info from Keycloak server.')
            });
    });

    return p;
  }
  static setUserToken(): Promise<{}>{
      let p: Promise<{}> = new Promise((resolve, reject) => {
          KeycloakService.getToken().then((token) => {
              KeycloakService.Token = token;
              resolve();
            });
      });

      return p;
  }
  
  static getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz.updateToken(5)
          .success(() => {
            this.Token = <string>KeycloakService.auth.authz.token;
            resolve(this.Token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }
  /**
   * Refresh user's keycloak token on a specified interval
   */
  static refreshToken(): any {
    return Observable.interval(this._refreshInterval)
        .switchMap(() => this.getTokenAsObservable())
        .map((res: string) => { return res; })
  }

  /**
   * Returns user's keycloak token as an Observable<string>, not a Promise<string.
   */
  static getTokenAsObservable(): Observable<string> {
    return Observable.fromPromise(this.getToken());
  }
}
