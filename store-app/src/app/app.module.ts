import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

import { KeycloakService } from './keycloak.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AlertModule.forRoot(),
    FormsModule
  ],
  providers: [
    KeycloakService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
