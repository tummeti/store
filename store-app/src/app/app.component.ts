import { Component } from '@angular/core';
import {KeycloakService} from './keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss']
})
export class AppComponent {
  title = 'Store';
  constructor( private keycloak: KeycloakService ) {
  }

  private get UserInfo(): boolean {
    console.log('app component getting user info')
    let val: any = {};
    if (KeycloakService.UserInfo) {
        val = KeycloakService.UserInfo;
    }
    return val;
  }

  Logout(): void {
    this.keycloak.logout();
  }
}
